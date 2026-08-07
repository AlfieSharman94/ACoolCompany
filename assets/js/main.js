/*
  Shared site behaviour: mobile nav toggle, the solar feature flag,
  the current year in the footer, and progressive-enhancement for the
  Formspree contact form (works with plain form POST if JS fails).
*/
(function () {
  "use strict";

  var config = window.SITE_CONFIG || { solarEnabled: false };

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* Footer year */
  var yearEl = document.querySelector("[data-current-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Solar feature flag. Every solar-related element ships `hidden` in the
     HTML by default, so it stays invisible even with JS disabled or slow.
     This script's only job is to *reveal* it when the flag is switched on —
     it never needs to hide anything itself. */
  if (config.solarEnabled) {
    document.querySelectorAll('[data-feature="solar"]').forEach(function (el) {
      el.hidden = false;
    });

    var solarContent = document.querySelector("[data-solar-content]");
    var solarPlaceholder = document.querySelector("[data-solar-placeholder]");
    if (solarContent && solarPlaceholder) {
      solarContent.hidden = false;
      solarPlaceholder.hidden = true;
    }
  }

  /* Formspree contact form: AJAX submit with inline status, falls back
     to a normal POST/redirect if fetch or JS is unavailable. */
  var form = document.querySelector("#contact-form");
  if (form) {
    var statusBox = document.querySelector("#form-status");
    form.addEventListener("submit", function (event) {
      var action = form.getAttribute("action") || "";
      if (action.indexOf("YOUR_FORM_ID") !== -1) {
        // Formspree hasn't been set up yet — let it fail naturally rather
        // than pretend the message sent.
        return;
      }
      event.preventDefault();
      var data = new FormData(form);
      fetch(action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            showStatus("success", "Thanks — we've got your message and will be in touch shortly.");
            form.reset();
          } else {
            return response.json().then(function (data) {
              var message = (data && data.errors && data.errors.map(function (e) { return e.message; }).join(", ")) || "Something went wrong sending that. Please try again or email us directly.";
              showStatus("error", message);
            });
          }
        })
        .catch(function () {
          showStatus("error", "Something went wrong sending that. Please try again or email us directly.");
        });
    });

    function showStatus(type, message) {
      if (!statusBox) { return; }
      statusBox.textContent = message;
      statusBox.className = "form-status is-visible form-status--" + type;
      statusBox.setAttribute("role", type === "error" ? "alert" : "status");
      statusBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
})();
