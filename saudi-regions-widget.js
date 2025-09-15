/**
 * Saudi Regions Widget - أداة المناطق السعودية
 * مكتبة JavaScript لإضافة حقول اختيار المناطق والمدن السعودية
 * 
 * @version 1.0.0
 * @author Manus AI
 * @license MIT
 */

(function(global) {
    'use strict';

    // البيانات المدمجة
    const REGIONS_DATA = {
        "regions": [
            {
                "id": "RD",
                "name_ar": "منطقة الرياض",
                "name_en": "Riyadh",
                "cities": [
                    {"id": "RD001", "name_ar": "الرياض", "name_en": "Riyadh"},
                    {"id": "RD002", "name_ar": "الخرج", "name_en": "Al Kharj"},
                    {"id": "RD003", "name_ar": "الدوادمي", "name_en": "Ad Dawadimi"},
                    {"id": "RD004", "name_ar": "المجمعة", "name_en": "Al Majma'ah"},
                    {"id": "RD005", "name_ar": "القويعية", "name_en": "Al Quwayiyah"},
                    {"id": "RD006", "name_ar": "وادي الدواسر", "name_en": "Wadi ad-Dawasir"},
                    {"id": "RD007", "name_ar": "الأفلاج", "name_en": "Al Aflaj"},
                    {"id": "RD008", "name_ar": "الزلفي", "name_en": "Az Zulfi"},
                    {"id": "RD009", "name_ar": "شقراء", "name_en": "Shaqra"},
                    {"id": "RD010", "name_ar": "حوطة بني تميم", "name_en": "Hawtat Bani Tamim"}
                ]
            },
            {
                "id": "MQ",
                "name_ar": "منطقة مكة المكرمة",
                "name_en": "Makkah",
                "cities": [
                    {"id": "MQ001", "name_ar": "مكة المكرمة", "name_en": "Makkah"},
                    {"id": "MQ002", "name_ar": "جدة", "name_en": "Jeddah"},
                    {"id": "MQ003", "name_ar": "الطائف", "name_en": "Taif"},
                    {"id": "MQ004", "name_ar": "القنفذة", "name_en": "Al Qunfudhah"},
                    {"id": "MQ005", "name_ar": "الليث", "name_en": "Al Lith"},
                    {"id": "MQ006", "name_ar": "رابغ", "name_en": "Rabigh"},
                    {"id": "MQ007", "name_ar": "الجموم", "name_en": "Al Jumum"},
                    {"id": "MQ008", "name_ar": "خليص", "name_en": "Khulays"},
                    {"id": "MQ009", "name_ar": "الكامل", "name_en": "Al Kamil"},
                    {"id": "MQ010", "name_ar": "المويه", "name_en": "Al Muwayh"}
                ]
            },
            {
                "id": "MN",
                "name_ar": "منطقة المدينة المنورة",
                "name_en": "Madinah",
                "cities": [
                    {"id": "MN001", "name_ar": "المدينة المنورة", "name_en": "Madinah"},
                    {"id": "MN002", "name_ar": "ينبع", "name_en": "Yanbu"},
                    {"id": "MN003", "name_ar": "العلا", "name_en": "Al Ula"},
                    {"id": "MN004", "name_ar": "مهد الذهب", "name_en": "Mahd adh Dhahab"},
                    {"id": "MN005", "name_ar": "الحناكية", "name_en": "Al Hanakiyah"},
                    {"id": "MN006", "name_ar": "بدر", "name_en": "Badr"},
                    {"id": "MN007", "name_ar": "خيبر", "name_en": "Khaybar"},
                    {"id": "MN008", "name_ar": "العيص", "name_en": "Al Ais"},
                    {"id": "MN009", "name_ar": "وادي الفرع", "name_en": "Wadi al-Fara"},
                    {"id": "MN010", "name_ar": "المهد", "name_en": "Al Mahd"}
                ]
            },
            {
                "id": "QA",
                "name_ar": "منطقة القصيم",
                "name_en": "Qassim",
                "cities": [
                    {"id": "QA001", "name_ar": "بريدة", "name_en": "Buraydah"},
                    {"id": "QA002", "name_ar": "عنيزة", "name_en": "Unayzah"},
                    {"id": "QA003", "name_ar": "الرس", "name_en": "Ar Rass"},
                    {"id": "QA004", "name_ar": "المذنب", "name_en": "Al Mithnab"},
                    {"id": "QA005", "name_ar": "البكيرية", "name_en": "Al Bukairiyah"},
                    {"id": "QA006", "name_ar": "البدائع", "name_en": "Al Badai"},
                    {"id": "QA007", "name_ar": "الأسياح", "name_en": "Al Asyah"},
                    {"id": "QA008", "name_ar": "النبهانية", "name_en": "An Nabhaniyah"},
                    {"id": "QA009", "name_ar": "عيون الجواء", "name_en": "Uyun al Jiwa"},
                    {"id": "QA010", "name_ar": "ضرية", "name_en": "Dhariyah"}
                ]
            },
            {
                "id": "SQ",
                "name_ar": "المنطقة الشرقية",
                "name_en": "Eastern Province",
                "cities": [
                    {"id": "SQ001", "name_ar": "الدمام", "name_en": "Dammam"},
                    {"id": "SQ002", "name_ar": "الخبر", "name_en": "Khobar"},
                    {"id": "SQ003", "name_ar": "الظهران", "name_en": "Dhahran"},
                    {"id": "SQ004", "name_ar": "الأحساء", "name_en": "Al Ahsa"},
                    {"id": "SQ005", "name_ar": "الجبيل", "name_en": "Jubail"},
                    {"id": "SQ006", "name_ar": "القطيف", "name_en": "Qatif"},
                    {"id": "SQ007", "name_ar": "حفر الباطن", "name_en": "Hafar Al-Batin"},
                    {"id": "SQ008", "name_ar": "رأس تنورة", "name_en": "Ras Tanura"},
                    {"id": "SQ009", "name_ar": "بقيق", "name_en": "Buqayq"},
                    {"id": "SQ010", "name_ar": "النعيرية", "name_en": "An Nuayriyah"}
                ]
            },
            {
                "id": "AS",
                "name_ar": "منطقة عسير",
                "name_en": "Asir",
                "cities": [
                    {"id": "AS001", "name_ar": "أبها", "name_en": "Abha"},
                    {"id": "AS002", "name_ar": "خميس مشيط", "name_en": "Khamis Mushait"},
                    {"id": "AS003", "name_ar": "بيشة", "name_en": "Bisha"},
                    {"id": "AS004", "name_ar": "النماص", "name_en": "An Namas"},
                    {"id": "AS005", "name_ar": "محايل عسير", "name_en": "Muhayil"},
                    {"id": "AS006", "name_ar": "سراة عبيدة", "name_en": "Sarat Abidah"},
                    {"id": "AS007", "name_ar": "أحد رفيدة", "name_en": "Ahad Rufaidah"},
                    {"id": "AS008", "name_ar": "رجال ألمع", "name_en": "Rijal Almaa"},
                    {"id": "AS009", "name_ar": "تنومة", "name_en": "Tanomah"},
                    {"id": "AS010", "name_ar": "ظهران الجنوب", "name_en": "Dhahran Al Janub"}
                ]
            },
            {
                "id": "TB",
                "name_ar": "منطقة تبوك",
                "name_en": "Tabuk",
                "cities": [
                    {"id": "TB001", "name_ar": "تبوك", "name_en": "Tabuk"},
                    {"id": "TB002", "name_ar": "الوجه", "name_en": "Al Wajh"},
                    {"id": "TB003", "name_ar": "ضباء", "name_en": "Duba"},
                    {"id": "TB004", "name_ar": "تيماء", "name_en": "Tayma"},
                    {"id": "TB005", "name_ar": "أملج", "name_en": "Umluj"},
                    {"id": "TB006", "name_ar": "حقل", "name_en": "Haql"},
                    {"id": "TB007", "name_ar": "البدع", "name_en": "Al Bid"},
                    {"id": "TB008", "name_ar": "شرما", "name_en": "Sharma"},
                    {"id": "TB009", "name_ar": "نيوم", "name_en": "NEOM"},
                    {"id": "TB010", "name_ar": "علقان", "name_en": "Alaqan"}
                ]
            },
            {
                "id": "HA",
                "name_ar": "منطقة حائل",
                "name_en": "Hail",
                "cities": [
                    {"id": "HA001", "name_ar": "حائل", "name_en": "Hail"},
                    {"id": "HA002", "name_ar": "بقعاء", "name_en": "Baq'aa"},
                    {"id": "HA003", "name_ar": "الغزالة", "name_en": "Al Ghazalah"},
                    {"id": "HA004", "name_ar": "الشنان", "name_en": "Ash Shinan"},
                    {"id": "HA005", "name_ar": "السليمي", "name_en": "As Sulaymi"},
                    {"id": "HA006", "name_ar": "الحائط", "name_en": "Al Hait"},
                    {"id": "HA007", "name_ar": "الشملي", "name_en": "Ash Shamli"},
                    {"id": "HA008", "name_ar": "موقق", "name_en": "Mawqaq"},
                    {"id": "HA009", "name_ar": "الكهفة", "name_en": "Al Kahfah"},
                    {"id": "HA010", "name_ar": "سميراء", "name_en": "Samira"}
                ]
            },
            {
                "id": "SH",
                "name_ar": "منطقة الحدود الشمالية",
                "name_en": "Northern Borders",
                "cities": [
                    {"id": "SH001", "name_ar": "عرعر", "name_en": "Arar"},
                    {"id": "SH002", "name_ar": "رفحاء", "name_en": "Rafha"},
                    {"id": "SH003", "name_ar": "طريف", "name_en": "Turaif"},
                    {"id": "SH004", "name_ar": "العويقيلة", "name_en": "Al Uwayqilah"},
                    {"id": "SH005", "name_ar": "الشويحطية", "name_en": "Ash Shuwayhitiyah"},
                    {"id": "SH006", "name_ar": "جديدة عرعر", "name_en": "Jadidah Arar"},
                    {"id": "SH007", "name_ar": "لينة", "name_en": "Linah"},
                    {"id": "SH008", "name_ar": "صوير", "name_en": "Suwayr"},
                    {"id": "SH009", "name_ar": "الحديثة", "name_en": "Al Hadithah"},
                    {"id": "SH010", "name_ar": "الخالدية", "name_en": "Al Khalidiyah"}
                ]
            },
            {
                "id": "GA",
                "name_ar": "منطقة جازان",
                "name_en": "Jazan",
                "cities": [
                    {"id": "GA001", "name_ar": "جازان", "name_en": "Jazan"},
                    {"id": "GA002", "name_ar": "صبيا", "name_en": "Sabya"},
                    {"id": "GA003", "name_ar": "أبو عريش", "name_en": "Abu Arish"},
                    {"id": "GA004", "name_ar": "صامطة", "name_en": "Samtah"},
                    {"id": "GA005", "name_ar": "الدرب", "name_en": "Ad Darb"},
                    {"id": "GA006", "name_ar": "بيش", "name_en": "Baysh"},
                    {"id": "GA007", "name_ar": "فرسان", "name_en": "Farasan"},
                    {"id": "GA008", "name_ar": "العيدابي", "name_en": "Al Aydabi"},
                    {"id": "GA009", "name_ar": "الحرث", "name_en": "Al Harth"},
                    {"id": "GA010", "name_ar": "الريث", "name_en": "Ar Rayth"}
                ]
            },
            {
                "id": "NG",
                "name_ar": "منطقة نجران",
                "name_en": "Najran",
                "cities": [
                    {"id": "NG001", "name_ar": "نجران", "name_en": "Najran"},
                    {"id": "NG002", "name_ar": "شرورة", "name_en": "Sharurah"},
                    {"id": "NG003", "name_ar": "حبونا", "name_en": "Habuna"},
                    {"id": "NG004", "name_ar": "ثار", "name_en": "Thar"},
                    {"id": "NG005", "name_ar": "خباش", "name_en": "Khabbash"},
                    {"id": "NG006", "name_ar": "الخرخير", "name_en": "Al Kharkhir"},
                    {"id": "NG007", "name_ar": "يدمة", "name_en": "Yadamah"},
                    {"id": "NG008", "name_ar": "الوديعة", "name_en": "Al Wadiah"},
                    {"id": "NG009", "name_ar": "بدر الجنوب", "name_en": "Badr al Janub"},
                    {"id": "NG010", "name_ar": "الخرج", "name_en": "Al Kharj"}
                ]
            },
            {
                "id": "BA",
                "name_ar": "منطقة الباحة",
                "name_en": "Bahah",
                "cities": [
                    {"id": "BA001", "name_ar": "الباحة", "name_en": "Al Bahah"},
                    {"id": "BA002", "name_ar": "بلجرشي", "name_en": "Baljurashi"},
                    {"id": "BA003", "name_ar": "المندق", "name_en": "Al Mandaq"},
                    {"id": "BA004", "name_ar": "المخواة", "name_en": "Al Mikhwah"},
                    {"id": "BA005", "name_ar": "قلوة", "name_en": "Qilwah"},
                    {"id": "BA006", "name_ar": "العقيق", "name_en": "Al Aqiq"},
                    {"id": "BA007", "name_ar": "الحجرة", "name_en": "Al Hajrah"},
                    {"id": "BA008", "name_ar": "غامد الزناد", "name_en": "Ghamid az Zinad"},
                    {"id": "BA009", "name_ar": "القرى", "name_en": "Al Qura"},
                    {"id": "BA010", "name_ar": "بني حسن", "name_en": "Bani Hassan"}
                ]
            },
            {
                "id": "GO",
                "name_ar": "منطقة الجوف",
                "name_en": "Jawf",
                "cities": [
                    {"id": "GO001", "name_ar": "سكاكا", "name_en": "Sakakah"},
                    {"id": "GO002", "name_ar": "القريات", "name_en": "Al Qurayyat"},
                    {"id": "GO003", "name_ar": "دومة الجندل", "name_en": "Dumat al Jandal"},
                    {"id": "GO004", "name_ar": "طبرجل", "name_en": "Tabarjal"},
                    {"id": "GO005", "name_ar": "الطوير", "name_en": "At Tawir"},
                    {"id": "GO006", "name_ar": "الشويحطية", "name_en": "Ash Shuwayhitiyah"},
                    {"id": "GO007", "name_ar": "الحديثة", "name_en": "Al Hadithah"},
                    {"id": "GO008", "name_ar": "منوة", "name_en": "Manwah"},
                    {"id": "GO009", "name_ar": "الصوير", "name_en": "As Suwayr"},
                    {"id": "GO010", "name_ar": "الكاف", "name_en": "Al Kaf"}
                ]
            }
        ]
    };

    // الأنماط الافتراضية
    const DEFAULT_STYLES = `
        .saudi-regions-widget {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            direction: rtl;
            text-align: right;
        }
        
        .saudi-regions-widget select {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            background-color: white;
            direction: rtl;
            text-align: right;
        }
        
        .saudi-regions-widget select:focus {
            outline: none;
            border-color: #007cba;
            box-shadow: 0 0 0 2px rgba(0, 124, 186, 0.2);
        }
        
        .saudi-regions-widget label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }
        
        .saudi-regions-widget .field-group {
            margin-bottom: 15px;
        }
        
        .saudi-regions-widget select:disabled {
            background-color: #f5f5f5;
            color: #999;
            cursor: not-allowed;
        }
    `;

    // الكلاس الرئيسي
    class SaudiRegionsWidget {
        constructor(options = {}) {
            this.options = {
                language: 'ar', // ar أو en
                regionLabel: 'المنطقة',
                cityLabel: 'المدينة',
                regionPlaceholder: 'اختر المنطقة',
                cityPlaceholder: 'اختر المدينة',
                showLabels: true,
                customStyles: '',
                onChange: null,
                ...options
            };

            this.regionSelect = null;
            this.citySelect = null;
            this.container = null;

            this.init();
        }

        init() {
            this.injectStyles();
        }

        injectStyles() {
            if (!document.getElementById('saudi-regions-styles')) {
                const style = document.createElement('style');
                style.id = 'saudi-regions-styles';
                style.textContent = DEFAULT_STYLES + this.options.customStyles;
                document.head.appendChild(style);
            }
        }

        render(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) {
                console.error('Container not found:', containerId);
                return;
            }

            this.container.className = 'saudi-regions-widget';
            this.container.innerHTML = this.getHTML();
            this.bindEvents();
        }

        getHTML() {
            const nameKey = this.options.language === 'ar' ? 'name_ar' : 'name_en';
            
            return `
                <div class="field-group">
                    ${this.options.showLabels ? `<label for="region-select">${this.options.regionLabel}</label>` : ''}
                    <select id="region-select">
                        <option value="">${this.options.regionPlaceholder}</option>
                        ${REGIONS_DATA.regions.map(region => 
                            `<option value="${region.id}">${region[nameKey]}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="field-group">
                    ${this.options.showLabels ? `<label for="city-select">${this.options.cityLabel}</label>` : ''}
                    <select id="city-select" disabled>
                        <option value="">${this.options.cityPlaceholder}</option>
                    </select>
                </div>
            `;
        }

        bindEvents() {
            this.regionSelect = this.container.querySelector('#region-select');
            this.citySelect = this.container.querySelector('#city-select');

            this.regionSelect.addEventListener('change', (e) => {
                this.updateCities(e.target.value);
                this.triggerChange();
            });

            this.citySelect.addEventListener('change', () => {
                this.triggerChange();
            });
        }

        updateCities(regionId) {
            const nameKey = this.options.language === 'ar' ? 'name_ar' : 'name_en';
            
            // مسح المدن الحالية
            this.citySelect.innerHTML = `<option value="">${this.options.cityPlaceholder}</option>`;
            
            if (regionId) {
                const region = REGIONS_DATA.regions.find(r => r.id === regionId);
                if (region && region.cities) {
                    region.cities.forEach(city => {
                        const option = document.createElement('option');
                        option.value = city.id;
                        option.textContent = city[nameKey];
                        this.citySelect.appendChild(option);
                    });
                    this.citySelect.disabled = false;
                } else {
                    this.citySelect.disabled = true;
                }
            } else {
                this.citySelect.disabled = true;
            }
        }

        triggerChange() {
            if (this.options.onChange && typeof this.options.onChange === 'function') {
                const data = this.getValue();
                this.options.onChange(data);
            }
        }

        getValue() {
            const regionId = this.regionSelect ? this.regionSelect.value : '';
            const cityId = this.citySelect ? this.citySelect.value : '';
            
            const nameKey = this.options.language === 'ar' ? 'name_ar' : 'name_en';
            
            let regionData = null;
            let cityData = null;

            if (regionId) {
                const region = REGIONS_DATA.regions.find(r => r.id === regionId);
                if (region) {
                    regionData = {
                        id: region.id,
                        name: region[nameKey],
                        name_ar: region.name_ar,
                        name_en: region.name_en
                    };

                    if (cityId) {
                        const city = region.cities.find(c => c.id === cityId);
                        if (city) {
                            cityData = {
                                id: city.id,
                                name: city[nameKey],
                                name_ar: city.name_ar,
                                name_en: city.name_en
                            };
                        }
                    }
                }
            }

            return {
                region: regionData,
                city: cityData
            };
        }

        setValue(regionId, cityId = null) {
            if (this.regionSelect) {
                this.regionSelect.value = regionId || '';
                this.updateCities(regionId);
                
                if (cityId && this.citySelect) {
                    this.citySelect.value = cityId;
                }
            }
        }

        reset() {
            if (this.regionSelect) {
                this.regionSelect.value = '';
            }
            if (this.citySelect) {
                this.citySelect.value = '';
                this.citySelect.disabled = true;
            }
        }

        // دوال مساعدة للبحث
        searchRegions(query) {
            const nameKey = this.options.language === 'ar' ? 'name_ar' : 'name_en';
            return REGIONS_DATA.regions.filter(region => 
                region[nameKey].toLowerCase().includes(query.toLowerCase())
            );
        }

        searchCities(query, regionId = null) {
            const nameKey = this.options.language === 'ar' ? 'name_ar' : 'name_en';
            let cities = [];
            
            const regionsToSearch = regionId 
                ? REGIONS_DATA.regions.filter(r => r.id === regionId)
                : REGIONS_DATA.regions;

            regionsToSearch.forEach(region => {
                if (region.cities) {
                    cities = cities.concat(
                        region.cities
                            .filter(city => city[nameKey].toLowerCase().includes(query.toLowerCase()))
                            .map(city => ({...city, regionId: region.id, regionName: region[nameKey]}))
                    );
                }
            });

            return cities;
        }

        getAllRegions() {
            return REGIONS_DATA.regions;
        }

        getRegionById(id) {
            return REGIONS_DATA.regions.find(r => r.id === id);
        }

        getCitiesByRegion(regionId) {
            const region = this.getRegionById(regionId);
            return region ? region.cities : [];
        }
    }

    // تصدير للاستخدام العالمي
    global.SaudiRegionsWidget = SaudiRegionsWidget;

    // دالة مساعدة للإنشاء السريع
    global.createSaudiRegionsWidget = function(containerId, options = {}) {
        const widget = new SaudiRegionsWidget(options);
        widget.render(containerId);
        return widget;
    };

})(typeof window !== 'undefined' ? window : this);

