(function () {
  function run() {
    if (!document.body.classList.contains("is-ready")) return;
    var reveals = document.querySelectorAll(".em-reveal");
    if (!reveals.length) return;
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("em-reveal--in");
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
      );
      reveals.forEach(function (el) {
        io.observe(el);
      });
    } else {
      reveals.forEach(function (el) {
        el.classList.add("em-reveal--in");
      });
    }
  }

  if (document.body.classList.contains("is-ready")) {
    run();
  } else {
    window.addEventListener("skel:ready", run, { once: true });
  }
})();
