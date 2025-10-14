// ads.js — centralized AdMob banner for all pages (Capacitor only)
(function () {
  const PROD_AD_UNIT = 'ca-app-pub-7285876468119610/4120491914'; // your banner unit
  const TEST_AD_UNIT = 'ca-app-pub-3940256099942544/6300978111'; // Google test banner
  const TEST_MODE = false; // <- PRODUCTION: set to false

  const Cap = window.Capacitor;
  if (!Cap || !Cap.isNativePlatform || !Cap.isNativePlatform()) return; // skip in desktop browser

  const AdMob = Cap.Plugins && Cap.Plugins.AdMob;
  if (!AdMob) { console.warn('[AdMob] Capacitor plugin not available'); return; }

  if (window.__ff_admob_init_done) {
    try { AdMob.resumeBanner && AdMob.resumeBanner(); } catch (e) {}
    return;
  }
  window.__ff_admob_init_done = true;

  const on = (evt, cb) => { try { AdMob.addListener && AdMob.addListener(evt, cb); } catch (e) {} };
  on('bannerAdLoaded', () => console.log('[AdMob] bannerAdLoaded'));
  on('bannerAdFailedToLoad', (e) => console.warn('[AdMob] bannerAdFailedToLoad', e));
  on('bannerAdClicked', () => console.log('[AdMob] bannerAdClicked'));
  on('bannerAdImpression', () => console.log('[AdMob] bannerAdImpression'));
  on('bannerAdSizeChanged', (e) => console.log('[AdMob] bannerAdSizeChanged', e));

  (async () => {
    try {
      await AdMob.initialize(); // uses App ID from AndroidManifest

      await AdMob.showBanner({
        adId: TEST_MODE ? TEST_AD_UNIT : PROD_AD_UNIT,
        adSize: 'ADAPTIVE_BANNER',
        position: 'BOTTOM_CENTER',
        isTesting: TEST_MODE
      });

      document.addEventListener('visibilitychange', () => {
        try { if (!document.hidden) { AdMob.resumeBanner && AdMob.resumeBanner(); } } catch (e) {}
      });
      document.addEventListener('resume', () => {
        try { AdMob.resumeBanner && AdMob.resumeBanner(); } catch (e) {}
      });

    } catch (e) {
      console.warn('[AdMob] error', e);
    }
  })();
})();