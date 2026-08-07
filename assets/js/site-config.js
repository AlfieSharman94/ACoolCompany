/*
  Site-wide feature flags.

  solarEnabled — the Solar panels service is built and ready, but ACC asked
  for it to be hidden until they're ready to launch it. Flip this to `true`
  when that day comes: the "Solar panels" nav link will appear everywhere,
  and solar.html will show its real content instead of the "coming soon"
  placeholder. No other code changes are needed.
*/
window.SITE_CONFIG = {
  solarEnabled: false
};
