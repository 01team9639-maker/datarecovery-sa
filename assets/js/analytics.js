"use strict";
// Google Tag Manager loader — generated from config.gtm (GTM-NVKDG74Z).
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
})(window, document, "script", "dataLayer", "GTM-NVKDG74Z");
