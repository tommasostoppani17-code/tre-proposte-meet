/**
 * Annunci Booking.com con date dinamiche.
 * Filtra su appartamenti / case intere — non hotel di lusso.
 */
(function () {
  var MONTHS_IT = [
    "gen", "feb", "mar", "apr", "mag", "giu",
    "lug", "ago", "set", "ott", "nov", "dic"
  ];

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function ymd(d) {
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function labelRange(a, b) {
    var sameMonth = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
    if (sameMonth) {
      return a.getDate() + "–" + b.getDate() + " " + MONTHS_IT[a.getMonth()] + " " + a.getFullYear();
    }
    return (
      a.getDate() + " " + MONTHS_IT[a.getMonth()] +
      " – " + b.getDate() + " " + MONTHS_IT[b.getMonth()] + " " + b.getFullYear()
    );
  }

  function nextDate(monthIndex, day, nights) {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    var start = new Date(now.getFullYear(), monthIndex, day);
    if (start <= now) start = new Date(now.getFullYear() + 1, monthIndex, day);
    var end = new Date(start);
    end.setDate(end.getDate() + nights);
    return { start: start, end: end, checkin: ymd(start), checkout: ymd(end), label: labelRange(start, end) };
  }

  /**
   * nflt: ht_id-201 = Appartamenti, ht_id-220 = Case vacanze.
   * order=price = dal più economico (meglio per vedere il range reale).
   */
  function bookingUrl(ss, checkin, checkout, extras) {
    var u = new URL("https://www.booking.com/searchresults.it.html");
    u.searchParams.set("ss", ss);
    u.searchParams.set("checkin", checkin);
    u.searchParams.set("checkout", checkout);
    u.searchParams.set("group_adults", "2");
    u.searchParams.set("no_rooms", "1");
    u.searchParams.set("group_children", "0");
    u.searchParams.set("lang", "it");
    u.searchParams.set("sb_travel_purpose", "leisure");
    u.searchParams.set("order", "price");
    u.searchParams.set("nflt", "ht_id-201;ht_id-220");
    u.searchParams.set("shw_aparth", "1");
    if (extras) {
      Object.keys(extras).forEach(function (k) {
        u.searchParams.set(k, extras[k]);
      });
    }
    return u.toString();
  }

  var DEST = {
    "saint-moritz": {
      periodName: "picco invernale",
      dates: function () { return nextDate(1, 10, 7); },
      hint:
        "Apri e ordina per prezzo: in alta stagione gli apt hospitality fanno spesso <strong>8–18k € / settimana</strong> " +
        "(2–3 camere). Gli studi a 2–3k/sett sono il pavimento, non il target.",
      items: [
        {
          title: "Appartamenti · Saint-Moritz",
          meta: "Solo apt / case · dal più economico",
          img: "assets/attr-sm-sci.jpg",
          ss: "Saint-Moritz, Switzerland",
          extras: { selected_currency: "EUR" }
        },
        {
          title: "Appartamenti · Celerina",
          meta: "Zona smart · stesso turismo",
          img: "assets/attr-sm-lago.jpg",
          ss: "Celerina, Switzerland",
          extras: { selected_currency: "EUR" }
        },
        {
          title: "Appartamenti · Pontresina",
          meta: "Engadina · alta stagione",
          img: "assets/attr-sm-corviglia.jpg",
          ss: "Pontresina, Switzerland",
          extras: { selected_currency: "EUR" }
        }
      ]
    },
    lapponia: {
      periodName: "Natale / Capodanno",
      dates: function () { return nextDate(11, 20, 7); },
      hint:
        "Solo cabine / case / appartamenti — non hotel. " +
        "Confronta i prezzi veri su queste date di Natale.",
      items: [
        {
          title: "Cabine · Rovaniemi",
          meta: "Aurora · Natale · apt/case",
          img: "assets/attr-lap-aurora.jpg",
          ss: "Rovaniemi, Finland",
          extras: { selected_currency: "EUR" }
        },
        {
          title: "Chalet · Levi",
          meta: "Sci + notte polare",
          img: "assets/attr-lap-levi.jpg",
          ss: "Levi, Finland",
          extras: { selected_currency: "EUR" }
        },
        {
          title: "Lodges · Santa Claus Village",
          meta: "Picco dicembre",
          img: "assets/attr-lap-santa.jpg",
          ss: "Santa Claus Village, Rovaniemi",
          extras: { selected_currency: "EUR" }
        }
      ]
    },
    "costa-azzurra": {
      periodName: "Festival / maggio",
      dates: function () { return nextDate(4, 12, 7); },
      hint:
        "Solo appartamenti / case intere — non hotel di lusso. " +
        "A maggio (Festival) i prezzi saltano: confronta sul posto.",
      items: [
        {
          title: "Appartamenti · Cannes",
          meta: "Festival week · apt",
          img: "assets/attr-ca-palais.jpg",
          ss: "Cannes, France",
          extras: { selected_currency: "EUR" }
        },
        {
          title: "Appartamenti · Croisette",
          meta: "Centro eventi",
          img: "assets/attr-ca-croisette.jpg",
          ss: "La Croisette, Cannes",
          extras: { selected_currency: "EUR" }
        },
        {
          title: "Appartamenti · Antibes",
          meta: "Alternativa più soft",
          img: "assets/attr-ca-plage.jpg",
          ss: "Antibes, France",
          extras: { selected_currency: "EUR" }
        }
      ]
    }
  };

  function render(root) {
    var key = root.getAttribute("data-live-booking");
    var cfg = DEST[key];
    if (!cfg) return;

    var dates = cfg.dates();
    var periodEl = document.querySelector("[data-live-period='" + key + "']");
    if (periodEl) {
      periodEl.innerHTML =
        "Date: <strong>" + dates.label + "</strong> · " + cfg.periodName + ". " +
        "Solo appartamenti e case — apri e confronta i prezzi veri.";
    }

    root.innerHTML = "";
    cfg.items.forEach(function (item) {
      var href = bookingUrl(item.ss, dates.checkin, dates.checkout, item.extras);
      var a = document.createElement("a");
      a.className = "live-card";
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML =
        '<div class="live-card__media" style="background-image:url(\'' + item.img + '\')"></div>' +
        '<div class="live-card__body">' +
          '<div class="live-card__title">' + item.title + "</div>" +
          '<div class="live-card__meta">' + item.meta + "</div>" +
          '<div class="live-card__dates">' + dates.label + "</div>" +
          '<div class="live-card__go">Mostra prezzi</div>' +
        "</div>";
      root.appendChild(a);
    });
  }

  document.querySelectorAll("[data-live-booking]").forEach(render);
})();
