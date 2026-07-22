# من الصفر إلى الواحد — From Zero to One

موقع تعريفي (Landing) لخدمة استعادة البيانات «من الصفر إلى الواحد» — **ثنائي اللغة (عربي/إنجليزي)**،
مبني من تصميم Figma بـ HTML و CSS و JavaScript خالص، **بدون أي مكتبة خارجية**، ثيم داكن،
و**100/100 على PageSpeed للديسكتوب** على كل الصفحات.

## المميزات

- **ثنائي اللغة تلقائياً** — الصفحة الجذر `/` تكتشف لغة جهاز الزائر وتحوّله إلى `/ar/` أو `/en/`،
  مع مبدّل لغة يدوي في كل صفحة و`hreflang` كامل.
- **RTL للعربية / LTR للإنجليزية** — تخطيط منعكس بالكامل.
- **بدون مكتبات خارجية** — أداء أعلى (انظر [LIBRARIES.md](LIBRARIES.md)).
- **خط self-hosted** — Alexandria متغيّر (arabic + latin) محمّل محلياً.
- **الأرقام بالإنجليزية** في كل الموقع.
- **SEO / AEO / GEO** — بيانات منظّمة JSON-LD (LocalBusiness، Service، FAQPage، BreadcrumbList)،
  `sitemap.xml` مع hreflang، `robots.txt`، Open Graph + Twitter، بنية دلالية، ووصف Meta لكل صفحة.
- **متجاوب** — جوال (أفقي/عمودي)، iPad، لابتوب، وديسكتوب.
- كل خدمة **ملف HTML مستقل** (`/ar/services/*.html` و `/en/services/*.html`).

## بنية المشروع

```
01datarecpvery/
├── index.html                 # تحويل حسب لغة الجهاز → /ar/ أو /en/
├── ar/
│   ├── index.html             # الرئيسية (عربي، RTL)
│   └── services/              # 6 صفحات خدمات مستقلة
│       ├── hdd.html · ssd-nvme.html · raid-servers.html
│       └── cctv.html · after-format.html · ransomware.html
├── en/                        # نفس البنية (إنجليزي، LTR)
├── assets/
│   ├── css/  (fonts.css · main.css)
│   ├── js/   (main.js)
│   ├── fonts/ (alexandria-arabic.woff2 · alexandria-latin.woff2)
│   ├── img/  (og-ar.png · og-en.png)
│   └── favicon.svg
├── build/                     # مولّد الصفحات (تطوير فقط، لا يُرفع)
│   ├── site.js · services.js · generate.js
├── sitemap.xml · robots.txt · site.webmanifest
└── README.md · LIBRARIES.md
```

## الصفحات (18 صفحة)

| | عربي | إنجليزي |
|---|---|---|
| الرئيسية | `/ar/` | `/en/` |
| التواصل | `/ar/contact.html` | `/en/contact.html` |
| الخصوصية | `/ar/privacy.html` | `/en/privacy.html` |
| هارد تالف (HDD) | `/ar/services/hdd.html` | `/en/services/hdd.html` |
| SSD و NVMe | `/ar/services/ssd-nvme.html` | `/en/services/ssd-nvme.html` |
| RAID والسيرفرات | `/ar/services/raid-servers.html` | `/en/services/raid-servers.html` |
| كاميرات المراقبة | `/ar/services/cctv.html` | `/en/services/cctv.html` |
| بعد الفورمات | `/ar/services/after-format.html` | `/en/services/after-format.html` |
| فيروس الفدية | `/ar/services/ransomware.html` | `/en/services/ransomware.html` |

## التشغيل والتوليد

```bash
# توليد كل الصفحات من القالب + البيانات
node build/generate.js

# تشغيل محلي (لازم خادم static حتى تُحمّل الخطوط والمسارات المطلقة)
python3 -m http.server 8000
# افتح: http://localhost:8000  (سيحوّلك حسب لغة جهازك)
```

## الأمان والنشر

لا ترفع مجلد المشروع كاملًا إلى مجلد الويب. المولّد يصنع حزمة نشر بقائمة سماح تستبعد
ملفات المصدر والتصميم والاختبارات تلقائيًا:

```bash
# استضافة PHP/Apache مثل Hostinger
node build/generate.js
node build/package-deploy.js hostinger
# ارفع محتويات dist/hostinger/ فقط إلى public_html

# فحوصات المصدر والأمان التي لا تحتاج PHP
node tests/security-static.test.js
```

نشر Netlify يولّد `dist/netlify/` تلقائيًا ويستبعد `send.php` لأن Netlify لا ينفّذ PHP؛
لذلك نموذج التواصل يعمل فقط على استضافة PHP. ملف `.htaccess` يضيف CSP وHSTS
وPermissions-Policy وبقية رؤوس الحماية، ويمنع فهرسة المجلدات والوصول إلى ملفات التطوير.

معالج النموذج يطبّق قبل `mail()` حدًا ذريًا واحدًا لكل عنوان شبكة كل 30 ثانية، وحدودًا
إجمالية ثابتة للمستلم قدرها 5 طلبات/دقيقة و30/ساعة و100/يوم. يُحفظ فقط تجزؤ مشفّر
للعنوان، وتُرفض الطلبات مؤقتًا إذا تعذّر فتح حالة المحدد أو التحقق منها (fail closed).
المسار الافتراضي للحالة يكون خارج مجلد الويب. في الإنتاج يفضّل ضبط
`Z2O_RATE_STATE_DIR` من إعداد الخادم إلى مجلد مطلق خاص قابل للكتابة خارج
`public_html`، بصلاحية `0700`، وعدم وضعه على مجلد مشترك مع مواقع أخرى.

هذه الآلية صحيحة لخادم PHP واحد أو عدة عمليات تشترك في نظام الملفات نفسه. إذا صار
الموقع موزعًا على أكثر من خادم، انقل المحدد إلى مخزن ذري مشترك مثل Redis أو إلى WAF/
بوابة أمامية؛ ملف محلي لا يفرض حدًا عالميًا بين أجهزة مستقلة.

قبل الإطلاق الفعلي:

- فعّل شهادة HTTPS وتحويل HTTP إلى HTTPS من لوحة الاستضافة، ثم تحقّق من وصول HSTS
  وبقية الرؤوس على النطاق الحقيقي. لا تضف `includeSubDomains` أو HSTS preload إلا بعد
  التأكد أن كل النطاقات الفرعية تعمل دائمًا عبر HTTPS.
- اضبط `ServerTokens Prod` و`ServerSignature Off` من إعداد Apache أو لوحة الاستضافة
  إن بقي رأس `Server` يعلن رقم الإصدار؛ `.htaccess` يحاول حذفه لكن بعض الخوادم تضيفه
  بعد مرحلة معالجة الرؤوس.
- استبدل قيم التواصل والنطاق التجريبية في `build/site.js`، وأعد التوليد والحزم.
- استخدم إصدار PHP ما زال يتلقى تحديثات أمنية من مزود الاستضافة، وأعد اختبارات
  النموذج بعد كل ترقية.
- شغّل فحص PHP داخل البيئة المستهدفة: `php -l send.php` ثم
  `php tests/security-rate-limit.php` من نسخة التطوير.
- راقب سجلات 429 و503 وحالة خدمة البريد، وعدّل الحدود فقط بناءً على حركة حقيقية.
- إذا ظهرت إساءة استخدام موزعة فعلية، أضف حماية أمامية مثل WAF أو challenge يحترم
  الخصوصية؛ المحدد يقيّد ضغط البريد لكنه لا يميّز الإنسان عن عميل آلي يرسل بيانات
  صحيحة من عناوين متعددة.

لا يمكن لأي تطبيق أن يقدم ضمان أمان مطلقًا؛ التحديثات الدورية، مراقبة الاستضافة،
والنسخ الاحتياطية تبقى جزءًا من الحماية طويلة المدى.

## التخصيص

- **معلومات التواصل + الدومين:** كلها في أعلى `build/site.js`
  (`whatsapp`، `phoneDisplay`، `email`، `baseUrl`). عدّلها ثم `node build/generate.js`.
  > ⚠️ القيم الحالية **placeholders** — استبدلها بالأرقام والدومين الحقيقيين.
  `baseUrl` هو أيضًا قائمة السماح الأمنية لطلبات النموذج؛ إذا بقي نطاقًا تجريبيًا
  فسيرفض الخادم طلبات المتصفح من النطاق الحقيقي برمز `403` (فشل آمن).
- **CDN للصور:** حدّد `CDN` في `build/site.js` وأعد التوليد (تفاصيل في LIBRARIES.md).
- **المحتوى/النصوص:** `build/site.js` (الرئيسية) و `build/services.js` (الخدمات) — للغتين.

## الأداء

جميع الصفحات تحقق **100/100/100/100** (Performance / Accessibility / Best Practices / SEO)
على Lighthouse بإعداد **desktop**. تُختبَر عبر:

```bash
npx lighthouse http://localhost:8000/ar/ --preset=desktop
```

الخط Alexandria مرخّص بـ [SIL Open Font License 1.1](https://openfontlicense.org).
