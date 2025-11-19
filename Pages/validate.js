// main.js
// Simple JavaScript to add interactivity to Hundzukani Group website
// - Accordion (About + Services)
// - Dynamic text on Home + Services
// - Gallery lightbox (Home page images)
// - Service search (Services page)
// - Form validation (Enquiry + Contact)

/* ------------ Helper: safely select elements ------------ */
function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return document.querySelectorAll(selector);
}

document.addEventListener("DOMContentLoaded", function () {
  setupAccordions();
  setupDynamicHomeUpdate();
  setupDynamicServiceUpdate();
  setupGalleryLightbox();
  setupServiceSearch();
  setupEnquiryForm();
  setupContactForm();
});

/* ------------ 1. Accordions (About + Services) ------------ */
function setupAccordions() {
  const panels = $all(".accordion-panel");
  const headers = $all(".accordion-header");

  if (!panels.length || !headers.length) {
    return; // no accordions on this page
  }

  // Hide all panels except the first one
  panels.forEach(function (panel, index) {
    panel.style.display = index === 0 ? "block" : "none";
  });

  headers.forEach(function (header) {
    header.addEventListener("click", function () {
      const key = header.getAttribute("data-accordion");
      if (!key) return;

      const panelId = key + "-panel";
      const panel = document.getElementById(panelId);
      if (!panel) return;

      const isOpen = panel.style.display === "block";

      // Close all panels
      panels.forEach(function (p) {
        p.style.display = "none";
      });

      // Re-open the clicked panel if it was closed
      if (!isOpen) {
        panel.style.display = "block";
      }
    });
  });
}

/* ------------ 2. Dynamic text: Home page ------------ */
function setupDynamicHomeUpdate() {
  const msg = $("#dynamic-message");
  if (!msg) return;

  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const dateText = now.toLocaleDateString("en-ZA", options);

  msg.textContent =
    "Today is " +
    dateText +
    ". Hundzukani Group continues to support clients with professional, cost-effective construction solutions across South Africa.";
}

/* ------------ 3. Dynamic text: Services page ------------ */
function setupDynamicServiceUpdate() {
  const msg = $("#service-update-text");
  if (!msg) return;

  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  msg.textContent =
    greeting +
    ". Our team is currently assisting clients with cost consulting, tender documentation and project management on active construction projects.";
}

/* ------------ 4. Gallery lightbox (Home page) ------------ */
function setupGalleryLightbox() {
  const items = $all(".gallery-item");
  if (!items.length) return;

  // Create lightbox elements once
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(15,23,42,0.85)";
  overlay.style.display = "none";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";
  overlay.style.padding = "1rem";

  const inner = document.createElement("div");
  inner.style.background = "#ffffff";
  inner.style.borderRadius = "16px";
  inner.style.maxWidth = "900px";
  inner.style.width = "100%";
  inner.style.boxShadow = "0 20px 40px rgba(15,23,42,.35)";
  inner.style.overflow = "hidden";

  const image = document.createElement("img");
  image.style.width = "100%";
  image.style.display = "block";

  const captionBar = document.createElement("div");
  captionBar.style.padding = "0.75rem 1rem";
  captionBar.style.display = "flex";
  captionBar.style.justifyContent = "space-between";
  captionBar.style.alignItems = "center";
  captionBar.style.fontSize = "0.9rem";

  const captionText = document.createElement("span");
  captionText.style.color = "#0f172a";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.style.border = "none";
  closeBtn.style.background = "#0f172a";
  closeBtn.style.color = "#ffffff";
  closeBtn.style.padding = "0.35rem 0.8rem";
  closeBtn.style.borderRadius = "999px";
  closeBtn.style.cursor = "pointer";

  captionBar.appendChild(captionText);
  captionBar.appendChild(closeBtn);
  inner.appendChild(image);
  inner.appendChild(captionBar);
  overlay.appendChild(inner);
  document.body.appendChild(overlay);

  function openLightbox(src, caption) {
    image.src = src;
    captionText.textContent = caption || "";
    overlay.style.display = "flex";
  }

  function closeLightbox() {
    overlay.style.display = "none";
  }

  items.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      const imgSrc = item.getAttribute("href");
      const caption = item.getAttribute("data-caption") || "";
      openLightbox(imgSrc, caption);
    });
  });

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeLightbox();
    }
  });

  closeBtn.addEventListener("click", function () {
    closeLightbox();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && overlay.style.display === "flex") {
      closeLightbox();
    }
  });
}

/* ------------ 5. Service search (Services page) ------------ */
function setupServiceSearch() {
  const searchInput = $("#service-search");
  if (!searchInput) return;

  const headers = $all(".accordion-header");
  const panels = $all(".accordion-panel");
  const feedback = $("#search-feedback");

  function resetAccordionState() {
    panels.forEach(function (panel, index) {
      panel.style.display = index === 0 ? "block" : "none";
    });
    headers.forEach(function (header) {
      header.style.display = "";
    });
    if (feedback) {
      feedback.textContent = "";
    }
  }

  // Make sure default state is correct when page loads
  resetAccordionState();

  searchInput.addEventListener("input", function () {
    const term = searchInput.value.trim().toLowerCase();

    if (!term) {
      resetAccordionState();
      return;
    }

    let matches = 0;

    headers.forEach(function (header) {
      const key = header.getAttribute("data-accordion");
      const panelId = key ? key + "-panel" : null;
      const panel = panelId ? document.getElementById(panelId) : null;

      const fullText =
        (header.textContent || "") +
        " " +
        (panel ? panel.textContent : "");

      if (fullText.toLowerCase().includes(term)) {
        header.style.display = "";
        if (panel) {
          panel.style.display = "block";
        }
        matches++;
      } else {
        header.style.display = "none";
        if (panel) {
          panel.style.display = "none";
        }
      }
    });

    if (feedback) {
      if (matches === 0) {
        feedback.textContent = "No services match your search.";
      } else {
        feedback.textContent = matches + " service(s) found.";
      }
    }
  });
}

/* ------------ 6. Enquiry form validation ------------ */
function setupEnquiryForm() {
  const form = $("#enquiry-form");
  const feedback = $("#enquiry-feedback");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = $("#enquiry-name").value.trim();
    const email = $("#enquiry-email").value.trim();
    const phone = $("#enquiry-phone").value.trim();
    const subject = $("#enquiry-subject").value.trim();
    const message = $("#enquiry-message").value.trim();

    const errors = [];

    if (name.length < 3) {
      errors.push("Please enter your full name (at least 3 characters).");
    }

    if (!isValidEmail(email)) {
      errors.push("Please enter a valid email address.");
    }

    if (subject.length < 3) {
      errors.push("Please enter a subject for your enquiry.");
    }

    if (message.length < 10) {
      errors.push("Please provide more detail in your message (at least 10 characters).");
    }

    if (phone && !isValidPhone(phone)) {
      errors.push("Please enter a valid phone number (digits, spaces and '+' only).");
    }

    if (!feedback) return;

    if (errors.length > 0) {
      feedback.style.color = "#b91c1c"; // red
      feedback.innerHTML =
        "<strong>There were some problems:</strong><ul><li>" +
        errors.join("</li><li>") +
        "</li></ul>";
    } else {
      feedback.style.color = "#166534"; // green
      feedback.innerHTML =
        "<strong>Thank you, " +
        name +
        ".</strong> Your enquiry has been submitted. We will contact you at " +
        email +
        " as soon as possible.";
      form.reset();
    }
  });
}

/* ------------ 7. Contact form validation ------------ */
function setupContactForm() {
  const form = $("#contact-form");
  const feedback = $("#contact-feedback");
  const recipientSpan = $("#recipient-display");
  const primaryRecipient = $("#primary-recipient");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = $("#contact-name").value.trim();
    const email = $("#contact-email").value.trim();
    const message = $("#contact-message").value.trim();

    const errors = [];

    if (name.length < 3) {
      errors.push("Please enter your name (at least 3 characters).");
    }

    if (!isValidEmail(email)) {
      errors.push("Please enter a valid email address.");
    }

    if (message.length < 10) {
      errors.push("Please enter a longer message (at least 10 characters).");
    }

    if (!feedback) return;

    if (errors.length > 0) {
      feedback.style.color = "#b91c1c";
      feedback.innerHTML =
        "<strong>There were some problems:</strong><ul><li>" +
        errors.join("</li><li>") +
        "</li></ul>";
    } else {
      const recipientEmail =
        (primaryRecipient && primaryRecipient.textContent.trim()) ||
        "our support team";

      feedback.style.color = "#166534";
      feedback.innerHTML =
        "<strong>Thank you, " +
        name +
        ".</strong> Your message has been received and will be forwarded to " +
        recipientEmail +
        ".";

      if (recipientSpan) {
        recipientSpan.textContent = recipientEmail;
      }

      form.reset();
    }
  });
}

/* ------------ 8. Small helper functions ------------ */
function isValidEmail(email) {
  // Very simple email pattern for first-year level
  return email.includes("@") && email.includes(".");
}

function isValidPhone(phone) {
  // Allow digits, spaces and plus sign
  return /^[\d+\s]+$/.test(phone);
}
