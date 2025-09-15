# أداة المناطق السعودية - الإصدار الشامل 🇸🇦

مكتبة JavaScript شاملة تحتوي على **جميع المناطق والمدن والعزل والأحياء** في المملكة العربية السعودية.

## ✨ المميزات الجديدة

- **بيانات شاملة**: أكثر من 4,500 مدينة وقرية وعزلة
- **13 منطقة إدارية**: جميع المناطق الإدارية في المملكة
- **دعم اللغتين**: العربية والإنجليزية لجميع البيانات
- **سهولة الاستخدام**: إضافة سطر واحد من الكود
- **خفيف الوزن**: 309KB مضغوط
- **بدون تبعيات**: لا يحتاج مكتبات خارجية

## 🚀 التثبيت والاستخدام

### عبر CDN (الطريقة الأسرع)

```html
<script src="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/saudi-regions-widget-full.js"></script>
```

### عبر npm

```bash
npm install saudi-regions-widget
```

## 📖 الاستخدام الأساسي

### HTML بسيط

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>أداة المناطق السعودية</title>
</head>
<body>
    <div id="regions-container"></div>
    
    <script src="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/saudi-regions-widget-full.js"></script>
    <script>
        createSaudiRegionsWidget('regions-container', {
            onChange: function(data) {
                console.log('تم الاختيار:', data);
            }
        });
    </script>
</body>
</html>
```

### JavaScript متقدم

```javascript
const widget = new SaudiRegionsWidget({
    language: 'ar',                     // ar أو en
    regionLabel: 'المنطقة',              
    cityLabel: 'المدينة',               
    regionPlaceholder: 'اختر المنطقة',   
    cityPlaceholder: 'اختر المدينة',     
    showLabels: true,                   
    customStyles: `
        .saudi-regions-widget select {
            border: 2px solid #007cba;
            border-radius: 8px;
        }
    `,
    onChange: function(data) {
        if (data.region) {
            console.log('المنطقة:', data.region.name_ar);
        }
        if (data.city) {
            console.log('المدينة:', data.city.name_ar);
        }
    }
});

widget.render('container-id');
```

## 🔧 API المتاح

### دوال التحكم الأساسية

```javascript
// عرض الأداة
widget.render('container-id');

// الحصول على القيم المختارة
const values = widget.getValue();
console.log(values.region, values.city);

// تعيين قيم محددة
widget.setValue('RD', 'RD003'); // الرياض - الرياض

// إعادة تعيين الحقول
widget.reset();

// تدمير الأداة
widget.destroy();
```

### دوال البحث والاستعلام

```javascript
// البحث في المناطق
const regions = widget.searchRegions('الرياض');

// البحث في المدن
const cities = widget.searchCities('جدة');

// البحث في مدن منطقة معينة
const riyadhCities = widget.searchCities('الرياض', 'RD');

// الحصول على جميع المناطق
const allRegions = widget.getAllRegions();

// الحصول على مدن منطقة معينة
const regionCities = widget.getCitiesByRegion('RD');

// الحصول على منطقة بالمعرف
const region = widget.getRegionById('RD');

// الحصول على مدينة بالمعرف
const city = widget.getCityById('RD003');
```

## 📊 البيانات المتضمنة

### 13 منطقة إدارية

| الرمز | الاسم العربي | الاسم الإنجليزي | عدد المدن |
|------|-------------|----------------|----------|
| RD | منطقة الرياض | Riyadh | 400+ |
| MQ | منطقة مكة المكرمة | Makkah | 350+ |
| SQ | المنطقة الشرقية | Eastern Province | 300+ |
| AS | منطقة عسير | Asir | 250+ |
| MN | منطقة المدينة المنورة | Madinah | 200+ |
| QA | منطقة القصيم | Qassim | 180+ |
| TB | منطقة تبوك | Tabuk | 150+ |
| HA | منطقة حائل | Hail | 120+ |
| GA | منطقة جازان | Jazan | 100+ |
| NG | منطقة نجران | Najran | 80+ |
| BA | منطقة الباحة | Bahah | 70+ |
| SH | منطقة الحدود الشمالية | Northern Borders | 50+ |
| GO | منطقة الجوف | Jawf | 40+ |

### أمثلة على المدن الشاملة

**منطقة الرياض (400+ مدينة):**
- الرياض، المجمعة، الزلفي، الغاط، حرمة، رماح، الدوادمي، الأفلاج، وادي الدواسر، القويعية، حوطة بني تميم، الحريق، المزاحمية، ضرما، الخرج، السليل، الدلم، الحوطة، الرين، اليمامة، الحلوة، الفرعة، نعجان، الهياثم، الرفايع، البديع، الجمش، الحزم، الروضة، العيينة، الدرعية، إرقة، الجبيلة، الجنادرية، الحاير، الحريملاء، الحصاة، الحلة، الحمام، الحناة، الحوية، الحيسية، الخالدية، الخبراء، الخرج، الخضراء، الخفس، الخماسين، الخنقة، الخوار، الدبيلة، الدرعية، الدغمية، الدلم، الدوادمي، الذيبية، الرحمانية، الرشاوية، الرضيمة، الرفايع، الرقعي، الرمحية، الرميلة، الرويضة، الزبيرة، الزلفي، الزهرة، الزيمة، السدير، السر، السليل، السمحة، السهباء، الشعراء، الشقة، الشماسية، الشوكي، الصبيخة، الصفا، الصفراء، الضرس، الطرفية، الطلحة، الطويلة، العارض، العاصمة، العتك، العجلان، العدوة، العرمة، العزيزية، العقدة، العقلة، العليا، العمارية، العوامية، العيساوية، الغاط، الغريف، الغزلانية، الفاخرية، الفرعة، الفروثي، الفوارة، القاعية، القدية، القرائن، القرين، القصب، القويع، الكحلة، اللصافة، المبرز، المجمعة، المحمل، المخروق، المدرج، المذنب، المرقب، المزاحمية، المسيجيد، المشاعلة، المصانع، المطار، المعيقلية، المقيرن، المليبيد، المنصورة، الموقر، النايفية، النبهانية، النخيل، النزهة، النعام، النقيرة، الهجرة، الهدار، الهياثم، الواسطة، الوسيطاء، اليحيى، اليمامة... والمئات غيرها

**منطقة مكة المكرمة (350+ مدينة):**
- مكة المكرمة، جدة، الطائف، المدينة المنورة، ينبع، رابغ، خليص، الجموم، بحرة، الكامل، المويه، تربة، الخرمة، رنية، العرضيات، الموية، ميسان، أضم، الشفا، الهدا، بني سعد، الحوية، السيل الكبير، السيل الصغير، وادي فاطمة، العبدلية، الحرمين، القنفذة، الليث... والمئات غيرها

## ⚙️ خيارات التخصيص

```javascript
const options = {
    language: 'ar',                    // ar أو en
    regionLabel: 'المنطقة',             // تسمية حقل المنطقة
    cityLabel: 'المدينة',              // تسمية حقل المدينة
    regionPlaceholder: 'اختر المنطقة', // نص حقل المنطقة
    cityPlaceholder: 'اختر المدينة',   // نص حقل المدينة
    showLabels: true,                  // إظهار التسميات
    customStyles: '',                  // أنماط CSS مخصصة
    onChange: function(data) {         // دالة التغيير
        console.log(data);
    }
};
```

## 🌍 دعم اللغات

### العربية (افتراضي)
```javascript
const widget = createSaudiRegionsWidget('container', {
    language: 'ar',
    regionLabel: 'المنطقة',
    cityLabel: 'المدينة'
});
```

### الإنجليزية
```javascript
const widget = createSaudiRegionsWidget('container', {
    language: 'en',
    regionLabel: 'Region',
    cityLabel: 'City'
});
```

## 🎨 التخصيص المرئي

```css
/* تخصيص الألوان */
.saudi-regions-widget select {
    border: 2px solid #28a745;
    border-radius: 10px;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.saudi-regions-widget select:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

/* تخصيص التسميات */
.saudi-regions-widget label {
    color: #495057;
    font-weight: bold;
    font-size: 16px;
}
```

## 📱 التوافق

- ✅ جميع المتصفحات الحديثة
- ✅ Internet Explorer 11+
- ✅ الهواتف المحمولة والأجهزة اللوحية
- ✅ React, Vue, Angular
- ✅ WordPress, Drupal

## 🔍 أمثلة متقدمة

### ربط مع نموذج HTML

```html
<form id="address-form">
    <div id="regions-widget"></div>
    
    <input type="hidden" id="region_id" name="region_id">
    <input type="hidden" id="city_id" name="city_id">
    <input type="hidden" id="region_name" name="region_name">
    <input type="hidden" id="city_name" name="city_name">
    
    <button type="submit">إرسال</button>
</form>

<script>
createSaudiRegionsWidget('regions-widget', {
    onChange: function(data) {
        document.getElementById('region_id').value = data.region ? data.region.id : '';
        document.getElementById('city_id').value = data.city ? data.city.id : '';
        document.getElementById('region_name').value = data.region ? data.region.name_ar : '';
        document.getElementById('city_name').value = data.city ? data.city.name_ar : '';
    }
});
</script>
```

### البحث التفاعلي

```javascript
// إنشاء حقل بحث
const searchInput = document.createElement('input');
searchInput.placeholder = 'ابحث عن مدينة...';
searchInput.addEventListener('input', function(e) {
    const query = e.target.value;
    const results = widget.searchCities(query);
    
    console.log(`وُجد ${results.length} نتيجة لـ "${query}"`);
    results.forEach(city => {
        console.log(`${city.name_ar} (${city.name_en})`);
    });
});
```

### تحديد الموقع التلقائي

```javascript
// تحديد المنطقة والمدينة بناءً على IP أو GPS
function autoDetectLocation() {
    // مثال: إذا كان المستخدم في الرياض
    widget.setValue('RD', 'RD003');
}

// استدعاء التحديد التلقائي عند تحميل الصفحة
window.addEventListener('load', autoDetectLocation);
```

## 🚀 الأداء والتحسين

- **حجم مضغوط**: 309KB (غير مضغوط)، ~85KB (مضغوط gzip)
- **تحميل سريع**: عبر CDN عالمي
- **ذاكرة منخفضة**: استهلاك ذاكرة محدود
- **متوافق**: يعمل مع جميع أطر العمل

## 🛠️ التطوير والمساهمة

```bash
# استنساخ المستودع
git clone https://github.com/YounisDany/saudi-regions-widget.git

# تثبيت التبعيات
npm install

# تشغيل الاختبارات
npm test

# بناء الإنتاج
npm run build
```

## 📄 الترخيص

MIT License - يمكنك استخدام هذه المكتبة في أي مشروع تجاري أو شخصي.

## 🤝 الدعم والمساعدة

- **GitHub Issues**: [إبلاغ عن مشكلة](https://github.com/YounisDany/saudi-regions-widget/issues)
- **التوثيق**: [الدليل الكامل](https://github.com/YounisDany/saudi-regions-widget#readme)
- **أمثلة**: [صفحة التجريب](https://github.com/YounisDany/saudi-regions-widget/blob/main/demo.html)

## 🏆 الميزات القادمة

- [ ] دعم الأحياء والمناطق الفرعية
- [ ] إضافة الرموز البريدية
- [ ] دعم الإحداثيات الجغرافية
- [ ] واجهة برمجة تطبيقات REST
- [ ] تطبيق جوال

---

**صُنع بـ ❤️ في المملكة العربية السعودية**

إذا أعجبتك هذه المكتبة، لا تنس إعطاؤها ⭐ على GitHub!

