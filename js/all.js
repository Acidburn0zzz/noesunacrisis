// vim:set sw=2 ts=4 sts=4 ft=javascript expandtab smartindent:
(function () {
  $(document).ready(function () {
    // Global initialization
    var hash = 'HOME';
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
      var populate = function () {};

      // First population and class
      $('span.' + userLang).addClass('active');

      jqCache.langs.click(function () {
        userLang = $(this).text();
        document.cookie = "lang="+userLang;
        jqCache.langs.removeClass('active');
        $(this).addClass('active');
      });
    };
  });
})();

        $( document ).ready(function() {
                $('img[usemap]').rwdImageMaps();
                $('#interface').maphilight();
            // Internationalization
            $.get('json/interface.json', function (data) { intl(data); });

            var intl = function (data) {
              var userLang = document.cookie.replace(/(lang=|; |res=\w{2})/gi, '') || 'FR';
              // Population
              $('#portraits-link, #portraits-link-right').text(data.HOME.RETRATOS[userLang]);
              $('#pan-menu-portraits').text(data.HOME.RETRATOS[userLang]);
              $('#preface-link').text(data.HOME.PREFACE[userLang]);
              $('#pan-menu-preface').text(data.HOME.PREFACE[userLang]);
              $('#credits-link').text(data.HOME.CREDITS[userLang]);
              $('#pan-menu-credits').text(data.HOME.CREDITS[userLang]);
              $('#mirage-link').text(data.MIRAGE.NAME[userLang]);
              $('#pan-menu-mirage').text(data.MIRAGE.NAME[userLang]);
              $('#saccage-link').text(data.SACCAGE.NAME[userLang]);
              $('#pan-menu-saccage').text(data.SACCAGE.NAME[userLang]);
              $('#revolte-link').text(data.REVOLTE.NAME[userLang]);
              $('#pan-menu-revolte').text(data.REVOLTE.NAME[userLang]);
              $('#nofuture-link').text(data.NOFUTURE.NAME[userLang]);
              $('#pan-menu-no-future').text(data.NOFUTURE.NAME[userLang]);
              $('#share-link').text(data.HOME.SHARE[userLang]);
              $('#pan-menu-share').text(data.HOME.SHARE[userLang]);
			  $("button[data-dismiss='modal']").text(data.MODAL.CLOSE[userLang]);
			  $("#modal-preface .modal-title").text(data.HOME.PREFACE[userLang]);
			  $("#modal-credits .modal-title").text(data.HOME.CREDITS[userLang]);

			  $( "#preface-body" ).load( "misc/preface"+userLang+".html" );
			  $( "#credits-body" ).load( "misc/credits"+userLang+".html" );


            };
        });

		$( "#preface-body" ).load( "test.html" );

                var divs = ['bankia', 'pah', 'valdeluz', 'caja_madrid', 'torrespana', 'universidad', 'huelga', 'maranon', 'parlement', 'puerta_del_sol', 'pilar', 'elroto', 'maravillas', 'ecole', 'alfil', 'real'];
                divs.forEach(function(area) {
		    if ($('#'+area).length) { // si la div n'existe pas, on passe à la suivante...
                        $('#'+area).mouseover(function() {
				var alt = this.alt;
				res = alt.split("|");
	                        $('#highlight-wrapper').append('<div id="popover-block-'+ area +'" class="popover-block"><h2>'+res[0]+'</h2><p>'+res[1]+'</p></div>');
	                        $('#popover-block-'+area).fadeIn({duration: 1000});
	                    });
                        $('#'+area).mouseout(function() {
			    $('#popover-block-'+area).hide();
	                        //$('#popover-block').fadeOut({duration: 1000, complete: function(){$('#popover-block').remove();}});
	                });
		    }
                });

           $( window ).resize(function() {
                var interface = $('#interface');
                var divParent = $('#highlight-wrapper');
                interface.insertBefore(divParent);
                divParent.remove();
                interface.removeClass('maphilighted');
                interface.removeAttr('style');
                interface.maphilight();
            });
            function mouseover() {
                $('#highlight-wrapper').append('<div id="popover-block"><h2>Hello</h2><p>World !</p></div>');
                $('#popover-block').fadeIn({duration: 1000});
            }
            function mouseout() {
                $('#popover-block').fadeOut({duration: 1000, complete: function(){$('#popover-block').remove();}});
            }
