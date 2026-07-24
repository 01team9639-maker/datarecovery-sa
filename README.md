# من الصفر إلى الواحد — From Zero to One

موقع تعريفي (Landing) لخدمة استعادة البيانات «من الصفر إلى الواحد» (Zero 2 One Data Recovery) —
**ثنائي اللغة (عربي/إنجليزي)**، مبني من تصميم Figma بـ HTML و CSS و JavaScript. المكتبة الوحيدة
هي **GSAP (self-hosted)** لطبقة الحركة؛ لا اعتماد على أي CDN خارجي وقت التشغيل (انظر [LIBRARIES.md](LIBRARIES.md)).
ثيم داكن، ويستهدف **100/100/100/100 على Lighthouse للديسكتوب** على كل الصفحات.

- **الدومين:** https://datarecovery-sa.com
- **بريد استقبال النموذج:** info@datarecovery-sa.com
- **التحليلات:** Google Tag Manager (`GTM-NVKDG74Z`) عبر ملف first-party، وGA4 (`G-M2GX0NVW5E`) يُضبط كتاغ داخل حاوية GTM.

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
│   ├── js/   (bootstrap.js · lang-redirect.js · main.js · anim.js · analytics.js · vendor/gsap)
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
# استضافة PHP/Apache مثل Hostinger — حزمة قائمة السماح (رفع يدوي)
node build/generate.js
node build/package-deploy.js hostinger
# ارفع محتويات dist/hostinger/ فقط إلى public_html

# فحوصات المصدر والأمان التي لا تحتاج PHP
node tests/security-static.test.js
```

### النشر من GitHub إلى Hostinger (Git deploy)

الريبو مُهيّأ ليُنشر جذره مباشرة: ملفات الموقع (`index.html`، `ar/`، `en/`، `assets/`،
`send.php`، `.htaccess`، `.user.ini`) في الجذر، ومجلدات المصدر (`build/`، `design/`، `tests/`)
**محجوبة عن الويب بالكامل** عبر `.htaccess` (تُرجع `404`)، فلا تصل للزائر.

1. Hostinger hPanel → **Advanced → GIT** → أضف المستودع، الفرع `main`، والوجهة `public_html`.
   للمستودع الخاص أضِف مفتاح النشر الذي يعطيه Hostinger كـ Deploy key في GitHub.
2. اضغط **Deploy** (أو فعّل auto-deploy عبر webbook عند كل push).
3. hPanel: تأكّد **PHP 8.x**، وأنشئ صندوق **info@datarecovery-sa.com**، وفعّل **HTTPS**.
4. للتحديثات لاحقًا: `node build/generate.js` → `git commit` → `git push` → Deploy.

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
- قيم التواصل والنطاق في `build/site.js` مضبوطة على النطاق الحقيقي (datarecovery-sa.com)؛
  تأكّد منها وأعد التوليد بعد أي تعديل.
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
  (`whatsapp`، `phoneDisplay`، `email`، `baseUrl`، `gtm`). عدّلها ثم `node build/generate.js`.
  القيم الحالية **حقيقية**: `baseUrl = https://datarecovery-sa.com` و`email = info@datarecovery-sa.com`.
  `baseUrl` هو أيضًا قائمة السماح الأمنية لطلبات النموذج (تشمل نسخة `www.` تلقائيًا)؛ فطلبات
  المتصفح تُقبل فقط من نطاق الإنتاج.
- **التحليلات:** غيّر `config.gtm` في `build/site.js` (اتركه فارغًا لتعطيل GTM كليًا). عند التوليد
  يُكتب `assets/js/analytics.js` (loader خارجي) ويُضاف snippet الـ`<noscript>`. GA4 يُدار من داخل
  حاوية GTM. الـ CSP في `.htaccess` و`netlify.toml` يسمح فقط بنطاقات googletagmanager.com و
  google-analytics.com.
- **CDN للصور:** حدّد `CDN` في `build/site.js` وأعد التوليد (تفاصيل في LIBRARIES.md).
- **المحتوى/النصوص:** `build/site.js` (الرئيسية) و `build/services.js` (الخدمات) — للغتين.

## الأداء

تستهدف كل الصفحات **100/100/100/100** (Performance / Accessibility / Best Practices / SEO)
على Lighthouse بإعداد **desktop**، ويُعاد التحقق بعد كل تغيير. طريقة إعادة الإثبات:

```bash
node build/generate.js
python3 -m http.server 8000            # خادم static محلي
npx lighthouse http://localhost:8000/ar/index.html --preset=desktop \
  --only-categories=performance,accessibility,best-practices,seo
```

> loader الـ GTM يُحمّل **async** ولا يحجب العرض؛ ومع ذلك قد تُضيف التحليلات طلبات
> شبكة خارجية أثناء قياس أونلاين، لذا يُقاس الأداء الأساسي بأفضل شكل على خادم static محلي.

الخط Alexandria مرخّص بـ [SIL Open Font License 1.1](https://openfontlicense.org).
