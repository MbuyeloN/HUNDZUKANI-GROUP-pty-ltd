// Dynamic greeting + footer year
(function () {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "Welcome";

    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    else greeting = "Good evening";

    const greetEl = document.getElementById("greetingMessage");
    if (greetEl) {
        greetEl.textContent = greeting + " to Hundzukani Group.";
    }

    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = now.getFullYear();
    }
})();

// Accordion behaviour (Home, About, Services)
(function () {
    const panels = document.querySelectorAll(".accordion-panel");
    const toggles = document.querySelectorAll(".accordion-toggle");

    if (!panels.length || !toggles.length) return;

    panels.forEach(panel => {
        panel.style.display = "none";
    });

    toggles.forEach(button => {
        button.addEventListener("click", function () {
            const panel = this.nextElementSibling;
            const isOpen = panel.style.display === "block";

            panel.style.display = isOpen ? "none" : "block";
            this.setAttribute("aria-expanded", (!isOpen).toString());
        });
    });
})();

// Search feature on HOME page
(function () {
    const input = document.getElementById("siteSearch");
    const items = document.querySelectorAll("#searchList li");
    const noResults = document.getElementById("noResults");

    if (!input || !items.length) return;

    input.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        let visibleCount = 0;

        items.forEach(item => {
            const keywords = item.getAttribute("data-keywords").toLowerCase();
            const text = item.textContent.toLowerCase();

            if (!query || keywords.includes(query) || text.includes(query)) {
                item.style.display = "";
                visibleCount++;
            } else {
                item.style.display = "none";
            }
        });

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? "block" : "none";
        }
    });
})();

// Gallery lightbox (Home page)
(function () {
    const images = document.querySelectorAll(".gallery-image");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");

    if (!images.length || !lightbox || !lightboxImage || !lightboxClose) return;

    images.forEach(img => {
        img.addEventListener("click", function () {
            lightboxImage.src = this.src;
            lightboxImage.alt = this.alt;
            lightbox.style.display = "flex";
        });
    });

    lightboxClose.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
})();

// Service search (Services page)
(function () {
    const input = document.getElementById("serviceSearch");
    const items = document.querySelectorAll("#serviceList li");
    const feedback = document.getElementById("serviceSearchFeedback");

    if (!input || !items.length || !feedback) return;

    input.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        let visibleCount = 0;

        items.forEach(item => {
            const keywords = item.getAttribute("data-keywords").toLowerCase();
            const text = item.textContent.toLowerCase();

            if (!query || keywords.includes(query) || text.includes(query)) {
                item.style.display = "";
                visibleCount++;
            } else {
                item.style.display = "none";
            }
        });

        feedback.style.display = visibleCount === 0 ? "block" : "none";
    });
})();

// Dynamic service update (Services page – real-time content)
(function () {
    const updateElement = document.getElementById("serviceUpdateText");
    if (!updateElement) return;

    const now = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const services = [
        "Cost Consulting",
        "Project Management",
        "Contract Administration",
        "Tender Documentation",
        "Quality Control"
    ];

    const dayName = dayNames[now.getDay()];
    const highlightedService = services[now.getDay() % services.length];

    updateElement.textContent =
        `Today is ${dayName}. We are currently prioritising ${highlightedService} to support active client projects.`;
})();

// ================================
// ENQUIRY FORM VALIDATION (LIVE)
// ================================
(function () {
    const form = document.getElementById("enquiry-form");
    if (!form) return; // only run on enquiry page

    const nameInput = document.getElementById("enquiry-name");
    const emailInput = document.getElementById("enquiry-email");
    const phoneInput = document.getElementById("enquiry-phone");
    const subjectInput = document.getElementById("enquiry-subject");
    const messageInput = document.getElementById("enquiry-message");
    const feedbackBox = document.getElementById("enquiry-feedback");

    const nameError = document.getElementById("enquiry-name-error");
    const emailError = document.getElementById("enquiry-email-error");
    const phoneError = document.getElementById("enquiry-phone-error");
    const subjectError = document.getElementById("enquiry-subject-error");
    const messageError = document.getElementById("enquiry-message-error");

    function showError(input, errorElement, message) {
        if (!input || !errorElement) return;
        errorElement.textContent = message;
        input.classList.remove("valid");
        input.classList.add("invalid");
    }

    function showSuccess(input, errorElement) {
        if (!input || !errorElement) return;
        errorElement.textContent = "";
        input.classList.remove("invalid");
        input.classList.add("valid");
    }

    function validateName() {
        const value = nameInput.value.trim();
        if (value.length < 3) {
            showError(nameInput, nameError, "Name must be at least 3 characters.");
            return false;
        }
        showSuccess(nameInput, nameError);
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(value)) {
            showError(emailInput, emailError, "Please enter a valid email address.");
            return false;
        }
        showSuccess(emailInput, emailError);
        return true;
    }

    function validatePhone() {
        const value = phoneInput.value.trim();
        // Simple SA-style check: 0XXXXXXXXX or +27XXXXXXXXX (9 digits after prefix)
        const phonePattern = /^(0\d{9}|\+27\d{9})$/;

        if (!phonePattern.test(value)) {
            showError(
                phoneInput,
                phoneError,
                "Enter a valid SA number (0XXXXXXXXX or +27XXXXXXXXX)."
            );
            return false;
        }
        showSuccess(phoneInput, phoneError);
        return true;
    }

    function validateSubject() {
        const value = subjectInput.value.trim();
        if (value.length < 3) {
            showError(subjectInput, subjectError, "Subject must be at least 3 characters.");
            return false;
        }
        showSuccess(subjectInput, subjectError);
        return true;
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        if (value.length < 10) {
            showError(
                messageInput,
                messageError,
                "Message must be at least 10 characters so we can assist properly."
            );
            return false;
        }
        showSuccess(messageInput, messageError);
        return true;
    }
    // ================================
// CONTACT FORM VALIDATION (LIVE)
// ================================
(function () {
    const form = document.getElementById("contact-form");
    if (!form) return; // only run on contact page

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");
    const feedbackBox = document.getElementById("contact-feedback");

    const nameError = document.getElementById("contact-name-error");
    const emailError = document.getElementById("contact-email-error");
    const messageError = document.getElementById("contact-message-error");

    function showError(input, errorElement, message) {
        if (!input || !errorElement) return;
        errorElement.textContent = message;
        input.classList.remove("valid");
        input.classList.add("invalid");
    }

    function showSuccess(input, errorElement) {
        if (!input || !errorElement) return;
        errorElement.textContent = "";
        input.classList.remove("invalid");
        input.classList.add("valid");
    }

    function validateName() {
        const value = nameInput.value.trim();
        if (value.length < 3) {
            showError(nameInput, nameError, "Name must be at least 3 characters.");
            return false;
        }
        showSuccess(nameInput, nameError);
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(value)) {
            showError(emailInput, emailError, "Please enter a valid email address.");
            return false;
        }
        showSuccess(emailInput, emailError);
        return true;
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        if (value.length < 10) {
            showError(
                messageInput,
                messageError,
                "Message must be at least 10 characters so we can assist properly."
            );
            return false;
        }
        showSuccess(messageInput, messageError);
        return true;
    }

    // Live feedback
    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    messageInput.addEventListener("input", validateMessage);

    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    messageInput.addEventListener("blur", validateMessage);

    // Submit handler
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            feedbackBox.textContent = "Thank you for contacting us. We will respond shortly.";
            feedbackBox.className = "form-feedback success";

            form.reset();
            [nameInput, emailInput, messageInput].forEach(input => {
                input.classList.remove("valid", "invalid");
            });
        } else {
            feedbackBox.textContent = "Please fix the highlighted fields before submitting.";
            feedbackBox.className = "form-feedback error";
        }
    });
})();

// ================================
// CONTACT – RECIPIENT DISPLAY
// (syncs span with mailto link)
// ================================
(function () {
    const link = document.getElementById("primary-recipient");
    const displaySpan = document.getElementById("recipient-display");

    if (!link || !displaySpan) return;

    const emailText = link.textContent.trim();
    displaySpan.textContent = emailText;
})();


    // Live feedback
    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    phoneInput.addEventListener("input", validatePhone);
    subjectInput.addEventListener("input", validateSubject);
    messageInput.addEventListener("input", validateMessage);

    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    phoneInput.addEventListener("blur", validatePhone);
    subjectInput.addEventListener("blur", validateSubject);
    messageInput.addEventListener("blur", validateMessage);

    // Final submit validation
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
            feedbackBox.textContent = "Thank you! Your enquiry has been received.";
            feedbackBox.className = "form-feedback success";

            // Front-end only: reset the form
            form.reset();
            [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
                input.classList.remove("valid", "invalid");
            });
        } else {
            feedbackBox.textContent = "Please fix the highlighted fields before submitting.";
            feedbackBox.className = "form-feedback error";
        }
    });
})();
