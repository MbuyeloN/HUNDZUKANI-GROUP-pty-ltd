// js/validate.js

document.addEventListener("DOMContentLoaded", function () {
    setCurrentYear();
    setGreetingMessage();
    setupAccordion();
    setupHomeSearch();
    setupGalleryLightbox();
    setupServiceSearch();
    setupServiceUpdate();
    setupEnquiryForm();
    setupContactForm();
});

/* ========== FOOTER YEAR ========== */
function setCurrentYear() {
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/* ========== HOME PAGE GREETING ========== */
function setGreetingMessage() {
    const greeting = document.getElementById("greetingMessage");
    if (!greeting) return;

    const hour = new Date().getHours();
    let text = "Welcome";

    if (hour < 12) {
        text = "Good morning, welcome to Hundzukani Group.";
    } else if (hour < 18) {
        text = "Good afternoon, welcome to Hundzukani Group.";
    } else {
        text = "Good evening, welcome to Hundzukani Group.";
    }

    greeting.textContent = text;
}

/* ========== ACCORDION (HOME, ABOUT, SERVICES) ========== */
function setupAccordion() {
    const toggles = document.querySelectorAll(".accordion-toggle");
    if (!toggles.length) return;

    toggles.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const panel = btn.nextElementSibling;

            // Close any other open panels
            document.querySelectorAll(".accordion-panel").forEach(function (p) {
                if (p !== panel) {
                    p.style.display = "none";
                }
            });
            document.querySelectorAll(".accordion-toggle").forEach(function (b) {
                if (b !== btn) {
                    b.setAttribute("aria-expanded", "false");
                }
            });

            // Toggle this one
            if (panel.style.display === "block") {
                panel.style.display = "none";
                btn.setAttribute("aria-expanded", "false");
            } else {
                panel.style.display = "block";
                btn.setAttribute("aria-expanded", "true");
            }
        });
    });
}

/* ========== HOME PAGE SEARCH ========== */
function setupHomeSearch() {
    const input = document.getElementById("siteSearch");
    const list = document.getElementById("searchList");
    const noResults = document.getElementById("noResults");

    if (!input || !list) return;

    const items = Array.from(list.querySelectorAll("li"));

    input.addEventListener("input", function () {
        const query = input.value.toLowerCase().trim();
        let visibleCount = 0;

        items.forEach(function (item) {
            const keywords = (item.getAttribute("data-keywords") || "").toLowerCase();
            if (!query || keywords.indexOf(query) !== -1) {
                item.style.display = "list-item";
                visibleCount++;
            } else {
                item.style.display = "none";
            }
        });

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? "block" : "none";
        }
    });
}

/* ========== GALLERY LIGHTBOX (HOME) ========== */
function setupGalleryLightbox() {
    const images = document.querySelectorAll(".gallery-image");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeBtn = document.getElementById("lightboxClose");

    if (!images.length || !lightbox || !lightboxImage || !closeBtn) return;

    images.forEach(function (img) {
        img.addEventListener("click", function () {
            lightboxImage.src = img.src;
            lightbox.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
        lightboxImage.src = "";
    });

    // Close when clicking outside image
    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            lightboxImage.src = "";
        }
    });
}

/* ========== SERVICES SEARCH ========== */
function setupServiceSearch() {
    const input = document.getElementById("serviceSearch");
    const list = document.getElementById("serviceList");
    const feedback = document.getElementById("serviceSearchFeedback");

    if (!input || !list) return;

    const items = Array.from(list.querySelectorAll("li"));

    input.addEventListener("input", function () {
        const query = input.value.toLowerCase().trim();
        let visibleCount = 0;

        items.forEach(function (item) {
            const keywords = (item.getAttribute("data-keywords") || "").toLowerCase();
            if (!query || keywords.indexOf(query) !== -1) {
                item.style.display = "list-item";
                visibleCount++;
            } else {
                item.style.display = "none";
            }
        });

        if (feedback) {
            if (visibleCount === 0 && query) {
                feedback.textContent = "No services match your search.";
                feedback.style.display = "block";
            } else {
                feedback.textContent = "";
                feedback.style.display = "none";
            }
        }
    });
}

/* ========== DYNAMIC SERVICE UPDATE TEXT ========== */
function setupServiceUpdate() {
    const p = document.getElementById("serviceUpdateText");
    if (!p) return;

    const now = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formatted = now.toLocaleDateString("en-ZA", options);

    p.textContent = "Service information last reviewed on " + formatted + ".";
}

/* ========== ENQUIRY FORM VALIDATION ========== */
function setupEnquiryForm() {
    const form = document.getElementById("enquiry-form");
    if (!form) return;

    const feedbackBox = document.getElementById("enquiry-feedback");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Inputs
        const name = document.getElementById("enquiry-name");
        const email = document.getElementById("enquiry-email");
        const phone = document.getElementById("enquiry-phone");
        const subject = document.getElementById("enquiry-subject");
        const message = document.getElementById("enquiry-message");

        // Error <small> elements
        const nameError = document.getElementById("enquiry-name-error");
        const emailError = document.getElementById("enquiry-email-error");
        const phoneError = document.getElementById("enquiry-phone-error");
        const subjectError = document.getElementById("enquiry-subject-error");
        const messageError = document.getElementById("enquiry-message-error");

        let isValid = true;

        // Clear previous errors
        [nameError, emailError, phoneError, subjectError, messageError].forEach(function (el) {
            if (el) el.textContent = "";
        });
        [name, email, phone, subject, message].forEach(function (input) {
            if (input) input.classList.remove("input-error");
        });
        if (feedbackBox) {
            feedbackBox.textContent = "";
            feedbackBox.className = "form-feedback";
        }

        // Name
        if (!name.value.trim()) {
            nameError.textContent = "Please enter your full name.";
            name.classList.add("input-error");
            isValid = false;
        }

        // Email (simple regex)
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            emailError.textContent = "Please enter your email address.";
            email.classList.add("input-error");
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            emailError.textContent = "Please enter a valid email address.";
            email.classList.add("input-error");
            isValid = false;
        }

        // Phone (basic SA-style check)
        const phoneValue = phone.value.trim();
        const phonePattern = /^(\+27|0)\d{9}$/;
        if (!phoneValue) {
            phoneError.textContent = "Please enter your phone number.";
            phone.classList.add("input-error");
            isValid = false;
        } else if (!phonePattern.test(phoneValue)) {
            phoneError.textContent = "Please use a valid SA number (e.g. 0821234567 or +27821234567).";
            phone.classList.add("input-error");
            isValid = false;
        }

        // Subject
        if (!subject.value.trim()) {
            subjectError.textContent = "Please enter a subject.";
            subject.classList.add("input-error");
            isValid = false;
        }

        // Message
        if (!message.value.trim()) {
            messageError.textContent = "Please enter a message.";
            message.classList.add("input-error");
            isValid = false;
        }

        if (!isValid) {
            if (feedbackBox) {
                feedbackBox.textContent = "Please fix the highlighted fields before submitting.";
                feedbackBox.classList.add("error");
            }
            return;
        }

        // If valid – show success
        if (feedbackBox) {
            feedbackBox.textContent = "Thank you! Your enquiry has been submitted successfully.";
            feedbackBox.classList.add("success");
        }
        alert("Enquiry submitted successfully!");

        form.reset();
    });
}

/* ========== CONTACT FORM VALIDATION ========== */
function setupContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const feedbackBox = document.getElementById("contact-feedback");
    const recipientDisplay = document.getElementById("recipient-display");
    const primaryRecipientLink = document.getElementById("primary-recipient");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("contact-name");
        const email = document.getElementById("contact-email");
        const message = document.getElementById("contact-message");

        let isValid = true;

        if (feedbackBox) {
            feedbackBox.textContent = "";
            feedbackBox.className = "form-feedback";
        }
        [name, email, message].forEach(function (input) {
            if (input) input.classList.remove("input-error");
        });

        // Name
        if (!name.value.trim()) {
            name.classList.add("input-error");
            isValid = false;
        }

        // Email
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue || !emailPattern.test(emailValue)) {
            email.classList.add("input-error");
            isValid = false;
        }

        // Message
        if (!message.value.trim()) {
            message.classList.add("input-error");
            isValid = false;
        }

        if (!isValid) {
            if (feedbackBox) {
                feedbackBox.textContent = "Please complete all required fields correctly.";
                feedbackBox.classList.add("error");
            }
            return;
        }

        // Simulate routing to primary recipient
        if (recipientDisplay && primaryRecipientLink) {
            recipientDisplay.textContent = primaryRecipientLink.textContent.trim();
        }

        if (feedbackBox) {
            feedbackBox.textContent = "Thank you! Your message has been sent to our primary recipient.";
            feedbackBox.classList.add("success");
        }
        alert("Contact form submitted successfully!");

        form.reset();
    });
}
