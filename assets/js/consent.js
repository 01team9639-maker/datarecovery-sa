"use strict";
(function (w, d) {
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

  /* القبول يرفع أذونات القياس وحدها. أذونات الإعلانات — ad_storage و
     ad_user_data و ad_personalization — تبقى مرفوضة: الزائر وافق على أن
     نقيس أداء الموقع، لا على أن نبني منه جمهورًا إعلانيًّا. رفعُها بموافقة
     واحدة يوسّع الإذن إلى ما لم يُطلَب، وهو بالضبط ما تمنعه اللائحة. */
  function granted() {
    return {
      analytics_storage: "granted",
      functionality_storage: "granted",
      personalization_storage: "granted",
      security_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    };
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
      this.state = "granted";
      gtag("consent", "update", granted());
      w.dataLayer.push({ event: "consent_granted" });
      w.dispatchEvent(new Event("z2o:consent-granted"));
    },
    deny: function () {
      try { w.localStorage.setItem(KEY, "denied"); } catch (e) {}
      this.state = "denied";
      gtag("consent", "update", DENIED);
      w.dataLayer.push({ event: "consent_denied" });
    },
    /* سحب الموافقة بعد منحها: الحالة تُخفَّض في الذاكرة والتخزين معًا، لكن
       الحاوية تكون قد أقلعت وكوكيز الطرف الأول كُتبت. فالسحب يمسح ما نملك
       مسحه ثم يُعيد التحميل — وهي الطريقة الوحيدة الموثوقة لإيقاف ما يعمل
       أصلًا، والوعد بالإيقاف بلا تنفيذه أسوأ من عدم عرضه. */
    withdraw: function () {
      try { w.localStorage.setItem(KEY, "denied"); } catch (e) {}
      this.state = "denied";
      gtag("consent", "update", DENIED);
      var names = d.cookie.split(";");
      for (var n = 0; n < names.length; n++) {
        var name = names[n].split("=")[0].trim();
        if (!/^_ga|^_gid|^_gcl|^_clck|^_clsk|^MUID/.test(name)) continue;
        var host = w.location.hostname;
        d.cookie = name + "=; Max-Age=0; path=/";
        d.cookie = name + "=; Max-Age=0; path=/; domain=" + host;
        d.cookie = name + "=; Max-Age=0; path=/; domain=." + host;
      }
      w.location.reload();
    },
    /* يُستدعى من رابط «إعدادات الخصوصية» في الفوتر. */
    reopen: function () {
      try { w.localStorage.removeItem(KEY); } catch (e) {}
      this.state = null;
      w.dispatchEvent(new Event("z2o:consent-reopen"));
    }
  };
})(window, document);
