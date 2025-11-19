# ChangeLog

---

## [v1.0.0] – 05-08-2025
### Added
- Initial brainstorming of website concept and structure
- Selected background colours and theme consistent with project vision

### Notes
- Focused on aligning colour scheme with Hundzukani Group’s brand identity
- Early stage: set the foundation for layout and tone

---

## [v1.1.0] – 12-08-2025
### Added
- Created **index.html** (Home), **About.html**, and **Contact.html**
- Drafted initial content for each page
- Structured navigation bar for multi-page flow

### Notes
- Learned the importance of drafting written content before coding
- Ensured initial pages connected through consistent navigation

---

## [v1.2.0] – 20-08-2025
### Added
- Built **Services.html** and **Enquiry.html** pages
- Implemented enquiry form on Enquiries page for user submissions
- Linked Services page items directly to Contact form (“Enquire Now” buttons)

### Improved
- Added an extra enquiry form for convenience and completeness
- Refined background colour to improve readability

### Notes
- Strong belief that Enquiries page must contain its own form for usability
- Service-to-contact workflow improves client engagement

---

## [v1.3.0] – 20-08-2025 (later same day)
### Changed
- Adjusted background colour from light blue to a darker shade for improved aesthetics

### Notes
- Design refinement based on visual balance and accessibility

---

## [v1.4.0] – 26-08-2025
### Added
- Final touch-ups across all pages
- Embedded company video for Home page

### Improved
- Verified responsiveness and ensured no page breaks
- Polished visual alignment and spacing

### Notes
- Recommended viewing the Home page video in **full-screen mode** for the best experience
- Marked the project as ready for submission

---

## [v1.5.0] – 23-09-2025
### Added
- Global stylesheet at **/css/styles.css** with minimal reset, theme tokens (light-green headings), navigation pills, typography, tables, forms, utilities, and responsive tweaks.
### Notes
- Preserved original HTML structure and inline background colours exactly as provided.

## [v1.5.1] – 23-09-2025
### Improved
- **Services** page presentation: each `<main> > <section>` renders as a clean card (padding, border, subtle shadow).
- Styled “Enquire Now” links as accessible buttons (no HTML changes required).

## [v1.5.2] – 23-09-2025
### Improved
- **Enquiries** page table-based form: card layout, bold label column, full-width inputs, and mobile stacking for small screens.
### Notes
- Kept the early `</body>` tag in place to respect the “no structure changes” rule; flagged for future HTML validation fix if desired.

## [v1.5.3] – 23-09-2025
### Improved
- **Contact** page: responsive Google Maps iframe (full-width within container, rounded corners, shadow).
- Spacing adjustments for the contact details table; contact form inherits enquiry form styling.

## [v1.6.0] – 23-09-2025
### Added
- **README.md** with comprehensive overview: objectives, features, folder structure, how to run, screenshots placeholder, future improvements, acknowledgements, and author.
- Initial **CHANGELOG.md** scaffold (now expanded).

## [v1.6.1] – 23-09-2025
### Added
- Provided two CSS folder options for flexibility:
  - **/css/styles.css** (recommended)
  - **/Styless.css/styles.css** (duplicate content to match requested folder name)
### Changed
- Injected correct `<link rel="stylesheet">` tags into **index.html** and all files under **/Pages/** (pathing respects folder depth).

---

## [v1.7.0] – 26-09-2025
### Added
- Inline SVG social media icons (Facebook, Instagram, LinkedIn, WhatsApp, and X/Twitter) in the footer across **all 5 pages**.
- Accessibility improvements: `.sr-only` class for screen readers, proper `aria-labels` on social links.
- New section in **README.md** for References (Harvard Anglia style).

### Fixed
- Broken image path on Home page (`./Assets/ no3.jpg` → `./Assets/Picture no3.jpg`).
- Removed invalid `font-style: calc();` inline style.
- Corrected and simplified CSS rules at lines 85 and 88 for `<section>` handling.

### Improved
- Footer structure unified across all pages.
- Gallery images enhanced with borders, shadows, and consistent spacing.
- Enquiry and Contact forms improved for responsiveness and clarity.
- CSS tidied: removed empty selectors, added subtle helpers, and refined section spacing.

### Notes
- Project now fully polished with consistent design across all pages.

[v2.0.0] – 10-11-2025

### Added

Full JavaScript validation for Enquiry and Contact forms (/js/validate.js)

Real-time success popup alerts on all form submissions

Dynamic greeting message on Home page (time-based: morning/afternoon/evening)

Dynamic Services update showing the last reviewed date

Live search filtering on Home page with no-results feedback

Services page live search using keyword matching

Image lightbox gallery for viewing Home page images in a popup

Centralised all JavaScript into a single file (validate.js)

### Improved

Accordion behaviour across pages (only one panel open at a time)

Responsive design across Home, About, Services, Enquiry, and Contact pages

Standardised image dimensions for gallery and About team members

Form styling, spacing, labels, and error messages for clarity and accessibility

Footer year now updates automatically across all pages

Cleaned navigation spacing, section padding, and layout alignment

### Fixed

Form submission events not triggering popups

Placeholder errors and missing inputs not being validated

Missing IDs and mismatched DOM selectors that prevented JS functions from running

### Notes

This release completes Part 3 POE requirements: JavaScript validation, interactivity, responsiveness, improved UX, and dynamic content.

All pages now follow a consistent structure and styling system (CSS + JS).