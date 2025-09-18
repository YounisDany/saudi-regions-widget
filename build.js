/**
 * Build Script for Saudi Regions Widget Enhanced
 * Combines and minifies JS and CSS files
 */

const fs = require('fs');
const path = require('path');

// Check if Terser is available
let Terser;
try {
    Terser = require('terser');
} catch (error) {
    console.log('Terser not found, installing...');
    const { execSync } = require('child_process');
    execSync('npm install terser', { stdio: 'inherit' });
    Terser = require('terser');
}

class Builder {
    constructor() {
        this.srcDir = path.join(__dirname, 'src');
        this.distDir = path.join(__dirname, 'dist');
        this.version = '2.0.0';
    }

    /**
     * Ensure dist directory exists
     */
    ensureDistDir() {
        if (!fs.existsSync(this.distDir)) {
            fs.mkdirSync(this.distDir, { recursive: true });
        }
    }

    /**
     * Build JavaScript files
     */
    async buildJS() {
        console.log('Building JavaScript files...');
        
        const jsFile = path.join(this.srcDir, 'saudi-regions-widget.js');
        const jsContent = fs.readFileSync(jsFile, 'utf8');
        
        // Add version and build info
        const header = `/**
 * Saudi Regions Widget Enhanced v${this.version}
 * Built on ${new Date().toISOString()}
 * https://github.com/YounisDany/saudi-regions-widget
 */\n`;
        
        // Write unminified version
        const unminifiedContent = header + jsContent;
        fs.writeFileSync(path.join(this.distDir, 'saudi-regions-widget.js'), unminifiedContent);
        
        // Minify JavaScript
        try {
            const minified = await Terser.minify(jsContent, {
                compress: {
                    drop_console: false,
                    drop_debugger: true,
                    pure_funcs: ['console.log']
                },
                mangle: {
                    reserved: ['SaudiRegionsWidget']
                },
                format: {
                    comments: false,
                    preamble: header.trim()
                }
            });
            
            if (minified.error) {
                throw minified.error;
            }
            
            fs.writeFileSync(path.join(this.distDir, 'saudi-regions-widget.min.js'), minified.code);
            console.log('✓ JavaScript files built successfully');
            
            // Log file sizes
            const originalSize = Buffer.byteLength(jsContent, 'utf8');
            const minifiedSize = Buffer.byteLength(minified.code, 'utf8');
            const compression = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
            
            console.log(`  Original: ${(originalSize / 1024).toFixed(1)}KB`);
            console.log(`  Minified: ${(minifiedSize / 1024).toFixed(1)}KB`);
            console.log(`  Compression: ${compression}%`);
            
        } catch (error) {
            console.error('Error minifying JavaScript:', error);
            throw error;
        }
    }

    /**
     * Build CSS files
     */
    buildCSS() {
        console.log('Building CSS files...');
        
        const cssFile = path.join(this.srcDir, 'saudi-regions-widget.css');
        const cssContent = fs.readFileSync(cssFile, 'utf8');
        
        // Add version and build info
        const header = `/**
 * Saudi Regions Widget Enhanced v${this.version}
 * Built on ${new Date().toISOString()}
 * https://github.com/YounisDany/saudi-regions-widget
 */\n`;
        
        // Write unminified version
        const unminifiedContent = header + cssContent;
        fs.writeFileSync(path.join(this.distDir, 'saudi-regions-widget.css'), unminifiedContent);
        
        // Simple CSS minification
        const minifiedCSS = cssContent
            .replace(/\s+/g, ' ')
            .replace(/;\s*}/g, '}')
            .replace(/{\s*/g, '{')
            .replace(/;\s*/g, ';')
            .replace(/,\s*/g, ',')
            .replace(/:\s*/g, ':')
            .replace(/\/\*.*?\*\//g, '')
            .trim();
        
        const minifiedContent = header.replace(/\n/g, '') + minifiedCSS;
        fs.writeFileSync(path.join(this.distDir, 'saudi-regions-widget.min.css'), minifiedContent);
        
        console.log('✓ CSS files built successfully');
        
        // Log file sizes
        const originalSize = Buffer.byteLength(cssContent, 'utf8');
        const minifiedSize = Buffer.byteLength(minifiedCSS, 'utf8');
        const compression = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        
        console.log(`  Original: ${(originalSize / 1024).toFixed(1)}KB`);
        console.log(`  Minified: ${(minifiedSize / 1024).toFixed(1)}KB`);
        console.log(`  Compression: ${compression}%`);
    }

    /**
     * Create combined file (JS + CSS)
     */
    createCombined() {
        console.log('Creating combined file...');
        
        const jsContent = fs.readFileSync(path.join(this.distDir, 'saudi-regions-widget.min.js'), 'utf8');
        const cssContent = fs.readFileSync(path.join(this.distDir, 'saudi-regions-widget.min.css'), 'utf8');
        
        const combinedContent = `${jsContent}

// Auto-inject CSS
(function() {
    if (typeof document !== 'undefined') {
        var css = \`${cssContent.replace(/`/g, '\\`')}\`;
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        document.head.appendChild(style);
    }
})();`;

        fs.writeFileSync(path.join(this.distDir, 'saudi-regions-widget.bundle.min.js'), combinedContent);
        console.log('✓ Combined file created successfully');
    }

    /**
     * Copy data files
     */
    copyDataFiles() {
        console.log('Copying data files...');
        
        const dataDir = path.join(this.distDir, 'data');
        if (fs.existsSync(dataDir)) {
            // Data files should already exist from data-processor.js
            console.log('✓ Data files already exist');
        } else {
            console.log('⚠ Data files not found. Run data-processor.js first.');
        }
    }

    /**
     * Generate package info
     */
    generatePackageInfo() {
        console.log('Generating package info...');
        
        const packageInfo = {
            name: 'saudi-regions-widget-enhanced',
            version: this.version,
            description: 'Enhanced Saudi Arabia regions, cities and districts widget',
            main: 'saudi-regions-widget.min.js',
            style: 'saudi-regions-widget.min.css',
            files: {
                'saudi-regions-widget.js': 'Unminified JavaScript',
                'saudi-regions-widget.min.js': 'Minified JavaScript',
                'saudi-regions-widget.css': 'Unminified CSS',
                'saudi-regions-widget.min.css': 'Minified CSS',
                'saudi-regions-widget.bundle.min.js': 'Combined JS + CSS',
                'data/': 'Data files directory'
            },
            cdn: {
                jsdelivr: `https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/`,
                unpkg: `https://unpkg.com/saudi-regions-widget-enhanced@${this.version}/dist/`
            },
            built: new Date().toISOString()
        };
        
        fs.writeFileSync(
            path.join(this.distDir, 'package-info.json'),
            JSON.stringify(packageInfo, null, 2)
        );
        
        console.log('✓ Package info generated');
    }

    /**
     * Build everything
     */
    async build() {
        console.log(`Building Saudi Regions Widget Enhanced v${this.version}...`);
        console.log('='.repeat(50));
        
        try {
            this.ensureDistDir();
            await this.buildJS();
            this.buildCSS();
            this.createCombined();
            this.copyDataFiles();
            this.generatePackageInfo();
            
            console.log('='.repeat(50));
            console.log('✅ Build completed successfully!');
            console.log(`📦 Files are ready in: ${this.distDir}`);
            
        } catch (error) {
            console.error('❌ Build failed:', error);
            process.exit(1);
        }
    }
}

// Run build if called directly
if (require.main === module) {
    const builder = new Builder();
    builder.build();
}

module.exports = Builder;

