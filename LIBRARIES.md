# المكتبات والموارد المستخدمة · Libraries & Resources

هذا المرجع يوضّح **كل** ما استُخدم في بناء الموقع، حتى تقدروا تعيدوا استخدامه لاحقاً.

## 1) مكتبات وقت التشغيل (Runtime) — على الموقع نفسه

> **الموقع لا يستخدم أي مكتبة أو إطار عمل خارجي وقت التشغيل** (لا Bootstrap، لا jQuery،
> لا React، لا أي CDN). هذا مقصود: أسرع تحميل و**100/100** على PageSpeed للديسكتوب.

| المورد | الاستخدام | الترخيص | المصدر |
|--------|-----------|---------|--------|
| **خط Alexandria** (Variable 100–900) | خط الموقع، عربي + لاتيني، مستضاف محلياً `woff2` | SIL Open Font License 1.1 | fonts.google.com/specimen/Alexandria |
| HTML5 / CSS3 / Vanilla JS | كل الواجهة والتفاعلات | — | معياري |
| JSON-LD (schema.org) | بيانات منظّمة لـ SEO/AEO/GEO | — | schema.org |

- الخطوط: `assets/fonts/alexandria-arabic.woff2` و `assets/fonts/alexandria-latin.woff2`
  (ملف متغيّر واحد لكل نطاق يغطّي كل الأوزان — محمّل بـ `preload` و`font-display:swap`).
- الجافاسكربت كامل في `assets/js/main.js` (~2KB، بدون تبعيّات).
- الرسومات (الحلقات) مبنية بـ CSS خالص — لا صور نقطية على الصفحات.

## 2) أدوات البناء (Build) — لا تُرفع مع الموقع

هذه أدوات تطوير فقط (Node.js)، الموقع النهائي static بالكامل ولا يعتمد عليها.

| الأداة | الغرض | تثبيت |
|--------|-------|-------|
| **Node.js** ≥ 18 | تشغيل مولّد الصفحات | nodejs.org |
| مولّد داخلي `build/` | يولّد 14 صفحة HTML من قالب + بيانات | داخل المشروع |

لا حاجة لأي `npm install` لتوليد الموقع — المولّد يعتمد على وحدات Node القياسية فقط
(`fs`, `path`).

```bash
node build/generate.js     # يولّد /ar، /en، index.html، sitemap.xml، robots.txt
```

بنية المولّد:
- `build/site.js` — الإعدادات + نصوص الواجهة + محتوى الصفحة الرئيسية (عربي + إنجليزي).
- `build/services.js` — محتوى صفحات الخدمات الست (عربي + إنجليزي).
- `build/generate.js` — القوالب + كاتب الملفات + الـ schema + sitemap.

> لإضافة/تعديل خدمة أو نص: عدّل `build/services.js` أو `build/site.js` ثم أعد التشغيل.

## 3) أدوات الاختبار (اختياري، للتطوير فقط)

| الأداة | الغرض |
|--------|-------|
| **Lighthouse** (`npm i -g lighthouse`) | قياس 100/100/100/100 للديسكتوب |
| **Playwright / متصفح Chromium** | لقطات للتحقق البصري ومطابقة الفيجما |

## 4) الخطوط — إعادة التنزيل عند الحاجة

الخط مُشتق من Google Fonts CSS2 API (النطاقان arabic + latin، الوزن المتغيّر):

```
https://fonts.googleapis.com/css2?family=Alexandria:wght@100..900&display=swap
```

## 5) الصور و CDN

- الصور في `assets/img/` (حالياً: `og-ar.png` و`og-en.png` بمقاس 1200×630 لمشاركات السوشال).
- **لتفعيل CDN للصور:** افتح `build/site.js` وحدّد قيمة `CDN` (مثلاً
  `https://cdn.yourdomain.com`)، ثم ارفع مجلد `assets/img` إلى الـ CDN وأعد توليد الموقع.
  عندها ستُشير وسوم `og:image` وروابط الصور تلقائياً إلى الـ CDN مع `preconnect`.

## GSAP (self-hosted)

- **GSAP 3.12.5** + **ScrollTrigger** — motion layer (scroll reveals, count-ups, magnetic CTAs).
- Files: `assets/js/vendor/gsap.min.js`, `assets/js/vendor/ScrollTrigger.min.js` (self-hosted, no CDN).
- Loaded with `defer`; driven by `assets/js/anim.js`.
- License: GreenSock standard "no charge" license (https://gsap.com/standard-license/).
- Progressive enhancement: reveal states hidden only when JS is active AND motion is allowed,
  so no-JS / reduced-motion visitors get the full content statically. Desktop PageSpeed stays 100.
