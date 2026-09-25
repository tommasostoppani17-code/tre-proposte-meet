/**
 * Stats fullscreen map — one map, home-coherent pins, Esri basemap.
 */
(function () {
  if (!document.body.classList.contains("stats-page")) return;
  var el = document.getElementById("stats-map");
  if (!el || !window.L) return;

  var POINTS = [
    { name: "Barcellona", lat: 41.3874, lng: 2.1686, kind: "mute" },
    { name: "Amsterdam", lat: 52.3676, lng: 4.9041, kind: "mute" },
    { name: "Parigi", lat: 48.8566, lng: 2.3522, kind: "mute" },
    { name: "Londra", lat: 51.5074, lng: -0.1278, kind: "mute" },
    { name: "Roma", lat: 41.9028, lng: 12.4964, kind: "mute" },
    { name: "Venezia", lat: 45.4408, lng: 12.3155, kind: "own" },
    { name: "Puglia", lat: 40.7929, lng: 17.2406, kind: "own" },
    { name: "Saint-Moritz", lat: 46.4908, lng: 9.8355, kind: "pick" },
    { name: "Rovaniemi", lat: 66.5039, lng: 25.7294, kind: "pick" },
    { name: "Cannes", lat: 43.5528, lng: 7.0174, kind: "pick" }
  ];

  function pin(kind) {
    var size = kind === "pick" ? 16 : 11;
    var bg = "#c7c7cc";
    if (kind === "own") bg = "#86868b";
    if (kind === "pick") bg = "#1d1d1f";
    return L.divIcon({
      className: "stats-map-pin",
      html:
        '<span style="display:block;width:' +
        size +
        "px;height:" +
        size +
        "px;border-radius:50%;background:" +
        bg +
        ";border:2px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.28)\"></span>",
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  }

  var map = null;

  function boot() {
    if (map || !el.offsetWidth) {
      if (map) map.invalidateSize();
      return;
    }

    map = L.map(el, {
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true,
      dragging: true,
      tap: true
    });

    L.control
      .zoom({ position: "topright" })
      .addTo(map);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles © Esri · © OpenStreetMap",
        maxZoom: 18,
        maxNativeZoom: 17
      }
    ).addTo(map);

    var bounds = [];
    POINTS.forEach(function (c) {
      var m = L.marker([c.lat, c.lng], { icon: pin(c.kind) }).addTo(map);
      m.bindTooltip(c.name, {
        direction: "top",
        offset: [0, -8],
        opacity: 0.96,
        className: "stats-map-tip"
      });
      if (c.kind === "pick") m.openTooltip();
      bounds.push([c.lat, c.lng]);
    });

    map.fitBounds(bounds, {
      paddingTopLeft: [24, 24],
      paddingBottomRight: [24, Math.max(220, Math.round(window.innerHeight * 0.34))],
      maxZoom: 5.2
    });

    setTimeout(function () {
      map.invalidateSize();
      map.fitBounds(bounds, {
        paddingTopLeft: [24, 24],
        paddingBottomRight: [24, Math.max(220, Math.round(window.innerHeight * 0.34))],
        maxZoom: 5.2
      });
    }, 80);
    setTimeout(function () {
      map.invalidateSize();
    }, 400);
  }

  function onReady() {
    boot();
  }

  if (document.body.classList.contains("is-ready")) onReady();
  else window.addEventListener("skel:ready", onReady, { once: true });
  setTimeout(onReady, 900);

  window.addEventListener("resize", function () {
    if (!map) return;
    map.invalidateSize();
  });
})();
