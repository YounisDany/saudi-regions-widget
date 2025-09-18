# Deployment Instructions

## CDN Deployment

### 1. GitHub Repository

1. Copy all files from the `cdn-package` directory to your repository's `dist` folder
2. Commit and push to GitHub
3. Create a new release with tag `v2.0.0`
4. Files will be automatically available via jsDelivr

### 2. NPM Publishing

```bash
# Navigate to CDN package directory
cd cdn-package

# Login to NPM (if not already logged in)
npm login

# Publish package
npm publish
```

### 3. CDN URLs

After deployment, the library will be available at:

#### jsDelivr (GitHub)
- Latest: `https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/`
- Specific version: `https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@v2.0.0/dist/`

#### unpkg (NPM)
- Latest: `https://unpkg.com/saudi-regions-widget-enhanced@latest/`
- Specific version: `https://unpkg.com/saudi-regions-widget-enhanced@2.0.0/`

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
See `integrity.json` for SRI hashes.
