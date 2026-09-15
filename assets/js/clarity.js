"use strict";
// Microsoft Clarity loader — generated from config.clarity (y8m0knaknt).
// Microsoft ships this as an inline <script>. The site's CSP has no
// 'unsafe-inline', so pasted inline it would be blocked outright and record
// nothing — which is exactly how the blog ran without analytics for weeks.
// Same code, hoisted to a first-party file: createElement + insertBefore only,
// no dynamic markup and no code sinks.
// Clarity يسجّل جلسة الزائر وحركة مؤشّره، فلا يُحمَّل قبل موافقته. وإن وافق
// لاحقًا في الجلسة نفسها يُحمَّل عند الحدث بلا إعادة تحميل الصفحة.
function load(c, l, a, r, i, t, y) {
  if (l.getElementById("clarity-tag")) return;
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  t = l.createElement(r); t.async = 1; t.id = "clarity-tag";
  t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
}
var ID = "y8m0knaknt";
if (window.z2oConsent && window.z2oConsent.state === "granted") {
  load(window, document, "clarity", "script", ID);
} else {
  window.addEventListener("z2o:consent-granted", function () {
    load(window, document, "clarity", "script", ID);
  });
}
