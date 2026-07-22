(function () {
  "use strict";
  var locale = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  var language = locale.indexOf("ar") === 0 ? "ar" : "en";
  location.replace("/" + language + "/");
})();
