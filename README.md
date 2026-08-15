# من الصفر إلى الواحد — From Zero to One

موقع تعريفي (Landing) لخدمة استعادة البيانات «من الصفر إلى الواحد» (Zero 2 One Data Recovery) —
**ثنائي اللغة (عربي/إنجليزي)**، مبني من تصميم Figma بـ HTML و CSS و JavaScript. المكتبة الوحيدة
هي **GSAP (self-hosted)** لطبقة الحركة؛ لا اعتماد على أي CDN خارجي وقت التشغيل (انظر [LIBRARIES.md](LIBRARIES.md)).
ثيم داكن، ويستهدف **100/100/100/100 على Lighthouse للديسكتوب** على كل الصفحات.

- **الدومين:** https://datarecovery-sa.com
- **بريد استقبال النموذج:** info@datarecovery-sa.com
- **التحليلات:** Google Tag Manager (`GTM-NVKDG74Z`) عبر ملف first-party، وGA4 (`G-M2GX0NVW5E`) يُضبط كتاغ داخل حاوية GTM.

## المميزات

- **ثنائي اللغة برابطين منفصلين** — العربية (السوق الأساسي) على جذر الموقع `/` بلا بادئة،
  والإنجليزية تحت `/en/`. رابطان مستقلان هما شرط عمل `hreflang` وفهرسة كل لغة على حدة،
  مع مبدّل لغة يدوي في القائمة الجانبية. لا يوجد تحويل تلقائي حسب لغة المتصفح (جوجل يمنعه:
  زاحف البحث كان سيرى لغة واحدة فقط). المسارات القديمة `/ar/*` تُحوَّل **301** إلى الجذر.
- **RTL للعربية / LTR للإنجليزية** — تخطيط منعكس بالكامل.
- **بدون مكتبات خارجية** — أداء أعلى (انظر [LIBRARIES.md](LIBRARIES.md)).
- **خط self-hosted** — Alexandria متغيّر (arabic + latin) محمّل محلياً.
- **الأرقام بالإنجليزية** في كل الموقع.
- **SEO / AEO / GEO** — بيانات منظّمة JSON-LD (LocalBusiness مع `sameAs`، WebSite، WebPage
  مع `dateModified`، Service، FAQPage، BreadcrumbList)، `sitemap.xml` مع hreflang و`lastmod`،
  `robots.txt`، `llms.txt` لمحرّكات الإجابة، Open Graph + Twitter، وأسئلة الـFAQ كعناوين `<h3>`.
- **متجاوب** — جوال (أفقي/عمودي)، iPad، لابتوب، وديسكتوب.
- كل خدمة **ملف HTML مستقل** (`/services/*.html` للعربية و `/en/services/*.html` للإنجليزية).

## بنية المشروع

```
01datarecpvery/
├── index.html                 # الرئيسية (عربي، RTL) — جذر الموقع
├── contact.html · privacy.html · 404.html
├── services/                  # 8 صفحات خدمات مستقلة (عربي)
│   ├── hdd.html · ssd-nvme.html · raid-servers.html
│   ├── cctv.html · after-format.html · ransomware.html
│   └── phones.html · memory-cards.html
├── cities/                    # 3 صفحات استهداف جغرافي
│   └── riyadh.html · jeddah.html · dammam.html
├── blog/                      # المدونة: فهرس + 5 مقالات
├── en/                        # نفس البنية (إنجليزي، LTR)
├── assets/
│   ├── css/  (fonts.css · main.css)
│   ├── js/   (bootstrap.js · main.js · anim.js · analytics.js · vendor/gsap)
│   ├── fonts/ (alexandria-arabic.woff2 · alexandria-latin.woff2)
│   ├── img/  (logo-mark.png · og.png)
│   └── favicon-32.png · favicon-48.png · apple-touch-icon.png · icon-192.png · icon-512.png
├── build/                     # مولّد الصفحات (تطوير فقط، محجوب عن الويب)
│   ├── site.js                # الإعدادات + الأرقام (claims) + نصوص الواجهة + الرئيسية
│   ├── services.js            # محتوى الخدمات الثماني
│   ├── depth.js               # أقسام العمق لكل خدمة (الأجهزة · خطوات العمل · حالة نموذجية)
│   ├── cities.js · blog.js    # صفحات المدن والمقالات
│   └── generate.js · package-deploy.js
├── send.php · .htaccess · .user.ini
├── sitemap.xml · robots.txt · llms.txt · site.webmanifest
└── README.md · LIBRARIES.md
```

## الصفحات (42 صفحة — 21 لكل لغة)

| | عربي | إنجليزي |
|---|---|---|
| الرئيسية | `/` | `/en/` |
| التواصل | `/contact.html` | `/en/contact.html` |
| الخصوصية | `/privacy.html` | `/en/privacy.html` |
| هارد تالف (HDD) | `/services/hdd.html` | `/en/services/hdd.html` |
| SSD و NVMe | `/services/ssd-nvme.html` | `/en/services/ssd-nvme.html` |
| RAID والسيرفرات | `/services/raid-servers.html` | `/en/services/raid-servers.html` |
| كاميرات المراقبة | `/services/cctv.html` | `/en/services/cctv.html` |
| بعد الفورمات | `/services/after-format.html` | `/en/services/after-format.html` |
| فيروس الفدية | `/services/ransomware.html` | `/en/services/ransomware.html` |
| الهواتف الذكية | `/services/phones.html` | `/en/services/phones.html` |
| بطاقات الذاكرة والفلاش | `/services/memory-cards.html` | `/en/services/memory-cards.html` |
| الرياض · جدة · الدمام | `/cities/{slug}.html` | `/en/cities/{slug}.html` |
| المدونة (فهرس + 5 مقالات) | `/blog/` | `/en/blog/` |
| صفحة 404 | `/404.html` | `/en/404.html` |

> المختبر في **الرياض**. صفحتا جدة والدمام تنصّان صراحةً على أن الحالات تصل عبر شحن آمن
> إلى مختبر الرياض، ولا توجد فروع في تلك المدن — ادعاء فرع غير موجود مخالفة لنشاط
> Google التجاري ومشكلة ثقة في آن.

## مصدر واحد للأرقام

كل رقم يظهر على الموقع (`+25`، `+50K`، `99%`) يُقرأ من كائن `claims` في
[`build/site.js`](build/site.js) ومعه تعريف مكتوب لما يعدّه بالضبط. قبل ذلك كان الرقم
`+50K` موصوفًا بـ«حالة تم التعامل معها» في الرئيسية و«ملف مستعاد» في صفحات الخدمات،
و`99%` مقترنًا بعنوان الخصوصية في شريط الثقة. لا تكتب رقمًا في القوالب مباشرة —
عدّل `claims` وأعد التوليد، واختبار `tests/content-rules.test.js` يمنع عودة التضارب.

## الدليل الاجتماعي (جاهز وينتظر محتوى حقيقي)

أقسام آراء العملاء وشعارات الجهات وصور المختبر **مبنية بالكامل** في المولّد، ولا تُعرض
إلا عند تعبئة `socialProof` في [`build/site.js`](build/site.js). المصفوفات فارغة عمدًا:
لا تُنشر شهادة أو صورة لم يوفّرها العميل. الصور تمرّ عبر مساعد `photo()` الذي يخرج
WebP + `srcset` + `loading="lazy"` بأبعاد صريحة حتى لا تتأثر ميزانية الأداء.

## التشغيل والتوليد

```bash
# توليد كل الصفحات من القالب + البيانات
node build/generate.js

# تشغيل محلي (لازم خادم static حتى تُحمّل الخطوط والمسارات المطلقة)
python3 -m http.server 8000
# افتح: http://localhost:8000       → العربية (الجذر)
# افتح: http://localhost:8000/en/   → الإنجليزية
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

### ⚠️ تحقّق من أن `.htaccess` فعّال على الخادم

فحص مباشر للموقع الحيّ بتاريخ 2026-08-11 أظهر أن **ملف `.htaccess` لم يكن ساريًا إطلاقًا**:

| ما فحصناه | المتوقع | ما حدث فعلًا |
|---|---|---|
| `/ar/` | تحويل 301 إلى الجذر | **404** |
| `/.user.ini` | ممنوع (`Require all denied`) | **200 — الملف مقروء** |
| ترويسات الأمان | CSP وHSTS وX-Frame-Options… | **لا شيء** عدا `upgrade-insecure-requests` |

الأعراض الثلاثة معًا تعني أن الملف غير مطبّق أصلًا، لا أن قاعدة واحدة فيها خطأ. **القواعد
نفسها مُختبَرة وسليمة** — `tests/redirect-map.sh` يشغّل Apache حقيقيًا على حزمة النشر ويمرّ
بـ46 تأكيدًا. السببان المحتملان: الملف لم يُرفع (كثير من برامج FTP وفكّ الضغط تتخطى الملفات
المخفية)، أو `AllowOverride` معطّل لمجلد الجذر.

```bash
# بعد كل نشر — يفحص الموقع الحيّ ويقول لك أي المشكلتين عندك
bash tests/live-check.sh

# قبل النشر — يشغّل Apache محليًا على dist/hostinger ويتحقق من كل تحويلة
bash tests/redirect-map.sh
```

إن لم تظهر الترويسات: في hPanel فعّل «إظهار الملفات المخفية» في مدير الملفات وأعد رفع
`.htaccess` من `dist/hostinger/`، وإن بقي متجاهَلًا فاطلب من دعم Hostinger تفعيل
`AllowOverride`. ما دام الملف غير فعّال، فخريطة تحويلات 301 وصفحة 404 المخصّصة وقواعد
التخزين المؤقت وترويسات الأمان **كلها معطّلة**.

### خريطة الروابط القديمة

لم يتوفّر تصدير Search Console، فاستُخرجت الروابط القديمة من فهرس جوجل الحيّ (2026-08-12).
بنيتان باقيتان من موقع Osool: `/ar/<slug-عربي>/` و `/<slug-إنجليزي>/` في الجذر. أربعة روابط
مؤكَّدة كانت ترجع 404، وأهمها أن قاعدة `/ar/*` العامة **لا تكفي**: تجريد البادئة من
`/ar/raid-…` ينتج `/raid-…` وهو 404 آخر. لذلك تُطابَق الصفحات العربية صراحةً **قبل** القاعدة
العامة، وتغطي بعدها خريطة كلمات مفتاحية فضاء الروابط القديم كله بلغتين، محميّة بشرط
`!-f`/`!-d` فلا تحجب صفحة حقيقية أبدًا. الروابط غير المطابقة تصل إلى صفحة 404 التي تعرض
كل الخدمات — لا تحويل جماعي إلى الرئيسية، لأن جوجل يعامله كـ«404 ناعم».

> ملاحظة للصيانة: داخل `.htaccess` يطابق Apache **المسار بعد فكّ الترميز**، فتُكتب العربية
> حرفيًا لا بصيغة `%D9%87%D8%A7…` — النمط المُرمَّز لا يطابق شيئًا أبدًا. هذا مُثبَّت في الاختبار.

### النشر من GitHub إلى Hostinger (Git deploy)

الريبو مُهيّأ ليُنشر جذره مباشرة: ملفات الموقع (`index.html`، `services/`، `en/`، `assets/`،
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
- **تاريخ تحديث المحتوى:** `contentUpdated` في `build/site.js` هو مصدر `dateModified` في
  JSON-LD و`lastmod` في الـsitemap (إشارة الحداثة لمحرّكات البحث والإجابة). حدّثه **يدويًا**
  عند تغيير نصوص الصفحات فعلًا — كونه ثابتًا يجعل البناء حتميًا والتاريخ صادقًا.
- **CDN للصور:** حدّد `CDN` في `build/site.js` وأعد التوليد (تفاصيل في LIBRARIES.md).
- **المحتوى/النصوص:** `build/site.js` (الرئيسية) و `build/services.js` (الخدمات) — للغتين.

## الأداء

تستهدف كل الصفحات **100/100/100/100** (Performance / Accessibility / Best Practices / SEO)
على Lighthouse بإعداد **desktop**، ويُعاد التحقق بعد كل تغيير. طريقة إعادة الإثبات:

```bash
node build/generate.js
python3 -m http.server 8000            # خادم static محلي
npx lighthouse http://localhost:8000/ --preset=desktop \
  --only-categories=performance,accessibility,best-practices,seo
```

> loader الـ GTM يُحمّل **async** ولا يحجب العرض؛ ومع ذلك قد تُضيف التحليلات طلبات
> شبكة خارجية أثناء قياس أونلاين، لذا يُقاس الأداء الأساسي بأفضل شكل على خادم static محلي.

الخط Alexandria مرخّص بـ [SIL Open Font License 1.1](https://openfontlicense.org).
