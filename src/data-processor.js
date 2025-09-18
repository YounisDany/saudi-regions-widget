/**
 * Data Processor for Saudi Regions Widget
 * Processes and optimizes the raw JSON data for better performance
 */

const fs = require('fs');
const path = require('path');

class DataProcessor {
    constructor() {
        this.regions = [];
        this.cities = [];
        this.districts = [];
        this.processedData = {
            regions: {},
            cities: {},
            districts: {},
            hierarchy: {}
        };
    }

    /**
     * Load raw data from JSON files
     */
    loadRawData() {
        console.log('Loading raw data...');
        
        try {
            this.regions = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/regions.json'), 'utf8'));
            this.cities = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/cities.json'), 'utf8'));
            this.districts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/districts.json'), 'utf8'));
            
            console.log(`Loaded ${this.regions.length} regions`);
            console.log(`Loaded ${this.cities.length} cities`);
            console.log(`Loaded ${this.districts.length} districts`);
        } catch (error) {
            console.error('Error loading raw data:', error);
            throw error;
        }
    }

    /**
     * Process regions data
     */
    processRegions() {
        console.log('Processing regions...');
        
        this.regions.forEach(region => {
            this.processedData.regions[region.region_id] = {
                id: region.region_id,
                code: region.code,
                name_ar: region.name_ar,
                name_en: region.name_en,
                capital_city_id: region.capital_city_id,
                population: region.population,
                center: region.center
            };
        });
    }

    /**
     * Process cities data
     */
    processCities() {
        console.log('Processing cities...');
        
        this.cities.forEach(city => {
            this.processedData.cities[city.city_id] = {
                id: city.city_id,
                region_id: city.region_id,
                name_ar: city.name_ar,
                name_en: city.name_en,
                center: city.center
            };
        });
    }

    /**
     * Process districts data (sample only for performance)
     */
    processDistricts() {
        console.log('Processing districts...');
        
        // Process only a sample of districts to keep file size manageable
        const sampleSize = Math.min(50000, this.districts.length);
        const step = Math.floor(this.districts.length / sampleSize);
        
        for (let i = 0; i < this.districts.length; i += step) {
            const district = this.districts[i];
            this.processedData.districts[district.district_id] = {
                id: district.district_id,
                city_id: district.city_id,
                region_id: district.region_id,
                name_ar: district.name_ar,
                name_en: district.name_en
            };
        }
        
        console.log(`Processed ${Object.keys(this.processedData.districts).length} districts (sampled)`);
    }

    /**
     * Build hierarchical structure for easy navigation
     */
    buildHierarchy() {
        console.log('Building hierarchy...');
        
        // Initialize hierarchy
        Object.keys(this.processedData.regions).forEach(regionId => {
            this.processedData.hierarchy[regionId] = {
                region: this.processedData.regions[regionId],
                cities: {}
            };
        });

        // Add cities to regions
        Object.values(this.processedData.cities).forEach(city => {
            if (this.processedData.hierarchy[city.region_id]) {
                this.processedData.hierarchy[city.region_id].cities[city.id] = {
                    ...city,
                    districts: {}
                };
            }
        });

        // Add districts to cities
        Object.values(this.processedData.districts).forEach(district => {
            const regionId = district.region_id;
            const cityId = district.city_id;
            
            if (this.processedData.hierarchy[regionId] && 
                this.processedData.hierarchy[regionId].cities[cityId]) {
                this.processedData.hierarchy[regionId].cities[cityId].districts[district.id] = district;
            }
        });
    }

    /**
     * Create optimized data files
     */
    createOptimizedFiles() {
        console.log('Creating optimized files...');
        
        const outputDir = path.join(__dirname, '../dist/data');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Create separate files for different use cases
        
        // 1. Regions only (smallest file)
        fs.writeFileSync(
            path.join(outputDir, 'regions.json'),
            JSON.stringify(this.processedData.regions, null, 2)
        );

        // 2. Regions and cities
        fs.writeFileSync(
            path.join(outputDir, 'regions-cities.json'),
            JSON.stringify({
                regions: this.processedData.regions,
                cities: this.processedData.cities
            }, null, 2)
        );

        // 3. Complete hierarchy (largest file)
        fs.writeFileSync(
            path.join(outputDir, 'complete.json'),
            JSON.stringify(this.processedData.hierarchy, null, 2)
        );

        // 4. Minified versions
        fs.writeFileSync(
            path.join(outputDir, 'regions.min.json'),
            JSON.stringify(this.processedData.regions)
        );

        fs.writeFileSync(
            path.join(outputDir, 'regions-cities.min.json'),
            JSON.stringify({
                regions: this.processedData.regions,
                cities: this.processedData.cities
            })
        );

        fs.writeFileSync(
            path.join(outputDir, 'complete.min.json'),
            JSON.stringify(this.processedData.hierarchy)
        );

        console.log('Optimized files created successfully!');
    }

    /**
     * Process all data
     */
    process() {
        this.loadRawData();
        this.processRegions();
        this.processCities();
        this.processDistricts();
        this.buildHierarchy();
        this.createOptimizedFiles();
        
        console.log('Data processing completed!');
        return this.processedData;
    }
}

module.exports = DataProcessor;

// Run if called directly
if (require.main === module) {
    const processor = new DataProcessor();
    processor.process();
}

