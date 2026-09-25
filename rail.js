/**
 * Listing rail: keep sticky offset below the real top bar height.
 */
(function () {
  if (!document.body.classList.contains("listing-page")) return;
  var bar = document.querySelector(".apex-bar");
  if (!bar) return;

  function sync() {
    var h = Math.round(bar.getBoundingClientRect().height) || 52;
    document.documentElement.style.setProperty("--bar-h", h + "px");
  }

  sync();
  window.addEventListener("resize", sync, { passive: true });
  window.addEventListener("orientationchange", sync, { passive: true });
  window.addEventListener("skel:ready", sync);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(sync).catch(function () {});
  }
  setTimeout(sync, 80);
  setTimeout(sync, 300);
})();
