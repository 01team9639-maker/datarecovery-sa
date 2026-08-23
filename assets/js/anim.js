/* ==========================================================================
   Motion layer — scroll reveals, number count-ups, magnetic CTAs.

   This used to be GSAP + ScrollTrigger. On an emulated mid-range phone that
   pair cost 2246 ms of main-thread time (ScrollTrigger alone 1762 ms) and
   46 KB over the wire, and it dominated Style & Layout because `scrub` wrote
   a transform from the main thread on every scroll tick. Everything it did
   here is a class toggle, a counter, and a rotation — none of which needs a
   timeline engine. Reveals are now IntersectionObserver plus a CSS
   transition, the ring drift is a scroll-driven CSS animation, and the
   magnetic buttons reuse the rAF-coalesced transform already proven on
   .menu-fab in main.js.

   Progressive enhancement is unchanged: with no JS or with reduced-motion the
   page is fully visible and static.
   ========================================================================== */
(function () {
  "use strict";

  /* Keep in step with the initial-state block in main.css §13 — the
     motion-selectors test fails the build if the two lists drift apart. */
  var REVEAL = [
    ".section-head", ".case-card", ".service", ".step", ".step-chip", ".stop",
    ".warn-box", ".diag__main", ".metrics-grid", ".experience__copy",
    ".trust__metrics .metric", ".trust-strip .metric", ".services-foot",
    ".section-foot", ".svc-cta__inner", ".contact__copy", ".contact__visual",
    ".faq-row", ".footer__cta", ".footer__contacts", ".footer__bottom"
  ].join(",");

  var toArray = function (sel) {
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  };

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = toArray(REVEAL);

  // Reduced motion, or a browser without IntersectionObserver: reveal at once.
  // CSS hid these behind `.js`, so leaving them alone would hide the page.
  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }

  /* ---- Scroll reveals (staggered per batch, once each) ---- */
  var revealObserver = new IntersectionObserver(function (entries, obs) {
    var shown = 0;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      // Stagger only within one batch, so a lone element never waits.
      entry.target.style.transitionDelay = (shown * 70) + "ms";
      entry.target.classList.add("is-in");
      shown++;
      obs.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -12% 0px" });
  els.forEach(function (el) { revealObserver.observe(el); });

  /* ---- Number count-ups (metrics) — keeps Latin numerals ---- */
  var counters = toArray(".metric__value, .metrics-grid__value");

  function countUp(el) {
    var stash = el.getAttribute("data-count");
    if (!stash) return;
    var gap = stash.indexOf(" ");
    var tail = stash.lastIndexOf(" ");
    var pre = stash.slice(0, gap);
    var end = parseFloat(stash.slice(gap + 1, tail));
    var suf = stash.slice(tail + 1);
    var started = 0;
    var DURATION = 1300;
    el.setAttribute("dir", "ltr");
    var frame = function (now) {
      if (!started) started = now;
      var t = Math.min((now - started) / DURATION, 1);
      // easeOutQuad — the visual twin of GSAP's power2.out.
      var eased = 1 - (1 - t) * (1 - t);
      el.textContent = pre + Math.round(end * eased) + suf;
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  if (counters.length) {
    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        countUp(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    counters.forEach(function (el) {
      var m = el.textContent.trim().match(/^(\D*)(\d[\d,.]*)(\D*)$/);
      if (!m) return;
      var end = parseFloat(m[2].replace(/,/g, ""));
      if (isNaN(end)) return;
      // Stash the parsed pieces before the first frame overwrites the text.
      el.setAttribute("data-count", m[1] + " " + end + " " + m[3]);
      countObserver.observe(el);
    });
  }

  /* ---- Magnetic primary buttons (pointer devices only) ----
     .menu-fab is handled in main.js: it is shared chrome and the blog does not
     load this file. ---- */
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  toArray(".btn--accent, .btn--dark").forEach(function (btn) {
    var mx = 0, my = 0, queued = false;
    var apply = function () {
      queued = false;
      btn.style.transform = mx || my ? "translate(" + mx + "px, " + my + "px)" : "";
    };
    var queue = function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    };
    btn.addEventListener("mousemove", function (e) {
      var r = btn.getBoundingClientRect();
      mx = (e.clientX - r.left - r.width / 2) * 0.3;
      my = (e.clientY - r.top - r.height / 2) * 0.4;
      queue();
    });
    btn.addEventListener("mouseleave", function () { mx = my = 0; queue(); });
  });
})();
