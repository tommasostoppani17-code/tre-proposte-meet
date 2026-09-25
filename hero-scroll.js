(function () {
  var stage = document.querySelector("[data-fixed-hero]");
  if (!stage) return;

  var layers = Array.prototype.slice.call(stage.querySelectorAll(".fixed-hero__img"));
  var panels = Array.prototype.slice.call(document.querySelectorAll("[data-hero]"));
  if (!layers.length || !panels.length) return;

  function activate(index) {
    var safe = Math.max(0, Math.min(index, layers.length - 1));
    layers.forEach(function (img, i) {
      img.classList.toggle("is-active", i === safe);
    });
  }

  activate(0);

  if (!("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = Number(entry.target.getAttribute("data-hero") || 0);
        if (!Number.isNaN(idx)) activate(idx);
      });
    },
    {
      root: null,
      threshold: 0.35,
      rootMargin: "-20% 0px -35% 0px",
    }
  );

  panels.forEach(function (panel) {
    observer.observe(panel);
  });
})();
