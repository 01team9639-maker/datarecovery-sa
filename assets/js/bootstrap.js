"use strict";
document.documentElement.classList.add("js");
// The splash is a first-impression flourish, not a loading indicator. Replaying
// it on every internal click of a multi-page site costs each navigation over a
// second of black screen, so it runs once per session. Storage is unavailable
// in some privacy modes — there the splash simply plays as before.
try {
  if (sessionStorage.getItem("z2o:splash") === "1") {
    document.documentElement.classList.add("no-splash");
  } else {
    sessionStorage.setItem("z2o:splash", "1");
  }
} catch (e) { /* storage blocked — keep the splash */ }
