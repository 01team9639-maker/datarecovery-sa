"use strict";
/* أحداث القياس — تُدفَع إلى dataLayer وتلتقطها حاوية GTM.

   القاعدة الحاكمة: لا يُرسَل إلى GA4 ولا إلى Clarity اسمٌ ولا رقم ولا بريد
   ولا تفاصيل حالة. ما يُرسَل هنا وصفٌ للفعل لا لصاحبه: أي زرّ ضُغط، في أي
   موضع من الصفحة، وبأي لغة، وأي خدمة تخصّه.

   منع الازدواج بنافذة زمنية قصيرة لكل عنصر، لا بحظر نوع الحدث لبقية الصفحة.
   الفرق جوهري: الضغطتان المتلاحقتان على الزرّ نفسه نيّة واحدة — التطبيق تأخّر
   في الفتح فضغط الزائر ثانية — أما من يضغط واتساب، ثم يقرأ صفحة الخدمة، ثم
   يعود فيضغط مرة أخرى بعد دقيقة، فتلك نيّة ثانية حقيقية تخصّ خطة القياس.
   الحظر الأبدي كان يبتلعها ويُظهر الصفحة أقلّ تفاعلًا مما هي.

   والمفتاح هو العنصر نفسه لا نوعُ الحدث ولا موضعُه: زرّان مختلفان في الموضع
   نفسه — زرّ اتصال وزرّ واتساب في الفوتر — كان المفتاح القديم
   (event + موضع) يحجب أحدهما بالآخر لو تشاركا النوع. الكبت يُعلَّق على
   العنصر عبر WeakMap، فيموت معه ولا يُسرّب ذاكرة.

   والمستمع يُركَّب مرة واحدة ولو أُعيد تشغيل الملف: علامة على window تمنع
   التركيب الثاني، وإلا صار كل حدث حدثين.

   generate_lead خارج هذا الملف عمدًا — يُطلَق من main.js بعد أن يردّ
   send.php بالنجاح، لا عند الضغط على زرّ الإرسال. الضغط نيّة، والنجاح طلب. */
(function (w, d) {
  if (w.__z2oEventsReady) return;      // لا تركيب ثانٍ للمستمع
  w.__z2oEventsReady = true;

  /* نافذة الكبت: أقصر من أن تبتلع نيّة ثانية، وأطول من أن تمرّ ضغطة مزدوجة. */
  var DEDUPE_MS = 1500;
  var lastByElement = new WeakMap();   // العنصر → { اسم الحدث: آخر وقت }
  var lastByName = {};                 // للأحداث بلا عنصر

  function lang() {
    return d.documentElement.lang === "en" ? "en" : "ar";
  }

  /* اسم الخدمة يُشتقّ من المسار لا من نصّ الصفحة: الأول ثابت بين اللغتين
     فتجتمع الأرقام في تقرير واحد، والثاني يتفرّق بينهما. */
  function serviceName() {
    // يلتقط /services/hdd.html و /services/ransomware/cases/*.html معًا:
    // صفحات الحالات تخصّ الفدية، وكانت تُرسَل "none" فتضيع نسبتها إليها.
    var m = d.location.pathname.match(/\/services\/([a-z0-9-]+)(?:\.html$|\/)/);
    if (m) return m[1];
    var c = d.location.pathname.match(/\/cities\/([a-z0-9-]+)\.html$/);
    if (c) return "city:" + c[1];
    return "none";
  }

  /* موضع الضغطة: الترويسة أم الهيرو أم الفوتر أم زرّ عائم. يُقرأ من أقرب
     جدّ يحمل سمة صريحة، وإلا من اسم الصنف — فنعرف أي موضع يُقنع فعلًا. */
  function ctaLocation(el) {
    var tagged = el.closest("[data-cta-location]");
    if (tagged) return tagged.getAttribute("data-cta-location");
    if (el.closest(".site-header, .header")) return "header";
    if (el.closest(".hero")) return "hero";
    if (el.closest(".site-footer, .footer")) return "footer";
    if (el.classList.contains("wa-fab")) return "floating";
    if (el.closest(".contact, form")) return "contact";
    return "body";
  }

  /* لا يُسجَّل تفاعل قبل أن يختار الزائر. الملف لا يرسل شيئًا بنفسه — يدفع
     إلى dataLayer وحده — لكن GTM يعيد قراءة المصفوفة كاملةً عند إقلاعه،
     فدفعةٌ سبقت القبول تصير حدثًا مُرسَلًا بأثر رجعي ما إن يُربَط بها وسم في
     الحاوية. اليوم لا وسم لها فلا شيء يُرسَل — وهذا حظٌّ لا تصميم، يزول مع
     أول إعداد في الحاوية.

     ونصّ الخصوصية يقول: «لا يعمل أيٌّ من هذه الثلاثة قبل موافقتك». فالقاعدة
     هنا تطابقه بلا اعتماد على إعداد خارج المستودع: ما وقع قبل الاختيار لا
     يُقاس، وما وقع بعد القبول يُقاس. */
  function push(event, el, extra) {
    if (!w.z2oConsent || w.z2oConsent.state !== "granted") return;

    var where = el ? ctaLocation(el) : "none";
    var now = Date.now();

    if (el) {
      var seen = lastByElement.get(el);
      if (!seen) { seen = {}; lastByElement.set(el, seen); }
      if (seen[event] && now - seen[event] < DEDUPE_MS) return;
      seen[event] = now;
    } else {
      if (lastByName[event] && now - lastByName[event] < DEDUPE_MS) return;
      lastByName[event] = now;
    }

    var payload = {
      event: event,
      page_language: lang(),
      service_name: serviceName()
    };
    if (el) payload.cta_location = where;
    if (extra) for (var k in extra) payload[k] = extra[k];
    (w.dataLayer = w.dataLayer || []).push(payload);
    return true;
  }

  w.z2oTrack = push;

  d.addEventListener("click", function (e) {
    var a = e.target.closest("a, button");
    if (!a) return;
    var href = (a.getAttribute("href") || "").toLowerCase();

    if (href.indexOf("wa.me") > -1 || href.indexOf("whatsapp") > -1) {
      push("whatsapp_click", a);
    } else if (href.indexOf("tel:") === 0) {
      push("phone_click", a);
    } else if (href.indexOf("mailto:") === 0) {
      push("email_click", a);
    } else if (a.matches(".btn, .btn--accent, .header__cta, .footer__cta-btn")) {
      push("service_cta_click", a);
    }
  }, true);

  /* form_start عند أول إدخال حقيقي لا عند التركيز: التركيز يقع بالتمرير
     بلوحة المفاتيح وبالضغط العابر، فيضخّم الرقم بلا نيّة خلفه. */
  var form = d.querySelector("form[data-contact-form], form#contactForm, .contact form, form");
  if (form) {
    /* form_start حدث واحد في الصفحة بطبيعته، وتكراره مع كل حرف يُفرغه من
       معناه — لكن { once: true } كان يستهلك المستمع ولو رُدَّت الدفعة لغياب
       الموافقة. من يكتب ثم يقبل كان يفقد الحدث إلى الأبد. المستمع يُزيل نفسه
       عند أول دفعة ناجحة لا عند أول ضغطة مفتاح. */
    var onFirstInput = function () {
      if (push("form_start", form)) form.removeEventListener("input", onFirstInput);
    };
    form.addEventListener("input", onFirstInput);
  }
})(window, document);
