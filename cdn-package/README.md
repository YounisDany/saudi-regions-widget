# Saudi Regions Widget Enhanced - CDN Package

This package contains the CDN-ready files for the Saudi Regions Widget Enhanced library.

## Quick Start

### Via jsDelivr (Recommended)

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.min.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.min.js"></script>
```

### Via unpkg

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/saudi-regions-widget-enhanced@2.0.0/saudi-regions-widget.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/saudi-regions-widget-enhanced@2.0.0/saudi-regions-widget.min.js"></script>
```

### Bundle Version (JS + CSS combined)

```html
<script src="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.bundle.min.js"></script>
```

## Usage

```html
<div id="saudi-widget"></div>

<script>
// Quick setup
SaudiRegionsWidget.createQuick('saudi-widget', {
    language: 'ar',
    rtl: true
});
</script>
```

## Files Included

- `saudi-regions-widget.js` - Unminified JavaScript
- `saudi-regions-widget.min.js` - Minified JavaScript
- `saudi-regions-widget.css` - Unminified CSS
- `saudi-regions-widget.min.css` - Minified CSS
- `saudi-regions-widget.bundle.min.js` - Combined JS + CSS
- `data/` - Data files directory

## Data Files

- `data/regions.min.json` - Regions only (~2KB)
- `data/regions-cities.min.json` - Regions and cities (~85KB)
- `data/complete.min.json` - Complete data with districts (~1.2MB)

## Version

2.0.0

## License

MIT License - see main repository for details.

## Repository

https://github.com/YounisDany/saudi-regions-widget
