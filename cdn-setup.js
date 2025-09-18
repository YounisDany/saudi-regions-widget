/**
 * CDN Setup Script for Saudi Regions Widget Enhanced
 * Prepares files for CDN distribution and creates deployment package
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class CDNSetup {
    constructor() {
        this.projectDir = __dirname;
        this.distDir = path.join(this.projectDir, 'dist');
        this.cdnDir = path.join(this.projectDir, 'cdn-package');
        this.version = '2.0.0';
    }

    /**
     * Ensure CDN directory exists
     */
    ensureCDNDir() {
        if (fs.existsSync(this.cdnDir)) {
            // Remove existing directory
            execSync(`rm -rf "${this.cdnDir}"`);
        }
        fs.mkdirSync(this.cdnDir, { recursive: true });
    }

    /**
     * Copy distribution files to CDN package
     */
    copyDistFiles() {
        console.log('Copying distribution files...');
        
        const filesToCopy = [
            'saudi-regions-widget.js',
            'saudi-regions-widget.min.js',
            'saudi-regions-widget.css',
            'saudi-regions-widget.min.css',
            'saudi-regions-widget.bundle.min.js',
            'package-info.json'
        ];
        
        filesToCopy.forEach(file => {
            const srcPath = path.join(this.distDir, file);
            const destPath = path.join(this.cdnDir, file);
            
            if (fs.existsSync(srcPath)) {
                fs.copyFileSync(srcPath, destPath);
                console.log(`✓ Copied ${file}`);
            } else {
                console.warn(`⚠ File not found: ${file}`);
            }
        });
        
        // Copy data directory
        const dataDir = path.join(this.distDir, 'data');
        const cdnDataDir = path.join(this.cdnDir, 'data');
        
        if (fs.existsSync(dataDir)) {
            execSync(`cp -r "${dataDir}" "${cdnDataDir}"`);
            console.log('✓ Copied data directory');
        }
    }

    /**
     * Create CDN configuration files
     */
    createCDNConfig() {
        console.log('Creating CDN configuration...');
        
        // Create .gitattributes for proper file handling
        const gitAttributes = `# CDN Package Git Attributes
*.js text eol=lf
*.css text eol=lf
*.json text eol=lf
*.md text eol=lf
*.min.js binary
*.min.css binary
`;
        
        fs.writeFileSync(path.join(this.cdnDir, '.gitattributes'), gitAttributes);
        
        // Create package.json for npm publishing
        const packageJson = {
            name: 'saudi-regions-widget-enhanced',
            version: this.version,
            description: 'Enhanced Saudi Arabia regions, cities and districts widget with comprehensive data and CDN support',
            main: 'saudi-regions-widget.min.js',
            style: 'saudi-regions-widget.min.css',
            keywords: [
                'saudi',
                'arabia',
                'regions',
                'cities',
                'districts',
                'widget',
                'dropdown',
                'select',
                'ksa',
                'javascript',
                'css',
                'cdn'
            ],
            author: 'YounisDany',
            license: 'MIT',
            repository: {
                type: 'git',
                url: 'https://github.com/YounisDany/saudi-regions-widget.git'
            },
            homepage: 'https://github.com/YounisDany/saudi-regions-widget',
            bugs: {
                url: 'https://github.com/YounisDany/saudi-regions-widget/issues'
            },
            files: [
                '*.js',
                '*.css',
                '*.json',
                'data/'
            ],
            cdn: {
                jsdelivr: `https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/`,
                unpkg: `https://unpkg.com/saudi-regions-widget-enhanced@${this.version}/`
            }
        };
        
        fs.writeFileSync(
            path.join(this.cdnDir, 'package.json'),
            JSON.stringify(packageJson, null, 2)
        );
        
        console.log('✓ Created CDN configuration files');
    }

    /**
     * Create CDN documentation
     */
    createCDNDocs() {
        console.log('Creating CDN documentation...');
        
        const cdnReadme = `# Saudi Regions Widget Enhanced - CDN Package

This package contains the CDN-ready files for the Saudi Regions Widget Enhanced library.

## Quick Start

### Via jsDelivr (Recommended)

\`\`\`html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.min.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.min.js"></script>
\`\`\`

### Via unpkg

\`\`\`html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/saudi-regions-widget-enhanced@${this.version}/saudi-regions-widget.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/saudi-regions-widget-enhanced@${this.version}/saudi-regions-widget.min.js"></script>
\`\`\`

### Bundle Version (JS + CSS combined)

\`\`\`html
<script src="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.bundle.min.js"></script>
\`\`\`

## Usage

\`\`\`html
<div id="saudi-widget"></div>

<script>
// Quick setup
SaudiRegionsWidget.createQuick('saudi-widget', {
    language: 'ar',
    rtl: true
});
</script>
\`\`\`

## Files Included

- \`saudi-regions-widget.js\` - Unminified JavaScript
- \`saudi-regions-widget.min.js\` - Minified JavaScript
- \`saudi-regions-widget.css\` - Unminified CSS
- \`saudi-regions-widget.min.css\` - Minified CSS
- \`saudi-regions-widget.bundle.min.js\` - Combined JS + CSS
- \`data/\` - Data files directory

## Data Files

- \`data/regions.min.json\` - Regions only (~2KB)
- \`data/regions-cities.min.json\` - Regions and cities (~85KB)
- \`data/complete.min.json\` - Complete data with districts (~1.2MB)

## Version

${this.version}

## License

MIT License - see main repository for details.

## Repository

https://github.com/YounisDany/saudi-regions-widget
`;

        fs.writeFileSync(path.join(this.cdnDir, 'README.md'), cdnReadme);
        
        console.log('✓ Created CDN documentation');
    }

    /**
     * Create integrity hashes for CDN files
     */
    createIntegrityHashes() {
        console.log('Creating integrity hashes...');
        
        const crypto = require('crypto');
        const hashes = {};
        
        const filesToHash = [
            'saudi-regions-widget.min.js',
            'saudi-regions-widget.min.css',
            'saudi-regions-widget.bundle.min.js'
        ];
        
        filesToHash.forEach(file => {
            const filePath = path.join(this.cdnDir, file);
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath);
                const hash = crypto.createHash('sha384').update(content).digest('base64');
                hashes[file] = `sha384-${hash}`;
            }
        });
        
        // Create integrity file
        const integrityInfo = {
            version: this.version,
            generated: new Date().toISOString(),
            files: hashes,
            usage: {
                'saudi-regions-widget.min.css': `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.min.css" integrity="${hashes['saudi-regions-widget.min.css']}" crossorigin="anonymous">`,
                'saudi-regions-widget.min.js': `<script src="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.min.js" integrity="${hashes['saudi-regions-widget.min.js']}" crossorigin="anonymous"></script>`,
                'saudi-regions-widget.bundle.min.js': `<script src="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.bundle.min.js" integrity="${hashes['saudi-regions-widget.bundle.min.js']}" crossorigin="anonymous"></script>`
            }
        };
        
        fs.writeFileSync(
            path.join(this.cdnDir, 'integrity.json'),
            JSON.stringify(integrityInfo, null, 2)
        );
        
        console.log('✓ Created integrity hashes');
        
        // Log hashes for reference
        console.log('\nIntegrity Hashes:');
        Object.entries(hashes).forEach(([file, hash]) => {
            console.log(`  ${file}: ${hash}`);
        });
    }

    /**
     * Create deployment instructions
     */
    createDeploymentInstructions() {
        console.log('Creating deployment instructions...');
        
        const instructions = `# Deployment Instructions

## CDN Deployment

### 1. GitHub Repository

1. Copy all files from the \`cdn-package\` directory to your repository's \`dist\` folder
2. Commit and push to GitHub
3. Create a new release with tag \`v${this.version}\`
4. Files will be automatically available via jsDelivr

### 2. NPM Publishing

\`\`\`bash
# Navigate to CDN package directory
cd cdn-package

# Login to NPM (if not already logged in)
npm login

# Publish package
npm publish
\`\`\`

### 3. CDN URLs

After deployment, the library will be available at:

#### jsDelivr (GitHub)
- Latest: \`https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/\`
- Specific version: \`https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@v${this.version}/dist/\`

#### unpkg (NPM)
- Latest: \`https://unpkg.com/saudi-regions-widget-enhanced@latest/\`
- Specific version: \`https://unpkg.com/saudi-regions-widget-enhanced@${this.version}/\`

### 4. Verification

Test the CDN links:
- https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.min.js
- https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.min.css
- https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/data/regions.min.json

## File Sizes

- JavaScript (minified): ~6.7KB
- CSS (minified): ~3.8KB
- Bundle (JS + CSS): ~10.5KB
- Data files: 2KB - 1.2MB (depending on level)

## Cache Headers

CDN providers typically set appropriate cache headers:
- Static files: 1 year cache
- Latest version: 24 hours cache
- Specific versions: Permanent cache

## Security

All files include integrity hashes for security verification.
See \`integrity.json\` for SRI hashes.
`;

        fs.writeFileSync(path.join(this.cdnDir, 'DEPLOYMENT.md'), instructions);
        
        console.log('✓ Created deployment instructions');
    }

    /**
     * Generate file size report
     */
    generateSizeReport() {
        console.log('Generating file size report...');
        
        const report = {
            version: this.version,
            generated: new Date().toISOString(),
            files: {}
        };
        
        const filesToCheck = [
            'saudi-regions-widget.js',
            'saudi-regions-widget.min.js',
            'saudi-regions-widget.css',
            'saudi-regions-widget.min.css',
            'saudi-regions-widget.bundle.min.js'
        ];
        
        filesToCheck.forEach(file => {
            const filePath = path.join(this.cdnDir, file);
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                report.files[file] = {
                    bytes: stats.size,
                    kb: (stats.size / 1024).toFixed(2),
                    mb: (stats.size / 1024 / 1024).toFixed(2)
                };
            }
        });
        
        // Check data files
        const dataFiles = ['regions.min.json', 'regions-cities.min.json', 'complete.min.json'];
        report.dataFiles = {};
        
        dataFiles.forEach(file => {
            const filePath = path.join(this.cdnDir, 'data', file);
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                report.dataFiles[file] = {
                    bytes: stats.size,
                    kb: (stats.size / 1024).toFixed(2),
                    mb: (stats.size / 1024 / 1024).toFixed(2)
                };
            }
        });
        
        fs.writeFileSync(
            path.join(this.cdnDir, 'size-report.json'),
            JSON.stringify(report, null, 2)
        );
        
        console.log('✓ Generated file size report');
        
        // Log summary
        console.log('\nFile Sizes:');
        Object.entries(report.files).forEach(([file, size]) => {
            console.log(`  ${file}: ${size.kb}KB`);
        });
        
        console.log('\nData Files:');
        Object.entries(report.dataFiles).forEach(([file, size]) => {
            console.log(`  ${file}: ${size.kb}KB`);
        });
    }

    /**
     * Setup CDN package
     */
    async setup() {
        console.log(`Setting up CDN package for Saudi Regions Widget Enhanced v${this.version}...`);
        console.log('='.repeat(60));
        
        try {
            this.ensureCDNDir();
            this.copyDistFiles();
            this.createCDNConfig();
            this.createCDNDocs();
            this.createIntegrityHashes();
            this.createDeploymentInstructions();
            this.generateSizeReport();
            
            console.log('='.repeat(60));
            console.log('✅ CDN package setup completed successfully!');
            console.log(`📦 CDN package ready in: ${this.cdnDir}`);
            console.log('\nNext steps:');
            console.log('1. Review the files in cdn-package directory');
            console.log('2. Follow instructions in DEPLOYMENT.md');
            console.log('3. Test CDN links after deployment');
            
        } catch (error) {
            console.error('❌ CDN setup failed:', error);
            process.exit(1);
        }
    }
}

// Run setup if called directly
if (require.main === module) {
    const cdnSetup = new CDNSetup();
    cdnSetup.setup();
}

module.exports = CDNSetup;

