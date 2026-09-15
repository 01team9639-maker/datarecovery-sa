"use strict";
(function (w) {
  var KEY = "z2o:consent";
  w.dataLayer = w.dataLayer || [];
  function gtag() { w.dataLayer.push(arguments); }
  w.gtag = w.gtag || gtag;

  var DENIED = {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted"
  };

  function granted() {
    var o = {};
    for (var k in DENIED) o[k] = "granted";
    return o;
  }

  var saved = null;
  try { saved = w.localStorage.getItem(KEY); } catch (e) { /* وضع خاص */ }

  // الحالة الافتراضية تُرسَل دائمًا أولًا، ثم يرفعها التحديث إن سبقت الموافقة.
  gtag("consent", "default", DENIED);
  if (saved === "granted") gtag("consent", "update", granted());

  w.z2oConsent = {
    key: KEY,
    state: saved,
    grant: function () {
      try { w.localStorage.setItem(KEY, "granted"); } catch (e) {}
      gtag("consent", "update", granted());
      w.dataLayer.push({ event: "consent_granted" });
      w.dispatchEvent(new Event("z2o:consent-granted"));
    },
    deny: function () {
      try { w.localStorage.setItem(KEY, "denied"); } catch (e) {}
      gtag("consent", "update", DENIED);
      w.dataLayer.push({ event: "consent_denied" });
    }
  };
})(window);
