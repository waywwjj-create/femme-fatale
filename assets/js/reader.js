/* =========================================================
   FEMME FATALE — reader.js
   Reading-page behaviour: progress bar, dark mode, text size.
   Preferences are remembered across chapters via localStorage.
   ========================================================= */

(function () {
  "use strict";

  var body = document.body;
  var STORAGE_THEME = "ff_theme";
  var STORAGE_SIZE = "ff_text_size";

  /* ---------------- Restore saved preferences ---------------- */
  var savedTheme = localStorage.getItem(STORAGE_THEME);
  if (savedTheme === "dark") {
    body.classList.add("dark");
  }

  var savedSize = localStorage.getItem(STORAGE_SIZE) || "m";
  body.setAttribute("data-text-size", savedSize);

  /* ---------------- Dark mode toggle ---------------- */
  var themeBtn = document.querySelector("[data-action='toggle-theme']");
  if (themeBtn) {
    updateThemeIcon();
    themeBtn.addEventListener("click", function () {
      body.classList.toggle("dark");
      localStorage.setItem(
        STORAGE_THEME,
        body.classList.contains("dark") ? "dark" : "light"
      );
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (!themeBtn) return;
    themeBtn.textContent = body.classList.contains("dark") ? "☀" : "☾";
    themeBtn.setAttribute(
      "aria-label",
      body.classList.contains("dark") ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"
    );
  }

  /* ---------------- Text size controls ---------------- */
  var sizeOrder = ["s", "m", "l", "xl"];
  var incBtn = document.querySelector("[data-action='text-larger']");
  var decBtn = document.querySelector("[data-action='text-smaller']");

  function setSize(size) {
    body.setAttribute("data-text-size", size);
    localStorage.setItem(STORAGE_SIZE, size);
  }

  if (incBtn) {
    incBtn.addEventListener("click", function () {
      var current = sizeOrder.indexOf(body.getAttribute("data-text-size"));
      var next = Math.min(current + 1, sizeOrder.length - 1);
      setSize(sizeOrder[next]);
    });
  }
  if (decBtn) {
    decBtn.addEventListener("click", function () {
      var current = sizeOrder.indexOf(body.getAttribute("data-text-size"));
      var prev = Math.max(current - 1, 0);
      setSize(sizeOrder[prev]);
    });
  }

  /* ---------------- Reading progress bar ---------------- */
  var progressBar = document.querySelector(".reading-progress .bar");
  var article = document.querySelector(".chapter-text");

  if (progressBar && article) {
    var updateProgress = function () {
      var rect = article.getBoundingClientRect();
      var articleTop = rect.top + window.scrollY;
      var articleHeight = article.offsetHeight;
      var viewportBottom = window.scrollY + window.innerHeight;

      var scrolled = viewportBottom - articleTop;
      var percent = (scrolled / articleHeight) * 100;
      percent = Math.max(0, Math.min(100, percent));
      progressBar.style.width = percent + "%";
    };

    document.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }
})();
