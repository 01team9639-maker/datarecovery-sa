/* ==========================================================================
   Motion layer — GSAP + ScrollTrigger.
   Scroll reveals, number count-ups, magnetic CTAs, data-core scroll spin.
   Progressive enhancement: if GSAP fails or reduced-motion is set, the page
   is fully visible and static (initial states are only hidden via CSS behind
   `.js` + prefers-reduced-motion: no-preference).
   ========================================================================== */
(function () {
  "use strict";

  var REVEAL = [
    ".section-head", ".case-card", ".service", ".step", ".step-chip", ".stop",
    ".warn-box", ".diag__main", ".metrics-grid", ".experience__copy",
    ".trust__metrics .metric", ".trust-strip .metric", ".services-foot",
    ".section-foot", ".svc-cta__inner", ".contact__copy", ".contact__visual",
    ".faq-row", ".footer__cta", ".footer__contacts", ".footer__quicklinks",
    ".footer__bottom"
  ].join(",");

  var g = window.gsap;

  // GSAP failed to load. CSS has already hidden the reveal targets behind `.js`,
  // so reveal them here — otherwise those sections would stay invisible.
  if (!g) {
    document.querySelectorAll(REVEAL).forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var els = g.utils.toArray(REVEAL);

  // Reduced motion / no ScrollTrigger: just make sure everything is visible.
  if (reduce || !window.ScrollTrigger) {
    g.set(els, { opacity: 1, clearProps: "opacity,transform" });
    return;
  }

  g.registerPlugin(window.ScrollTrigger);

  /* ---- Scroll reveals (batched + staggered) ---- */
  g.set(els, { y: 24 });
  window.ScrollTrigger.batch(els, {
    start: "top 88%",
    once: true,
    onEnter: function (batch) {
      g.to(batch, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        stagger: 0.07, overwrite: true
      });
    }
  });

  /* ---- Number count-ups (metrics) — keeps English numerals ---- */
  g.utils.toArray(".metric__value, .metrics-grid__value").forEach(function (el) {
    var raw = el.textContent.trim();
    var m = raw.match(/^(\D*)(\d[\d,\.]*)(\D*)$/);
    if (!m) return;
    var pre = m[1], suf = m[3];
    var end = parseFloat(m[2].replace(/,/g, ""));
    if (isNaN(end)) return;
    var o = { v: 0 };
    el.setAttribute("dir", "ltr");
    window.ScrollTrigger.create({
      trigger: el, start: "top 92%", once: true,
      onEnter: function () {
        g.to(o, {
          v: end, duration: 1.3, ease: "power2.out",
          onUpdate: function () { el.textContent = pre + Math.round(o.v) + suf; }
        });
      }
    });
  });

  /* ---- Data-core rings gently rotate with scroll ---- */
  g.utils.toArray(".data-core").forEach(function (core) {
    g.to(core, {
      rotate: 24, ease: "none",
      scrollTrigger: { trigger: core, start: "top bottom", end: "bottom top", scrub: 1 }
    });
  });

  /* ---- Magnetic primary buttons + floating burger (pointer devices only) ---- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    g.utils.toArray(".btn--accent, .btn--dark, .menu-fab").forEach(function (btn) {
      var xTo = g.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
      var yTo = g.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.3);
        yTo((e.clientY - r.top - r.height / 2) * 0.4);
      });
      btn.addEventListener("mouseleave", function () { xTo(0); yTo(0); });
    });
  }
})();
