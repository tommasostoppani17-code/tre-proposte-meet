(function () {
  var main = document.querySelector("main.bento");
  if (!main) return;

  if (!main.parentElement.classList.contains("app-scroll")) {
    var shell = document.createElement("div");
    shell.className = "app-scroll";
    main.parentNode.insertBefore(shell, main);
    shell.appendChild(main);
  }

  var bookingBar = main.querySelector(".booking-bar");
  if (bookingBar && bookingBar.parentElement !== document.body) {
    document.body.appendChild(bookingBar);
  }
  /* Top bar stays solid & fixed — no scroll state changes */
})();
