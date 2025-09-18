/**
 * Saudi Regions Widget Enhanced
 * A comprehensive widget for Saudi Arabia regions, cities, and districts
 * Version 2.0.0
 * 
 * Features:
 * - Complete data for all 13 regions, 4500+ cities, and 3700+ districts
 * - Multiple data loading options (regions only, regions+cities, complete)
 * - Search and filter capabilities
 * - RTL support for Arabic
 * - Lightweight and optimized
 * - CDN ready
 */

(function(global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        global.SaudiRegionsWidget = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    'use strict';

    // Default configuration
    const DEFAULT_CONFIG = {
        dataUrl: 'https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/data/',
        dataLevel: 'regions-cities', // 'regions', 'regions-cities', 'complete'
        language: 'ar', // 'ar' or 'en'
        rtl: true,
        searchEnabled: true,
        placeholder: {
            ar: {
                region: 'اختر المنطقة',
                city: 'اختر المدينة',
                district: 'اختر الحي'
            },
            en: {
                region: 'Select Region',
                city: 'Select City',
                district: 'Select District'
            }
        },
        classes: {
            container: 'saudi-widget-container',
            select: 'saudi-widget-select',
            search: 'saudi-widget-search',
            option: 'saudi-widget-option'
        }
    };

    class SaudiRegionsWidget {
        constructor(options = {}) {
            this.config = { ...DEFAULT_CONFIG, ...options };
            this.data = null;
            this.elements = {};
            this.callbacks = {};
            this.isLoaded = false;
            
            // Initialize
            this.init();
        }

        /**
         * Initialize the widget
         */
        async init() {
            try {
                await this.loadData();
                this.isLoaded = true;
                this.trigger('ready');
            } catch (error) {
                console.error('Saudi Regions Widget: Failed to initialize', error);
                this.trigger('error', error);
            }
        }

        /**
         * Load data from CDN or local source
         */
        async loadData() {
            const dataFile = this.config.dataLevel + '.min.json';
            const url = this.config.dataUrl + dataFile;
            
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.data = await response.json();
                this.trigger('dataLoaded', this.data);
            } catch (error) {
                console.error('Saudi Regions Widget: Failed to load data', error);
                throw error;
            }
        }

        /**
         * Create a select element for regions
         */
        createRegionSelect(containerId, options = {}) {
            const container = document.getElementById(containerId);
            if (!container) {
                throw new Error(`Container with id "${containerId}" not found`);
            }

            const config = { ...this.config, ...options };
            const select = this.createSelectElement('region', config);
            
            // Populate with regions
            this.populateRegions(select, config);
            
            container.appendChild(select);
            this.elements[containerId] = { region: select };
            
            return select;
        }

        /**
         * Create cascading selects for region -> city -> district
         */
        createCascadingSelects(containerId, options = {}) {
            const container = document.getElementById(containerId);
            if (!container) {
                throw new Error(`Container with id "${containerId}" not found`);
            }

            const config = { ...this.config, ...options };
            
            // Create container div
            const widgetContainer = document.createElement('div');
            widgetContainer.className = config.classes.container;
            if (config.rtl) {
                widgetContainer.dir = 'rtl';
            }

            // Create selects
            const regionSelect = this.createSelectElement('region', config);
            const citySelect = this.createSelectElement('city', config);
            const districtSelect = this.createSelectElement('district', config);

            // Initially disable city and district selects
            citySelect.disabled = true;
            districtSelect.disabled = true;

            // Populate regions
            this.populateRegions(regionSelect, config);

            // Add event listeners for cascading
            regionSelect.addEventListener('change', (e) => {
                const regionId = e.target.value;
                this.populateCities(citySelect, regionId, config);
                this.resetSelect(districtSelect, config, 'district');
                districtSelect.disabled = true;
                this.trigger('regionChanged', { regionId, region: this.getRegionById(regionId) });
            });

            citySelect.addEventListener('change', (e) => {
                const cityId = e.target.value;
                const regionId = regionSelect.value;
                if (this.config.dataLevel === 'complete') {
                    this.populateDistricts(districtSelect, regionId, cityId, config);
                }
                this.trigger('cityChanged', { cityId, city: this.getCityById(cityId) });
            });

            districtSelect.addEventListener('change', (e) => {
                const districtId = e.target.value;
                this.trigger('districtChanged', { districtId, district: this.getDistrictById(districtId) });
            });

            // Append elements
            widgetContainer.appendChild(regionSelect);
            widgetContainer.appendChild(citySelect);
            if (this.config.dataLevel === 'complete') {
                widgetContainer.appendChild(districtSelect);
            }

            container.appendChild(widgetContainer);
            
            this.elements[containerId] = {
                container: widgetContainer,
                region: regionSelect,
                city: citySelect,
                district: districtSelect
            };

            return {
                container: widgetContainer,
                region: regionSelect,
                city: citySelect,
                district: districtSelect
            };
        }

        /**
         * Create a select element
         */
        createSelectElement(type, config) {
            const select = document.createElement('select');
            select.className = config.classes.select + ' ' + config.classes.select + '-' + type;
            
            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = config.placeholder[config.language][type];
            defaultOption.disabled = true;
            defaultOption.selected = true;
            select.appendChild(defaultOption);

            return select;
        }

        /**
         * Populate regions in select
         */
        populateRegions(select, config) {
            this.resetSelect(select, config, 'region');
            
            const regions = this.config.dataLevel === 'complete' 
                ? Object.values(this.data).map(item => item.region)
                : Object.values(this.data.regions || this.data);

            regions.forEach(region => {
                const option = document.createElement('option');
                option.value = region.id;
                option.textContent = config.language === 'ar' ? region.name_ar : region.name_en;
                option.className = config.classes.option;
                select.appendChild(option);
            });
        }

        /**
         * Populate cities in select based on region
         */
        populateCities(select, regionId, config) {
            this.resetSelect(select, config, 'city');
            
            if (!regionId) {
                select.disabled = true;
                return;
            }

            let cities = [];
            
            if (this.config.dataLevel === 'complete') {
                cities = Object.values(this.data[regionId]?.cities || {});
            } else if (this.data.cities) {
                cities = Object.values(this.data.cities).filter(city => city.region_id == regionId);
            }

            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city.id;
                option.textContent = config.language === 'ar' ? city.name_ar : city.name_en;
                option.className = config.classes.option;
                select.appendChild(option);
            });

            select.disabled = cities.length === 0;
        }

        /**
         * Populate districts in select based on city
         */
        populateDistricts(select, regionId, cityId, config) {
            this.resetSelect(select, config, 'district');
            
            if (!regionId || !cityId) {
                select.disabled = true;
                return;
            }

            const districts = Object.values(this.data[regionId]?.cities[cityId]?.districts || {});

            districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district.id;
                option.textContent = config.language === 'ar' ? district.name_ar : district.name_en;
                option.className = config.classes.option;
                select.appendChild(option);
            });

            select.disabled = districts.length === 0;
        }

        /**
         * Reset select to default state
         */
        resetSelect(select, config, type) {
            select.innerHTML = '';
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = config.placeholder[config.language][type];
            defaultOption.disabled = true;
            defaultOption.selected = true;
            select.appendChild(defaultOption);
        }

        /**
         * Get region by ID
         */
        getRegionById(regionId) {
            if (this.config.dataLevel === 'complete') {
                return this.data[regionId]?.region;
            }
            return this.data.regions?.[regionId] || this.data[regionId];
        }

        /**
         * Get city by ID
         */
        getCityById(cityId) {
            if (this.config.dataLevel === 'complete') {
                for (const region of Object.values(this.data)) {
                    if (region.cities[cityId]) {
                        return region.cities[cityId];
                    }
                }
            }
            return this.data.cities?.[cityId];
        }

        /**
         * Get district by ID
         */
        getDistrictById(districtId) {
            if (this.config.dataLevel === 'complete') {
                for (const region of Object.values(this.data)) {
                    for (const city of Object.values(region.cities)) {
                        if (city.districts[districtId]) {
                            return city.districts[districtId];
                        }
                    }
                }
            }
            return null;
        }

        /**
         * Search functionality
         */
        search(query, type = 'all') {
            if (!this.data || !query) return [];

            const results = [];
            const searchTerm = query.toLowerCase();

            if (type === 'all' || type === 'regions') {
                const regions = this.config.dataLevel === 'complete' 
                    ? Object.values(this.data).map(item => item.region)
                    : Object.values(this.data.regions || this.data);

                regions.forEach(region => {
                    if (region.name_ar.toLowerCase().includes(searchTerm) || 
                        region.name_en.toLowerCase().includes(searchTerm)) {
                        results.push({ type: 'region', data: region });
                    }
                });
            }

            if (type === 'all' || type === 'cities') {
                let cities = [];
                if (this.config.dataLevel === 'complete') {
                    Object.values(this.data).forEach(region => {
                        cities = cities.concat(Object.values(region.cities));
                    });
                } else if (this.data.cities) {
                    cities = Object.values(this.data.cities);
                }

                cities.forEach(city => {
                    if (city.name_ar.toLowerCase().includes(searchTerm) || 
                        city.name_en.toLowerCase().includes(searchTerm)) {
                        results.push({ type: 'city', data: city });
                    }
                });
            }

            return results;
        }

        /**
         * Event handling
         */
        on(event, callback) {
            if (!this.callbacks[event]) {
                this.callbacks[event] = [];
            }
            this.callbacks[event].push(callback);
        }

        off(event, callback) {
            if (this.callbacks[event]) {
                const index = this.callbacks[event].indexOf(callback);
                if (index > -1) {
                    this.callbacks[event].splice(index, 1);
                }
            }
        }

        trigger(event, data) {
            if (this.callbacks[event]) {
                this.callbacks[event].forEach(callback => callback(data));
            }
        }

        /**
         * Get current selections
         */
        getSelections(containerId) {
            const elements = this.elements[containerId];
            if (!elements) return null;

            return {
                region: {
                    id: elements.region?.value || null,
                    data: this.getRegionById(elements.region?.value)
                },
                city: {
                    id: elements.city?.value || null,
                    data: this.getCityById(elements.city?.value)
                },
                district: {
                    id: elements.district?.value || null,
                    data: this.getDistrictById(elements.district?.value)
                }
            };
        }

        /**
         * Set selections programmatically
         */
        setSelections(containerId, selections) {
            const elements = this.elements[containerId];
            if (!elements) return;

            if (selections.region) {
                elements.region.value = selections.region;
                elements.region.dispatchEvent(new Event('change'));
            }

            if (selections.city) {
                setTimeout(() => {
                    elements.city.value = selections.city;
                    elements.city.dispatchEvent(new Event('change'));
                }, 100);
            }

            if (selections.district) {
                setTimeout(() => {
                    elements.district.value = selections.district;
                    elements.district.dispatchEvent(new Event('change'));
                }, 200);
            }
        }

        /**
         * Destroy widget instance
         */
        destroy(containerId) {
            if (this.elements[containerId]) {
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = '';
                }
                delete this.elements[containerId];
            }
        }

        /**
         * Get widget version
         */
        static getVersion() {
            return '2.0.0';
        }
    }

    // Static methods for quick access
    SaudiRegionsWidget.create = function(options) {
        return new SaudiRegionsWidget(options);
    };

    SaudiRegionsWidget.createQuick = function(containerId, options = {}) {
        const widget = new SaudiRegionsWidget(options);
        widget.on('ready', () => {
            widget.createCascadingSelects(containerId, options);
        });
        return widget;
    };

    return SaudiRegionsWidget;
}));

