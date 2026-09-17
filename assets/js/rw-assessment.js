"use strict";
/* نموذج تقييم حالة هجوم فدية — /ransomware/assessment/ (التكليف §10، الملحق B-9).

   العقد باختصار:
   - لا نجاح إلا بردّ الخادم بعد الحفظ ومعه رقم مرجعي صادر منه. لا رسالة نجاح
     عند النقر، ولا عند 200 بلا ok، ولا من ذاكرة المتصفح.
   - مفتاح طلب (request_key) يُولَّد مرة لكل تعبئة، ويُرسل مع كل محاولة. الخادم
     يعيد الرقم المرجعي نفسه للمفتاح نفسه، فالنقر المزدوج وإعادة المحاولة بعد
     انقطاع الردّ لا يُنشئان طلبين.
   - generate_lead مرة واحدة لكل مفتاح، بعد تأكيد الحفظ وحده. لا رقم الطلب ولا
     أي قيمة مُدخلة إلى dataLayer — z2oTrack يرسل وصف الفعل فقط، ويرفض كل شيء
     قبل موافقة القياس. والنموذج نفسه يعمل مع رفض القياس.
   - المدخلات تبقى في الصفحة عند الخطأ، ولا تُكتب في URL ولا localStorage.
   - التحديد المسبق (?service= و?customer_type=) لا يطلق input، فلا form_start. */
(function (w, d) {
  var form = d.getElementById("rwAssessForm");
  if (!form) return;

  var ENDPOINT = form.getAttribute("action") || "/ransomware-assessment.php";
  var unavailable = d.getElementById("rwUnavailable");
  var statusBox = d.getElementById("rwStatus");
  var success = d.getElementById("rwSuccess");
  var submitBtn = form.querySelector(".cform__submit");
  var submitLabel = submitBtn.querySelector(".cform__submit-label");
  var idleLabel = submitLabel.textContent;
  var msg = function (name) { return form.getAttribute("data-" + name) || ""; };
  var MAX = 1000;
  var SERVICES = ["files", "servers_nas", "database", "virtual_machine", "backup"];

  var token = null;
  var ready = null;          // null: لم يُعرف بعد · true · false (الخادم أجاب: غير مهيّأ)
  var busy = false;
  var attempted = false;
  var reported = {};
  var key = newKey();

  function newKey() {
    var c = w.crypto;
    if (c && typeof c.randomUUID === "function") return c.randomUUID();
    var a = new Uint8Array(16);
    c.getRandomValues(a);
    return Array.prototype.map.call(a, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
  }

  /* الأرقام العربية (٠–٩) والفارسية/الهندية الشرقية (۰–۹) إلى ASCII. */
  function asciiDigits(s) {
    return String(s || "")
      .replace(/[٠-٩]/g, function (ch) { return String(ch.charCodeAt(0) - 0x0660); })
      .replace(/[۰-۹]/g, function (ch) { return String(ch.charCodeAt(0) - 0x06F0); });
  }
  function chars(s) { return Array.from ? Array.from(s).length : s.length; }
  function el(name) { return form.elements[name]; }
  function checked(name) {
    return Array.prototype.filter.call(form.querySelectorAll('input[name="' + name + '"]'), function (i) { return i.checked; })
      .map(function (i) { return i.value; });
  }

  /* ---- الحالة: هل الخادم مهيّأ لاستقبال الطلبات؟ ---- */
  function loadStatus() {
    return fetch(ENDPOINT + "?status=1", {
      headers: { Accept: "application/json" }, credentials: "same-origin", cache: "no-store"
    })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        ready = !!(j && j.ready === true);
        token = ready && typeof j.token === "string" ? j.token : null;
        if (!ready) showUnavailable();
        return ready;
      })
      .catch(function () { return null; });   // عطل شبكة عابر: لا نحكم بأن النموذج معطّل
  }

  function showUnavailable() {
    form.hidden = true;
    if (unavailable) unavailable.hidden = false;
  }

  /* ---- التحديد المسبق من الرابط: مفاتيح ثابتة فقط ---- */
  (function prefill() {
    var q;
    try { q = new URLSearchParams(w.location.search); } catch (e) { return; }
    var svc = q.get("service");
    if (svc && SERVICES.indexOf(svc) > -1) {
      var box = form.querySelector('input[name="affected[]"][value="' + svc + '"]');
      if (box) box.checked = true;
    }
    if (q.get("customer_type") === "business") {
      var r = form.querySelector('input[name="customer_type"][value="business"]');
      if (r) r.checked = true;
    }
  })();

  /* ---- الحقول الشرطية ---- */
  var companyField = d.getElementById("rw-company-field");
  var condPhone = form.querySelector('[data-cond="phone"]');
  var condEmail = form.querySelector('[data-cond="email"]');
  function method() { return checked("contact_method")[0] || ""; }
  function syncConditional() {
    if (companyField) companyField.hidden = checked("customer_type")[0] !== "business";
    var m = method();
    var req = "(" + msg("word-required") + ")", opt = "(" + msg("word-optional") + ")";
    if (condPhone) condPhone.textContent = m ? (m === "email" ? opt : req) : "";
    if (condEmail) condEmail.textContent = m ? (m === "email" ? req : opt) : "";
  }
  syncConditional();

  var desc = el("description");
  var counter = d.getElementById("rw-desc-count");
  var countNum = counter && counter.querySelector("[data-count]");
  function syncCount() {
    if (!countNum) return;
    var n = chars(desc.value);
    countNum.textContent = String(n);
    counter.classList.toggle("is-over", n > MAX);
  }
  syncCount();

  /* ---- التحقق ---- */
  function normPhone() {
    var cc = asciiDigits(el("phone_cc").value).replace(/[\s-]/g, "").replace(/^\+/, "").replace(/^00/, "");
    var num = asciiDigits(el("phone").value).replace(/[\s().-]/g, "").replace(/^0+/, "");
    return { cc: cc, num: num };
  }
  function phoneValid() {
    var p = normPhone();
    return /^[1-9]\d{0,2}$/.test(p.cc) && /^\d{6,14}$/.test(p.num) && (p.cc.length + p.num.length) >= 8 && (p.cc.length + p.num.length) <= 15;
  }
  function emailValid(v) {
    return v.length <= 254 && /^[^\s@<>()"]+@[^\s@<>()"]+\.[^\s@<>()"]{2,}$/.test(v);
  }

  var FIELDS = [
    { id: "rw-name", target: "rw-name", test: function () { var v = el("name").value.trim(); return v ? (chars(v) <= 100 ? "" : "required") : "required"; } },
    { id: "rw-customer", target: "rw-customer", test: function () { return checked("customer_type").length ? "" : "required"; } },
    { id: "rw-method", target: "rw-method", test: function () { return method() ? "" : "required"; } },
    { id: "rw-phone", target: "rw-phone", test: function () {
        var m = method(), has = el("phone").value.trim() !== "";
        if (!has) return (m === "call" || m === "whatsapp") ? "required" : "";
        return phoneValid() ? "" : "phone";
      } },
    { id: "rw-email", target: "rw-email", test: function () {
        var v = el("email").value.trim();
        if (!v) return method() === "email" ? "required" : "";
        return emailValid(v) ? "" : "email";
      } },
    { id: "rw-affected", target: "rw-affected", test: function () { return checked("affected[]").length ? "" : "required"; } },
    { id: "rw-impact", target: "rw-impact", test: function () { return checked("impact").length ? "" : "required"; } },
    { id: "rw-desc", target: "rw-desc", test: function () {
        var v = desc.value.trim();
        if (!v) return "required";
        return chars(desc.value) > MAX ? "length" : "";
      } },
    { id: "rw-consent", target: "rw-consent", test: function () { return el("privacy_ack").checked ? "" : "required"; } }
  ];
  var TEXT = { required: "err-required", phone: "err-phone", email: "err-email", length: "err-length" };

  function setError(f, kind) {
    var box = d.getElementById(f.id + "-err");
    var target = d.getElementById(f.target);
    if (!box || !target) return;
    if (kind) {
      box.textContent = msg(TEXT[kind] || "err-required");
      box.hidden = false;
      target.setAttribute("aria-invalid", "true");
    } else {
      box.textContent = "";
      box.hidden = true;
      target.removeAttribute("aria-invalid");
    }
  }
  function validate() {
    var bad = [];
    FIELDS.forEach(function (f) { var k = f.test(); setError(f, k); if (k) bad.push(f); });
    return bad;
  }
  function focusField(f) {
    var target = d.getElementById(f.target);
    if (!target) return;
    var focusable = target.matches("fieldset") ? target.querySelector("input") : target;
    if (f.id === "rw-phone" && !el("phone").value.trim()) focusable = el("phone");
    if (focusable) focusable.focus();
  }

  function setStatus(kind, title, body) {
    if (!kind) { statusBox.hidden = true; return; }
    statusBox.classList.toggle("is-error", kind === "error");
    statusBox.querySelector(".cform__status-title").textContent = title;
    statusBox.querySelector(".cform__status-body").textContent = body || "";
    statusBox.hidden = false;
  }
  function setBusy(on) {
    busy = on;
    submitBtn.disabled = on;
    submitBtn.setAttribute("aria-busy", on ? "true" : "false");
    submitLabel.textContent = on ? msg("sending") : idleLabel;
  }
  function track(event, extra) {
    if (w.z2oTrack) w.z2oTrack(event, form, extra);
  }

  form.addEventListener("change", function (e) {
    if (e.target.name === "customer_type" || e.target.name === "contact_method") syncConditional();
    if (attempted) validate();
  });
  form.addEventListener("input", function (e) {
    if (e.target === desc) syncCount();
    if (attempted) validate();
  });

  /* ---- الإرسال ---- */
  function post(allowRetry) {
    var fd = new FormData(form);
    var p = normPhone();
    fd.set("phone_cc", p.cc ? "+" + p.cc : "");
    fd.set("phone", el("phone").value.trim() ? p.num : "");
    fd.set("devices", asciiDigits(el("devices").value));
    fd.set("request_key", key);
    fd.set("token", token || "");
    return fetch(ENDPOINT, {
      method: "POST", body: fd, credentials: "same-origin", cache: "no-store",
      headers: { Accept: "application/json" }
    }).then(function (r) {
      return r.json().catch(function () { return { ok: false, error: "server" }; })
        .then(function (j) { return { status: r.status, j: j || {} }; });
    }).then(function (res) {
      // رمز منتهي: رمز جديد ثم محاولة واحدة بالمفتاح نفسه — لا تكرار للطلب.
      if (res.j.error === "token" && allowRetry) {
        token = null;
        return loadStatus().then(function (ok) { return ok ? post(false) : res; });
      }
      return res;
    });
  }

  function onSuccess(ref) {
    if (!reported[key]) {
      reported[key] = true;
      track("generate_lead");
    }
    success.querySelector(".rw-ref").textContent = ref;
    form.reset();
    form.hidden = true;
    success.hidden = false;
    success.focus();
    key = newKey();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (busy) return;
    attempted = true;
    var bad = validate();
    if (bad.length) {
      setStatus("error", msg("errors-summary"), "");
      focusField(bad[0]);
      track("form_error", { error_kind: "validation" });
      return;
    }
    setStatus(null);
    setBusy(true);
    (token ? Promise.resolve(true) : loadStatus())
      .then(function (ok) {
        if (ok === false) return null;            // الخادم غير مهيّأ: عُرضت كتلة التواصل المباشر
        return post(true);
      })
      .then(function (res) {
        if (!res) return;
        var ref = res.j && res.j.ref;
        if (res.j.ok === true && typeof ref === "string" && /^RW-\d{8}-[A-Z2-7]{6}$/.test(ref)) {
          onSuccess(ref);
          return;
        }
        if (res.j.error === "unavailable") { showUnavailable(); return; }
        if (res.j.error === "validation" && res.j.fields && res.j.fields.length) {
          var shown = [];
          FIELDS.forEach(function (f) {
            var hit = res.j.fields.indexOf(f.id) > -1;
            setError(f, hit ? (f.id === "rw-phone" ? "phone" : f.id === "rw-email" ? "email" : f.id === "rw-desc" && chars(desc.value) > MAX ? "length" : "required") : "");
            if (hit) shown.push(f);
          });
          setStatus("error", msg("errors-summary"), "");
          if (shown[0]) focusField(shown[0]);
          track("form_error", { error_kind: "validation" });
          return;
        }
        setStatus("error", msg("error"), "");
        statusBox.focus();
        track("form_error", { error_kind: "server" });
      })
      .catch(function () {
        setStatus("error", msg("error"), "");
        statusBox.focus();
        track("form_error", { error_kind: "network" });
      })
      .then(function () { setBusy(false); });
  });

  loadStatus();
})(window, document);
