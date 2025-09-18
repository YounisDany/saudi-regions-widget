/**
 * Test Server for Saudi Regions Widget Enhanced
 * Simple HTTP server to test the library locally
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

class TestServer {
    constructor(port = 3000) {
        this.port = port;
        this.projectDir = __dirname;
        this.mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon'
        };
    }

    /**
     * Get MIME type for file extension
     */
    getMimeType(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        return this.mimeTypes[ext] || 'text/plain';
    }

    /**
     * Serve static files
     */
    serveFile(filePath, res) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>');
                return;
            }

            const mimeType = this.getMimeType(filePath);
            res.writeHead(200, { 
                'Content-Type': mimeType,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            });
            res.end(data);
        });
    }

    /**
     * Generate directory listing
     */
    generateDirectoryListing(dirPath, urlPath) {
        try {
            const files = fs.readdirSync(dirPath);
            const items = files.map(file => {
                const filePath = path.join(dirPath, file);
                const stats = fs.statSync(filePath);
                const isDir = stats.isDirectory();
                const size = isDir ? '-' : this.formatFileSize(stats.size);
                const modified = stats.mtime.toISOString().split('T')[0];
                
                return {
                    name: file,
                    isDir,
                    size,
                    modified,
                    url: path.join(urlPath, file).replace(/\\\\/g, '/')
                };
            });

            // Sort: directories first, then files
            items.sort((a, b) => {
                if (a.isDir && !b.isDir) return -1;
                if (!a.isDir && b.isDir) return 1;
                return a.name.localeCompare(b.name);
            });

            const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Directory Listing - ${urlPath}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #4CAF50; color: white; }
        tr:hover { background-color: #f5f5f5; }
        a { color: #2196F3; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .dir { color: #FF9800; font-weight: bold; }
        .file { color: #333; }
        .size { text-align: right; }
        .back { margin-bottom: 20px; }
        .back a { background: #2196F3; color: white; padding: 8px 16px; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📁 Directory Listing: ${urlPath}</h1>
        ${urlPath !== '/' ? '<div class="back"><a href="../">← Back</a></div>' : ''}
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Modified</th>
                </tr>
            </thead>
            <tbody>
                ${items.map(item => `
                    <tr>
                        <td>
                            <a href="${item.url}" class="${item.isDir ? 'dir' : 'file'}">
                                ${item.isDir ? '📁' : '📄'} ${item.name}
                            </a>
                        </td>
                        <td class="size">${item.size}</td>
                        <td>${item.modified}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
</body>
</html>`;
            return html;
        } catch (err) {
            return '<h1>Error reading directory</h1>';
        }
    }

    /**
     * Format file size
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Handle HTTP requests
     */
    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        let pathname = parsedUrl.pathname;

        // Remove leading slash and decode URI
        pathname = decodeURIComponent(pathname.substring(1));

        // Default to index.html if accessing root
        if (pathname === '') {
            pathname = 'examples/basic-example.html';
        }

        const filePath = path.join(this.projectDir, pathname);

        // Security check: prevent directory traversal
        if (!filePath.startsWith(this.projectDir)) {
            res.writeHead(403, { 'Content-Type': 'text/html' });
            res.end('<h1>403 - Forbidden</h1>');
            return;
        }

        // Check if file/directory exists
        fs.stat(filePath, (err, stats) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Not Found</h1>');
                return;
            }

            if (stats.isDirectory()) {
                // Check for index.html in directory
                const indexPath = path.join(filePath, 'index.html');
                fs.stat(indexPath, (indexErr) => {
                    if (!indexErr) {
                        this.serveFile(indexPath, res);
                    } else {
                        // Generate directory listing
                        const html = this.generateDirectoryListing(filePath, '/' + pathname);
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(html);
                    }
                });
            } else {
                // Serve file
                this.serveFile(filePath, res);
            }
        });
    }

    /**
     * Start the server
     */
    start() {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(this.port, () => {
            console.log(`🚀 Test Server Started`);
            console.log(`📍 URL: http://localhost:${this.port}`);
            console.log(`📁 Serving: ${this.projectDir}`);
            console.log(`\n📋 Available Examples:`);
            console.log(`   Basic Example: http://localhost:${this.port}/examples/basic-example.html`);
            console.log(`   CDN Example: http://localhost:${this.port}/examples/cdn-example.html`);
            console.log(`\n📊 Files:`);
            console.log(`   Distribution: http://localhost:${this.port}/dist/`);
            console.log(`   Source: http://localhost:${this.port}/src/`);
            console.log(`   Data: http://localhost:${this.port}/dist/data/`);
            console.log(`\n⏹️  Press Ctrl+C to stop the server`);
        });

        // Handle server shutdown
        process.on('SIGINT', () => {
            console.log('\n🛑 Shutting down server...');
            server.close(() => {
                console.log('✅ Server stopped');
                process.exit(0);
            });
        });

        return server;
    }
}

// Start server if called directly
if (require.main === module) {
    const port = process.argv[2] || 3000;
    const server = new TestServer(port);
    server.start();
}

module.exports = TestServer;

