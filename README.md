# A Cool Company — website

Plain HTML/CSS/JS site for A Cool Company Ltd (Chelmsford & mid Essex): domestic
air conditioning installation and servicing, plus solar panels. No build step —
open `index.html` in a browser, or push to GitHub and turn on Pages.

Built from the **"ACC Website" design (Aug 2026)**: cat-mark logo, sticky navy
header, top-accent service cards, numbered process, portfolio grid and navy
footer. The design was desktop-only; the responsive behaviour, the mobile nav,
the accessible native `<details>` FAQ and the keyboard focus styles were added
on top so the built site works on phones and with the keyboard.

## Pages

- `index.html` — Home (hero, three services, process, recent work, CTA)
- `portfolio.html` — Portfolio (placeholder job cards for now)
- `solar.html` — Solar panels (built, hidden behind a feature flag)
- `faq.html` — FAQs (native accordion)
- `contact.html` — Contact, with a Formspree-powered enquiry form

## Before you go live

1. **Formspree.** Create a form at [formspree.io](https://formspree.io) and
   replace `YOUR_FORM_ID` in `contact.html` (the `<form action="...">` line)
   with the ID it gives you. Until you do this, the form falls back to a
   normal page submit instead of pretending to succeed.
2. **Phone number.** None was provided, so the site shows email only
   (`info@acoolcompany.co.uk`). If you get a business number, add a `tel:` link
   in the contact card in `contact.html` and, if you want, the header/footer.
   The design originally showed a phone button in the header — that's currently
   the "Book a survey" button instead.
3. **Photos.** Every image is a dashed placeholder box (`<div class="media">`)
   with a description of the shot needed. Replace each with an `<img>` pointing
   at a real photo in `assets/img/` (add `alt` text on every image). This covers
   the home hero, the three "recent work" cards, the six portfolio cards and the
   two solar images.

## Logo

The real cat-mark logo assets live in `assets/img/logo/` (see that folder's
`README.md` for which file to use where). The header/footer use the inline SVG
mark directly; the browser tab icon is `assets/img/favicon.svg`, and
`assets/img/logo/acc-mark.png` is wired up as the `apple-touch-icon`.

## Solar panels

The solar page is built but **hidden behind a feature flag** while it's not
ready for customers. The flag lives in `assets/js/site-config.js`:

```js
window.SITE_CONFIG = {
  solarEnabled: false
};
```

While `solarEnabled` is `false`: the "Solar panels" link is hidden in the
header and footer on every page (it ships with the `hidden` attribute, so it
stays hidden even with JavaScript off), the page is marked `noindex`, and
visiting `solar.html` directly redirects to the home page. Set it to `true`
to launch: the links appear and the page loads normally.

## Hosting on GitHub Pages

This repo is set up for `https://github.com/AlfieSharman94/ACoolCompany`.

1. Push this folder's contents to the repo's default branch.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch",
   pick the branch (e.g. `main`) and folder `/ (root)`.
4. Save. GitHub will give you a URL like
   `https://alfiesharman94.github.io/ACoolCompany/` within a minute or two.
5. If you buy a custom domain (e.g. acoolcompany.co.uk), add it under the
   same Pages settings and follow GitHub's DNS instructions.

## Design notes

- Tokens (colour, type, spacing) live at the top of `assets/css/style.css` as
  CSS custom properties. Brand: navy `#0F2440`, baby blue `#A5D8E8`, cat black
  `#14181D`.
- Mobile-first CSS. Grids collapse to one or two columns on small screens and
  step up at 640/900/1000px; the H1 grows from 34px to 52–56px at 900px, body
  stays 17px everywhere to avoid Safari's zoom-on-focus behaviour.
- Navigation is a show/hide hamburger below 900px, inline links above it — see
  `.nav-toggle` / `.site-nav` in the CSS and the toggle script in `main.js`.
- FAQs use native `<details>/<summary>` — accessible and keyboard-operable with
  no JavaScript required.
- The contact form posts to Formspree as a normal HTML form (works with JS
  off); `main.js` progressively enhances it to submit via `fetch`, toggles the
  "What are you looking for?" pills into a hidden field, and shows an inline
  success/error message instead of leaving the page.
