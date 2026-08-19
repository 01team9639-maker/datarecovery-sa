/* ==========================================================================
   من الصفر إلى الواحد — interactions
   Vanilla JS, no dependencies. Loaded with `defer`.
   ========================================================================== */
(function () {
  "use strict";

  var isAr = (document.documentElement.lang || "").indexOf("ar") === 0;
  var L = isAr
    ? { open: "فتح القائمة", close: "إغلاق القائمة" }
    : { open: "Open menu", close: "Close menu" };

  /* ---- Preloader: cycle the service names, then fade out ---- */
  var pre = document.getElementById("preloader");
  if (pre) {
    var seqDone = false;
    var loaded = document.readyState === "complete";
    var preHidden = false;
    var safety;
    var hidePre = function () {
      if (preHidden) return;            // idempotent: load / sequence / safety may all fire
      preHidden = true;
      if (safety) clearTimeout(safety);
      pre.classList.add("is-done");
      setTimeout(function () { if (pre.parentNode) pre.parentNode.removeChild(pre); }, 600);
    };
    var maybeHide = function () { if (seqDone && loaded) hidePre(); };
    // Safety cap: never let a slow/stalled resource keep the splash over the
    // page. After 5s we reveal the content regardless of load/sequence state.
    safety = setTimeout(hidePre, 5000);
    window.addEventListener("load", function () { loaded = true; maybeHide(); });

    var items = pre.querySelectorAll(".preloader__svc-item");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!items.length || reduce) {
      if (items.length) items[0].classList.add("is-active");
      seqDone = true;
      maybeHide();
    } else {
      var i = 0, STEP = 240;
      var advance = function () {
        items[i].classList.add("is-active");
        if (i > 0) items[i - 1].classList.remove("is-active");
        i++;
        if (i < items.length) setTimeout(advance, STEP);
        else setTimeout(function () { seqDone = true; maybeHide(); }, 360);
      };
      advance();
    }
  }

  /* ---- Side navigation drawer ---- */
  var toggle = document.querySelector(".menu-fab");
  var drawer = document.getElementById("site-drawer");
  var scrim = document.querySelector(".drawer-scrim");
  var setNav = function () {};

  if (toggle && drawer && scrim) {
    // Make everything except the drawer/scrim inert while the menu is open, so
    // the background can't be reached by keyboard or assistive tech.
    var setBackgroundInert = function (on) {
      Array.prototype.forEach.call(document.body.children, function (el) {
        if (el === drawer || el === scrim) return;
        if (on) el.setAttribute("inert", "");
        else el.removeAttribute("inert");
      });
    };
    setNav = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? L.close : L.open);
      drawer.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", String(!open));
      scrim.classList.toggle("is-open", open);
      document.body.classList.toggle("drawer-open", open);
      setBackgroundInert(open);
      if (open) {
        var first = drawer.querySelector("a, button");
        if (first) first.focus();
      }
    };
    // Keep Tab focus cycling inside the open drawer (belt-and-braces with inert).
    drawer.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = drawer.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    // scrim + close button + any link inside close the drawer
    document.querySelectorAll("[data-drawer-close]").forEach(function (el) {
      el.addEventListener("click", function () { setNav(false); toggle.focus(); });
    });
    drawer.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link) return;
      setNav(false);
      // "Home": when the hero is on this page, scroll to it instead of reloading.
      if (link.hasAttribute("data-home-link") && document.getElementById("hero")) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (window.history && history.replaceState) history.replaceState(null, "", link.getAttribute("href"));
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        toggle.focus();
      }
    });
  }

  /* ---- FAQ accordion (accessible disclosure) ---- */
  var faqPanel = function (btn) {
    return document.getElementById(btn.getAttribute("aria-controls")) || btn.nextElementSibling;
  };
  document.querySelectorAll(".faq-row__q").forEach(function (btn) {
    var panel = faqPanel(btn);
    if (!panel) return;
    panel.hidden = true; // collapsed to start (JS-enhanced; no-JS keeps it open)
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      if (open) {
        panel.style.maxHeight = panel.scrollHeight + "px";
        requestAnimationFrame(function () { panel.style.maxHeight = "0px"; });
        btn.setAttribute("aria-expanded", "false");
        var onEnd = function (e) {
          if (e.propertyName !== "max-height") return;
          panel.removeEventListener("transitionend", onEnd);
          if (btn.getAttribute("aria-expanded") === "false") {
            panel.hidden = true;          // drop from the a11y tree once collapsed
            panel.style.maxHeight = "";
          }
        };
        panel.addEventListener("transitionend", onEnd);
      } else {
        panel.hidden = false;             // re-enter the a11y tree, then animate open
        panel.style.maxHeight = "0px";
        requestAnimationFrame(function () { panel.style.maxHeight = panel.scrollHeight + "px"; });
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
  window.addEventListener("resize", function () {
    document.querySelectorAll('.faq-row__q[aria-expanded="true"]').forEach(function (btn) {
      var panel = faqPanel(btn);
      if (panel && !panel.hidden) panel.style.maxHeight = panel.scrollHeight + "px";
    });
  });

  /* ---- Header ↔ floating burger: full header inside the hero, only the
     floating circular burger once scrolled past it. State lives on <body>. ---- */
  var header = document.querySelector(".site-header");
  var fab = toggle && toggle.classList.contains("menu-fab") ? toggle : null;
  var pastHero = false;

  function setPastHero(next) {
    if (next === pastHero) return;
    pastHero = next;
    document.body.classList.toggle("past-hero", pastHero);
    if (!pastHero && toggle && toggle.getAttribute("aria-expanded") === "true") setNav(false);
    updateFab();
  }

  var hero = document.querySelector(".hero");
  if (hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      setPastHero(!entries[0].isIntersecting);
    }, { rootMargin: "-72px 0px 0px 0px", threshold: 0 }).observe(hero);
  } else {
    /* Blog pages have no .hero. Without this branch the state never flipped:
       the header stayed up forever and the burger never appeared, leaving the
       drawer with no key on desktop. Forcing the burger visible in CSS fixed
       the symptom and broke the rule — header and burger are alternatives,
       never siblings, and the blog was showing both stacked.
       A scroll threshold reproduces exactly what the observer gives on the
       site: the full header at the top of the page, the burger once you have
       moved past it. One component, one behaviour, everywhere. */
    var swapAt = 120;
    var onScroll = function () { setPastHero(window.scrollY > swapAt); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Burger auto-contrast: invert against the section behind it ---- */
  var bands = [];
  function collectBands() { // .blog-body is the blog's single content band. Without it the loop found
    // no band there and fell through to the "dark" default — right by luck,
    // not by rule. Naming it makes the same answer deliberate.
    bands = Array.prototype.slice.call(document.querySelectorAll("main > section, .blog-body, footer.footer")); }
  function bandTheme(el) {
    if (el.classList.contains("section--light")) return "light";
    if (el.classList.contains("section--accent")) return "accent";
    return "dark"; // hero, dark sections, footer
  }
  function updateFab() {
    if (!fab || !pastHero) return;
    if (!bands.length) collectBands();
    var r = fab.getBoundingClientRect();
    var cy = r.top + r.height / 2;
    var theme = "dark";
    for (var i = 0; i < bands.length; i++) {
      var b = bands[i].getBoundingClientRect();
      if (b.top <= cy && b.bottom >= cy) { theme = bandTheme(bands[i]); break; }
    }
    // over light/accent → dark burger; over dark → light burger (inverse of bg)
    var onLight = theme === "light" || theme === "accent";
    fab.classList.toggle("on-light", onLight);
    fab.classList.toggle("on-dark", !onLight);
  }

  if (fab) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { updateFab(); ticking = false; });
    }, { passive: true });
    window.addEventListener("resize", function () { collectBands(); updateFab(); });
  }

  /* ---- Magnetic floating burger (pointer devices only) ----
     This used to live in anim.js and lean on GSAP's quickTo. anim.js and GSAP
     are deliberately not shipped to the blog — 115 KB for animation the blog
     does not have — so the burger there sat inert while the same button on the
     site followed the cursor. It is part of the shared chrome, so its behaviour
     belongs in the shared file.
     No GSAP needed: each mousemove sets a new transform target and the CSS
     transition on .menu-fab eases toward it, which is what quickTo was doing.
     rAF-coalesced so a burst of mousemove events costs one style write. */
  if (fab && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var mx = 0, my = 0, magnetQueued = false;
    function applyMagnet() {
      magnetQueued = false;
      fab.style.transform = mx || my ? "translate(" + mx + "px, " + my + "px)" : "";
    }
    function queueMagnet() {
      if (magnetQueued) return;
      magnetQueued = true;
      requestAnimationFrame(applyMagnet);
    }
    fab.addEventListener("mousemove", function (e) {
      var r = fab.getBoundingClientRect();
      mx = (e.clientX - r.left - r.width / 2) * 0.3;
      my = (e.clientY - r.top - r.height / 2) * 0.4;
      queueMagnet();
    });
    fab.addEventListener("mouseleave", function () { mx = my = 0; queueMagnet(); });
  }

  /* Header shadow only matters while it's visible (inside the hero) */
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }, { passive: true });
  }

  /* ---- Contact form → POSTs to send.php (PHP mail on the host) ---------- */
  var form = document.getElementById("caseForm");
  if (form) {
    var statusEl = document.getElementById("formStatus");
    var titleEl = statusEl && statusEl.querySelector(".cform__status-title");
    var bodyEl = statusEl && statusEl.querySelector(".cform__status-body");
    var submitBtn = form.querySelector(".cform__submit");
    var submitLabel = submitBtn && submitBtn.querySelector(".cform__submit-label");
    var submitText = submitLabel ? submitLabel.textContent : "";
    var attr = function (n) { return form.getAttribute(n) || ""; };

    var showStatus = function (ok, title, body) {
      if (!statusEl) return;
      statusEl.hidden = false;
      statusEl.classList.toggle("is-error", !ok);
      if (titleEl) titleEl.textContent = title || "";
      if (bodyEl) bodyEl.textContent = body || "";
      statusEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    };

    var setBusy = function (on) {
      if (!submitBtn || !submitLabel) return;
      submitBtn.disabled = on;
      submitLabel.textContent = on ? attr("data-sending") : submitText;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      setBusy(true);
      if (statusEl) statusEl.hidden = true;

      fetch(attr("action") || "/send.php", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          return res.json().catch(function () { return null; })
            .then(function (data) { return { ok: res.ok, data: data }; });
        })
        .then(function (r) {
          if (r.ok && r.data && r.data.success) {
            showStatus(true, attr("data-ok-title"), (r.data && r.data.message) || attr("data-ok-body"));
            form.reset();
          } else {
            showStatus(false, attr("data-err-title"), (r.data && r.data.message) || attr("data-err-body"));
          }
        })
        .catch(function () {
          // network/host unreachable — the WhatsApp button on this page is the fallback
          showStatus(false, attr("data-err-title"), attr("data-err-body"));
        })
        .then(function () { setBusy(false); });
    });
  }

  /* ---- Footer local-time clock (English numerals, 24h) ---- */
  var timeEl = document.getElementById("localTime");
  if (timeEl && window.Intl) {
    var tz = timeEl.getAttribute("data-tz") || "Asia/Riyadh";
    var fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", hour12: false,
      timeZone: tz, timeZoneName: "short"
    });
    var tick = function () { timeEl.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 20000);
  }
})();
