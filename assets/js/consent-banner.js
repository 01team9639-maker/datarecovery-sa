"use strict";
(function (w, d) {
  var c = w.z2oConsent;
  if (!c) return;

  var ar = d.documentElement.lang !== "en";
  var T = ar ? {
    body: "نستعمل ملفات تعريف الارتباط لقياس أداء الموقع وتحسينه. لا نجمع اسمك ولا رقمك ولا تفاصيل حالتك لأغراض القياس.",
    accept: "أوافق", reject: "أرفض", more: "سياسة الخصوصية",
    href: "/privacy.html", label: "إشعار ملفات تعريف الارتباط",
    settings: "إعدادات الخصوصية", withdraw: "سحب الموافقة على القياس"
  } : {
    body: "We use cookies to measure and improve site performance. We never collect your name, phone or case details for measurement.",
    accept: "Accept", reject: "Reject", more: "Privacy policy",
    href: "/en/privacy.html", label: "Cookie notice",
    settings: "Privacy settings", withdraw: "Withdraw measurement consent"
  };

  var box = d.createElement("div");
  box.className = "consent";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-live", "polite");
  box.setAttribute("aria-label", T.label);

  var p = d.createElement("p");
  p.className = "consent__text";
  p.appendChild(d.createTextNode(T.body + " "));
  var a = d.createElement("a");
  a.href = T.href; a.textContent = T.more;
  p.appendChild(a);

  var row = d.createElement("div");
  row.className = "consent__actions";

  function button(text, cls, fn) {
    var b = d.createElement("button");
    b.type = "button";
    b.className = "consent__btn " + cls;
    b.textContent = text;
    b.addEventListener("click", function () {
      fn();
      hide();
      var l = d.querySelector("[data-consent-settings]");
      if (l) l.textContent = c.state === "granted" ? T.withdraw : T.settings;
    });
    return b;
  }

  row.appendChild(button(T.reject, "consent__btn--ghost", function () { c.deny(); }));
  row.appendChild(button(T.accept, "consent__btn--solid", function () { c.grant(); }));

  box.appendChild(p);
  box.appendChild(row);

  /* الشريط آخر عنصر في الصفحة، فمن يتنقّل بلوحة المفاتيح كان يحتاج أربعًا
     وخمسين ضغطة Tab ليبلغ نافذةً تطلب منه قرارًا — قِستُها على الإنتاج في
     2026-09-16. و role="dialog" بلا نقل تركيز لا يُعلَن نافذةً أصلًا: قارئ
     الشاشة يمرّ عليه كما يمرّ على أي div.

     فالتركيز ينتقل إليه عند ظهوره، ويدور بين عناصره ما دام مفتوحًا، ويعود
     إلى حيث كان عند إغلاقه. والحصر لا يحبس أحدًا: رابط سياسة الخصوصية داخل
     النافذة، فمن أراد القراءة قبل الاختيار يبلغه. */
  var lastFocus = null;

  function focusables() {
    return [].slice.call(box.querySelectorAll("a[href], button")).filter(function (e) {
      return e.offsetParent !== null;
    });
  }

  function onKey(e) {
    if (e.key !== "Tab") return;
    var f = focusables();
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function show() {
    if (d.querySelector(".consent")) return;
    lastFocus = d.activeElement;
    d.body.appendChild(box);
    box.setAttribute("tabindex", "-1");
    box.addEventListener("keydown", onKey);
    // التركيز على «أوافق»: آخر الأزرار وأقربها إلى ما يريده أكثر الزوّار،
    // وSHIFT+Tab منه يبلغ «أرفض» ثم الرابط بضغطة أو ضغطتين.
    var f = focusables();
    (f.length ? f[f.length - 1] : box).focus();
  }

  function hide() {
    if (!box.parentNode) return;
    box.removeEventListener("keydown", onKey);
    box.remove();
    // من فتحه من رابط الفوتر يعود إلى الرابط نفسه لا إلى أول الصفحة.
    if (lastFocus && d.contains(lastFocus) && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  // يُفتح عند أول زيارة، ويُعاد فتحه من رابط «إعدادات الخصوصية» في الفوتر.
  if (!c.state) show();
  w.addEventListener("z2o:consent-reopen", show);

  // رابط الفوتر: يُعرَض دائمًا، ونصّه يتبع الحالة — من وافق يرى «سحب
  // الموافقة»، ومن رفض أو لم يختر يرى «إعدادات الخصوصية».
  var link = d.querySelector("[data-consent-settings]");
  if (link) {
    var label = function () {
      link.textContent = c.state === "granted" ? T.withdraw : T.settings;
    };
    label();
    link.addEventListener("click", function (e) {
      e.preventDefault();
      if (c.state === "granted") { c.withdraw(); return; }
      c.reopen();
    });
  }

  box.__hide = hide;
})(window, document);
