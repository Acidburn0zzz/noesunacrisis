// vim:set sw=2 ts=4 sts=4 ft=javascript expandtab smartindent:
(function () {
  $(document).ready(function () {
    // Global initialization
    var LANG;
    // Cache layer
    var jqCache = {
      langs: $('#lang_langs span'),
    };
    // Internationalization
    $.get('json/interface.json', function (data) { init(data); });

    var init = function (lang) {
      LANG = lang;
      initLang();
    }

    // Lang interface and actions
    var initLang = function() {
      var userLang = document.cookie.replace(/(lang=|; |res=\w{2})/gi, '') || 'FR';
      // Population
      var populateHome = function () {
        $('#lang_produced').text(LANG['HOME']['PRODUCED'][userLang]);
        $('#lang_participation').text(LANG['HOME']['PARTNERS'][userLang]);

        $('#lang_home_subtitle').text(LANG['HOME']['TITLE'][userLang]);
        var homeHtml = '<h2>' + LANG['HOME']['SUBTITLE'][userLang] + '</h2><hr />';
        homeHtml += '<p class="subtitle">' + LANG['HOME']['AUTHORS'][userLang] + '</p>';
        homeHtml += '<p class="descr">' + LANG['HOME']['DESCRIPTION'][userLang] + '</p>';
        homeHtml += '<p class="btn"><a href="video.html#intro"><span>';
        homeHtml += LANG['HOME']['START'][userLang] + "</span></a></p>";
        $('#lang_home').html(homeHtml);
      };

      // First population and class
      $('span.' + userLang).addClass('active');
      populateHome();

      jqCache.langs.click(function () {
        userLang = $(this).text();
        document.cookie = "lang="+userLang;
        jqCache.langs.removeClass('active');
        $(this).addClass('active');
        populateHome();
      });

      $('#lang_home .btn a').click(function () {
         console.log('GOGOGO');
       });

    };
  });
})();
