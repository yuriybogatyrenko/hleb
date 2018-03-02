(function () {

  const app = new LHCOIN(document);

  app.appLoad('loading', function () {
    // App is loading... Paste your app code here. 4example u can run preloader event here and stop it in action appLoad dom or full


  });

  app.appLoad('dom', function () {
      app.tabSwitcher();
      app.popups();
      app.scrollTo();
      app.headerAnimation();
      app.menuActualization();
      app.responsiveSvg();
  });

  app.appLoad('full', function (e) {

  });

})();