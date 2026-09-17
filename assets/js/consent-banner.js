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

  /* شريط غير حاجز، لا نافذة حوار. جرّبتُ النافذة (2026-09-16) فظهر عيبها
     على الإنتاج في 2026-09-17: من يفتح سياسة الخصوصية من الشريط يصل إلى
     صفحة يظهر فيها الشريط نفسه ويحبس التركيز من جديد — اثنتا عشرة ضغطة Tab
     تدور بين الأزرار الثلاثة ولا تبلغ سطرًا من السياسة. أي لا يمكن قراءة ما
     يُطلَب القبول به قبل القبول.

     فالشريط منطقة (region) مسمّاة: لا يسرق التركيز ولا يحبسه. وموضعه أول
     الصفحة في ترتيب المستند وإن ظهر أسفل الشاشة، فيبلغه مستعمل لوحة المفاتيح
     وقارئ الشاشة قبل أي شيء آخر — بثلاث ضغطات يتجاوزه — وهو ترتيب شريط
     الموافقة في نظام تصميم GOV.UK. */
  var box = d.createElement("section");
  box.className = "consent";
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

  /* التركيز:
     - الظهور التلقائي لا ينقل التركيز: الزائر لم يطلب شيئًا بعد.
     - الفتح من رابط الفوتر ينقله إلى الشريط نفسه — طلبٌ صريح، ومن طلبه
       يُنتظَر أن يجد ما فتحه. الشريط كلّه لا زرّ بعينه، فلا يُدفَع إلى قبول
       أو رفض بمجرد Enter.
     - Escape والتركيز داخل الشريط يُغلقه بلا اختيار: الحالة لا تتغيّر، فالقياس
       يبقى محجوبًا ما لم يُقبَل، ورابط الفوتر يعيد فتحه، ويظهر في الصفحة
       التالية ما دام لا اختيار محفوظ. Escape خارج الشريط لا يخصّه (الدرج
       في main.js يستعمله).
     - عند الإغلاق يعود التركيز إلى من فتحه. وإن ظهر تلقائيًّا وأُغلق بلوحة
       المفاتيح ينتقل إلى أول عنصر بعده في الصفحة — حيث كان سيصل Tab التالي.
       وبالفأرة لا يُنقَل التركيز: نقله يُظهر رابط «تخطَّ إلى المحتوى» لمن لم
       يستعمل لوحة المفاتيح أصلًا. */
  var opener = null;
  var viaKeyboard = false;
  d.addEventListener("keydown", function () { viaKeyboard = true; }, true);
  d.addEventListener("pointerdown", function () { viaKeyboard = false; }, true);

  box.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") { e.preventDefault(); hide(); }
  });

  function show(fromUser) {
    if (box.parentNode) return;
    d.body.insertBefore(box, d.body.firstChild);
    if (fromUser) {
      opener = d.activeElement && d.activeElement !== d.body ? d.activeElement : null;
      box.setAttribute("tabindex", "-1");
      box.focus();
    }
  }

  function nextFocusable() {
    var all = d.querySelectorAll("a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])");
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (box.contains(el) || el.offsetParent === null) continue;
      return el;
    }
    return null;
  }

  function hide() {
    if (!box.parentNode) return;
    var hadFocus = box.contains(d.activeElement);
    box.remove();
    box.removeAttribute("tabindex");
    if (hadFocus) {
      var target = opener && d.contains(opener) ? opener : (viaKeyboard ? nextFocusable() : null);
      if (target && target.focus) target.focus();
    }
    opener = null;
  }

  // يُفتح عند أول زيارة، ويُعاد فتحه من رابط «إعدادات الخصوصية» في الفوتر.
  if (!c.state) show(false);
  w.addEventListener("z2o:consent-reopen", function () { show(true); });

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
