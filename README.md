# Saudi Regions Widget Enhanced 🇸🇦

مكتبة JavaScript محسنة وشاملة للمناطق والمدن والأحياء السعودية مع دعم CDN وسهولة الاستخدام.

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/YounisDany/saudi-regions-widget)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-orange.svg)](https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/)

## ✨ المميزات الجديدة

- 📊 **بيانات شاملة**: جميع المناطق الـ13 و4500+ مدينة و3700+ حي
- 🚀 **دعم CDN**: متاح عبر jsDelivr و unpkg
- 🎯 **سهولة الاستخدام**: إعداد بسطر واحد
- 🔍 **البحث والتصفية**: إمكانيات بحث متقدمة
- 🌐 **دعم RTL**: مصمم للغة العربية
- ⚡ **أداء محسن**: ملفات مضغوطة وسريعة التحميل
- 🎨 **تصميم حديث**: واجهة مستخدم جميلة ومتجاوبة
- 📱 **متجاوب**: يعمل على جميع الأجهزة

## 🚀 التثبيت السريع

### عبر CDN (الطريقة الموصى بها)

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.min.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.min.js"></script>

<!-- أو استخدم الملف المدمج (JS + CSS) -->
<script src="https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/saudi-regions-widget.bundle.min.js"></script>
```

### عبر NPM

```bash
npm install saudi-regions-widget
```

### تحميل مباشر

قم بتحميل الملفات من [صفحة الإصدارات](https://github.com/YounisDany/saudi-regions-widget/releases)

## 📖 الاستخدام

### الإعداد السريع

```html
<div id="saudi-widget"></div>

<script>
// إنشاء المكتبة بسطر واحد
SaudiRegionsWidget.createQuick('saudi-widget', {
    language: 'ar',
    rtl: true
});
</script>
```

### الإعداد التفصيلي

```javascript
// إنشاء مثيل جديد
const widget = new SaudiRegionsWidget({
    dataLevel: 'complete', // 'regions', 'regions-cities', 'complete'
    language: 'ar', // 'ar' أو 'en'
    rtl: true,
    dataUrl: 'https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/data/'
});

// انتظار تحميل البيانات
widget.on('ready', function() {
    // إنشاء قوائم متتالية (منطقة -> مدينة -> حي)
    widget.createCascadingSelects('widget-container');
    
    // أو إنشاء قائمة المناطق فقط
    widget.createRegionSelect('regions-container');
});

// الاستماع للأحداث
widget.on('regionChanged', function(data) {
    console.log('تم اختيار منطقة:', data.region);
});

widget.on('cityChanged', function(data) {
    console.log('تم اختيار مدينة:', data.city);
});

widget.on('districtChanged', function(data) {
    console.log('تم اختيار حي:', data.district);
});
```

## 🎛️ خيارات التكوين

```javascript
const widget = new SaudiRegionsWidget({
    // مستوى البيانات
    dataLevel: 'complete', // 'regions' | 'regions-cities' | 'complete'
    
    // اللغة
    language: 'ar', // 'ar' | 'en'
    
    // اتجاه النص
    rtl: true,
    
    // رابط البيانات
    dataUrl: 'https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/data/',
    
    // تفعيل البحث
    searchEnabled: true,
    
    // النصوص الافتراضية
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
    
    // أسماء الفئات CSS
    classes: {
        container: 'saudi-widget-container',
        select: 'saudi-widget-select',
        search: 'saudi-widget-search',
        option: 'saudi-widget-option'
    }
});
```

## 🔍 البحث والتصفية

```javascript
// البحث في جميع البيانات
const results = widget.search('الرياض');

// البحث في المناطق فقط
const regions = widget.search('الرياض', 'regions');

// البحث في المدن فقط
const cities = widget.search('جدة', 'cities');

console.log(results);
// [
//   { type: 'region', data: { id: 1, name_ar: 'منطقة الرياض', ... } },
//   { type: 'city', data: { id: 3, name_ar: 'الرياض', ... } }
// ]
```

## 🎮 التحكم البرمجي

```javascript
// الحصول على الاختيارات الحالية
const selections = widget.getSelections('widget-container');
console.log(selections);

// تعيين اختيارات برمجياً
widget.setSelections('widget-container', {
    region: 1,    // الرياض
    city: 3,      // مدينة الرياض
    district: 123 // حي معين
});

// الحصول على بيانات عنصر محدد
const region = widget.getRegionById(1);
const city = widget.getCityById(3);
const district = widget.getDistrictById(123);

// إزالة المكتبة
widget.destroy('widget-container');
```

## 🎨 التخصيص والتصميم

### الفئات CSS المتاحة

```css
/* الحاوي الرئيسي */
.saudi-widget-container {
    /* تخصيص الحاوي */
}

/* قوائم الاختيار */
.saudi-widget-select {
    /* تخصيص القوائم */
}

/* الخيارات */
.saudi-widget-option {
    /* تخصيص الخيارات */
}

/* حقل البحث */
.saudi-widget-search {
    /* تخصيص البحث */
}
```

### الأحجام المختلفة

```html
<!-- حجم مضغوط -->
<div class="saudi-widget-container compact"></div>

<!-- حجم كبير -->
<div class="saudi-widget-container large"></div>

<!-- ترتيب أفقي -->
<div class="saudi-widget-container horizontal"></div>

<!-- الوضع المظلم -->
<div class="saudi-widget-container dark"></div>
```

### الألوان المخصصة

```html
<!-- ألوان مختلفة -->
<div class="saudi-widget-container primary"></div>
<div class="saudi-widget-container success"></div>
<div class="saudi-widget-container warning"></div>
<div class="saudi-widget-container danger"></div>
```

## 📊 مستويات البيانات

| المستوى | الحجم | الوصف |
|---------|-------|--------|
| `regions` | ~2KB | المناطق الـ13 فقط |
| `regions-cities` | ~85KB | المناطق والمدن |
| `complete` | ~1.2MB | المناطق والمدن والأحياء |

## 🌐 روابط CDN

### jsDelivr (الموصى به)

```
https://cdn.jsdelivr.net/gh/YounisDany/saudi-regions-widget@main/dist/
```

### unpkg

```
https://unpkg.com/saudi-regions-widget-enhanced@2.0.0/dist/
```

## 📱 أمثلة التطبيق

### React

```jsx
import { useEffect, useRef } from 'react';

function SaudiRegionsComponent() {
    const widgetRef = useRef(null);
    
    useEffect(() => {
        const widget = SaudiRegionsWidget.createQuick('saudi-widget', {
            language: 'ar',
            rtl: true
        });
        
        widget.on('regionChanged', (data) => {
            console.log('Region changed:', data);
        });
        
        return () => widget.destroy('saudi-widget');
    }, []);
    
    return <div id="saudi-widget" ref={widgetRef}></div>;
}
```

### Vue.js

```vue
<template>
    <div id="saudi-widget"></div>
</template>

<script>
export default {
    mounted() {
        this.widget = SaudiRegionsWidget.createQuick('saudi-widget', {
            language: 'ar',
            rtl: true
        });
        
        this.widget.on('regionChanged', this.handleRegionChange);
    },
    
    beforeDestroy() {
        if (this.widget) {
            this.widget.destroy('saudi-widget');
        }
    },
    
    methods: {
        handleRegionChange(data) {
            console.log('Region changed:', data);
        }
    }
}
</script>
```

### Angular

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-saudi-regions',
    template: '<div id="saudi-widget"></div>'
})
export class SaudiRegionsComponent implements OnInit, OnDestroy {
    private widget: any;
    
    ngOnInit() {
        this.widget = (window as any).SaudiRegionsWidget.createQuick('saudi-widget', {
            language: 'ar',
            rtl: true
        });
        
        this.widget.on('regionChanged', (data: any) => {
            console.log('Region changed:', data);
        });
    }
    
    ngOnDestroy() {
        if (this.widget) {
            this.widget.destroy('saudi-widget');
        }
    }
}
```

## 🔧 التطوير

```bash
# استنساخ المستودع
git clone https://github.com/YounisDany/saudi-regions-widget.git
cd saudi-regions-widget

# تثبيت التبعيات
npm install

# معالجة البيانات
npm run process-data

# بناء المشروع
npm run build

# تشغيل الخادم التطويري
npm run dev
```

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🤝 المساهمة

نرحب بالمساهمات! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) للتفاصيل.

## 📞 الدعم

- 🐛 [الإبلاغ عن خطأ](https://github.com/YounisDany/saudi-regions-widget/issues)
- 💡 [طلب ميزة جديدة](https://github.com/YounisDany/saudi-regions-widget/issues)
- 📧 [التواصل المباشر](https://wa.me/966558147903)

## 🙏 شكر وتقدير


- مصممة بحب للمطورين العرب 💚

---

**صنع بـ ❤️ في الجمهورية اليمنية  **

