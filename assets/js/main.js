/* =========================================================
   FEMME FATALE — main.js
   Site-wide interactions: nav toggle, scroll reveal for cards.
   No frameworks. Vanilla JS only.
   ========================================================= */

(function () {
  "use strict";

  /* ---------------- Mobile nav toggle ---------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a link is clicked (mobile)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Scroll-reveal for book cards ---------------- */
  var cards = document.querySelectorAll(".book-card");

  if ("IntersectionObserver" in window && cards.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            // slight stagger for a premium, orchestrated feel
            setTimeout(function () {
              entry.target.classList.add("in-view");
            }, (i % 4) * 90);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach(function (card) {
      observer.observe(card);
    });
  } else {
    // Fallback: no IntersectionObserver support
    cards.forEach(function (card) {
      card.classList.add("in-view");
    });
  }
})();
