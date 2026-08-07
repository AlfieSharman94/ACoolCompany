# A Cool Company — website

Plain HTML/CSS/JS site for A Cool Company Ltd (Chelmsford & Essex): domestic and
commercial air conditioning installation and maintenance. No build step —
open `index.html` in a browser, or push to GitHub and turn on Pages.

## Pages

- `index.html` — Home
- `contact.html` — Contact us, with a Formspree-powered enquiry form
- `faq.html` — FAQs
- `portfolio.html` — Portfolio (placeholder job cards for now)
- `solar.html` — Solar panels, built but hidden until you're ready to launch it

## Before you go live

1. **Formspree.** Create a form at [formspree.io](https://formspree.io) and
   replace `YOUR_FORM_ID` in `contact.html` (the `<form action="...">` line)
   with the ID it gives you. Until you do this, the form falls back to a
   normal page submit instead of pretending to succeed.
2. **Phone number.** None was provided when this site was built, so the
   contact page only shows email. Add a `tel:` link next to the email in
   `contact.html` (and the header/footer if you want it there too) once you
   have a business number.
3. **Portfolio photos.** `portfolio.html` has six placeholder cards. For each
   real job: replace the placeholder title/description text, and swap the
   `<div class="card__media">…</div>` block for an `<img>` pointing at a
   photo in `assets/img/portfolio/`. Per the style guide: your own daylight
   photos, wide enough to show the room, including the outdoor unit, with
   real alt text on every image.
4. **Reviews.** The three review cards on the home page are placeholders —
   swap them for real customer quotes once you have some.
5. **Logo.** The header/footer mark is a simple SVG approximation of the cat
   icon described in the style guide (built directly in the HTML, no image
   file needed) — the style guide's own logo art is vector, not an embeddable
   image, so this was redrawn from its description rather than extracted. If
   you get an official SVG/PNG export of the real logo, swap it in in one
   place per page — the `<span class="brand__tile">…</span>` block near the
   top of each HTML file, and `assets/img/favicon.svg` for the tab icon.

## Turning on Solar panels

You asked for this section to exist but stay hidden until launch. It's fully
built in `solar.html`, controlled by one flag in
`assets/js/site-config.js`:

```js
window.SITE_CONFIG = {
  solarEnabled: false   // change to true when ready to launch
};
```

When `solarEnabled` is `false` (the default):
- The "Solar panels" nav link is hidden in the header and footer on every page.
- `solar.html` shows a short "coming soon" notice instead of the real content.
- `solar.html` has a `noindex` meta tag so search engines don't list it.

To launch it: set `solarEnabled: true` in `site-config.js`, and remove the
`<meta name="robots" content="noindex, nofollow">` line from the `<head>` of
`solar.html`. Everything else switches on automatically. You may also want to
add "Solar panels" as an option in the contact form's "What do you need?"
dropdown in `contact.html` at that point.

## Hosting on GitHub Pages

This repo is set up for `https://github.com/AlfieSharman94/ACoolCompany`.

1. Push this folder's contents to the repo's default branch.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch",
   pick the branch (e.g. `main`) and folder `/ (root)`.
3. Save. GitHub will give you a URL like
   `https://alfiesharman94.github.io/ACoolCompany/` within a minute or two.
4. If you buy a custom domain (e.g. acoolcompany.co.uk), add it under the
   same Pages settings and follow GitHub's DNS instructions.

## Where the content came from

- Visual design (colours, type, spacing, components, tone of voice,
  accessibility rules) follows *ACC Website Style Guide v1.0*.
- Copy about pricing, running costs, F-Gas certification and planning
  permission is drawn from the market research briefing (July 2026) — see
  `faq.html` and the homepage "Why ACC" section.
- Structure was loosely modelled on adcock.co.uk's page set (home, contact,
  FAQs, portfolio-style work section), adapted to ACC's own service list
  (no refrigeration).

## Design notes

- Mobile-first CSS in `assets/css/style.css`; type scale steps up at
  900px per the style guide (H1 34px→52px, H2 26px→34px), body stays 17px
  everywhere to avoid Safari's zoom-on-focus behaviour.
- Navigation is a simple show/hide hamburger below 900px, inline links above
  it — see `.nav-toggle` / `.site-nav` in the CSS and the toggle script in
  `assets/js/main.js`.
- FAQs use native `<details>/<summary>` — accessible and keyboard-operable
  with no JavaScript required.
- The contact form posts to Formspree as a normal HTML form (works with JS
  off); `main.js` progressively enhances it to submit via `fetch` and show an
  inline success/error message instead of leaving the page.
