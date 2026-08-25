/* ==========================================================================
   FAQ page — accordion, live search, category chips.

   Ships as its own file rather than inline because the site's CSP allows no
   inline script, and it loads only on /faq.html.

   The accordion itself is NOT here: main.js already binds a disclosure handler
   to every `.faq-row__q` site-wide, and a second handler on the same button
   toggled each click twice, so the answer opened and shut in the same frame.
   One implementation, shared with the service pages.

   Everything degrades: with JS off the answers stay open and readable (CSS
   collapses them only under `.js`), the chips are ordinary anchors to the
   group headings, and the search box is a plain input that simply does
   nothing. Nothing on this page depends on script to be reachable.
   ========================================================================== */
(function () {
  "use strict";

  var rows = Array.prototype.slice.call(document.querySelectorAll("[data-faq-item]"));
  if (!rows.length) return;

  /* ---- Live search ---- */
  var input = document.getElementById("faq-q");
  var status = document.querySelector(".faq-search__status");
  var clear = document.querySelector(".faq-search__clear");
  var empty = document.querySelector(".faq-empty");
  var topBlock = document.querySelector("[data-faq-top]");
  var groups = Array.prototype.slice.call(document.querySelectorAll("[data-faq-group]"));
  var chips = Array.prototype.slice.call(document.querySelectorAll("[data-faq-chip]"));

  if (!input) return;

  var countTpl = input.getAttribute("data-count") || "{n}";
  var countOne = input.getAttribute("data-count-one") || countTpl;

  function setChip(id) {
    chips.forEach(function (c) {
      c.classList.toggle("is-on", c.getAttribute("data-faq-chip") === id);
    });
  }

  function reset() {
    rows.forEach(function (r) { r.hidden = false; });
    groups.forEach(function (g) { g.hidden = false; });
    if (topBlock) topBlock.hidden = false;
    if (empty) empty.hidden = true;
    if (status) status.textContent = "";
    if (clear) clear.hidden = true;
    setChip("all");
  }

  function search(term) {
    var q = term.trim().toLowerCase();
    if (!q) { reset(); return; }

    // The top block repeats eight questions that also live in their groups;
    // showing both would report every match twice.
    if (topBlock) topBlock.hidden = true;

    var hits = 0;
    rows.forEach(function (r) {
      if (topBlock && topBlock.contains(r)) return;
      var match = (r.getAttribute("data-q") || "").indexOf(q) !== -1;
      r.hidden = !match;
      if (match) hits++;
    });
    groups.forEach(function (g) {
      g.hidden = !g.querySelector("[data-faq-item]:not([hidden])");
    });

    if (status) status.textContent = hits === 1 ? countOne : countTpl.replace("{n}", String(hits));
    if (empty) empty.hidden = hits !== 0;
    if (clear) clear.hidden = false;
    setChip("all");
  }

  var queued = false;
  input.addEventListener("input", function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      search(input.value);
    });
  });

  if (clear) {
    clear.addEventListener("click", function () {
      input.value = "";
      reset();
      input.focus();
    });
  }

  /* ---- Category chips ----
     They stay real anchors, so the jump works without this handler; the click
     only clears an active search first, otherwise the target group could be
     hidden by the filter the reader forgot they typed. */
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      if (input.value) { input.value = ""; reset(); }
      setChip(chip.getAttribute("data-faq-chip"));
    });
  });
})();
