/* ==========================================================================
   Static site generator — من الصفر إلى الواحد
   Renders standalone HTML files for AR + EN:
     /ar/index.html, /en/index.html          (homepage)
     /{lang}/services/{slug}.html             (6 service pages each)
     /index.html                              (language redirect)
     /sitemap.xml, /robots.txt
   Run: node build/generate.js
   ========================================================================== */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const services = require("./services");
const depth = require("./depth");
// Display order lives in site.js next to the content, not in the data files, so
// reordering a nav never means editing a content module. Anything not named in
// the order list sorts to the end rather than silently jumping to the front.
const orderBy = (list, order) => {
  const rank = (s) => { const i = order.indexOf(s); return i === -1 ? order.length : i; };
  return [...list].sort((a, b) => rank(a.slug) - rank(b.slug));
};
const cities = orderBy(require("./cities"), config0().cityOrder);
const posts = orderBy(require("./articles"), config0().articlesOrder);
function config0() { return require("./site").config; }
const { config, claims, ui, home, contact, privacy, socialProof } = require("./site");

const ROOT = path.join(__dirname, "..");
const BASE = config.baseUrl;
// Images can be served from a CDN by setting config.cdn; otherwise from BASE.
const IMG = config.cdn || BASE;
const LANGS = ["ar", "en"];

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/* ---------- Cache busting ----------
   CSS/JS are served with a one-day cache, so without this a returning visitor
   keeps the old stylesheet after a deploy and the page renders half-styled.
   Appending a content hash makes every change a new URL, fetched immediately,
   while unchanged files keep their hash (and stay cached, and stay
   deterministic for the idempotence test). */
const _assetHashes = new Map();
function asset(rel) {
  if (!_assetHashes.has(rel)) {
    let tag = "";
    try {
      tag = crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, rel))).digest("hex").slice(0, 8);
    } catch (e) { /* not generated yet — ship the bare path rather than a wrong hash */ }
    _assetHashes.set(rel, tag);
  }
  const tag = _assetHashes.get(rel);
  return `/${rel}${tag ? `?v=${tag}` : ""}`;
}

const wa = () => `https://wa.me/${config.whatsapp}`;

/* Floating WhatsApp button — the brand mark supplied by the client, with the
   stylesheet classes flattened to fill attributes (no <style> in our HTML). */
const whatsappGlyph = `<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="#25D366" d="M17,0C8.7,0,2,6.7,2,15c0,3.4,1.1,6.6,3.2,9.2l-2.1,6.4c-0.1,0.4,0,0.8,0.3,1.1C3.5,31.9,3.8,32,4,32 c0.1,0,0.3,0,0.4-0.1l6.9-3.1C13.1,29.6,15,30,17,30c8.3,0,15-6.7,15-15S25.3,0,17,0z"/><path fill="#ffffff" d="M25.7,20.5c-0.4,1.2-1.9,2.2-3.2,2.4C22.2,23,21.9,23,21.5,23c-0.8,0-2-0.2-4.1-1.1c-2.4-1-4.8-3.1-6.7-5.8 L10.7,16C10.1,15.1,9,13.4,9,11.6c0-2.2,1.1-3.3,1.5-3.8c0.5-0.5,1.2-0.8,2-0.8c0.2,0,0.3,0,0.5,0c0.7,0,1.2,0.2,1.7,1.2l0.4,0.8 c0.3,0.8,0.7,1.7,0.8,1.8c0.3,0.6,0.3,1.1,0,1.6c-0.1,0.3-0.3,0.5-0.5,0.7c-0.1,0.2-0.2,0.3-0.3,0.3c-0.1,0.1-0.1,0.1-0.2,0.2 c0.3,0.5,0.9,1.4,1.7,2.1c1.2,1.1,2.1,1.4,2.6,1.6l0,0c0.2-0.2,0.4-0.6,0.7-0.9l0.1-0.2c0.5-0.7,1.3-0.9,2.1-0.6 c0.4,0.2,2.6,1.2,2.6,1.2l0.2,0.1c0.3,0.2,0.7,0.3,0.9,0.7C26.2,18.5,25.9,19.8,25.7,20.5z"/></svg>`;
function whatsappFab(lang) {
  const label = lang === "ar" ? "تواصل معنا عبر واتساب" : "Chat with us on WhatsApp";
  return `
  <a class="wa-fab" href="${wa()}" target="_blank" rel="noopener" aria-label="${esc(label)}">${whatsappGlyph}</a>`;
}
const ltr = (s) => `<span dir="ltr">${esc(s)}</span>`;
// Forward arrow points toward the reading direction: left in RTL, right in LTR.
const fwd = (lang) => (lang === "ar" ? "←" : "→");

/* ---------- inline SVG icons (monochrome, currentColor) ---------- */
const icons = {
  arrowUR: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>`,
  location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.12.9.33 1.78.62 2.6a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.06a2 2 0 0 1 2.1-.45c.82.29 1.7.5 2.6.62A2 2 0 0 1 22 16.9z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.16l-.3-.18-2.9.9.93-2.82-.2-.31A8.2 8.2 0 1 1 12 20.2zm4.6-6.14c-.25-.13-1.48-.73-1.71-.82-.23-.08-.4-.12-.56.13-.17.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.17 1.78 2.72 4.3 3.81.6.26 1.07.42 1.44.54.6.19 1.15.16 1.58.1.48-.07 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.11-.23-.17-.48-.29z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>`,
  social: {
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>`,
    x: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.75l-5.29-6.92L4.9 22H1.64l8.02-9.17L1 2h6.92l4.78 6.32L18.244 2zm-1.18 18h1.83L7.03 3.9H5.06L17.064 20z"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.3 2.1 1.5 3.5 3.5 3.72v2.55c-1.2.06-2.4-.22-3.5-.83v5.72c0 3.5-2.6 5.84-5.85 5.84A5.6 5.6 0 0 1 5 14.35c0-3.23 2.94-5.63 6.3-5v2.72c-.4-.12-.8-.18-1.2-.18-1.5 0-2.72 1.2-2.72 2.66 0 1.5 1.2 2.7 2.7 2.7 1.6 0 2.82-1.24 2.82-2.98V3h1.6z"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.77-1.78C19.3 5.1 12 5.1 12 5.1s-7.3 0-8.83.42A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.77 1.78C4.7 18.9 12 18.9 12 18.9s7.3 0 8.83-.42a2.5 2.5 0 0 0 1.77-1.78C23 15.2 23 12 23 12zM9.75 15V9l5.2 3-5.2 3z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C20.4 8.65 22 10.6 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9z"/></svg>`
  }
};

/* Arabic is the primary market, so it owns the site root and carries no prefix;
   every other language is served under /<lang>/. Both keep distinct URLs, which
   is what hreflang and per-language indexing require. */
const DEFAULT_LANG = "ar";
const langPrefix = (lang) => (lang === DEFAULT_LANG ? "" : `/${lang}`);
// Where a page is written on disk (mirrors the URL, minus the leading slash).
const outPath = (lang, rel) => (lang === DEFAULT_LANG ? rel : `${lang}/${rel}`);

const homeUrl = (lang) => `${langPrefix(lang)}/`;
const svcUrl = (lang, slug) => `${langPrefix(lang)}/services/${slug}.html`;
const contactUrl = (lang) => `${langPrefix(lang)}/contact.html`;
const privacyUrl = (lang) => `${langPrefix(lang)}/privacy.html`;
const absHome = (lang) => BASE + homeUrl(lang);
const absSvc = (lang, slug) => BASE + svcUrl(lang, slug);
const absContact = (lang) => BASE + contactUrl(lang);
const absPrivacy = (lang) => BASE + privacyUrl(lang);
const cityUrl = (lang, slug) => `${langPrefix(lang)}/cities/${slug}.html`;
const articlesUrl = (lang) => `${langPrefix(lang)}/articles/`;
/* The Hugo blog owns /blog/ and nests English at /blog/en/ — not /en/blog/,
   which would need a deploy scope touching the domain root. It therefore does
   not go through langPrefix() like every other section here. */
const blogUrl = (lang) => (lang === "en" ? "/blog/en/" : "/blog/");
const postUrl = (lang, slug) => `${langPrefix(lang)}/articles/${slug}.html`;
const absCity = (lang, slug) => BASE + cityUrl(lang, slug);
const absArticles = (lang) => BASE + articlesUrl(lang);
const absPost = (lang, slug) => BASE + postUrl(lang, slug);

/* ---------- JSON-LD schema ---------- */
function localBusiness(lang) {
  const t = ui[lang];
  return {
    "@type": "LocalBusiness",
    "@id": BASE + "/#business",
    name: t.brand,
    // The business traded as Osool before rebranding to Zero 2 One, and the social
    // profiles in `sameAs` still carry the old name. Declaring the former name as
    // alternateName is what tells search engines these are ONE entity — without it
    // the old and new names compete as two businesses on the same domain, which is
    // the identity split the site audit flagged as its top-priority problem.
    alternateName: config.alternateNames,
    url: absHome(lang),
    description: home[lang].metaDesc,
    telephone: config.phoneDisplay,
    email: config.email,
    image: `${IMG}/assets/img/og.png`,
    logo: `${IMG}/assets/img/logo-mark.png`,
    address: { "@type": "PostalAddress", addressLocality: lang === "ar" ? "الرياض" : "Riyadh", addressCountry: "SA" },
    geo: { "@type": "GeoCoordinates", latitude: config.geo.lat, longitude: config.geo.lng },
    areaServed: { "@type": "Country", name: "SA" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "10:00", closes: "22:00"
    },
    // sameAs ties the business entity to its social profiles (GEO / knowledge graph).
    sameAs: config.socials.map((s) => s.url),
    inLanguage: lang
  };
}
/* Every page carries a WebPage node with explicit dates — search and answer
   engines use them as the freshness signal (nothing else on the page dates it). */
function webPage(lang, url, name, desc) {
  return {
    "@type": "WebPage",
    "@id": url + "#webpage",
    url,
    name,
    description: desc,
    inLanguage: lang,
    isPartOf: { "@id": BASE + "/#website" },
    about: { "@id": BASE + "/#business" },
    datePublished: config.contentPublished,
    dateModified: config.contentUpdated
  };
}

function faqPage(items) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
}
function serviceSchema(lang, s) {
  const c = s[lang];
  return {
    "@type": "Service",
    name: c.title,
    serviceType: c.title,
    description: c.metaDesc,
    provider: { "@id": BASE + "/#business" },
    areaServed: { "@type": "Country", name: "SA" },
    url: absSvc(lang, s.slug),
    inLanguage: lang
  };
}
function breadcrumb(lang, s) {
  const t = ui[lang];
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: absHome(lang) },
      { "@type": "ListItem", position: 2, name: t.breadcrumbServices, item: absHome(lang) + "#services" },
      { "@type": "ListItem", position: 3, name: s[lang].title, item: absSvc(lang, s.slug) }
    ]
  };
}
const jsonForInlineScript = (value) => JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (char) => ({
  "<": "\\u003C",
  ">": "\\u003E",
  "&": "\\u0026",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
})[char]);
const jsonLd = (obj) =>
  `<script type="application/ld+json">${jsonForInlineScript({ "@context": "https://schema.org", ...obj })}</script>`;

/* ---------- Analytics loader (first-party external file, CSP-safe) ----------
   The Google Tag Manager bootstrap can't be inlined (strict no-inline-script
   CSP + tests), so it ships as a same-origin file that injects gtm.js.
   GA4 (G-M2GX0NVW5E) is added as a tag *inside* the GTM container. */
function analyticsJs() {
  return `"use strict";
// Google Tag Manager loader — generated from config.gtm (${config.gtm}).
// Injects the container via createElement + insertBefore only, with no dynamic
// markup or code sinks, so it stays CSP- and audit-clean. GA4 is configured as
// a tag inside the GTM container.
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0];
  var j = d.createElement(s);
  var dl = l !== "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", ${JSON.stringify(config.gtm)});
`;
}

/* ---------- <head> + document shell ---------- */
function docStart({ lang, title, desc, canonical, altAr, altEn, schemas, noindex }) {
  const t = ui[lang];
  const dir = t.dir;
  const graph = jsonLd({ "@graph": schemas });
  const svcItems = config.serviceOrder
    .map((slug) => `<span class="preloader__svc-item">${esc(t.serviceNames[slug])}</span>`)
    .join("\n        ");
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="${asset("assets/js/bootstrap.js")}"></script>${config.gtm ? `\n  <script src="${asset("assets/js/analytics.js")}" async></script>` : ""}
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="theme-color" content="#011e22">
  <meta name="color-scheme" content="dark light">${noindex ? `\n  <meta name="robots" content="noindex, follow">` : ""}
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="ar" href="${altAr}">
  <link rel="alternate" hreflang="en" href="${altEn}">
  <link rel="alternate" hreflang="x-default" href="${BASE}/">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="${lang === "ar" ? "ar_AR" : "en_US"}">
  <meta property="og:site_name" content="${esc(t.brand)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${IMG}/assets/img/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(lang === "ar" ? "شعار من الصفر إلى الواحد لاستعادة البيانات" : "Zero 2 One Data Recovery logo")}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${IMG}/assets/img/og.png">${config.cdn ? `\n  <link rel="preconnect" href="${config.cdn}" crossorigin>` : ""}
  <link rel="preload" href="/assets/fonts/alexandria-arabic.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/alexandria-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${asset("assets/css/fonts.css")}">
  <link rel="stylesheet" href="${asset("assets/css/main.css")}">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
  <link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon-48.png">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  ${graph}
</head>
<body>${config.gtm ? `\n  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${config.gtm}" class="gtm-noscript" title="Google Tag Manager"></iframe></noscript>` : ""}
  <div class="preloader" id="preloader" aria-hidden="true">
    <div class="preloader__inner">
      <span class="preloader__wm">
        <span class="preloader__l">zero2one</span>
        <span class="preloader__b">data recovery</span>
      </span>
      <span class="preloader__svc">
        ${svcItems}
      </span>
    </div>
  </div>
  <a class="skip-link" href="#main">${esc(t.skip)}</a>`;
}

/* ---------- Header / Footer (shared) ---------- */
function logo(lang) {
  // Brand mark (extracted + optimised from the supplied artwork) + wordmark.
  // The lockup is aria-hidden because the surrounding link already carries the
  // brand name, so the alt text is there for crawlers rather than screen readers.
  const alt = lang === "ar"
    ? "شعار من الصفر إلى الواحد لاستعادة البيانات في الرياض"
    : "Zero 2 One Data Recovery logo — data recovery in Riyadh";
  return `<span class="logo" aria-hidden="true">
      <img class="logo__mark" src="/assets/img/logo-mark.png" alt="${esc(alt)}" width="92" height="120" decoding="async">
      <span class="logo__wm"><b>Zero&nbsp;2&nbsp;One</b><i>DATA&nbsp;RECOVERY</i></span>
    </span>`;
}

function header(lang) {
  const t = ui[lang];
  const o = t.otherLang;
  const menuLabel = lang === "ar" ? "القائمة" : "Menu";
  const closeLabel = lang === "ar" ? "إغلاق القائمة" : "Close menu";
  const brandLabel = lang === "ar" ? "من الصفر إلى الواحد — Zero 2 One Data Recovery" : "Zero 2 One Data Recovery";
  const item = (href, label, attrs = "") => `
          <li><a href="${href}"${attrs}>${esc(label)}</a></li>`;
  // data-home-link lets main.js scroll straight to the hero when we are already
  // on the homepage, instead of triggering a full reload.
  const homeItem = item(`${homeUrl(lang)}#hero`, t.nav.home, " data-home-link");
  const aboutItem = item(`${homeUrl(lang)}#about`, t.nav.about);
  const servicesItem = item(`${homeUrl(lang)}#services`, t.nav.services);
  const processItem = item(`${homeUrl(lang)}#process`, t.nav.process);
  const faqItem = item(`${homeUrl(lang)}#faq`, t.nav.faq);
  const contactItem = item(contactUrl(lang), t.nav.contact);
  // Not conditional on posts.length like the old articles link: /blog/ is built
  // by a separate pipeline this generator cannot see, so gating on local state
  // would drop the link whenever the two repositories are checked out apart.
  const blogItem = item(blogUrl(lang), t.blogLabel);

  // Top bar. No contact link — the accent button beside it goes to the same
  // page, so the row offered two controls for one destination. The blog sits
  // exactly where it sits in the drawer, immediately before the FAQ, so both
  // menus read in the same order.
  const links = servicesItem + processItem + aboutItem + blogItem + faqItem;

  // Drawer order is the client's, given on 2026-08-18:
  //   home · about · services · blog · FAQ · contact · then the remainder.
  // "How it works" was not named in that list, so it sits in the remainder,
  // ahead of the city group. Say the word and it moves.
  //
  // The city pages hang off the drawer rather than the footer: the footer's
  // quick-links row was removed by the client earlier, and these pages still
  // need a real internal link on every page — a sitemap entry alone makes them
  // crawlable but passes them no internal link equity.
  //
  // Cities render as a wrapped row of chips, not stacked rows: three short
  // proper nouns down the full drawer width read as three sections rather than
  // three siblings of one group, and cost three times the vertical space.
  const cityLinks = cities.length ? `
          <li class="drawer__group">${esc(t.citiesLabel)}</li>
          <li class="drawer__cities">` + cities
    .map((c) => `<a class="drawer__city" href="${cityUrl(lang, c.slug)}">${esc(c[lang].city)}</a>`).join("") + `</li>` : "";
  const drawerLinks = homeItem + aboutItem + servicesItem + blogItem
    + faqItem + contactItem + processItem + cityLinks;
  return `
  <header class="site-header" id="top">
    <div class="container header__inner">
      <a class="brand" href="${homeUrl(lang)}" aria-label="${esc(brandLabel)}">${logo(lang)}</a>
      <nav class="nav" aria-label="${esc(menuLabel)}">
        <ul class="nav__list">${links}
        </ul>
      </nav>
      <a class="btn btn--accent header__cta" href="${contactUrl(lang)}">${esc(t.evalBtn)}</a>
    </div>
  </header>
  <button class="menu-fab on-dark" type="button" aria-label="${esc(menuLabel)}" aria-expanded="false" aria-controls="site-drawer">
    <span class="menu-fab__lines"><span></span><span></span><span></span></span>
  </button>
  <div class="drawer-scrim" data-drawer-close></div>
  <aside class="drawer" id="site-drawer" aria-label="${esc(menuLabel)}" aria-hidden="true">
    <div class="drawer__head">
      <span class="drawer__brand">${esc(t.brand)}</span>
      <button class="drawer__close" type="button" aria-label="${esc(closeLabel)}" data-drawer-close>
        <span></span><span></span>
      </button>
    </div>
    <nav class="drawer__nav" aria-label="${esc(menuLabel)}">
      <ul>${drawerLinks}
      </ul>
    </nav>
    <div class="drawer__foot">
      <a class="lang-switch" href="__LANGSWITCH__" hreflang="${o}" lang="${o}">${esc(t.other)}</a>
    </div>
  </aside>${whatsappFab(lang)}`;
}

// `minimal` = the contact-page footer: brand + local time + rights only
// (no CTA block, no contact pills, no socials — those already live on the page).
function footer(lang, minimal) {
  const t = ui[lang];
  const f = t.footer;
  const socials = config.socials
    .map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener" aria-label="${esc(s.name)}">
            <span class="social-ic">${icons.social[s.icon]}</span><span class="social-name">${esc(s.name)}</span>
          </a></li>`)
    .join("\n          ");

  /* روابط سريعة. حُذف هذا الصف سابقًا بطلب العميل، وأعاد طلبه في 2026-08-19
     — هذه المرة أزرارًا بنمط صفّ التواصل الذي فوقه مباشرة، فيقرأ الاثنان
     كعائلة واحدة. والترتيب يتبع الدرج فلا تتناقض قائمتان.

     و/articles/ هنا ولا مكان آخر: رابط الدرج استُبدل بالمدونة، فبقيت تلك
     الصفحات موصولة ببعضها وبخريطة الموقع وحدها — تُزحف ولا يصلها وزن رابط
     داخلي واحد. */
  const quickLinks = [
    [`${homeUrl(lang)}#hero`, t.nav.home],
    [`${homeUrl(lang)}#about`, t.nav.about],
    [`${homeUrl(lang)}#services`, t.nav.services],
    [blogUrl(lang), t.blogLabel],
    [`${homeUrl(lang)}#faq`, t.nav.faq],
    [contactUrl(lang), t.nav.contact],
    [`${homeUrl(lang)}#process`, t.nav.process],
    [articlesUrl(lang), t.articlesLabel],
    ...cities.map((c) => [cityUrl(lang, c.slug), c[lang].city]),
  ]
    .map(([href, label]) => `<li><a class="footer-pill" href="${href}">${esc(label)}</a></li>`)
    .join("\n          ");

  const metaBlocks = `
        <div class="footer__meta">
          <div class="footer__meta-block">
            <h3 class="footer__col-title">${esc(f.version)}</h3>
            <p>${esc(f.edition)} · ${esc(t.brand)}</p>
            <p>${esc(f.rights)}.</p>
          </div>
          <div class="footer__meta-block">
            <h3 class="footer__col-title">${esc(f.localTime)}</h3>
            <p><span id="localTime" data-tz="${config.timezone}" dir="ltr">—</span></p>
          </div>
        </div>`;

  const legal = `
      <div class="footer__legal">
        <span>© <span dir="ltr">2026</span> ${esc(t.brand)} · ${esc(f.rights)}</span>
        <a href="${privacyUrl(lang)}" class="footer__legal-link">${esc(f.privacy)}</a>
      </div>`;

  if (minimal) {
    return `
  <footer class="footer footer--minimal section--footer" aria-label="${esc(t.brand)}">
    <div class="container">
      <p class="footer__brand">${esc(t.brand)}</p>
      <div class="footer__divider" role="presentation"></div>
      <div class="footer__bottom">${metaBlocks}
      </div>${legal}
    </div>
  </footer>`;
  }

  return `
  <footer class="footer section--footer" aria-labelledby="footer-brand">
    <div class="container">
      <div class="footer__cta">
        <span class="footer__cta-icon">${icons.arrowUR}</span>
        <p class="footer__cta-eyebrow">${esc(f.ctaEyebrow)}</p>
        <h2 class="footer__cta-title" id="footer-brand">${esc(f.ctaTitle)}</h2>
        <a class="btn btn--accent footer__cta-btn" href="${contactUrl(lang)}">${esc(f.ctaBtn)} <span aria-hidden="true">${fwd(lang)}</span></a>
      </div>

      <p class="footer__brand">${esc(t.brand)}</p>
      <div class="footer__divider" role="presentation"></div>

      <div class="footer__contacts">
        <a class="footer-pill" href="${config.mapsUrl}" target="_blank" rel="noopener">
          <span class="footer-pill__ic">${icons.location}</span><span>${esc(f.location)} · ${esc(f.addressLine)}</span>
        </a>
        <a class="footer-pill" href="tel:${config.phoneHref}">
          <span class="footer-pill__ic">${icons.phone}</span><span dir="ltr">${esc(config.phoneDisplay)}</span>
        </a>
        <a class="footer-pill" href="${wa()}" target="_blank" rel="noopener">
          <span class="footer-pill__ic">${icons.whatsapp}</span><span>${esc(f.whatsapp)}</span>
        </a>
        <a class="footer-pill" href="mailto:${config.email}">
          <span class="footer-pill__ic">${icons.email}</span><span dir="ltr">${esc(config.email)}</span>
        </a>
      </div>

      <nav class="footer__quick" aria-label="${esc(f.quick)}">
        <h3 class="footer__col-title">${esc(f.quick)}</h3>
        <ul>
          ${quickLinks}
        </ul>
      </nav>

      <div class="footer__divider footer__divider--thin" role="presentation"></div>

      <div class="footer__bottom">${metaBlocks}
        <div class="footer__socials">
          <h3 class="footer__col-title">${esc(f.socials)}</h3>
          <ul>
          ${socials}
          </ul>
        </div>
      </div>${legal}
    </div>
  </footer>`;
}

function docEnd() {
  return `
  <script src="${asset("assets/js/main.js")}" defer></script>
  <script src="${asset("assets/js/vendor/gsap.min.js")}" defer></script>
  <script src="${asset("assets/js/vendor/ScrollTrigger.min.js")}" defer></script>
  <script src="${asset("assets/js/anim.js")}" defer></script>
</body>
</html>`;
}

/* ---------- Data-core visual ---------- */
function dataCore(dark) {
  return `<div class="data-core${dark ? " data-core--dark" : ""}" aria-hidden="true">
        <span class="data-core__ring"></span><span class="data-core__ring"></span>
        <span class="data-core__ring"></span><span class="data-core__ring"></span>
        <span class="data-core__dot"></span>
      </div>`;
}

/* ==========================================================================
   Photography helper.
   The site currently ships zero raster images — every graphic is CSS — which is
   a large part of why it holds 100/100 on desktop. The moment real lab photos
   land that stops being free, so images go through this one helper: WebP, an
   explicit intrinsic size (no layout shift), lazy loading below the fold, and a
   2-width srcset. Source art should be exported at 1600px wide; the 800px
   variant is expected alongside it as <name>-800.webp.
   ========================================================================== */
function photo({ dir, file, alt, w = 1600, h = 1067, sizes = "(max-width: 720px) 100vw, 50vw", eager = false }) {
  const base = `assets/img/${dir}/${file}`;
  return `<img src="${asset(`${base}.webp`)}" srcset="${asset(`${base}-800.webp`)} 800w, ${asset(`${base}.webp`)} 1600w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}>`;
}

/* ==========================================================================
   Trust sections.
   Both audits named the missing human element as the site's weakest point. The
   confidentiality block ships now because it states a policy the business has
   confirmed. The three below it render ONLY when `socialProof` in site.js holds
   real data — the markup is finished and waiting, but nothing is invented, so
   the site never shows an empty testimonial rail or a fabricated review.
   ========================================================================== */
function confidentialityBlock(lang) {
  const t = ui[lang];
  return `
        <aside class="assure">
          <p class="assure__title">${esc(t.confidentialTitle)}</p>
          <p class="assure__body">${esc(t.confidentialBody)}</p>
          <p class="assure__tag">${esc(t.freeCheck)}</p>
        </aside>`;
}

function testimonialsSection(lang) {
  const list = socialProof.testimonials;
  if (!list.length) return "";
  const t = ui[lang];
  const title = lang === "ar" ? "ماذا قال من سلّمنا أجهزتهم" : "What customers who trusted us say";
  const eyebrow = lang === "ar" ? "آراء العملاء" : "Testimonials";
  return `

    <section class="section section--light" id="testimonials" aria-labelledby="tst-title">
      <div class="container">
        ${sectionHead(eyebrow, "tst-title", title, "", "")}
        <ul class="tst">
          ${list.map((x) => `<li class="tst__item">
            <blockquote class="tst__quote">${esc(x[lang].quote)}</blockquote>
            <p class="tst__who"><span class="tst__name">${esc(x[lang].name)}</span><span class="tst__role">${esc(x[lang].role)}</span></p>
          </li>`).join("\n          ")}
        </ul>
        ${t.reassure ? `<p class="reassure reassure--center">${esc(t.reassure)}</p>` : ""}
      </div>
    </section>`;
}

function clientLogosSection(lang) {
  const list = socialProof.clientLogos;
  if (!list.length) return "";
  const label = lang === "ar" ? "جهات وشركات تعاملنا معها" : "Organisations we have worked with";
  return `

    <section class="section section--dark logos" aria-label="${esc(label)}">
      <div class="container">
        <p class="logos__label">${esc(label)}</p>
        <ul class="logos__row">
          ${list.map((c) => `<li class="logos__item"><img src="${asset(`assets/img/clients/${c.file}.webp`)}" width="160" height="60" alt="${esc(c.name)}" loading="lazy" decoding="async"></li>`).join("\n          ")}
        </ul>
      </div>
    </section>`;
}

function labPhotosSection(lang) {
  const list = socialProof.labPhotos;
  if (!list.length) return "";
  const eyebrow = lang === "ar" ? "داخل المختبر" : "Inside the lab";
  const title = lang === "ar" ? "المكان الذي يُفحص فيه جهازك." : "Where your device is inspected.";
  return `

    <section class="section section--light" id="lab" aria-labelledby="lab-title">
      <div class="container">
        ${sectionHead(eyebrow, "lab-title", title, "", "")}
        <ul class="lab">
          ${list.map((p) => `<li class="lab__item">${photo({ dir: "lab", file: p.file, alt: p[lang].alt })}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>`;
}

const trustSections = (lang) => testimonialsSection(lang) + clientLogosSection(lang) + labPhotosSection(lang);

/* ---------- Homepage ---------- */
function homePage(lang) {
  const t = ui[lang];
  const h = home[lang];
  const schemas = [
    localBusiness(lang),
    { "@type": "WebSite", "@id": BASE + "/#website", url: absHome(lang), name: t.brand, inLanguage: lang },
    webPage(lang, absHome(lang), h.metaTitle, h.metaDesc),
    faqPage(h.faq.items)
  ];
  let html = docStart({
    lang, title: h.metaTitle, desc: h.metaDesc,
    canonical: absHome(lang), altAr: absHome("ar"), altEn: absHome("en"), schemas
  });
  html += header(lang);
  html += `
  <main id="main">
    <section class="hero section--dark" id="hero" aria-labelledby="hero-title">
      <div class="container hero__inner">
        <div class="hero__copy">
          <p class="eyebrow">${esc(h.hero.eyebrow)}</p>
          <h1 class="hero__title" id="hero-title">${esc(h.hero.title)}</h1>
          <p class="hero__lead">${esc(h.hero.lead)}</p>
          <div class="hero__actions">
            <a class="btn btn--accent" href="${contactUrl(lang)}">${esc(t.nav.contact)} <span aria-hidden="true">${fwd(lang)}</span></a>
            <a class="link-arrow" href="${wa()}" rel="noopener">${esc(t.whatsappBtn)} <span aria-hidden="true">${fwd(lang)}</span></a>
          </div>
          <p class="reassure">${esc(t.reassure)}</p>
        </div>
        <div class="hero__visual">${dataCore(false)}</div>
      </div>
      <div class="container">
        <div class="trust">
          <p class="trust__intro">${esc(h.trustIntro)}</p>
          <dl class="trust__metrics">
            ${h.metrics.map((m) => `<div class="metric"><dt class="metric__value" dir="ltr">${esc(m.v)}</dt><dd class="metric__label">${esc(m.l)}</dd></div>`).join("\n            ")}
          </dl>
        </div>
      </div>
      <div class="ticker" role="note">
        <div class="ticker__track"><span>${esc(h.ticker)}</span><span aria-hidden="true">${esc(h.ticker)}</span></div>
      </div>
    </section>

    <section class="section section--light" aria-labelledby="problem-title">
      <div class="container">
        ${sectionHead(h.problem.eyebrow, "problem-title", h.problem.title, h.problem.noteStrong, h.problem.note)}
        <ul class="cases">
          ${h.problem.cases.map((c, i) => `<li class="case-card"><span class="case-card__num" dir="ltr">${pad(i + 1)}</span><h3 class="case-card__title">${esc(c.t)}</h3><p class="case-card__text">${esc(c.b)}</p></li>`).join("\n          ")}
        </ul>
        <p class="section-foot">${esc(h.problem.foot)}</p>
      </div>
    </section>

    <section class="section section--dark" id="services" aria-labelledby="services-title">
      <div class="container">
        ${sectionHead(h.services.eyebrow, "services-title", h.services.title, h.services.noteStrong, h.services.note)}
        <ul class="services">
          ${h.services.rows.map((r, i) => serviceRow(lang, r, i)).join("\n          ")}
        </ul>
        <div class="services-foot">
          <span class="services-foot__tag">${esc(h.services.footTag)}</span>
          <p class="services-foot__text">${esc(h.services.footText)}</p>
        </div>
      </div>
    </section>

    <section class="section section--light" id="process" aria-labelledby="process-title">
      <div class="container">
        ${sectionHead(h.process.eyebrow, "process-title", h.process.title, h.process.noteStrong, "")}
        <ol class="steps">
          ${h.process.steps.map((s, i) => `<li class="step"><span class="step__num">${pad(i + 1)}</span><span class="step__mark" aria-hidden="true"></span><h3 class="step__title">${esc(s.t)}</h3><p class="step__text">${esc(s.b)}</p></li>`).join("\n          ")}
        </ol>
        <div class="stop">
          <p class="stop__title">${esc(h.process.stopTitle)}</p>
          <ol class="stop__rules">
            ${h.process.stopRules.map((r, i) => `<li><span dir="ltr">${pad(i + 1)}</span> ${esc(r)}</li>`).join("\n            ")}
          </ol>
          <div class="stop__action">
            <p class="stop__label">${esc(h.process.stopLabel)}</p>
            <a class="btn btn--dark" href="${contactUrl(lang)}">${esc(h.process.stopBtn)} <span aria-hidden="true">${fwd(lang)}</span></a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--dark" id="about" aria-labelledby="about-title">
      <div class="container experience__inner">
        <div class="experience__copy">
          <p class="eyebrow eyebrow--accent">${esc(h.experience.eyebrow)}</p>
          <h2 class="section-title" id="about-title">${esc(h.experience.title)}</h2>
          <p class="experience__lead">${esc(h.experience.lead)}</p>
          <p class="experience__tags">${esc(h.experience.tags)}</p>
          <div class="brand-story">
            <h3 class="brand-story__title">${esc(h.experience.storyTitle)}</h3>
            <p class="brand-story__body">${esc(h.experience.storyBody)}</p>
          </div>
        </div>
        <div class="metrics-grid">
          <div class="metrics-grid__cell metrics-grid__feature">
            <span class="metrics-grid__feature-eyebrow">${esc(h.experience.rankEyebrow)}</span>
            <div class="metrics-grid__feature-main">
              <span class="metrics-grid__rank" dir="ltr">${esc(h.experience.rankValue)}</span>
              <span class="metrics-grid__feature-text">${esc(h.experience.rankText)}</span>
            </div>
          </div>
          <div class="metrics-grid__cell metrics-grid__cell--top"><span class="metrics-grid__value" dir="ltr">${esc(h.metrics[0].v)}</span><span class="metrics-grid__label">${esc(h.metrics[0].l)}</span></div>
          <div class="metrics-grid__cell metrics-grid__cell--accent"><span class="metrics-grid__value" dir="ltr">${esc(h.metrics[2].v)}</span><span class="metrics-grid__label">${esc(h.metrics[2].l)}</span></div>
          <div class="metrics-grid__cell metrics-grid__cell--cases"><span class="metrics-grid__value" dir="ltr">${esc(h.metrics[1].v)}</span><span class="metrics-grid__label">${esc(h.metrics[1].l)}</span></div>
          <div class="metrics-grid__cell metrics-grid__cell--foot"><span class="metrics-grid__index" dir="ltr">01</span><span class="metrics-grid__principle">${esc(h.experience.principle)}</span></div>
        </div>
      </div>
    </section>

    <section class="section section--light" id="faq" aria-labelledby="faq-title">
      <div class="container">
        ${sectionHead(h.faq.eyebrow, "faq-title", h.faq.title, h.faq.noteStrong, "")}
        <div class="faq">
          <aside class="faq__aside">
            <p class="note-strong">${esc(h.faq.asideStrong)}</p>
            <p class="note">${esc(h.faq.asideNote)}</p>
          </aside>
          <div class="faq__rows">
            ${h.faq.items.map((f, i) => faqRow(f, i)).join("\n            ")}
          </div>
        </div>
      </div>
    </section>

${trustSections(lang)}

    <section class="section contact section--accent" id="contact" aria-labelledby="contact-title">
      <div class="container contact__inner">
        <div class="contact__copy">
          <p class="eyebrow">${esc(h.contact.eyebrow)}</p>
          <h2 class="contact__title" id="contact-title">${esc(h.contact.title)}</h2>
          <p class="contact__lead">${esc(h.contact.lead)}</p>
          <a class="btn btn--dark" href="${wa()}" rel="noopener">${esc(t.whatsappBtn)} <span aria-hidden="true">${fwd(lang)}</span></a>
          <p class="reassure">${esc(t.reassure)}</p>
        </div>
        <div class="contact__visual">${dataCore(true)}</div>
        ${confidentialityBlock(lang)}
      </div>
    </section>
  </main>`;
  html += footer(lang);
  html += docEnd();
  return html;
}

/* ---------- Service page ---------- */
/* Extra, expertise-based FAQs appended per service (on top of the Figma ones). */
const svcExtraFaqs = {
  "hdd": {
    ar: [
      { q: "كم تستغرق عملية استرجاع بيانات الهارد؟", a: "تختلف حسب نوع العطل وحجم القرص؛ الحالات المنطقية قد تنتهي خلال يوم إلى يومين، بينما تحتاج الأعطال الميكانيكية وقتاً أطول. نعطيك مدة تقديرية واضحة بعد التشخيص." },
      { q: "هل يمكن استرجاع بيانات هارد تعرّض للماء أو الحريق؟", a: "في كثير من الحالات نعم، بشرط عدم تشغيله أو محاولة تجفيفه بنفسك. أبقِه كما هو وسلّمه للفحص بأسرع وقت." },
      { q: "هل تحافظون على سرية الملفات المستعادة؟", a: "نعم، نتعامل مع كل حالة بسرية كاملة ونسلّم البيانات على وسيط منفصل، مع إمكانية توقيع اتفاقية سرية عند الحاجة." }
    ],
    en: [
      { q: "How long does hard drive recovery take?", a: "It depends on the fault type and disk size; logical cases can finish within a day or two, while mechanical faults take longer. We give a clear estimate after diagnosis." },
      { q: "Can data be recovered from a water- or fire-damaged drive?", a: "In many cases yes—provided you don't power it on or try to dry it yourself. Leave it as is and bring it in for inspection quickly." },
      { q: "Do you keep the recovered files confidential?", a: "Yes. Every case is handled with full confidentiality and delivered on a separate medium, with an NDA available on request." }
    ]
  },
  "ssd-nvme": {
    ar: [
      { q: "هل تمنع ميزة TRIM استرجاع بيانات SSD؟", a: "TRIM قد تقلّل فرص الاستعادة لأنها تمسح الخلايا المحذوفة، لذلك السرعة في التوقف عن الاستخدام عامل حاسم في النتيجة." },
      { q: "هل يمكن استرجاع بيانات SSD مشفّر (BitLocker أو FileVault)؟", a: "ممكن إذا توفّر مفتاح فك التشفير أو كلمة المرور؛ بدونها تبقى البيانات مشفّرة حتى لو استُعيدت فيزيائياً." },
      { q: "قرص NVMe لا يظهر في BIOS، هل من فائدة؟", a: "نعم، قد يكون العطل في وحدة التحكم أو الـFirmware؛ نفحص القرص على مستوى أعمق من نظام التشغيل لتحديد الإمكانية." }
    ],
    en: [
      { q: "Does TRIM prevent SSD data recovery?", a: "TRIM can lower the odds because it wipes deleted cells, so how quickly you stop using the drive is a decisive factor in the outcome." },
      { q: "Can data be recovered from an encrypted SSD (BitLocker or FileVault)?", a: "Yes, if the decryption key or password is available; without it the data stays encrypted even after a physical recovery." },
      { q: "The NVMe isn't detected in BIOS — is it still worth it?", a: "Yes. The fault may be in the controller or firmware; we inspect the drive below the operating-system level to assess the possibility." }
    ]
  },
  "raid-servers": {
    ar: [
      { q: "ما مستويات RAID التي تتعاملون معها؟", a: "نتعامل مع RAID 0 و1 و5 و6 و10 وأنظمة NAS وSAN، مع إعادة بناء منطقي للمصفوفة دون الكتابة على الأقراص الأصلية." },
      { q: "هل أرسل كل الأقراص أم قرصاً واحداً؟", a: "أرسل كل أقراص المصفوفة مع ترقيمها بترتيبها الأصلي؛ استعادة RAID تحتاج قراءة الأقراص مجتمعة لفهم توزيع البيانات." },
      { q: "هل يمكن الاستعادة والسيرفر ما زال يعمل؟", a: "أوقف السيرفر فوراً؛ الاستمرار في التشغيل أو إعادة البناء التلقائي قد يضاعف الضرر. نعمل على نسخ من الأقراص لا على الأصل." }
    ],
    en: [
      { q: "Which RAID levels do you handle?", a: "RAID 0, 1, 5, 6 and 10, plus NAS and SAN systems — rebuilt logically without writing to the original disks." },
      { q: "Should I send all disks or just one?", a: "Send every disk in the array, labelled in its original order; RAID recovery needs the disks read together to understand how data is distributed." },
      { q: "Can you recover while the server is still running?", a: "Stop the server immediately — continuing to run it or letting it auto-rebuild can multiply the damage. We work on images of the disks, never the originals." }
    ]
  },
  "cctv": {
    ar: [
      { q: "كم مدة بقاء التسجيلات قبل أن تُستبدل؟", a: "تعتمد على سعة القرص وعدد الكاميرات وجودة التسجيل؛ لذلك أوقف الجهاز فوراً لأن كل تسجيل جديد قد يكتب فوق المطلوب." },
      { q: "هل يمكن استرجاع تسجيلات من هارد DVR بعد الفورمات؟", a: "في حالات كثيرة نعم، طالما لم يُسجَّل فوقها؛ نفحص نظام الملفات الخاص بالجهاز لاستخراج المقاطع." },
      { q: "هل تدعمون أنظمة Hikvision وDahua؟", a: "نعم، ونتعامل مع أنظمة التسجيل الشائعة الأخرى؛ نحلّل صيغة التخزين الخاصة بكل جهاز قبل الاستخراج." }
    ],
    en: [
      { q: "How long before recordings get overwritten?", a: "It depends on disk capacity, number of cameras and recording quality — so power the unit off immediately, since every new recording can overwrite what you need." },
      { q: "Can footage be recovered from a formatted DVR drive?", a: "In many cases yes, as long as it wasn't recorded over; we inspect the device's proprietary file system to extract the clips." },
      { q: "Do you support Hikvision and Dahua systems?", a: "Yes, along with other common recorder brands; we analyse each device's storage format before extraction." }
    ]
  },
  "after-format": {
    ar: [
      { q: "هل يختلف الاسترجاع بعد الفورمات السريع عن الكامل؟", a: "الفورمات السريع يترك البيانات قابلة للاستعادة غالباً، أما الفورمات الكامل فيقلّل الفرص كثيراً لأنه يكتب على القرص بالكامل." },
      { q: "عملت فورمات وثبّت نظاماً جديداً، هل من أمل؟", a: "قد يبقى جزء كبير من البيانات قابلاً للاستعادة إذا لم تُكتب ملفات كثيرة بعد ذلك؛ توقّف عن استخدام القرص وسلّمه للفحص." },
      { q: "فلاشة أو بطاقة تطلب التهيئة عند التوصيل، ماذا أفعل؟", a: "لا تعمل لها فورمات؛ غالباً يكون العطل في نظام الملفات ويمكن استخراج البيانات قبل أي إصلاح." }
    ],
    en: [
      { q: "Is recovery after a quick format different from a full format?", a: "A quick format usually leaves data recoverable, while a full format greatly lowers the odds because it writes across the whole disk." },
      { q: "I formatted and installed a new OS — any hope?", a: "A large part of the data may still be recoverable if not much has been written since; stop using the disk and bring it in for inspection." },
      { q: "A USB or card asks to be formatted on connection — what do I do?", a: "Don't format it; the fault is usually in the file system and the data can often be extracted before any repair." }
    ]
  },
  "ransomware": {
    ar: [
      { q: "هل يمكن فك تشفير الفدية دائماً؟", a: "ليس دائماً؛ بعض العائلات لها أدوات فك معروفة وبعضها لا. نبدأ بتحديد نوع الإصابة وتقييم الخيارات المتاحة والنسخ الاحتياطية قبل أي وعد." },
      { q: "هل أدفع الفدية؟", a: "لا يُنصح بالدفع؛ فهو لا يضمن استعادة البيانات وقد يشجّع على استهدافك مجدداً. قيّم كل الخيارات التقنية أولاً." },
      { q: "كيف أحمي بياناتي من الفدية مستقبلاً؟", a: "نسخ احتياطية منفصلة وغير متصلة دائماً، تحديث الأنظمة، وتقييد الصلاحيات؛ يمكننا مساعدتك في وضع خطة حماية بعد الاستعادة." }
    ],
    en: [
      { q: "Can ransomware always be decrypted?", a: "Not always; some families have known decryptors and some don't. We start by identifying the infection and assessing the options and backups before making any promise." },
      { q: "Should I pay the ransom?", a: "Paying is not advised — it doesn't guarantee recovery and can mark you as a repeat target. Evaluate all technical options first." },
      { q: "How do I protect my data from ransomware in future?", a: "Keep separate, offline backups, patch your systems, and limit permissions; we can help you set up a protection plan after recovery." }
    ]
  },
  "phones": {
    ar: [
      { q: "هل يمكن استعادة بيانات جوال مقفل برمز؟", a: "يعتمد ذلك على النظام وإصداره وطريقة القفل. التشفير في الأجهزة الحديثة مرتبط بالرمز نفسه، لذلك نوضح لك حدود الممكن بعد فحص الجهاز، ولا نعد بنتيجة قبل ذلك." },
      { q: "هل تحتاجون حساب iCloud أو Google الخاص بي؟", a: "لا نطلب كلمات المرور في مرحلة الفحص. إذا كانت الاستعادة تتطلب إثبات ملكية الجهاز أو فك القفل، نوضح ذلك لك مسبقاً وتبقى بياناتك تحت سيطرتك." },
      { q: "هل تتلف عملية الاستعادة الجهاز؟", a: "بعض الحالات تتطلب فتح الجهاز أو العمل على اللوحة مباشرة، وهذا قد يؤثر على صلاحيته للاستخدام لاحقاً. نخبرك بذلك قبل البدء لأن الهدف هو البيانات لا إصلاح الجهاز." }
    ],
    en: [
      { q: "Can data be recovered from a phone locked with a passcode?", a: "It depends on the system, its version and the lock method. Encryption on modern devices is tied to the passcode itself, so we explain the limits after inspecting the device and never promise a result before that." },
      { q: "Do you need my iCloud or Google account?", a: "We don't ask for passwords at the inspection stage. If recovery requires proof of ownership or unlocking, we tell you up front and your data stays under your control." },
      { q: "Does the recovery process damage the device?", a: "Some cases require opening the device or working directly on the board, which can affect whether it stays usable afterwards. We tell you before starting, because the goal is the data, not repairing the phone." }
    ]
  },
  "memory-cards": {
    ar: [
      { q: "بطاقة SD لا تظهر إطلاقاً، هل من فائدة؟", a: "قد يكون العطل في وحدة التحكم أو في الوصلات الداخلية. في هذه الحالات تُقرأ شريحة الذاكرة نفسها، والنتيجة تعتمد على حالة الشريحة ونوع البطاقة." },
      { q: "كم تستغرق استعادة بطاقة ذاكرة أو فلاش؟", a: "الحالات المنطقية قد تنتهي خلال يوم إلى يومين، أما الوسائط المدمجة أو التالفة كهربائياً فتحتاج وقتاً أطول. نعطيك مدة تقديرية بعد الفحص." },
      { q: "صوّرت على البطاقة بعد الحذف، هل ضاعت الملفات؟", a: "ليس بالضرورة، لكن كل ملف جديد قد يكتب فوق مساحة ملف قديم. توقف عن استخدام البطاقة فوراً؛ ما تبقى يحدده الفحص." }
    ],
    en: [
      { q: "The SD card doesn't show up at all — is it worth trying?", a: "The fault may be in the controller or the internal connections. In those cases the memory chip itself is read, and the result depends on the chip's condition and the card type." },
      { q: "How long does memory card or flash recovery take?", a: "Logical cases can finish within a day or two, while monolithic media or electrically damaged devices take longer. We give a time estimate after inspection." },
      { q: "I shot new photos on the card after deleting — is it lost?", a: "Not necessarily, but every new file can overwrite the space an old one occupied. Stop using the card immediately; what remains is determined by the inspection." }
    ]
  }
};

function nextServiceOf(slug) {
  const order = config.serviceOrder;
  const i = order.indexOf(slug);
  return order[(i + 1) % order.length];
}

/* Depth sections appended to every service page: supported devices, the process
   inside this specific service, and one illustrative case. A slug with no entry
   in build/depth.js renders without them, so adding a service never breaks. */
function serviceDepth(lang, slug) {
  const block = depth[slug];
  if (!block) return "";
  const d = block[lang];
  const t = ui[lang];
  return `
    <section class="section section--light" aria-labelledby="dev-title">
      <div class="container">
        ${sectionHead(t.devicesLabel, "dev-title", d.devicesTitle, d.devicesLead, "")}
        <ul class="devices">
          ${d.devices.map((x) => `<li class="device"><h3 class="device__t">${esc(x.t)}</h3><p class="device__b">${esc(x.b)}</p></li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="section section--dark" aria-labelledby="how-title">
      <div class="container">
        <h2 class="section-title" id="how-title">${esc(d.stepsTitle)}</h2>
        <ol class="how">
          ${d.steps.map((x, i) => `<li class="how__step"><span class="how__n" dir="ltr">${pad(i + 1)}</span><div><h3 class="how__t">${esc(x.t)}</h3><p class="how__b">${esc(x.b)}</p></div></li>`).join("\n          ")}
        </ol>
        <aside class="mini-case">
          <p class="mini-case__label">${esc(t.caseLabel)}</p>
          <h3 class="mini-case__title">${esc(d.caseTitle)}</h3>
          <p class="mini-case__body">${esc(d.caseBody)}</p>
          <p class="mini-case__result"><span class="mini-case__result-k">${esc(t.caseResultLabel)}</span> ${esc(d.caseResult)}</p>
        </aside>
      </div>
    </section>`;
}

function servicePage(lang, s) {
  const t = ui[lang];
  const c = s[lang];
  const allFaqs = c.faqs.concat((svcExtraFaqs[s.slug] || {})[lang] || []);
  const nextSlug = nextServiceOf(s.slug);
  const nextLabel = lang === "ar" ? "الخدمة التالية" : "Next service";
  const schemas = [
    localBusiness(lang),
    webPage(lang, absSvc(lang, s.slug), s[lang].metaTitle, s[lang].metaDesc),
    serviceSchema(lang, s), breadcrumb(lang, s), faqPage(allFaqs)
  ];
  let html = docStart({
    lang, title: c.metaTitle, desc: c.metaDesc,
    canonical: absSvc(lang, s.slug), altAr: absSvc("ar", s.slug), altEn: absSvc("en", s.slug), schemas
  });
  html += header(lang);
  html += `
  <main id="main">
    <section class="hero svc-hero section--dark" aria-labelledby="svc-title">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <a href="${homeUrl(lang)}">${esc(t.breadcrumbHome)}</a><span aria-hidden="true">/</span>
          <a href="${homeUrl(lang)}#services">${esc(t.breadcrumbServices)}</a><span aria-hidden="true">/</span>
          ${esc(shortName(lang, s))}
        </nav>
      </div>
      <div class="container hero__inner">
        <div class="hero__copy">
          <p class="svc-hook">${esc(c.heroHook)}</p>
          <h1 class="hero__title" id="svc-title">${esc(c.title)}</h1>
          <p class="hero__lead">${esc(c.heroIntro)}</p>
          <div class="hero__actions">
            <a class="btn btn--accent" href="${contactUrl(lang)}">${esc(t.startFreeBtn)} <span aria-hidden="true">${fwd(lang)}</span></a>
          </div>
        </div>
        <div class="hero__visual">${dataCore(false)}</div>
      </div>
      <div class="container">
        <dl class="trust-strip">
          ${t.trust.map((m) => `<div class="metric"><dt class="metric__value" dir="ltr">${esc(m.v)}</dt><dd class="metric__label">${esc(m.l)}</dd></div>`).join("\n          ")}
        </dl>
      </div>
    </section>

    <section class="section section--light" aria-labelledby="sym-title">
      <div class="container">
        ${sectionHead(c.symHook, "sym-title", c.symTitle, "", "")}
        <ul class="cases">
          ${c.symptoms.map((sy, i) => `<li class="case-card"><span class="case-card__num" dir="ltr">${pad(i + 1)}</span><h3 class="case-card__title">${esc(sy.t)}</h3><p class="case-card__text">${esc(sy.b)}</p></li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="section section--dark" aria-labelledby="diag-title">
      <div class="container">
        <p class="eyebrow eyebrow--accent">${esc(c.diagHook)}</p>
        <div class="diag">
          <div class="diag__main">
            <h2 class="diag__title" id="diag-title">${esc(c.diagTitle)}</h2>
            <p class="diag__body">${esc(c.diagBody)}</p>
            <div class="diag__steps">
              ${t.steps.map((st, i) => `<div class="step-chip"><span class="step-chip__n" dir="ltr">${pad(i + 1)}</span><p class="step-chip__t">${esc(st)}</p></div>`).join("\n              ")}
            </div>
          </div>
          <aside class="warn-box">
            <p class="warn-box__label">${esc(t.dangerLabel)}</p>
            <p class="warn-box__title">${esc(c.warnTitle)}</p>
            <p class="warn-box__body">${esc(c.warnBody)}</p>
          </aside>
        </div>
      </div>
    </section>

    ${serviceDepth(lang, s.slug)}

    <section class="section section--light" id="faq" aria-labelledby="svcfaq-title">
      <div class="container">
        ${sectionHead(t.faqSection, "svcfaq-title", c.faqHook, "", "")}
        <div class="faq__rows">
          ${allFaqs.map((f, i) => faqRow(f, i)).join("\n            ")}
        </div>
      </div>
    </section>

    <section class="section svc-cta" id="contact" aria-labelledby="svccta-title">
      <div class="container svc-cta__inner">
        <div class="svc-cta__action">
          <p class="svc-cta__label">${esc(t.dangerLabel === "Do not do this" ? "Next step" : "الخطوة التالية")}</p>
          <a class="btn btn--dark" href="${contactUrl(lang)}">${esc(t.sendCaseBtn)} <span aria-hidden="true">${fwd(lang)}</span></a>
        </div>
        <div>
          <h2 class="svc-cta__title" id="svccta-title">${esc(c.ctaHook)}</h2>
          <p class="svc-cta__body">${esc(c.ctaBody)}</p>
        </div>
      </div>
    </section>
  </main>

  <a class="svc-next" href="${svcUrl(lang, nextSlug)}" aria-label="${esc(nextLabel)}: ${esc(shortName(lang, { slug: nextSlug }))}">
    <span class="container svc-next__inner">
      <span class="svc-next__label">${esc(nextLabel)}</span>
      <span class="svc-next__name">${esc(shortName(lang, { slug: nextSlug }))}</span>
      <span class="svc-next__arrow" aria-hidden="true">${fwd(lang)}</span>
    </span>
  </a>`;
  html += footer(lang);
  html += docEnd();
  return html;
}

/* ---------- Contact page (front-end only; backend hooks into main.js) ---------- */
function contactPage(lang) {
  const t = ui[lang];
  const c = contact[lang];
  const f = c.fields;
  const schemas = [
    localBusiness(lang),
    { ...webPage(lang, absContact(lang), c.metaTitle, c.metaDesc), "@type": "ContactPage" }
  ];
  const opt = (list, ph) =>
    `<option value="" disabled selected>${esc(ph)}</option>` +
    list.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("");

  const socials = config.socials
    .map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener" aria-label="${esc(s.name)}">
              <span class="social-ic">${icons.social[s.icon]}</span><span>${esc(s.name)}</span>
            </a></li>`).join("\n            ");

  let html = docStart({
    lang, title: c.metaTitle, desc: c.metaDesc,
    canonical: absContact(lang), altAr: absContact("ar"), altEn: absContact("en"), schemas
  });
  html += header(lang);
  html += `
  <main id="main">
    <section class="hero svc-hero section--dark" aria-labelledby="contact-title">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <a href="${homeUrl(lang)}">${esc(t.breadcrumbHome)}</a><span aria-hidden="true">/</span>
          ${esc(t.nav.contact)}
        </nav>
      </div>
      <div class="container">
        <p class="eyebrow eyebrow--accent">${esc(c.eyebrow)}</p>
        <h1 class="hero__title" id="contact-title">${esc(c.title)}</h1>
        <p class="hero__lead">${esc(c.lead)}</p>
      </div>
    </section>

    <section class="section section--light">
      <div class="container contact-grid">
        <form class="cform" id="caseForm" action="/send.php" method="post"
              data-wa="${config.whatsapp}"
              data-sending="${esc(c.sending)}"
              data-ok-title="${esc(c.successTitle)}"
              data-ok-body="${esc(c.successBody)}"
              data-err-title="${esc(c.errorTitle)}"
              data-err-body="${esc(c.errorBody)}">
          <h2 class="cform__title">${esc(c.formTitle)}</h2>

          <div class="cform__row">
            <div class="field">
              <label for="cf-name">${esc(f.name.label)} <span class="req">*</span></label>
              <input id="cf-name" name="name" type="text" required minlength="2" maxlength="100" autocomplete="name"
                     placeholder="${esc(f.name.ph)}" data-label="${esc(f.name.label)}">
            </div>
            <div class="field">
              <label for="cf-phone">${esc(f.phone.label)} <span class="req">*</span></label>
              <input id="cf-phone" name="phone" type="tel" required inputmode="tel" maxlength="20"
                     pattern="[0-9٠-٩+()\\s-]{9,20}" title="${esc(f.phone.ph)}" autocomplete="tel" dir="ltr"
                     placeholder="${esc(f.phone.ph)}" data-label="${esc(f.phone.label)}">
            </div>
          </div>

          <div class="cform__row">
            <div class="field">
              <label for="cf-email">${esc(f.email.label)} <span class="opt">(${esc(c.optional)})</span></label>
              <input id="cf-email" name="email" type="email" maxlength="254" autocomplete="email" dir="ltr"
                     placeholder="${esc(f.email.ph)}" data-label="${esc(f.email.label)}">
            </div>
            <div class="field">
              <label for="cf-urgency">${esc(f.urgency.label)}</label>
              <select id="cf-urgency" name="urgency" data-label="${esc(f.urgency.label)}">
                ${f.urgency.opts.map((o, i) => `<option value="${esc(o)}"${i === 0 ? " selected" : ""}>${esc(o)}</option>`).join("")}
              </select>
            </div>
          </div>

          <div class="cform__row">
            <div class="field">
              <label for="cf-device">${esc(f.device.label)} <span class="req">*</span></label>
              <select id="cf-device" name="device" required data-label="${esc(f.device.label)}">${opt(f.device.opts, f.device.ph)}</select>
            </div>
            <div class="field">
              <label for="cf-issue">${esc(f.issue.label)} <span class="req">*</span></label>
              <select id="cf-issue" name="issue" required data-label="${esc(f.issue.label)}">${opt(f.issue.opts, f.issue.ph)}</select>
            </div>
          </div>

          <fieldset class="field field--radios">
            <legend>${esc(f.tried.label)}</legend>
            <label class="radio"><input type="radio" name="tried" value="${esc(f.tried.yes)}" data-label="${esc(f.tried.label)}"> <span>${esc(f.tried.yes)}</span></label>
            <label class="radio"><input type="radio" name="tried" value="${esc(f.tried.no)}" data-label="${esc(f.tried.label)}" checked> <span>${esc(f.tried.no)}</span></label>
          </fieldset>

          <div class="field">
            <label for="cf-details">${esc(f.details.label)} <span class="req">*</span></label>
            <textarea id="cf-details" name="details" rows="5" required minlength="10" maxlength="5000"
                      placeholder="${esc(f.details.ph)}" data-label="${esc(f.details.label)}"></textarea>
          </div>

          <input type="hidden" name="lang" value="${lang}">
          <!-- honeypot: real users never see or fill this -->
          <div class="hp" aria-hidden="true">
            <label for="cf-website">Website</label>
            <input id="cf-website" name="website" type="text" tabindex="-1" autocomplete="off">
          </div>

          <button class="btn btn--accent cform__submit" type="submit"><span class="cform__submit-label">${esc(c.submit)}</span> <span aria-hidden="true">${fwd(lang)}</span></button>
          <p class="cform__note">${esc(c.formNote)}</p>

          <div class="cform__status" id="formStatus" hidden role="status" aria-live="polite">
            <strong class="cform__status-title"></strong>
            <span class="cform__status-body"></span>
          </div>
        </form>

        <aside class="cinfo">
          <h2 class="cinfo__title">${esc(c.infoTitle)}</h2>
          <div class="cinfo__pills">
            <a class="footer-pill" href="${wa()}" target="_blank" rel="noopener">
              <span class="footer-pill__ic">${icons.whatsapp}</span><span>${esc(t.footer.whatsapp)}</span>
            </a>
            <a class="footer-pill" href="tel:${config.phoneHref}">
              <span class="footer-pill__ic">${icons.phone}</span><span dir="ltr">${esc(config.phoneDisplay)}</span>
            </a>
            <a class="footer-pill" href="mailto:${config.email}">
              <span class="footer-pill__ic">${icons.email}</span><span dir="ltr">${esc(config.email)}</span>
            </a>
            <a class="footer-pill" href="${config.mapsUrl}" target="_blank" rel="noopener">
              <span class="footer-pill__ic">${icons.location}</span><span>${esc(t.footer.addressLine)}</span>
            </a>
          </div>
          <p class="cinfo__hours"><strong>${esc(t.footer.hours)}</strong><br>${esc(t.footer.hoursValue)}</p>
          <p class="cinfo__note">${esc(c.infoNote)}</p>
          <div class="cinfo__socials">
            <h3 class="footer__col-title">${esc(t.footer.socials)}</h3>
            <ul>
            ${socials}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  </main>`;
  html += footer(lang, true); // minimal footer on the contact page
  html += docEnd();
  return html;
}

function privacyPage(lang) {
  const t = ui[lang];
  const p = privacy[lang];
  const schemas = [
    webPage(lang, absPrivacy(lang), p.metaTitle, p.metaDesc)
  ];

  const linkList = (links) =>
    `<ul class="legal-links">
            ${links.map((l) => `<li><a href="${l.url}" target="_blank" rel="noopener">${esc(l.label)} <span aria-hidden="true">${fwd(lang)}</span></a></li>`).join("\n            ")}
          </ul>`;

  const sections = p.sections.map((s) => `
        <section class="legal-block">
          <h2>${esc(s.h)}</h2>
          ${(s.p || []).map((para) => `<p>${esc(para)}</p>`).join("\n          ")}
          ${s.list ? `<ul>${s.list.map((li) => `<li>${esc(li)}</li>`).join("")}</ul>` : ""}
          ${s.links ? linkList(s.links) : ""}
        </section>`).join("\n");

  let html = docStart({
    lang, title: p.metaTitle, desc: p.metaDesc,
    canonical: absPrivacy(lang), altAr: absPrivacy("ar"), altEn: absPrivacy("en"), schemas
  });
  html += header(lang);
  html += `
  <main id="main">
    <section class="hero svc-hero section--dark" aria-labelledby="privacy-title">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <a href="${homeUrl(lang)}">${esc(t.breadcrumbHome)}</a><span aria-hidden="true">/</span>
          ${esc(t.footer.privacy)}
        </nav>
      </div>
      <div class="container">
        <p class="eyebrow eyebrow--accent">${esc(p.eyebrow)}</p>
        <h1 class="hero__title" id="privacy-title">${esc(p.title)}</h1>
        <p class="hero__lead">${esc(p.lead)}</p>
      </div>
    </section>

    <section class="section section--light">
      <div class="container legal-doc">
        <p class="legal-updated">${esc(p.updatedLabel)}: <span dir="ltr">${esc(p.updated)}</span></p>${sections}
        <section class="legal-block legal-contact">
          <h2>${esc(p.contactLabel)}</h2>
          <p>${esc(p.contactText)} <a href="mailto:${config.email}" dir="ltr">${esc(config.email)}</a>.</p>
        </section>
      </div>
    </section>
  </main>`;
  html += footer(lang, true); // minimal footer
  html += docEnd();
  return html;
}

/* ---------- send.php (generated so whitelists match the form exactly) ------ */
function sendPhp() {
  const pstr = (s) => "'" + String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
  const uniq = (a) => Array.from(new Set(a));
  const arr = (vals) => uniq(vals).map(pstr).join(", ");

  const A = contact.ar.fields, E = contact.en.fields;
  const allowedUrgency = arr([...A.urgency.opts, ...E.urgency.opts]);
  const allowedDevice = arr([...A.device.opts, ...E.device.opts]);
  const allowedIssue = arr([...A.issue.opts, ...E.issue.opts]);
  const allowedTried = arr([A.tried.yes, A.tried.no, E.tried.yes, E.tried.no]);
  // "Emergency" is the third urgency level in each language
  const emergency = arr([A.urgency.opts[2], E.urgency.opts[2]]);

  const toEmail = config.email;
  const domain = toEmail.split("@")[1];
  const fromEmail = "noreply@" + domain;
  const baseOrigin = config.baseUrl.replace(/\/+$/, "");
  const allowedOrigins = [baseOrigin];
  try {
    const u = new URL(baseOrigin);
    // Accept the www⇄apex counterpart so a submission from either host is valid.
    const other = u.protocol + "//" + (u.hostname.startsWith("www.") ? u.hostname.slice(4) : "www." + u.hostname);
    if (!allowedOrigins.includes(other)) allowedOrigins.push(other);
  } catch (e) { /* placeholder baseUrl — keep the single origin */ }

  return `<?php
/**
 * send.php — contact-form handler (plain PHP mail(), Hostinger-friendly).
 *
 * ⚠️  GENERATED FILE — produced by build/generate.js from the very same data
 *     that renders the form, so the whitelists can never drift out of sync.
 *     Edit build/site.js (contact.*) and re-run: node build/generate.js
 */
declare(strict_types=1);

/* ----------------------------- configuration ----------------------------- */
$TO_EMAIL     = ${pstr(toEmail)};
$FROM_EMAIL   = ${pstr(fromEmail)};
$FROM_NAME    = 'Zero 2 One Data Recovery';
$ALLOWED_ORIGINS = [${allowedOrigins.map(pstr).join(", ")}];
$IP_COOLDOWN_SECONDS = 30;   // one admitted valid attempt per observed IP
$MAIL_RATE_WINDOWS = [       // fixed-recipient aggregate attempt budgets
    ['seconds' => 60,    'limit' => 5],
    ['seconds' => 3600,  'limit' => 30],
    ['seconds' => 86400, 'limit' => 100],
];
$MAX_POST = 65536;           // hard cap on request body size
const Z2O_RATE_STATE_VERSION = 1;
const Z2O_RATE_STATE_MAX_BYTES = 65536;

/* Allowed values = exactly the <option> / radio values rendered in the form,
   for BOTH the Arabic and English pages. */
$ALLOWED = [
    'urgency' => [${allowedUrgency}],
    'device'  => [${allowedDevice}],
    'issue'   => [${allowedIssue}],
    'tried'   => [${allowedTried}],
];
$EMERGENCY = [${emergency}];   // urgency values that flag the mail as urgent

/* ------------------------------- plumbing -------------------------------- */
header_remove('X-Powered-By');
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
header('Referrer-Policy: no-referrer');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 0');
header('Cross-Origin-Opener-Policy: same-origin');
header('Cross-Origin-Resource-Policy: same-origin');
header('Origin-Agent-Cluster: ?1');
header('X-Permitted-Cross-Domain-Policies: none');
header('Permissions-Policy: accelerometer=(), autoplay=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), xr-spatial-tracking=()');
header("Content-Security-Policy: default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'");

$LANG = 'ar';

function msg(string $ar, string $en): string {
    global $LANG;
    return $LANG === 'en' ? $en : $ar;
}

/** A JS-disabled browser navigates to send.php directly; give it HTML, not JSON.
 *  Our fetch() sends "application/json"; a plain form navigation sends text/html. */
function client_prefers_html(): bool {
    $accept = strtolower((string) ($_SERVER['HTTP_ACCEPT'] ?? ''));
    return strpos($accept, 'text/html') !== false && strpos($accept, 'application/json') === false;
}

function respond(bool $ok, string $message, int $status = 200): void {
    global $LANG;
    http_response_code($status);
    if (client_prefers_html()) {
        header('Content-Type: text/html; charset=UTF-8');
        header("Content-Security-Policy: default-src 'none'; base-uri 'none'; style-src 'self'; font-src 'self'; img-src 'self' data:; form-action 'none'; frame-ancestors 'none'");
        $dir  = $LANG === 'en' ? 'ltr' : 'rtl';
        $home = $LANG === 'en' ? '/en/' : '/';   // Arabic is served from the site root
        $head = $ok ? ($LANG === 'en' ? 'Thank you' : 'شكراً لك')
                    : ($LANG === 'en' ? 'Something went wrong' : 'حدث خطأ');
        $back = $LANG === 'en' ? 'Back to the site' : 'العودة إلى الموقع';
        $e = static function (string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); };
        echo '<!DOCTYPE html><html lang="' . $e($LANG) . '" dir="' . $dir . '"><head>'
            . '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
            . '<meta name="robots" content="noindex"><title>' . $e($head) . '</title>'
            . '<link rel="stylesheet" href="${asset("assets/css/fonts.css")}">'
            . '<link rel="stylesheet" href="${asset("assets/css/main.css")}"></head>'
            . '<body class="section--dark form-fallback"><main class="container">'
            . '<h1 class="section-title">' . $e($head) . '</h1><p class="note">' . $e($message) . '</p>'
            . '<p><a class="btn btn--accent" href="' . $e($home) . '">' . $e($back) . '</a></p>'
            . '</main></body></html>';
        exit;
    }
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['success' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

/** Strip anything that could forge extra mail headers. */
function no_header_injection(string $v): string {
    return trim(str_replace(["\\r", "\\n", "\\0", '%0a', '%0d', '%0A', '%0D'], '', $v));
}

/** Drop control characters but keep newlines/tabs (used for the details box). */
function clean_text(string $v): string {
    $v = str_replace("\\0", '', $v);
    $out = preg_replace('/[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]/u', '', $v);
    return trim($out === null ? $v : $out);
}

function mb_len(string $v): int {
    if (function_exists('mb_strlen')) return mb_strlen($v, 'UTF-8');
    $count = preg_match_all('/./us', $v, $unused);
    return is_int($count) ? $count : strlen($v);
}

function valid_utf8(string $v): bool {
    return function_exists('mb_check_encoding')
        ? mb_check_encoding($v, 'UTF-8')
        : preg_match('//u', $v) === 1;
}

/** Arabic/Persian numerals -> ASCII, so phone numbers typed in Arabic work. */
function ascii_digits(string $v): string {
    $from = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩','۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    $to   = ['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9'];
    return str_replace($from, $to, $v);
}

/** RFC 2047 encoded-word for non-ASCII header values (subject, display name). */
function encode_header(string $v): string {
    if (preg_match('/^[\\x20-\\x7E]*$/', $v) === 1) return $v;   // pure ASCII
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($v, 'UTF-8', 'B', "\\r\\n");
    }
    return '=?UTF-8?B?' . base64_encode($v) . '?=';
}

/**
 * Display name for From/Reply-To. RFC 5322 says a display-name containing
 * specials (: @ , < > etc.) must be a quoted-string; non-ASCII must be an
 * encoded-word. Getting this wrong yields a malformed header.
 */
function encode_display_name(string $v): string {
    if ($v === '') return '';
    if (preg_match('/^[\\x20-\\x7E]*$/', $v) === 1) {
        return '"' . str_replace(['\\\\', '"'], ['\\\\\\\\', '\\\\"'], $v) . '"';
    }
    return encode_header($v);           // encoded-word is already header-safe
}

function normalize_origin(string $origin): ?string {
    if ($origin === '' || preg_match('/[\\x00-\\x20\\x7F]/', $origin) === 1) return null;
    $parts = parse_url($origin);
    if (!is_array($parts) || isset($parts['user']) || isset($parts['pass'])
        || isset($parts['query']) || isset($parts['fragment'])
        || (isset($parts['path']) && $parts['path'] !== '' && $parts['path'] !== '/')) return null;
    $scheme = strtolower((string) ($parts['scheme'] ?? ''));
    $host = strtolower((string) ($parts['host'] ?? ''));
    if (($scheme !== 'https' && $scheme !== 'http') || $host === '') return null;
    $port = $parts['port'] ?? ($scheme === 'https' ? 443 : 80);
    if (!is_int($port) || $port < 1 || $port > 65535) return null;
    return $scheme . '://' . $host . ':' . $port;
}

function field(array $in, string $key): string {
    return isset($in[$key]) && is_string($in[$key]) ? $in[$key] : '';
}

/**
 * Rate-limit state lives outside the public document root. Deployments that
 * cannot write to the parent directory must set Z2O_RATE_STATE_DIR to an
 * absolute private directory shared by every PHP worker for this site.
 */
function rate_state_directory(string $recipient): string {
    $configured = getenv('Z2O_RATE_STATE_DIR');
    if (is_string($configured) && trim($configured) !== '') {
        $configured = rtrim(trim($configured), '/');
        if ($configured === '' || $configured[0] !== '/' || strpos($configured, "\\0") !== false) {
            throw new RuntimeException('Invalid rate-limit state directory configuration.');
        }
        return $configured;
    }
    $namespace = substr(hash('sha256', __DIR__ . "\\0" . $recipient), 0, 24);
    return dirname(__DIR__) . '/.z2o-rate-' . $namespace;
}

function rate_path_within(string $path, string $root): bool {
    $path = rtrim($path, '/');
    $root = rtrim($root, '/');
    return $path === $root || strpos($path, $root . '/') === 0;
}

/** Reject state paths inside either the application or configured document root. */
function rate_assert_private_location(string $path): void {
    $roots = [realpath(__DIR__)];
    $documentRoot = trim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''));
    if ($documentRoot !== '') $roots[] = realpath($documentRoot);
    foreach ($roots as $root) {
        if (is_string($root) && $root !== '' && rate_path_within($path, $root)) {
            throw new RuntimeException('Rate-limit state directory must be outside the public document root.');
        }
    }
}

/** Create or verify a private non-symlink state directory. */
function rate_secure_directory(string $directory): string {
    if (is_link($directory)) {
        throw new RuntimeException('Rate-limit state directory must not be a symlink.');
    }
    $probe = $directory;
    while (!file_exists($probe) && dirname($probe) !== $probe) $probe = dirname($probe);
    $probeReal = realpath($probe);
    if (is_string($probeReal)) rate_assert_private_location($probeReal);

    if (!is_dir($directory)) {
        if (file_exists($directory) || (!@mkdir($directory, 0700, true) && !is_dir($directory))) {
            throw new RuntimeException('Rate-limit state directory is unavailable.');
        }
        @chmod($directory, 0700);
    }
    clearstatcache(true, $directory);
    if (is_link($directory) || !is_dir($directory) || !is_writable($directory)) {
        throw new RuntimeException('Rate-limit state directory is not private and writable.');
    }
    $permissions = @fileperms($directory);
    if ($permissions === false || (($permissions & 0077) !== 0)) {
        throw new RuntimeException('Rate-limit state directory permissions are too broad.');
    }
    $real = realpath($directory);
    if ($real === false) {
        throw new RuntimeException('Rate-limit state directory cannot be resolved.');
    }
    rate_assert_private_location($real);
    return $real;
}

/** Load or atomically create the private HMAC key used for IP fingerprints. */
function rate_ip_secret(string $directory): string {
    $secretFile = $directory . '/ip-key.bin';
    if (is_link($secretFile)) {
        throw new RuntimeException('Rate-limit fingerprint key must not be a symlink.');
    }
    if (!file_exists($secretFile)) {
        try {
            $secret = random_bytes(32);
            $temporary = $directory . '/ip-key.' . bin2hex(random_bytes(12)) . '.tmp';
        } catch (Throwable $e) {
            throw new RuntimeException('Rate-limit fingerprint key could not be generated.', 0, $e);
        }
        $handle = @fopen($temporary, 'x+b');
        if ($handle === false) {
            throw new RuntimeException('Rate-limit fingerprint key cannot be created.');
        }
        $closed = false;
        try {
            @chmod($temporary, 0600);
            $offset = 0;
            while ($offset < strlen($secret)) {
                $written = @fwrite($handle, substr($secret, $offset));
                if (!is_int($written) || $written <= 0) {
                    throw new RuntimeException('Rate-limit fingerprint key write failed.');
                }
                $offset += $written;
            }
            if (!@fflush($handle)) {
                throw new RuntimeException('Rate-limit fingerprint key flush failed.');
            }
            if (function_exists('fsync') && !@fsync($handle)) {
                throw new RuntimeException('Rate-limit fingerprint key sync failed.');
            }
            @fclose($handle);
            $closed = true;
            if (!@rename($temporary, $secretFile)) {
                throw new RuntimeException('Rate-limit fingerprint key replacement failed.');
            }
            @chmod($secretFile, 0600);
        } finally {
            if (!$closed && is_resource($handle)) @fclose($handle);
            if (is_file($temporary) && !is_link($temporary)) @unlink($temporary);
        }
    }

    clearstatcache(true, $secretFile);
    $permissions = @fileperms($secretFile);
    $size = @filesize($secretFile);
    if (is_link($secretFile) || !is_file($secretFile) || $size !== 32
        || $permissions === false || (($permissions & 0077) !== 0)) {
        throw new RuntimeException('Rate-limit fingerprint key is unsafe.');
    }
    $secret = @file_get_contents($secretFile, false, null, 0, 33);
    if (!is_string($secret) || strlen($secret) !== 32) {
        throw new RuntimeException('Rate-limit fingerprint key cannot be read safely.');
    }
    return $secret;
}

function rate_empty_state(string $namespace): array {
    return [
        'version' => Z2O_RATE_STATE_VERSION,
        'namespace' => $namespace,
        'attempts' => [],
        'ips' => [],
    ];
}

/** Read and strictly validate the bounded on-disk rate state. */
function rate_read_state(string $stateFile, string $namespace): array {
    if (is_link($stateFile)) {
        throw new RuntimeException('Invalid rate-limit state file.');
    }
    if (!file_exists($stateFile)) return rate_empty_state($namespace);
    if (!is_file($stateFile)) {
        throw new RuntimeException('Invalid rate-limit state file.');
    }
    $size = @filesize($stateFile);
    $permissions = @fileperms($stateFile);
    if ($size === false || $size > Z2O_RATE_STATE_MAX_BYTES
        || $permissions === false || (($permissions & 0077) !== 0)) {
        throw new RuntimeException('Rate-limit state file is invalid or oversized.');
    }
    $raw = @file_get_contents($stateFile, false, null, 0, Z2O_RATE_STATE_MAX_BYTES + 1);
    if (!is_string($raw) || strlen($raw) > Z2O_RATE_STATE_MAX_BYTES) {
        throw new RuntimeException('Rate-limit state file cannot be read safely.');
    }
    try {
        $state = json_decode($raw, true, 32, JSON_THROW_ON_ERROR);
    } catch (Throwable $e) {
        throw new RuntimeException('Rate-limit state file is corrupt.', 0, $e);
    }
    if (!is_array($state)
        || ($state['version'] ?? null) !== Z2O_RATE_STATE_VERSION
        || !hash_equals($namespace, is_string($state['namespace'] ?? null) ? $state['namespace'] : '')
        || !is_array($state['attempts'] ?? null)
        || !is_array($state['ips'] ?? null)
        || count($state['attempts']) > 1000
        || count($state['ips']) > 1000) {
        throw new RuntimeException('Rate-limit state schema is invalid.');
    }
    foreach ($state['attempts'] as $timestamp) {
        if (!is_int($timestamp) || $timestamp < 0) {
            throw new RuntimeException('Rate-limit attempt state is invalid.');
        }
    }
    foreach ($state['ips'] as $key => $timestamp) {
        if (!is_string($key) || preg_match('/^[a-f0-9]{64}$/', $key) !== 1 || !is_int($timestamp) || $timestamp < 0) {
            throw new RuntimeException('Rate-limit IP state is invalid.');
        }
    }
    return $state;
}

/** Atomically replace the state file while the caller holds the global lock. */
function rate_write_state(string $directory, string $stateFile, array $state): void {
    try {
        $json = json_encode($state, JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
        $suffix = bin2hex(random_bytes(12));
    } catch (Throwable $e) {
        throw new RuntimeException('Rate-limit state could not be encoded.', 0, $e);
    }
    if (!is_string($json) || strlen($json) > Z2O_RATE_STATE_MAX_BYTES) {
        throw new RuntimeException('Rate-limit state exceeds its safety bound.');
    }
    $temporary = $directory . '/state.' . $suffix . '.tmp';
    $handle = @fopen($temporary, 'x+b');
    if ($handle === false) {
        throw new RuntimeException('Rate-limit temporary state file cannot be created.');
    }
    $closed = false;
    try {
        @chmod($temporary, 0600);
        $offset = 0;
        $length = strlen($json);
        while ($offset < $length) {
            $written = @fwrite($handle, substr($json, $offset));
            if (!is_int($written) || $written <= 0) {
                throw new RuntimeException('Rate-limit state write failed.');
            }
            $offset += $written;
        }
        if (!@fflush($handle)) {
            throw new RuntimeException('Rate-limit state flush failed.');
        }
        if (function_exists('fsync') && !@fsync($handle)) {
            throw new RuntimeException('Rate-limit state sync failed.');
        }
        @fclose($handle);
        $closed = true;
        if (!@rename($temporary, $stateFile)) {
            throw new RuntimeException('Rate-limit state replacement failed.');
        }
        @chmod($stateFile, 0600);
        clearstatcache(true, $stateFile);
        $permissions = @fileperms($stateFile);
        if ($permissions === false || (($permissions & 0077) !== 0) || is_link($stateFile)) {
            throw new RuntimeException('Rate-limit state file permissions are unsafe.');
        }
    } finally {
        if (!$closed && is_resource($handle)) @fclose($handle);
        if (is_file($temporary) && !is_link($temporary)) @unlink($temporary);
    }
}

/**
 * Atomically admit one valid mail attempt under the per-IP and shared windows.
 * Admission is persisted before mail() and is intentionally not rolled back if
 * the transport fails, preventing retry storms from bypassing the budget.
 */
function rate_limit_admit(
    string $ip,
    string $recipient,
    string $directory,
    int $now,
    int $ipCooldown,
    array $windows
): array {
    if ($now < 0 || $ipCooldown < 1 || !$windows) {
        throw new RuntimeException('Rate-limit policy is invalid.');
    }
    $maxWindow = 0;
    foreach ($windows as $window) {
        $seconds = $window['seconds'] ?? null;
        $limit = $window['limit'] ?? null;
        if (!is_int($seconds) || !is_int($limit) || $seconds < 1 || $limit < 1) {
            throw new RuntimeException('Rate-limit window is invalid.');
        }
        $maxWindow = max($maxWindow, $seconds);
    }

    $directory = rate_secure_directory($directory);
    $lockFile = $directory . '/state.lock';
    $stateFile = $directory . '/state.json';
    if (is_link($lockFile)) {
        throw new RuntimeException('Rate-limit lock file must not be a symlink.');
    }
    $lock = @fopen($lockFile, 'c+b');
    if ($lock === false) {
        throw new RuntimeException('Rate-limit lock cannot be opened.');
    }
    @chmod($lockFile, 0600);
    clearstatcache(true, $lockFile);
    $lockPermissions = @fileperms($lockFile);
    if (is_link($lockFile) || $lockPermissions === false || (($lockPermissions & 0077) !== 0)) {
        @fclose($lock);
        throw new RuntimeException('Rate-limit lock permissions are unsafe.');
    }
    if (!@flock($lock, LOCK_EX)) {
        @fclose($lock);
        throw new RuntimeException('Rate-limit lock cannot be acquired.');
    }

    try {
        $ipSecret = rate_ip_secret($directory);
        $namespace = hash_hmac('sha256', $recipient, $ipSecret);
        $state = rate_read_state($stateFile, $namespace);
        $oldestAllowed = $now - $maxWindow;
        $attempts = [];
        foreach ($state['attempts'] as $timestamp) {
            if ($timestamp > $oldestAllowed) $attempts[] = $timestamp;
        }
        sort($attempts, SORT_NUMERIC);

        $ips = [];
        foreach ($state['ips'] as $key => $timestamp) {
            if (($now - $timestamp) < $ipCooldown) $ips[$key] = $timestamp;
        }

        $ipKey = hash_hmac('sha256', $ip, $ipSecret);
        $retryAfter = 0;
        $scope = '';
        if (isset($ips[$ipKey])) {
            $retryAfter = max($retryAfter, $ips[$ipKey] + $ipCooldown - $now);
            $scope = 'ip';
        }
        foreach ($windows as $window) {
            $windowAttempts = [];
            $cutoff = $now - $window['seconds'];
            foreach ($attempts as $timestamp) {
                if ($timestamp > $cutoff) $windowAttempts[] = $timestamp;
            }
            if (count($windowAttempts) >= $window['limit']) {
                $wait = $windowAttempts[0] + $window['seconds'] - $now;
                if ($wait > $retryAfter) {
                    $retryAfter = $wait;
                    $scope = 'global';
                }
            }
        }
        if ($retryAfter > 0) {
            return ['allowed' => false, 'retryAfter' => max(1, $retryAfter), 'scope' => $scope];
        }

        $attempts[] = $now;
        $ips[$ipKey] = $now;
        ksort($ips, SORT_STRING);
        $state['attempts'] = $attempts;
        $state['ips'] = $ips;
        rate_write_state($directory, $stateFile, $state);
        return ['allowed' => true, 'retryAfter' => 0, 'scope' => ''];
    } finally {
        @flock($lock, LOCK_UN);
        @fclose($lock);
    }
}

/* Test harnesses can load the real rate-limit functions without handling HTTP. */
if (defined('Z2O_LIBRARY_ONLY') && Z2O_LIBRARY_ONLY === true) return;

/* --------------------------- request gatekeeping -------------------------- */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, msg('طريقة الطلب غير مدعومة.', 'Unsupported request method.'), 405);
}

/* Browser-side CSRF defense; non-browser clients that omit these hints still
   pass through the normal validation, honeypot, and atomic rate budgets. */
$fetchSite = strtolower(trim((string) ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? '')));
if ($fetchSite === 'cross-site') {
    respond(false, msg('مصدر الطلب غير مسموح.', 'Cross-site submissions are not allowed.'), 403);
}
$origin = trim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));
if ($origin !== '') {
    $allowedOrigins = $ALLOWED_ORIGINS;
    $testOrigin = getenv('Z2O_TEST_ALLOWED_ORIGIN');
    if (PHP_SAPI === 'cli-server' && is_string($testOrigin) && $testOrigin !== '') {
        $allowedOrigins[] = $testOrigin;
    }
    $normalizedOrigin = normalize_origin($origin);
    $originAllowed = false;
    if (is_string($normalizedOrigin)) {
        foreach ($allowedOrigins as $allowedOrigin) {
            $normalizedAllowed = normalize_origin($allowedOrigin);
            if (is_string($normalizedAllowed) && hash_equals($normalizedAllowed, $normalizedOrigin)) {
                $originAllowed = true;
                break;
            }
        }
    }
    if (!$originAllowed) {
        respond(false, msg('مصدر الطلب غير مسموح.', 'Cross-origin submissions are not allowed.'), 403);
    }
}

$len = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($len > $MAX_POST) {
    respond(false, msg('حجم الطلب كبير جدًا.', 'Request body is too large.'), 413);
}

$in = $_POST;
if (!$in) {                                     // allow a bounded JSON body too
    $contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
    $mediaType = trim(explode(';', $contentType, 2)[0]);
    if ($mediaType !== 'application/json') {
        respond(false, msg('نوع البيانات غير مدعوم.', 'Unsupported content type.'), 415);
    }
    $rawResult = @file_get_contents('php://input', false, null, 0, $MAX_POST + 1);
    if (!is_string($rawResult)) {
        respond(false, msg('تعذّرت قراءة الطلب.', 'The request body could not be read.'), 400);
    }
    if (strlen($rawResult) > $MAX_POST) {
        respond(false, msg('حجم الطلب كبير جدًا.', 'Request body is too large.'), 413);
    }
    try {
        $decoded = json_decode($rawResult, true, 16, JSON_THROW_ON_ERROR);
        if (is_array($decoded)) $in = $decoded;
    } catch (Throwable $e) {
        respond(false, msg('صيغة JSON غير صالحة.', 'Invalid JSON body.'), 400);
    }
}
if (!is_array($in) || !$in) {
    respond(false, msg('لم تصل أي بيانات.', 'No data received.'), 400);
}
if (count($in) > 16) {
    respond(false, msg('عدد الحقول غير صالح.', 'Too many request fields.'), 400);
}

/* every value must be valid UTF-8 before we touch it */
foreach ($in as $v) {
    if (!is_string($v)) {
        respond(false, msg('صيغة الحقول غير صالحة.', 'Invalid request field shape.'), 400);
    }
    if (!valid_utf8($v)) {
        respond(false, msg('ترميز البيانات غير صالح.', 'Invalid character encoding.'), 400);
    }
}

$LANG = field($in, 'lang') === 'en' ? 'en' : 'ar';

/* honeypot — bots fill it, humans never see it. Pretend success, send nothing. */
if (trim(field($in, 'website')) !== '') {
    respond(true, msg('تم استلام طلبك.', 'Your request was received.'));
}

$remoteAddress = trim((string) ($_SERVER['REMOTE_ADDR'] ?? ''));
$ip = filter_var($remoteAddress, FILTER_VALIDATE_IP) !== false ? $remoteAddress : 'unknown';

/* ------------------------------- validation ------------------------------- */
$errors = [];

$name = no_header_injection(clean_text(field($in, 'name')));
if (mb_len($name) < 2 || mb_len($name) > 100) {
    $errors[] = msg('الاسم يجب أن يكون بين 2 و100 حرف.', 'Name must be between 2 and 100 characters.');
}

$phoneRaw = ascii_digits(clean_text(field($in, 'phone')));
$phoneNorm = null;
$p = preg_replace('/[^\\d+]/', '', str_replace([' ', '-', '(', ')', '.'], '', $phoneRaw));
if (is_string($p)) {
    if (strpos($p, '00966') === 0)                 $p = '+' . substr($p, 2);
    elseif (strpos($p, '966') === 0)               $p = '+' . $p;
    if (preg_match('/^0(5\\d{8})$/', $p, $m))      $phoneNorm = '+966' . $m[1];
    elseif (preg_match('/^\\+966(5\\d{8})$/', $p, $m)) $phoneNorm = '+966' . $m[1];
}
if ($phoneNorm === null) {
    $errors[] = msg('رقم الجوال غير صحيح. استخدم صيغة 05XXXXXXXX أو +9665XXXXXXXX.',
                    'Invalid mobile number. Use 05XXXXXXXX or +9665XXXXXXXX.');
}

$emailRaw = no_header_injection(clean_text(field($in, 'email')));
$email = null;
if ($emailRaw !== '') {
    if (strlen($emailRaw) > 254 || !filter_var($emailRaw, FILTER_VALIDATE_EMAIL)) {
        $errors[] = msg('صيغة البريد الإلكتروني غير صحيحة.', 'Invalid email address.');
    } else {
        $email = $emailRaw;
    }
}

$details = clean_text(field($in, 'details'));
if (mb_len($details) < 10 || mb_len($details) > 5000) {
    $errors[] = msg('تفاصيل الحالة يجب أن تكون بين 10 و5000 حرف.',
                    'Case details must be between 10 and 5000 characters.');
}

/* strict whitelist — a forged <option> value is rejected, not just "not empty" */
$picked = [];
foreach (['urgency', 'device', 'issue', 'tried'] as $key) {
    $val = clean_text(field($in, $key));
    if (!in_array($val, $ALLOWED[$key], true)) {
        $errors[] = msg('قيمة غير مسموحة في الحقل: ' . $key, 'Invalid value for field: ' . $key);
        $picked[$key] = '';
    } else {
        $picked[$key] = $val;
    }
}

if ($errors) {
    respond(false, implode(' ', $errors), 422);
}

/* Every fully valid attempt consumes both budgets before any mail side effect. */
try {
    $rate = rate_limit_admit(
        $ip,
        $TO_EMAIL,
        rate_state_directory($TO_EMAIL),
        time(),
        $IP_COOLDOWN_SECONDS,
        $MAIL_RATE_WINDOWS
    );
} catch (Throwable $e) {
    error_log('Contact-form rate limiter unavailable: ' . $e->getMessage());
    header('Retry-After: 60');
    respond(false, msg('الخدمة مشغولة مؤقتًا. الرجاء المحاولة لاحقًا أو التواصل عبر واتساب.',
                       'The service is temporarily busy. Please try later or contact us on WhatsApp.'), 503);
}
if (!$rate['allowed']) {
    $wait = (int) $rate['retryAfter'];
    header('Retry-After: ' . $wait);
    respond(false, msg("تم بلوغ حد الإرسال الآمن. الرجاء المحاولة بعد {$wait} ثانية.",
                       "The safe submission limit was reached. Please try again in {$wait}s."), 429);
}

/* --------------------------- compose the email ---------------------------- */
$isEmergency = in_array($picked['urgency'], $EMERGENCY, true);

$labels = $LANG === 'en'
    ? ['name' => 'Name', 'phone' => 'Mobile', 'email' => 'Email', 'urgency' => 'Urgency',
       'device' => 'Device', 'issue' => 'Issue', 'tried' => 'Tried software', 'details' => 'Details',
       'meta' => 'Submission', 'page' => 'Page language', 'time' => 'Time',
       'none' => '(not provided)']
    : ['name' => 'الاسم', 'phone' => 'الجوال', 'email' => 'البريد', 'urgency' => 'الاستعجال',
       'device' => 'نوع الجهاز', 'issue' => 'نوع المشكلة', 'tried' => 'جرّب برامج استرجاع', 'details' => 'التفاصيل',
       'meta' => 'بيانات الإرسال', 'page' => 'لغة الصفحة', 'time' => 'الوقت',
       'none' => '(غير مذكور)'];

$subject = ($isEmergency ? '🚨 ' : '')
    . msg('طلب استعادة بيانات', 'Data recovery request')
    . ' — ' . $picked['device'] . ' — ' . $name;

try {
    $when = (new DateTime('now', new DateTimeZone('Asia/Riyadh')))->format('Y-m-d H:i');
} catch (Throwable $e) {
    $when = gmdate('Y-m-d H:i') . ' UTC';
}

$lines = [
    $labels['name']    . ': ' . $name,
    $labels['phone']   . ': ' . $phoneNorm,
    $labels['email']   . ': ' . ($email ?? $labels['none']),
    $labels['urgency'] . ': ' . $picked['urgency'] . ($isEmergency ? ' 🚨' : ''),
    $labels['device']  . ': ' . $picked['device'],
    $labels['issue']   . ': ' . $picked['issue'],
    $labels['tried']   . ': ' . $picked['tried'],
    '',
    str_repeat('-', 40),
    $labels['details'] . ':',
    $details,
    str_repeat('-', 40),
    '',
    $labels['meta'] . ':',
    '  ' . $labels['page'] . ': ' . $LANG,
    '  ' . $labels['time'] . ': ' . $when . ' (Asia/Riyadh)',
];
$body = chunk_split(base64_encode(implode("\\r\\n", $lines)), 76, "\\r\\n");

$headers = [
    'From: ' . encode_display_name($FROM_NAME) . ' <' . $FROM_EMAIL . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
];
if ($email !== null) {
    // Reply straight to the customer when they gave an address
    array_splice($headers, 1, 0, ['Reply-To: ' . encode_display_name($name) . ' <' . $email . '>']);
}
if ($isEmergency) {
    $headers[] = 'X-Priority: 1 (Highest)';
    $headers[] = 'Importance: High';
}

$headerStr = implode("\\r\\n", $headers);
$encSubject = encode_header($subject);

$sent = @mail($TO_EMAIL, $encSubject, $body, $headerStr, '-f' . $FROM_EMAIL);
if (!$sent) {                                  // some hosts reject the -f switch
    $sent = @mail($TO_EMAIL, $encSubject, $body, $headerStr);
}

if (!$sent) {
    respond(false, msg('تعذّر إرسال الرسالة حاليًا. الرجاء التواصل عبر واتساب.',
                       'The message could not be sent right now. Please reach us on WhatsApp.'), 500);
}

respond(true, msg('تم استلام طلبك. سنعود إليك بأسرع وقت خلال ساعات العمل.',
                  'Your request was received. We will get back to you shortly during working hours.'));
`;
}

/* ---------- small helpers ---------- */
function pad(n) { return String(n).padStart(2, "0"); }
function shortName(lang, s) { return ui[lang].serviceNames[s.slug]; }
function sectionHead(eyebrow, titleId, title, noteStrong, note) {
  const noteBlock = noteStrong
    ? `<div class="section-head__note"><p class="note-strong">${esc(noteStrong)}</p>${note ? `<p class="note">${esc(note)}</p>` : ""}</div>`
    : "";
  return `<div class="section-head">
          <div class="section-head__main">
            <p class="eyebrow eyebrow--accent">${esc(eyebrow)}</p>
            <h2 class="section-title" id="${titleId}">${esc(title)}</h2>
          </div>
          ${noteBlock}
        </div>`;
}
function faqRow(f, i) {
  const qId = `faq-q-${i + 1}`;
  const aId = `faq-a-${i + 1}`;
  // No `hidden` in the static markup: without JS the answers stay readable.
  // main.js collapses them and manages `hidden`/aria once JS is available.
  // The trigger sits inside a heading (WAI-ARIA accordion pattern), which also
  // exposes the questions to search/answer engines scanning the outline.
  return `<div class="faq-row">
              <h3 class="faq-row__h">
              <button class="faq-row__q" type="button" id="${qId}" aria-expanded="false" aria-controls="${aId}">
                <span class="faq-row__num" dir="ltr">${pad(i + 1)}</span>
                <span class="faq-row__text">${esc(f.q)}</span>
                <span class="faq-row__icon" aria-hidden="true"></span>
              </button>
              </h3>
              <div class="faq-row__a" id="${aId}" role="region" aria-labelledby="${qId}"><p>${esc(f.a)}</p></div>
            </div>`;
}
function serviceRow(lang, r, i) {
  const href = r.link ? svcUrl(lang, r.link) : "#contact";
  return `<li class="service">
            <a class="service__link" href="${href}" aria-label="${esc(r.t)}">
              <span class="service__index" dir="ltr">${pad(i + 1)}</span>
              <span class="service__body">
                <h3 class="service__title">${esc(r.t)}</h3>
                <span class="service__desc">${esc(r.d)}</span>
              </span>
              <span class="service__tags" dir="ltr">${esc(r.tags)}</span>
              <span class="service__arrow" aria-hidden="true">${fwd(lang)}</span>
            </a>
          </li>`;
}

/* ---------- language-switch target injection ---------- */
function injectLangSwitch(html, targetUrl) {
  return html.split("__LANGSWITCH__").join(targetUrl);
}

/* ==========================================================================
   404 page.
   The audit's top finding was inbound links from the old site dying on a 404,
   and no Search Console export exists yet to map them all. Until it does, this
   page is the safety net: instead of a dead end it offers every service by the
   PROBLEM the visitor arrived with, so a lost link still converts. It is
   noindex (a 404 must never rank) but follow, so the links still pass crawl.
   ========================================================================== */
function notFoundPage(lang) {
  const t = ui[lang];
  const c = t.notFound;
  let html = docStart({
    lang, title: c.metaTitle, desc: c.metaDesc,
    canonical: BASE + langPrefix(lang) + "/404.html",
    altAr: BASE + "/404.html", altEn: BASE + "/en/404.html",
    schemas: [localBusiness(lang)], noindex: true
  });
  html += header(lang);
  html += `
  <main id="main">
    <section class="hero section--dark nf" aria-labelledby="nf-title">
      <div class="container nf__inner">
        <p class="nf__code" dir="ltr">${esc(c.code)}</p>
        <h1 class="hero__title" id="nf-title">${esc(c.title)}</h1>
        <p class="hero__lead">${esc(c.lead)}</p>
        <div class="hero__actions">
          <a class="btn btn--accent" href="${contactUrl(lang)}">${esc(t.sendCaseBtn)} <span aria-hidden="true">${fwd(lang)}</span></a>
          <a class="link-arrow" href="${wa()}" rel="noopener">${esc(t.whatsappBtn)} <span aria-hidden="true">${fwd(lang)}</span></a>
        </div>
        <p class="reassure">${esc(t.reassure)}</p>
      </div>
    </section>

    <section class="section section--light" aria-labelledby="nf-svc">
      <div class="container">
        ${sectionHead(t.nav.services, "nf-svc", c.servicesLabel, "", "")}
        <ul class="services">
          ${config.serviceOrder.map((slug, i) => `<li class="service">
            <a class="service__link" href="${svcUrl(lang, slug)}">
              <span class="service__index" dir="ltr">${pad(i + 1)}</span>
              <span class="service__body"><h3 class="service__title">${esc(t.serviceNames[slug])}</h3></span>
              <span class="service__arrow" aria-hidden="true">${fwd(lang)}</span>
            </a>
          </li>`).join("\n          ")}
        </ul>
      </div>
    </section>
  </main>`;
  html += footer(lang);
  html += docEnd();
  return html;
}

/* ==========================================================================
   City landing pages.
   The keyword sheet carries a geographic cluster (الرياض / جدة / الدمام) with no
   destination on the site. These pages serve it — but the honest way: the lab is
   in Riyadh, and the Jeddah and Dammam pages say cases arrive by secure shipping
   rather than implying a branch. Each page is written from a different angle so
   the set does not read as doorway pages, which Google penalises.
   ========================================================================== */
function citySchema(lang, c) {
  const t = ui[lang];
  return {
    "@type": "Service",
    name: c[lang].title,
    serviceType: lang === "ar" ? "استعادة بيانات" : "Data recovery",
    description: c[lang].metaDesc,
    provider: { "@id": BASE + "/#business" },
    areaServed: { "@type": "City", name: c[lang].city, containedInPlace: { "@type": "Country", name: "SA" } },
    url: absCity(lang, c.slug),
    inLanguage: lang
  };
}

function cityPage(lang, c) {
  const t = ui[lang];
  const d = c[lang];
  const schemas = [
    localBusiness(lang),
    webPage(lang, absCity(lang, c.slug), d.metaTitle, d.metaDesc),
    citySchema(lang, c),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: absHome(lang) },
        { "@type": "ListItem", position: 2, name: d.title, item: absCity(lang, c.slug) }
      ]
    },
    faqPage(d.faqs)
  ];
  let html = docStart({
    lang, title: d.metaTitle, desc: d.metaDesc,
    canonical: absCity(lang, c.slug), altAr: absCity("ar", c.slug), altEn: absCity("en", c.slug), schemas
  });
  html += header(lang);
  html += `
  <main id="main">
    <section class="hero svc-hero section--dark" aria-labelledby="city-title">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <a href="${homeUrl(lang)}">${esc(t.breadcrumbHome)}</a><span aria-hidden="true">/</span>
          ${esc(d.city)}
        </nav>
      </div>
      <div class="container hero__inner">
        <div class="hero__copy">
          <p class="svc-hook">${esc(d.heroHook)}</p>
          <h1 class="hero__title" id="city-title">${esc(d.title)}</h1>
          <p class="hero__lead">${esc(d.heroIntro)}</p>
          <div class="hero__actions">
            <a class="btn btn--accent" href="${contactUrl(lang)}">${esc(t.startFreeBtn)} <span aria-hidden="true">${fwd(lang)}</span></a>
            <a class="link-arrow" href="${wa()}" rel="noopener">${esc(t.whatsappBtn)} <span aria-hidden="true">${fwd(lang)}</span></a>
          </div>
          <p class="reassure">${esc(t.reassure)}</p>
        </div>
        <div class="hero__visual">${dataCore(false)}</div>
      </div>
      <div class="container">
        <dl class="trust-strip">
          ${t.trust.map((m) => `<div class="metric"><dt class="metric__value" dir="ltr">${esc(m.v)}</dt><dd class="metric__label">${esc(m.l)}</dd></div>`).join("\n          ")}
        </dl>
      </div>
    </section>

    <section class="section section--light" aria-labelledby="why-title">
      <div class="container">
        ${sectionHead(t.citiesLabel + " · " + d.city, "why-title", d.whyTitle, "", "")}
        <ul class="cases">
          ${d.why.map((w, i) => `<li class="case-card"><span class="case-card__num" dir="ltr">${pad(i + 1)}</span><h3 class="case-card__title">${esc(w.t)}</h3><p class="case-card__text">${esc(w.b)}</p></li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="section section--dark" aria-labelledby="cov-title">
      <div class="container">
        <div class="diag">
          <div class="diag__main">
            <h2 class="diag__title" id="cov-title">${esc(d.coverageTitle)}</h2>
            <p class="diag__body">${esc(d.coverageBody)}</p>
            <div class="diag__steps">
              ${t.steps.map((st, i) => `<div class="step-chip"><span class="step-chip__n" dir="ltr">${pad(i + 1)}</span><p class="step-chip__t">${esc(st)}</p></div>`).join("\n              ")}
            </div>
          </div>
          <aside class="warn-box">
            <p class="warn-box__label">${esc(t.areasLabel)}</p>
            <ul class="areas">
              ${d.areas.map((a) => `<li>${esc(a)}</li>`).join("\n              ")}
            </ul>
          </aside>
        </div>
      </div>
    </section>

    <section class="section section--light" aria-labelledby="cityfaq-title">
      <div class="container">
        ${sectionHead(t.faqSection, "cityfaq-title", d.ctaHook, "", "")}
        <div class="faq__rows">
          ${d.faqs.map((f, i) => faqRow(f, i)).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section svc-cta" id="contact" aria-labelledby="citycta-title">
      <div class="container svc-cta__inner">
        <div class="svc-cta__action">
          <p class="svc-cta__label">${esc(lang === "ar" ? "الخطوة التالية" : "Next step")}</p>
          <a class="btn btn--dark" href="${contactUrl(lang)}">${esc(t.sendCaseBtn)} <span aria-hidden="true">${fwd(lang)}</span></a>
        </div>
        <div>
          <h2 class="svc-cta__title" id="citycta-title">${esc(d.ctaHook)}</h2>
          <p class="svc-cta__body">${esc(d.ctaBody)}</p>
        </div>
      </div>
    </section>
  </main>`;
  html += footer(lang);
  html += docEnd();
  return html;
}

/* ==========================================================================
   Articles (guides).
   The last structural gap in the audit: every page on the site sold a service,
   so the whole informational half of the keyword sheet had nowhere to land. The
   articles are generated from the same build pipeline as everything else — no
   CMS, no runtime dependency — so the perf budget survives.
   ========================================================================== */
function articleSchema(lang, p) {
  const d = p[lang];
  return {
    "@type": "Article",
    "@id": absPost(lang, p.slug) + "#article",
    headline: d.title,
    description: d.metaDesc,
    inLanguage: lang,
    datePublished: config.contentPublished,
    dateModified: config.contentUpdated,
    author: { "@id": BASE + "/#business" },
    publisher: { "@id": BASE + "/#business" },
    image: `${IMG}/assets/img/og.png`,
    mainEntityOfPage: absPost(lang, p.slug),
    isPartOf: { "@id": BASE + "/#website" }
  };
}

function articlesIndex(lang) {
  const t = ui[lang];
  const schemas = [
    localBusiness(lang),
    webPage(lang, absArticles(lang), t.articlesMetaTitle, t.articlesMetaDesc),
    // CollectionPage + ItemList, deliberately NOT schema.org Blog: the real blog
    // is a separate Hugo site that will own /blog/, and declaring two Blog
    // entities on one domain splits the signal between them. These are guides.
    {
      "@type": "CollectionPage",
      "@id": absArticles(lang) + "#articles",
      name: t.articlesLabel,
      description: t.articlesMetaDesc,
      inLanguage: lang,
      isPartOf: { "@id": BASE + "/#website" },
      about: { "@id": BASE + "/#business" },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.map((p, i) => ({
          "@type": "ListItem", position: i + 1, url: absPost(lang, p.slug), name: p[lang].title
        }))
      }
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: absHome(lang) },
        { "@type": "ListItem", position: 2, name: t.articlesLabel, item: absArticles(lang) }
      ]
    }
  ];
  let html = docStart({
    lang, title: t.articlesMetaTitle, desc: t.articlesMetaDesc,
    canonical: absArticles(lang), altAr: absArticles("ar"), altEn: absArticles("en"), schemas
  });
  html += header(lang);
  html += `
  <main id="main">
    <section class="hero svc-hero section--dark" aria-labelledby="articles-title">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <a href="${homeUrl(lang)}">${esc(t.breadcrumbHome)}</a><span aria-hidden="true">/</span>
          ${esc(t.articlesLabel)}
        </nav>
      </div>
      <div class="container hero__inner">
        <div class="hero__copy">
          <p class="svc-hook">${esc(t.articlesLabel)}</p>
          <h1 class="hero__title" id="articles-title">${esc(t.articlesTitle)}</h1>
          <p class="hero__lead">${esc(t.articlesLead)}</p>
        </div>
        <div class="hero__visual">${dataCore(false)}</div>
      </div>
    </section>

    <section class="section section--light">
      <div class="container">
        <ul class="posts">
          ${posts.map((p, i) => `<li class="post-card">
            <a class="post-card__link" href="${postUrl(lang, p.slug)}">
              <span class="post-card__num" dir="ltr">${pad(i + 1)}</span>
              <span class="post-card__body">
                <h2 class="post-card__title">${esc(p[lang].title)}</h2>
                <span class="post-card__excerpt">${esc(p[lang].excerpt)}</span>
              </span>
              <span class="post-card__more">${esc(t.readMore)} <span aria-hidden="true">${fwd(lang)}</span></span>
            </a>
          </li>`).join("\n          ")}
        </ul>
      </div>
    </section>
  </main>`;
  html += footer(lang);
  html += docEnd();
  return html;
}

function articlePage(lang, p) {
  const t = ui[lang];
  const d = p[lang];
  const svc = p.relatedService;
  const schemas = [
    localBusiness(lang),
    webPage(lang, absPost(lang, p.slug), d.metaTitle, d.metaDesc),
    articleSchema(lang, p),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: absHome(lang) },
        { "@type": "ListItem", position: 2, name: t.articlesLabel, item: absArticles(lang) },
        { "@type": "ListItem", position: 3, name: d.title, item: absPost(lang, p.slug) }
      ]
    }
  ];
  let html = docStart({
    lang, title: d.metaTitle, desc: d.metaDesc,
    canonical: absPost(lang, p.slug), altAr: absPost("ar", p.slug), altEn: absPost("en", p.slug), schemas
  });
  html += header(lang);
  html += `
  <main id="main">
    <article>
    <section class="hero svc-hero section--dark" aria-labelledby="post-title">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <a href="${homeUrl(lang)}">${esc(t.breadcrumbHome)}</a><span aria-hidden="true">/</span>
          <a href="${articlesUrl(lang)}">${esc(t.articlesLabel)}</a>
        </nav>
      </div>
      <div class="container hero__inner">
        <div class="hero__copy">
          <h1 class="hero__title" id="post-title">${esc(d.title)}</h1>
          <p class="hero__lead">${esc(d.lead)}</p>
          <p class="post__meta"><time datetime="${config.contentUpdated}" dir="ltr">${config.contentUpdated}</time></p>
        </div>
        <div class="hero__visual">${dataCore(false)}</div>
      </div>
    </section>

    <section class="section section--light">
      <div class="container prose">
        ${d.sections.map((s) => `<h2 class="prose__h">${esc(s.h)}</h2>
        ${s.paras.map((x) => `<p class="prose__p">${esc(x)}</p>`).join("\n        ")}
        ${s.bullets && s.bullets.length ? `<ul class="prose__list">\n          ${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("\n          ")}\n        </ul>` : ""}`).join("\n\n        ")}

        <aside class="takeaways">
          <p class="takeaways__title">${esc(t.takeaways)}</p>
          <ul class="takeaways__list">
            ${d.takeaways.map((x) => `<li>${esc(x)}</li>`).join("\n            ")}
          </ul>
        </aside>
      </div>
    </section>

    <section class="section svc-cta" id="contact" aria-labelledby="postcta-title">
      <div class="container svc-cta__inner">
        <div class="svc-cta__action">
          <p class="svc-cta__label">${esc(t.relatedService)}</p>
          <a class="btn btn--dark" href="${svcUrl(lang, svc)}">${esc(t.serviceNames[svc])} <span aria-hidden="true">${fwd(lang)}</span></a>
        </div>
        <div>
          <h2 class="svc-cta__title" id="postcta-title">${esc(d.ctaHook)}</h2>
          <p class="svc-cta__body">${esc(d.ctaBody)}</p>
        </div>
      </div>
    </section>
    </article>
  </main>`;
  html += footer(lang);
  html += docEnd();
  return html;
}

/* ---------- writers ---------- */
function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
  console.log("  ✓", rel, `(${(content.length / 1024).toFixed(1)}kb)`);
}

function build() {
  console.log("Generating pages…");
  // written first so asset() can hash it while the pages are rendered
  if (config.gtm) write("assets/js/analytics.js", analyticsJs());
  for (const lang of LANGS) {
    const other = ui[lang].otherLang;
    // homepage
    write(outPath(lang, "index.html"), injectLangSwitch(homePage(lang), homeUrl(other)));
    // contact
    write(outPath(lang, "contact.html"), injectLangSwitch(contactPage(lang), contactUrl(other)));
    // privacy / cookie policy
    write(outPath(lang, "privacy.html"), injectLangSwitch(privacyPage(lang), privacyUrl(other)));
    // services
    for (const s of services) {
      write(outPath(lang, `services/${s.slug}.html`), injectLangSwitch(servicePage(lang, s), svcUrl(other, s.slug)));
    }
    // city landing pages
    for (const c of cities) {
      write(outPath(lang, `cities/${c.slug}.html`), injectLangSwitch(cityPage(lang, c), cityUrl(other, c.slug)));
    }
    // blog
    if (posts.length) {
      write(outPath(lang, "articles/index.html"), injectLangSwitch(articlesIndex(lang), articlesUrl(other)));
      for (const p of posts) {
        write(outPath(lang, `articles/${p.slug}.html`), injectLangSwitch(articlePage(lang, p), postUrl(other, p.slug)));
      }
    }
    // 404 — served by ErrorDocument (.htaccess) and Netlify's default handler
    write(outPath(lang, "404.html"), injectLangSwitch(notFoundPage(lang), BASE + (other === "ar" ? "/404.html" : "/en/404.html")));
  }
  // llms.txt — AEO: lets AI answer engines read the site's structure directly
  write("llms.txt", llmsTxt());
  // sitemap + robots
  write("send.php", sendPhp());
  write("sitemap.xml", sitemap());
  /* Two sitemaps, both listed here at the domain root.
     robots.txt is only ever read from the root of a domain — a copy inside
     /blog/ has no effect whatsoever, which is why Hugo's own robots generation
     is disabled in the blog's config. The blog's sitemap index is therefore
     announced from this file or it is announced nowhere, and its articles wait
     on discovery through internal links alone. */
  write("robots.txt",
    `User-agent: *\nAllow: /\n\n` +
    `Sitemap: ${BASE}/sitemap.xml\n` +
    `Sitemap: ${BASE}/blog/sitemap.xml\n`);
  console.log("Done.");
}

/* ---------- llms.txt (AEO) ----------
   A plain-Markdown map of the site for AI answer engines. Spec: llmstxt.org */
function llmsTxt() {
  const svc = (lang) => services
    .map((s) => `- [${ui[lang].serviceNames[s.slug]}](${absSvc(lang, s.slug)}): ${s[lang].metaDesc}`)
    .join("\n");
  const cty = (lang) => cities
    .map((c) => `- [${c[lang].title}](${absCity(lang, c.slug)}): ${c[lang].metaDesc}`)
    .join("\n");
  const art = (lang) => posts
    .map((p) => `- [${p[lang].title}](${absPost(lang, p.slug)}): ${p[lang].excerpt}`)
    .join("\n");
  const section = (heading, body) => (body ? `\n## ${heading}\n\n${body}\n` : "");
  return `# Zero 2 One Data Recovery — من الصفر إلى الواحد

> Specialised data recovery in Riyadh, Saudi Arabia. We recover data from hard
> drives, SSD/NVMe, RAID arrays and servers, CCTV recorders, formatted media, and
> ransomware-encrypted systems. Diagnosis first, full confidentiality, 25+ years
> of experience. The site is bilingual: Arabic at the root (/) and English (/en/).

Contact: ${config.email} · ${config.phoneDisplay} · Riyadh, Saudi Arabia
Working hours: Saturday–Thursday, 10:00–22:00 (Asia/Riyadh)

## English

- [Home](${absHome("en")}): Overview, services, how it works, FAQ.
- [Contact](${absContact("en")}): Send case details (device, issue, urgency).
- [Privacy & cookies](${absPrivacy("en")}): How cookies and form data are used.

## Services (English)

${svc("en")}
${section("Areas served (English)", cty("en"))}${section("Guides (English)", art("en"))}
## العربية (Arabic)

- [الرئيسية](${absHome("ar")}): نظرة عامة، الخدمات، آلية العمل، الأسئلة الشائعة.
- [تواصل معنا](${absContact("ar")}): أرسل تفاصيل حالتك.
- [سياسة الخصوصية](${absPrivacy("ar")}): استخدام ملفات تعريف الارتباط والبيانات.

## الخدمات (Arabic)

${svc("ar")}
${section("المناطق التي نخدمها (Arabic)", cty("ar"))}${section("أدلة ومقالات (Arabic)", art("ar"))}
## Notes

- Stop using the affected device immediately; every write reduces recovery odds.
- Diagnosis determines the method — the storage medium only decides the tooling.
- For ransomware cases, isolate the device from the network and keep the ransom note.
`;
}

function sitemap() {
  const now = config.contentUpdated;
  const urls = [];
  const add = (locFn) => {
    const arU = locFn("ar"), enU = locFn("en");
    for (const [self, lang] of [[arU, "ar"], [enU, "en"]]) {
      urls.push(`  <url>
    <loc>${self}</loc>
    <lastmod>${now}</lastmod>
    <xhtml:link rel="alternate" hreflang="ar" href="${arU}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enU}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/"/>
  </url>`);
    }
  };
  add((l) => absHome(l));
  add((l) => absContact(l));
  add((l) => absPrivacy(l));
  for (const s of services) add((l) => absSvc(l, s.slug));
  for (const c of cities) add((l) => absCity(l, c.slug));
  // The 404 page is deliberately absent: it is noindex, and listing a noindex
  // URL in the sitemap is a contradictory signal Search Console reports as an error.
  if (posts.length) {
    add((l) => absArticles(l));
    for (const p of posts) add((l) => absPost(l, p.slug));
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}

/* Running the file builds the site; requiring it exposes the pieces without
   building. build/emit-chrome.js needs header() and footer() so the blog can
   render the site's real chrome instead of a lookalike copy of it. */
if (require.main === module) build();

module.exports = { header, footer, asset, docEnd, ui, config, BASE, LANGS, langPrefix };
