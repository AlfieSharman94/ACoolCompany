/*
  Shared site behaviour: mobile nav toggle, the current year in the footer,
  the contact-form enquiry-type pills, and progressive-enhancement for the
  Formspree contact form (works with a plain form POST if JS fails).
*/
(function () {
  "use strict";

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

  /* Contact form enquiry-type pills: toggle a hidden input's value so the
     choice is submitted with the form. Falls back gracefully — with JS off
     the field simply isn't sent, and everything else still works. */
  var pills = document.querySelectorAll(".pill[data-enquiry]");
  var enquiryInput = document.querySelector("#enquiry-type");
  if (pills.length && enquiryInput) {
    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        pills.forEach(function (p) {
          p.classList.remove("is-active");
          p.setAttribute("aria-pressed", "false");
        });
        pill.classList.add("is-active");
        pill.setAttribute("aria-pressed", "true");
        enquiryInput.value = pill.getAttribute("data-enquiry");
      });
    });
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
            showStatus("success", "Thanks — we've got your message and will be in touch within one working day.");
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
