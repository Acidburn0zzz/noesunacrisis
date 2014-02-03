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
      var populate = function () {
        var html = '<p class="descr">' + LANG['INSTRUCTIONS']['DESCRIPTION'][userLang] + '</p>';
        html += '<p class="btn"><a href="mirage.html"><span>';
        html += LANG['INSTRUCTIONS']['ACCESS'][userLang] + "</span></a></p>";
        $('#lang_instructions').html(html);
      };

      // First population and class
      $('span.' + userLang).addClass('active');
      populate();

      jqCache.langs.click(function () {
        userLang = $(this).text();
        document.cookie = "lang="+userLang;
        jqCache.langs.removeClass('active');
        $(this).addClass('active');
        populate();
      });

      $('#lang_home .btn a').click(function () {
         console.log('GOGOGO');
       });

    };
  });
})();
