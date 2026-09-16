"use strict";
// Google Tag Manager loader — generated from config.gtm (GTM-NDWR4XQK).
// Injects the container via createElement + insertBefore only, with no dynamic
// markup or code sinks, so it stays CSP- and audit-clean. GA4 is configured as
// a tag inside the GTM container.
// الحاوية لا تُحمَّل قبل الموافقة. Consent Mode وحده يمنع التخزين لكنه يُبقي
// الطلبات ذاهبة إلى جوجل، وسياسة الخصوصية هنا تعد بأن أدوات القياس «لا يعمل
// أيٌّ منها قبل موافقتك» — فالوعد يُنفَّذ بالحجب لا بالتخفيف. وإن وافق الزائر
// أثناء الجلسة تُحمَّل عند الحدث بلا إعادة تحميل الصفحة.
function boot(w, d, s, l, i) {
  if (d.getElementById("gtm-tag")) return;
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0];
  var j = d.createElement(s);
  var dl = l !== "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.id = "gtm-tag";
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
}
var GTM_ID = "GTM-NDWR4XQK";
if (window.z2oConsent && window.z2oConsent.state === "granted") {
  boot(window, document, "script", "dataLayer", GTM_ID);
} else {
  window.addEventListener("z2o:consent-granted", function () {
    boot(window, document, "script", "dataLayer", GTM_ID);
  });
}
