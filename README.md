# أداة المناطق السعودية - Saudi Regions Widget

[![npm version](https://badge.fury.io/js/saudi-regions-widget.svg)](https://badge.fury.io/js/saudi-regions-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

مكتبة JavaScript سهلة الاستخدام لإضافة حقول اختيار المناطق والمدن السعودية إلى موقعك.

## 🌟 المميزات

- ✅ **سهولة الاستخدام**: إضافة سطر واحد من الكود
- ✅ **دعم اللغتين**: العربية والإنجليزية
- ✅ **متجاوب**: يعمل على جميع الأجهزة
- ✅ **قابل للتخصيص**: أنماط وألوان قابلة للتعديل
- ✅ **بيانات شاملة**: 13 منطقة و 130+ مدينة
- ✅ **خفيف الوزن**: أقل من 50KB
- ✅ **بدون تبعيات**: لا يحتاج مكتبات خارجية

## 🚀 التثبيت السريع

### عبر CDN (الطريقة الأسرع)

```html
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/saudi-regions-widget@main/saudi-regions-widget.js"></script>
```

### عبر npm

```bash
npm install saudi-regions-widget
```

## 📖 الاستخدام

### الاستخدام الأساسي

```html
<!DOCTYPE html>
<html>
<head>
    <title>مثال أداة المناطق السعودية</title>
</head>
<body>
    <!-- حاوي الأداة -->
    <div id="regions-container"></div>

    <!-- تحميل المكتبة -->
    <script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/saudi-regions-widget@main/saudi-regions-widget.js"></script>
    
    <script>
        // إنشاء الأداة
        const widget = createSaudiRegionsWidget('regions-container', {
            onChange: function(data) {
                console.log('تم الاختيار:', data);
                
                if (data.region) {
                    console.log('المنطقة:', data.region.name);
                }
                
                if (data.city) {
                    console.log('المدينة:', data.city.name);
                }
            }
        });
    </script>
</body>
</html>
```

### خيارات متقدمة

```javascript
const widget = new SaudiRegionsWidget({
    language: 'ar',                     // ar أو en
    regionLabel: 'المنطقة',              // تسمية حقل المنطقة
    cityLabel: 'المدينة',               // تسمية حقل المدينة
    regionPlaceholder: 'اختر المنطقة',   // نص المنطقة الافتراضي
    cityPlaceholder: 'اختر المدينة',     // نص المدينة الافتراضي
    showLabels: true,                   // إظهار التسميات
    customStyles: `
        .saudi-regions-widget select {
            border: 2px solid #007cba;
            border-radius: 8px;
            padding: 12px;
        }
    `,
    onChange: function(data) {
        // معالجة التغيير
        console.log(data);
    }
});

// عرض الأداة
widget.render('container-id');
```

## 🔧 API Reference

### الكلاس الرئيسي

#### `new SaudiRegionsWidget(options)`

إنشاء instance جديد من الأداة.

**المعاملات:**
- `options` (Object): خيارات التكوين

**خيارات التكوين:**
- `language` (String): اللغة ('ar' أو 'en') - افتراضي: 'ar'
- `regionLabel` (String): تسمية حقل المنطقة - افتراضي: 'المنطقة'
- `cityLabel` (String): تسمية حقل المدينة - افتراضي: 'المدينة'
- `regionPlaceholder` (String): نص المنطقة الافتراضي - افتراضي: 'اختر المنطقة'
- `cityPlaceholder` (String): نص المدينة الافتراضي - افتراضي: 'اختر المدينة'
- `showLabels` (Boolean): إظهار التسميات - افتراضي: true
- `customStyles` (String): أنماط CSS مخصصة
- `onChange` (Function): دالة معالجة التغيير

### الدوال

#### `render(containerId)`
عرض الأداة في العنصر المحدد.

```javascript
widget.render('my-container');
```

#### `getValue()`
الحصول على القيم المختارة حالياً.

```javascript
const data = widget.getValue();
console.log(data.region); // بيانات المنطقة
console.log(data.city);   // بيانات المدينة
```

#### `setValue(regionId, cityId)`
تعيين قيم محددة.

```javascript
widget.setValue('RD', 'RD001'); // الرياض - الرياض
```

#### `reset()`
إعادة تعيين الحقول.

```javascript
widget.reset();
```

#### `searchRegions(query)`
البحث في المناطق.

```javascript
const results = widget.searchRegions('الرياض');
```

#### `searchCities(query, regionId)`
البحث في المدن.

```javascript
const results = widget.searchCities('جدة');
// أو البحث في منطقة محددة
const results = widget.searchCities('جدة', 'MQ');
```

#### `getAllRegions()`
الحصول على جميع المناطق.

```javascript
const regions = widget.getAllRegions();
```

#### `getRegionById(id)`
الحصول على منطقة بالمعرف.

```javascript
const region = widget.getRegionById('RD');
```

#### `getCitiesByRegion(regionId)`
الحصول على مدن منطقة معينة.

```javascript
const cities = widget.getCitiesByRegion('MQ');
```

### الدالة المساعدة

#### `createSaudiRegionsWidget(containerId, options)`
إنشاء وعرض الأداة في خطوة واحدة.

```javascript
const widget = createSaudiRegionsWidget('container', {
    language: 'en',
    onChange: function(data) {
        console.log(data);
    }
});
```

## 🎨 التخصيص

### الأنماط الافتراضية

```css
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
}

.saudi-regions-widget select:focus {
    outline: none;
    border-color: #007cba;
    box-shadow: 0 0 0 2px rgba(0, 124, 186, 0.2);
}
```

### تخصيص الأنماط

```javascript
const widget = new SaudiRegionsWidget({
    customStyles: `
        .saudi-regions-widget {
            font-family: 'Cairo', sans-serif;
        }
        
        .saudi-regions-widget select {
            border: 2px solid #28a745;
            border-radius: 10px;
            padding: 15px;
            font-size: 16px;
            background: linear-gradient(45deg, #f8f9fa, #e9ecef);
        }
        
        .saudi-regions-widget select:focus {
            border-color: #20c997;
            box-shadow: 0 0 0 3px rgba(32, 201, 151, 0.25);
        }
        
        .saudi-regions-widget label {
            color: #495057;
            font-weight: 600;
            margin-bottom: 8px;
        }
    `
});
```

## 📊 البيانات المتضمنة

### المناطق الإدارية (13 منطقة)

- منطقة الرياض (RD)
- منطقة مكة المكرمة (MQ)
- منطقة المدينة المنورة (MN)
- منطقة القصيم (QA)
- المنطقة الشرقية (SQ)
- منطقة عسير (AS)
- منطقة تبوك (TB)
- منطقة حائل (HA)
- منطقة الحدود الشمالية (SH)
- منطقة جازان (GA)
- منطقة نجران (NG)
- منطقة الباحة (BA)
- منطقة الجوف (GO)

### المدن الرئيسية

كل منطقة تحتوي على 10+ مدن رئيسية مع الأسماء باللغتين العربية والإنجليزية.

## 🌐 أمثلة مباشرة

- [المثال الأساسي](https://codepen.io/example/basic)
- [مثال متقدم](https://codepen.io/example/advanced)
- [مثال التخصيص](https://codepen.io/example/custom)

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:

1. عمل Fork للمشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. إجراء التغييرات وإضافة الاختبارات
4. Commit التغييرات (`git commit -m 'Add amazing feature'`)
5. Push إلى Branch (`git push origin feature/amazing-feature`)
6. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🙏 شكر وتقدير

- البيانات الأصلية من [مستودع homaily](https://github.com/homaily/Saudi-Arabia-Regions-Cities-and-Districts)
- المصدر الرسمي: [maps.address.gov.sa](https://maps.address.gov.sa/)

## 📞 الدعم

للاستفسارات والدعم الفني:
- فتح [Issue](https://github.com/YOUR_USERNAME/saudi-regions-widget/issues)
- البريد الإلكتروني: support@example.com

---

**تم تطوير هذه المكتبة بواسطة Manus AI**

