(function () {
  var desks = document.querySelectorAll(".calldesk");
  if (!desks.length) return;

  var STATUSES = [
    { v: "todo", l: "Da chiamare" },
    { v: "calling", l: "In corso" },
    { v: "callback", l: "Richiamare" },
    { v: "interested", l: "Interessato" },
    { v: "no", l: "No / chiuso" },
    { v: "done", l: "Fatto" }
  ];

  function key(desk, id) {
    return "calldesk:" + desk + ":" + id;
  }

  function load(desk, id) {
    try {
      return JSON.parse(localStorage.getItem(key(desk, id)) || "{}");
    } catch (e) {
      return {};
    }
  }

  function save(desk, id, data) {
    localStorage.setItem(key(desk, id), JSON.stringify(data));
  }

  function refreshCounts(root) {
    var leads = root.querySelectorAll(".call-lead");
    var counts = { todo: 0, calling: 0, callback: 0, interested: 0, no: 0, done: 0 };
    leads.forEach(function (lead) {
      var st = lead.getAttribute("data-status") || "todo";
      if (counts[st] != null) counts[st] += 1;
    });
    var bar = root.querySelector(".calldesk__stats");
    if (!bar) return;
    bar.innerHTML =
      '<span><b>' + counts.todo + '</b> da chiamare</span>' +
      '<span><b>' + counts.callback + '</b> richiami</span>' +
      '<span><b>' + counts.interested + '</b> interessati</span>' +
      '<span><b>' + counts.done + '</b> fatti</span>';
  }

  desks.forEach(function (root) {
    var desk = root.getAttribute("data-desk") || "desk";

    root.querySelectorAll(".call-lead").forEach(function (lead) {
      var id = lead.getAttribute("data-id");
      if (!id) return;
      var data = load(desk, id);
      var status = data.status || "todo";
      var notes = data.notes || "";
      lead.setAttribute("data-status", status);

      var sel = lead.querySelector(".call-lead__status");
      if (sel) {
        sel.innerHTML = STATUSES.map(function (s) {
          return '<option value="' + s.v + '"' + (s.v === status ? " selected" : "") + ">" + s.l + "</option>";
        }).join("");
        sel.addEventListener("change", function () {
          lead.setAttribute("data-status", sel.value);
          var cur = load(desk, id);
          cur.status = sel.value;
          cur.updated = Date.now();
          save(desk, id, cur);
          refreshCounts(root);
        });
      }

      var ta = lead.querySelector(".call-lead__notes");
      if (ta) {
        ta.value = notes;
        var t;
        ta.addEventListener("input", function () {
          clearTimeout(t);
          t = setTimeout(function () {
            var cur = load(desk, id);
            cur.notes = ta.value;
            cur.updated = Date.now();
            save(desk, id, cur);
          }, 200);
        });
      }

      var head = lead.querySelector(".call-lead__head");
      var panel = lead.querySelector(".call-lead__panel");
      if (head && panel) {
        head.addEventListener("click", function (e) {
          if (e.target.closest("a, select, button.call-lead__copy, label, textarea")) return;
          var open = lead.classList.toggle("is-open");
          head.setAttribute("aria-expanded", open ? "true" : "false");
        });
      }

      lead.querySelectorAll(".call-lead__copy").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          var src = lead.querySelector(btn.getAttribute("data-copy"));
          if (!src) return;
          var text = src.innerText || src.value || "";
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
              var old = btn.textContent;
              btn.textContent = "Copiato";
              setTimeout(function () { btn.textContent = old; }, 1200);
            });
          }
        });
      });
    });

    refreshCounts(root);
  });
})();
