(function () {
  function openBlock(block) {
    if (!block || block.classList.contains("is-open")) return;
    block.classList.add("is-open");
    var btn = block.querySelector(".air-more__btn");
    if (btn) btn.setAttribute("aria-expanded", "true");
  }

  function closeBlock(block) {
    if (!block || !block.classList.contains("is-open")) return;
    block.classList.remove("is-open");
    var btn = block.querySelector(".air-more__btn");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function toggleBlock(block) {
    if (!block) return;
    if (block.classList.contains("is-open")) closeBlock(block);
    else openBlock(block);
  }

  function expandFromHash() {
    var id = (location.hash || "").replace(/^#/, "");
    if (!id) return;
    var el = document.getElementById(id);
    if (!el || !el.classList.contains("air-more")) return;
    openBlock(el);
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".air-more__btn");
    if (btn) {
      e.preventDefault();
      toggleBlock(btn.closest(".air-more"));
      return;
    }

    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var href = link.getAttribute("href") || "";
    var id = href.slice(1);
    if (!id) return;
    var target = document.getElementById(id);
    if (target && target.classList.contains("air-more")) {
      openBlock(target);
    }
  });

  window.addEventListener("hashchange", expandFromHash);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", expandFromHash);
  } else {
    expandFromHash();
  }
})();
