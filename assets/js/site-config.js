/*
  Site-wide feature flags.

  solarEnabled — the Solar panels page is built but not ready for customers
  yet. While this is false, the "Solar panels" link is hidden in the header and
  footer on every page, the page is marked noindex, and visiting solar.html
  directly redirects to the home page. Set it to true to launch the page: the
  links appear and the page loads normally. No other code changes needed.
*/
window.SITE_CONFIG = {
  solarEnabled: false
};
