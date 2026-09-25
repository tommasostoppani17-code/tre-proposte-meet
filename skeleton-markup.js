/**
 * Skeleton markup — mirrors current home + listing layout (anti-CLS).
 * Rules: same proportions as real UI, shimmer L→R, varied line widths,
 * pointer-events none, one aria status outside, never overlap real content.
 */
(function () {
  function homeSkel() {
    var meta =
      '<div class="skel" style="width:38%;height:0.55rem;margin-bottom:0.25rem;border-radius:4px"></div>' +
      '<div class="skel" style="width:52%;height:0.95rem;margin-bottom:0.65rem;border-radius:4px"></div>' +
      '<div class="skel" style="width:42%;height:0.55rem;margin-bottom:0.25rem;border-radius:4px"></div>' +
      '<div class="skel" style="width:58%;height:0.95rem;margin-bottom:0.65rem;border-radius:4px"></div>' +
      '<div class="skel" style="width:36%;height:0.55rem;margin-bottom:0.25rem;border-radius:4px"></div>' +
      '<div class="skel" style="width:44%;height:0.95rem;margin-bottom:0.65rem;border-radius:4px"></div>' +
      '<div class="skel" style="width:28%;height:0.55rem;margin-bottom:0.25rem;border-radius:4px"></div>' +
      '<div class="skel" style="width:72%;height:0.95rem;margin-bottom:0.75rem;border-radius:4px"></div>';

    var card =
      '<div class="skel-emily-card">' +
        '<div class="skel skel-emily-media"></div>' +
        '<div class="skel-emily-body">' +
          '<div class="skel" style="width:42%;height:0.55rem;margin-bottom:0.45rem;border-radius:4px"></div>' +
          '<div class="skel" style="width:58%;height:1.15rem;margin-bottom:0.55rem;border-radius:4px"></div>' +
          '<div class="skel" style="width:92%;height:0.7rem;margin-bottom:0.35rem;border-radius:4px"></div>' +
          '<div class="skel" style="width:78%;height:0.7rem;margin-bottom:1rem;border-radius:4px"></div>' +
          meta +
          '<div class="skel" style="width:55%;height:0.55rem;margin-bottom:0.85rem;border-radius:4px"></div>' +
          '<div class="skel" style="width:100%;height:1px;margin-bottom:0.85rem;border-radius:0;opacity:.5"></div>' +
          '<div class="skel" style="width:38%;height:0.75rem;border-radius:4px"></div>' +
        "</div>" +
      "</div>";

    return (
      '<div class="skel-home-shell">' +
        '<div class="skel-home-title">' +
          '<div class="skel" style="width:42%;height:0.55rem;margin:0 auto 0.85rem;border-radius:4px"></div>' +
          '<div class="skel" style="width:68%;height:1.65rem;margin:0 auto 0.35rem;border-radius:6px"></div>' +
          '<div class="skel" style="width:52%;height:1.65rem;margin:0 auto 1rem;border-radius:6px"></div>' +
          '<div class="skel" style="width:58%;height:0.7rem;margin:0 auto;border-radius:4px"></div>' +
        "</div>" +
        '<div class="skel-home-air">' +
          card + card + card +
        "</div>" +
        '<div class="skel-home-stats">' +
          '<div class="skel" style="width:6.5rem;height:2.35rem;margin:0 auto;border-radius:980px"></div>' +
        "</div>" +
      "</div>"
    );
  }

  function sectionCard(extra) {
    return (
      '<div class="skel-section-card">' +
        '<div class="skel skel-title"></div>' +
        '<div class="skel skel-line"></div>' +
        '<div class="skel skel-line w90"></div>' +
        '<div class="skel skel-line w70"></div>' +
        (extra || "") +
      "</div>"
    );
  }

  function projectSkel() {
    return (
      '<div class="skel-project-shell">' +
        '<div class="skel-photo-grid" aria-hidden="true">' +
          '<div class="skel skel-pg-main"></div>' +
          '<div class="skel skel-pg-cell"></div>' +
          '<div class="skel skel-pg-cell"></div>' +
          '<div class="skel skel-pg-cell"></div>' +
          '<div class="skel skel-pg-cell"></div>' +
        "</div>" +
        '<div class="skel-listing-layout">' +
          '<div class="skel-listing-main">' +
            '<div class="skel-hero-card">' +
              '<div class="skel" style="width:36%;height:0.65rem;margin-bottom:0.65rem;border-radius:4px"></div>' +
              '<div class="skel skel-h1"></div>' +
              '<div class="skel skel-meta"></div>' +
              '<div class="skel skel-meta w50"></div>' +
              '<div class="skel-money">' +
                '<div class="skel-money__cell"><div class="skel skel-lab"></div><div class="skel skel-val"></div></div>' +
                '<div class="skel-money__cell"><div class="skel skel-lab"></div><div class="skel skel-val"></div></div>' +
              "</div>" +
              '<div class="skel skel-line" style="margin-top:0.85rem"></div>' +
              '<div class="skel skel-line w70"></div>' +
            "</div>" +
            sectionCard() +
            sectionCard(
              '<div class="skel-vision" style="margin-top:0.85rem">' +
                '<div class="skel skel-big"></div>' +
                '<div class="skel skel-side"></div>' +
                '<div class="skel skel-side"></div>' +
              "</div>"
            ) +
            sectionCard() +
            sectionCard(
              '<div class="skel-annunci">' +
                '<div class="skel" style="height:7.5rem;border-radius:0.75rem"></div>' +
                '<div class="skel" style="height:7.5rem;border-radius:0.75rem"></div>' +
              "</div>"
            ) +
            sectionCard() +
          "</div>" +
          '<aside class="skel-booking" aria-hidden="true">' +
            '<div class="skel-booking__inner">' +
              '<div class="skel" style="width:48%;height:0.55rem;margin-bottom:0.45rem;border-radius:4px"></div>' +
              '<div class="skel" style="width:72%;height:1.65rem;margin-bottom:0.85rem;border-radius:6px"></div>' +
              '<div class="skel" style="width:40%;height:1.35rem;margin-bottom:1rem;border-radius:980px"></div>' +
              Array(5)
                .fill(
                  '<div class="skel" style="height:0.85rem;margin-bottom:0.7rem;border-radius:4px"></div>'
                )
                .join("") +
              '<div class="skel" style="height:1px;margin:0.6rem 0 0.85rem;opacity:.4"></div>' +
              '<div class="skel" style="width:36%;height:0.55rem;margin-bottom:0.55rem;border-radius:4px"></div>' +
              Array(4)
                .fill(
                  '<div class="skel" style="height:0.75rem;margin-bottom:0.45rem;border-radius:4px;width:70%"></div>'
                )
                .join("") +
              '<div class="skel" style="height:2.5rem;border-radius:0.65rem;margin-top:0.85rem"></div>' +
            "</div>" +
          "</aside>" +
        "</div>" +
      "</div>"
    );
  }

  function statsSkel() {
    return (
      '<div class="skel-stats-shell">' +
        '<div class="skel" style="width:28%;height:0.55rem;margin-bottom:0.85rem;border-radius:4px"></div>' +
        '<div class="skel" style="width:72%;height:2rem;margin-bottom:0.55rem;border-radius:6px"></div>' +
        '<div class="skel" style="width:88%;height:0.85rem;margin-bottom:0.35rem;border-radius:4px"></div>' +
        '<div class="skel" style="width:64%;height:0.85rem;margin-bottom:1.5rem;border-radius:4px"></div>' +
        '<div class="skel skel-stats-map"></div>' +
        '<div style="display:flex;justify-content:center;gap:0.45rem;margin-top:1.5rem">' +
          '<div class="skel" style="width:0.4rem;height:0.4rem;border-radius:50%"></div>' +
          '<div class="skel" style="width:1rem;height:0.4rem;border-radius:999px"></div>' +
          '<div class="skel" style="width:0.4rem;height:0.4rem;border-radius:50%"></div>' +
          '<div class="skel" style="width:0.4rem;height:0.4rem;border-radius:50%"></div>' +
          '<div class="skel" style="width:0.4rem;height:0.4rem;border-radius:50%"></div>' +
        "</div>" +
      "</div>"
    );
  }

  var el = document.currentScript;
  var type = (el && el.getAttribute("data-skel")) || "project";
  var root = document.querySelector(".skel-root");
  if (!root) return;

  root.setAttribute("aria-hidden", "true");
  if (type === "home") {
    root.innerHTML = homeSkel();
  } else if (type === "stats") {
    root.innerHTML = statsSkel();
  } else {
    /* project | lapponia — same Costa-style shell */
    root.innerHTML = projectSkel();
  }
})();
