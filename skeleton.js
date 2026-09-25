/**
 * Skeleton → real content.
 * Sempre visibile almeno MIN_MS (anche con cache).
 */
(function () {
  var MIN_MS = 600;
  var started = Date.now();
  var imagesReady = false;
  var done = false;

  document.body.classList.add("is-skel");
  document.body.classList.remove("is-ready");

  function tryFinish() {
    if (done || !imagesReady) return;
    var elapsed = Date.now() - started;
    var wait = Math.max(0, MIN_MS - elapsed);
    done = true;
    window.setTimeout(function () {
      document.body.classList.remove("is-skel");
      document.body.classList.add("is-ready");
      var status = document.querySelector(".skel-status");
      if (status) status.textContent = "";
      var real = document.querySelector(".page-real");
      if (real) real.removeAttribute("aria-hidden");
      var bento = document.querySelector(".bento");
      if (bento) bento.removeAttribute("aria-busy");
      window.setTimeout(function () {
        window.dispatchEvent(new Event("skel:ready"));
      }, 40);
    }, wait);
  }

  function waitImages(root) {
    if (!root) return Promise.resolve();
    var imgs = Array.prototype.slice.call(root.querySelectorAll("img"));
    var urls = [];
    root.querySelectorAll("[style*='background-image']").forEach(function (el) {
      var m = /url\(['"]?([^'")]+)['"]?\)/.exec(el.getAttribute("style") || "");
      if (m && m[1]) urls.push(m[1]);
    });
    var tasks = imgs.map(function (img) {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise(function (res) {
        img.addEventListener("load", res, { once: true });
        img.addEventListener("error", res, { once: true });
      });
    });
    urls.forEach(function (src) {
      tasks.push(
        new Promise(function (res) {
          var i = new Image();
          i.onload = res;
          i.onerror = res;
          i.src = src;
        })
      );
    });
    return Promise.all(tasks);
  }

  function boot() {
    var real = document.querySelector(".page-real") || document.querySelector(".bento");
    waitImages(real).then(function () {
      imagesReady = true;
      tryFinish();
    });
    // Cap di sicurezza
    window.setTimeout(function () {
      imagesReady = true;
      tryFinish();
    }, 4000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

;(function(){
  function mark(){
    document.querySelectorAll(".page-real").forEach(function(el){ el.classList.add("is-in"); });
  }
  window.addEventListener("skel:ready", mark);
  if (!document.body.classList.contains("is-skel")) mark();
  setTimeout(mark, 80);
})();
