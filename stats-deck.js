/**
 * Stats — page mode (stats.html) or legacy inline deck.
 * Colorful Esri street basemap + big hero maps.
 */
(function () {
  var pageMode = document.body.classList.contains("stats-page");
  var openBtn = document.getElementById("stats-open");
  var deck = document.getElementById("stats-deck");
  if (!deck) return;
  if (!pageMode && !openBtn) return;

  var slides = Array.prototype.slice.call(deck.querySelectorAll(".stats-slide"));
  var dots = Array.prototype.slice.call(deck.querySelectorAll(".stats-deck__dots button"));
  var prev = deck.querySelector(".stats-nav--prev");
  var next = deck.querySelector(".stats-nav--next");
  var i = 0;
  var maps = {};

  var CITIES = {
    world: [
      { name: "Barcellona", lat: 41.3874, lng: 2.1686, kind: "hot" },
      { name: "Amsterdam", lat: 52.3676, lng: 4.9041, kind: "hot" },
      { name: "Parigi", lat: 48.8566, lng: 2.3522, kind: "hot" },
      { name: "Venezia", lat: 45.4408, lng: 12.3155, kind: "own" },
      { name: "Londra", lat: 51.5074, lng: -0.1278, kind: "hot" },
      { name: "Roma", lat: 41.9028, lng: 12.4964, kind: "hot" },
      { name: "Copenhagen", lat: 55.6761, lng: 12.5683, kind: "hot" },
      { name: "Saint-Moritz", lat: 46.4908, lng: 9.8355, kind: "a" },
      { name: "Rovaniemi", lat: 66.5039, lng: 25.7294, kind: "b" },
      { name: "Cannes", lat: 43.5528, lng: 7.0174, kind: "c" }
    ],
    discard: [
      { name: "Barcellona", lat: 41.3874, lng: 2.1686, kind: "no" },
      { name: "Amsterdam", lat: 52.3676, lng: 4.9041, kind: "no" },
      { name: "Venezia", lat: 45.4408, lng: 12.3155, kind: "own" },
      { name: "Puglia", lat: 40.7929, lng: 17.2406, kind: "own" }
    ],
    filter: [
      { name: "Spagna", lat: 40.4168, lng: -3.7038, kind: "zone" },
      { name: "Francia", lat: 46.2276, lng: 2.2137, kind: "zone" },
      { name: "Italia", lat: 41.8719, lng: 12.5674, kind: "zone" },
      { name: "Svizzera", lat: 46.8182, lng: 8.2275, kind: "zone" },
      { name: "Nord Europa", lat: 62.0, lng: 15.0, kind: "zone" }
    ],
    pick: [
      { name: "Saint-Moritz", lat: 46.4908, lng: 9.8355, kind: "a" },
      { name: "Rovaniemi", lat: 66.5039, lng: 25.7294, kind: "b" },
      { name: "Costa Azzurra", lat: 43.5528, lng: 7.0174, kind: "c" }
    ]
  };

  var VIEWS = {
    world: { center: [52, 12], zoom: 4 },
    discard: { center: [47.5, 5], zoom: 5 },
    filter: { center: [52, 10], zoom: 3.6 },
    pick: { center: [55, 12], zoom: 3.7 }
  };

  function icon(kind) {
    var color = "#0071e3";
    var size = 14;
    if (kind === "no") color = "#ff3b30";
    if (kind === "own") color = "#34c759";
    if (kind === "hot") color = "#0071e3";
    if (kind === "a") { color = "#0071e3"; size = 16; }
    if (kind === "b") { color = "#1d1d1f"; size = 16; }
    if (kind === "c") { color = "#af52de"; size = 16; }
    if (kind === "zone") color = "#ff9f0a";
    return L.divIcon({
      className: "real-map-pin",
      html:
        '<span style="display:block;width:' + size + "px;height:" + size +
        "px;border-radius:50%;background:" + color +
        ';border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35)"></span>',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  }

  function ensureMap(el) {
    if (!window.L || !el) return null;
    var key = el.getAttribute("data-map");
    if (maps[key]) {
      setTimeout(function () { maps[key].invalidateSize(); }, 40);
      return maps[key];
    }
    var view = VIEWS[key] || VIEWS.world;
    var map = L.map(el, {
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: false,
      dragging: true
    }).setView(view.center, view.zoom);

    /* Colorful street basemap — no API key */
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri · &copy; OpenStreetMap",
        maxZoom: 18
      }
    ).addTo(map);

    (CITIES[key] || []).forEach(function (c) {
      L.marker([c.lat, c.lng], { icon: icon(c.kind) })
        .addTo(map)
        .bindTooltip(c.name, { direction: "top", offset: [0, -10], opacity: 0.95 });
    });

    maps[key] = map;
    setTimeout(function () { map.invalidateSize(); }, 60);
    setTimeout(function () { map.invalidateSize(); }, 280);
    return map;
  }

  function refreshMaps() {
    var active = slides[i];
    if (!active) return;
    Array.prototype.forEach.call(active.querySelectorAll(".real-map"), function (el) {
      ensureMap(el);
    });
  }

  function show(n) {
    if (!slides.length) return;
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, idx) {
      s.classList.toggle("is-active", idx === i);
    });
    dots.forEach(function (d, idx) {
      d.classList.toggle("is-on", idx === i);
    });
    refreshMaps();
    setTimeout(refreshMaps, 120);
  }

  if (prev) prev.addEventListener("click", function () { show(i - 1); });
  if (next) next.addEventListener("click", function () { show(i + 1); });
  dots.forEach(function (d) {
    d.addEventListener("click", function () {
      var g = parseInt(d.getAttribute("data-go"), 10);
      if (!isNaN(g)) show(g);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (!pageMode && deck.hidden) return;
    if (e.key === "ArrowLeft") show(i - 1);
    if (e.key === "ArrowRight") show(i + 1);
  });

  if (pageMode) {
    function boot() {
      show(0);
      setTimeout(refreshMaps, 80);
      setTimeout(refreshMaps, 400);
    }
    if (document.body.classList.contains("is-ready")) boot();
    else window.addEventListener("skel:ready", boot, { once: true });
    setTimeout(boot, 1200);
  } else if (openBtn) {
    function openDeck() {
      deck.hidden = false;
      openBtn.setAttribute("aria-expanded", "true");
      openBtn.classList.add("is-open");
      show(i);
      deck.scrollIntoView({ behavior: "smooth", block: "nearest" });
      setTimeout(refreshMaps, 40);
      setTimeout(refreshMaps, 200);
      setTimeout(refreshMaps, 500);
    }
    openBtn.addEventListener("click", function () {
      if (deck.hidden) openDeck();
      else {
        deck.hidden = true;
        openBtn.setAttribute("aria-expanded", "false");
        openBtn.classList.remove("is-open");
      }
    });
    if (location.hash === "#stats") openDeck();
  }
})();
