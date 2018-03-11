(function () {

  const app = new VACANCY(document);

  app.appLoad('loading', function () {
    // App is loading... Paste your app code here. 4example u can run preloader event here and stop it in action appLoad dom or full


  });

  app.appLoad('dom', function () {
      app.experienceLogic();
  });

  app.appLoad('full', function (e) {

  });

})();