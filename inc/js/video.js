/*
 * NO es una Crisis
 * Script pour le chargement d'une video 
 */
var videoName = window.location.hash;
var lang = document.cookie.replace(/(lang=|; |res=\w{2})/gi, '') || "FR";
var res = document.cookie.replace(/(lang=\w{2}|; |res=)/gi, '') || "HD";
var lang_id = 3; 
switch (lang) {
	case 'EN': lang_id = 1;break;
	case 'ES': lang_id = 2;break;
}

jQuery(document).ready(function($) {

    
    /** Charger la traduction de l'interface via JSON **/
    jQuery.getJSON("json/interface.json", function(trad) {
		// Nav du bas
		jQuery('.video-nav li:eq(0) a').text(trad.HOME.PREFACE[lang]);
		jQuery('.video-nav li:eq(2) a').text(trad.HOME.CREDITS[lang]);
		// Retour à la ville
		jQuery('#back-city a,#back-city2 a h4 span').text(trad.HOME.CITY[lang]);
		// Modale fin de séquence
		jQuery('#next-video h4').text(trad.HOME.GO[lang]);
		jQuery('#additionnals h4').text(trad.HOME.ADDITIONNALS[lang]);
		jQuery('#dl-video h4 span').text(trad.HOME.DOWNLOAD[lang]);		
		
		jQuery( "#preface-body" ).load( "misc/preface"+lang+".html" );
		jQuery( "#credits-body" ).load( "misc/credits"+lang+".html" );
		
		
		/** Charger la video via JSON **/
		url = "json/" + videoName.replace('#','') + ".json";
		jQuery.getJSON(url, function(data) {
			var pathToVideos = "videos/" + data.VIDEO["PANNEAU"] + "/videos/";
			
			// Class CSS globale pour chaque panneau
			jQuery('body').addClass(data.VIDEO["PANNEAU"].replace(/Panneau/gi,'').replace(/[0-9]-/gi,'').toLowerCase());
			
			// <title>
			jQuery('head title').text(data.VIDEO.TITLE[lang]+' - '+data.VIDEO.SUBTITLE[lang] );
			
			// Liens Retour à la ville + Passer l'intro
			if(data.VIDEO["PANNEAU"]=="2-VideoIntro") {
				jQuery('#back-city a').text(trad.HOME.SKIP[lang]);
				jQuery('#back-city').css('bottom','80px');
				jQuery('#back-city a').attr('href',"instructions.html");
			} else if (data.VIDEO["PANNEAU"]=="8-Portraits") {
				jQuery('#back-city a').text(trad.HOME.RETRATOS[lang]);
				jQuery('#back-city a').attr('href',"portraits.html");
			} else {
				jQuery('#back-city a,#back-city2 a').attr('href',data.VIDEO["PANNEAU"].replace(/[0-9]-Panneau/gi,'').toLowerCase()+'.html');
			}	
			
			// Lien Télécharger
			jQuery('#dl-video a').attr('href',pathToVideos + data.VIDEO.FILE["HD-WEBM"]);
			
			// Lien Vidéo suivante
			jQuery('#next-video p').html(data.NEXT.TITLE[lang]+'<br /><span>'+data.NEXT.SUBTITLE[lang]+'</span>');
			jQuery('#next-video a').attr('href', 'video.html#'+data.NEXT["JSON"]).on({
				click: function() {
					window.location.hash = "#" + data.NEXT["JSON"];
					window.location.reload(true);
				}
			});
			
			// Lien relire la vidéo (sert juste à ne pas avoir un ancre vide)
			jQuery('#replay a').attr('href', 'video.html'+videoName);			
			
			// Sous-titres
			//EN
			$('#neuc-video track.en').attr('src', pathToVideos + 'srt/' + data.VIDEO.SRT["EN"]);
			//ES
			$('#neuc-video track.es').attr('src', pathToVideos + 'srt/' + data.VIDEO.SRT["ES"]);
			//FR
			$('#neuc-video track.fr').attr('src', pathToVideos + 'srt/' + data.VIDEO.SRT["FR"]);
			
			// Poster (surtout pour les videos en iframe)
			$('#neuc-video').attr('poster', pathToVideos + data.VIDEO.FILE["HD-MP4"].replace('HD_','').replace('.mp4','.jpg'));
			
			/** Charger video.js **/
			$.getScript( "inc/js/libs/video-js/video.js" )
				.done(function() {
					console.log( "videojs loaded" );
					// Config Fallback flash
					videojs.options.flash.swf = "inc/video-js.swf";
					
					//## Initialiser VideoJS ##
					var video = videojs('neuc-video');
					video.pause(); // On attend que tout soit prêt avant de lire la vidéo
				
					// Charger les vidéos
					if(res=='HD'){
						video.src([
							{ type: "video/mp4", src: pathToVideos + data.VIDEO.FILE["HD-MP4"] },
							{ type: "video/webm", src: pathToVideos + data.VIDEO.FILE["HD-WEBM"] },
						]);
						jQuery('.vjs-definition').text('HD');
					}else{
						video.src([
							{ type: "video/mp4", src: pathToVideos + data.VIDEO.FILE["SD-MP4"] },
							{ type: "video/webm", src: pathToVideos + data.VIDEO.FILE["SD-WEBM"] },
						]);
						jQuery('.vjs-definition').text('SD');
					}
					
					// Ajout du bouton HD/SD
					jQuery('.vjs-fullscreen-control').before(jQuery('.vjs-definition'));
					jQuery('.vjs-definition').on({
						click: function() {
							var time = video.currentTime();
							$('#neuc-video').removeAttr('src');
							if(jQuery('.vjs-definition').text()=='SD'){
								video.src([
									{ type: "video/mp4", src: pathToVideos + data.VIDEO.FILE["HD-MP4"] },
									{ type: "video/webm", src: pathToVideos + data.VIDEO.FILE["HD-WEBM"] },
								]);
								jQuery('.vjs-definition').text('HD');
								document.cookie = "res=HD";
							}else{
								video.src([
									{ type: "video/mp4", src: pathToVideos + data.VIDEO.FILE["SD-MP4"] },
									{ type: "video/webm", src: pathToVideos + data.VIDEO.FILE["SD-WEBM"] },
								]);
								jQuery('.vjs-definition').text('SD');
								document.cookie = "res=SD";
							}
							// La lecture redémarre là où on s'est arrêté
							video.on("timeupdate", setTime);
							function setTime (data) {
								video.off("timeupdate",setTime);
								video.currentTime(time);
							}
							video.play();
						}
					});
					
					
					/** Charger videojs.markers.js **/
					$.getScript( "inc/js/libs/videojs.markers.js").done(function() {
						markers = [];
						modales = [];
						// Création des fenêtres modales
						i=0;
						for(var pop in data.VIDEO.POPUPS) {
							markers.push(pop); // on ajoute les temps
							modales.push('<h3>'+trad.HOME.DISCOVER[lang]+'</h3><p><a data-toggle="modal" href="#mod'+ i +'">' + data.VIDEO.POPUPS[pop][lang]['TITLE'] + '</a></p>'); // et les textes
							div = '<div class="modal fade" id="mod' + i +'"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
							 div += '<h4 class="modal-title">'+ data.VIDEO.POPUPS[pop][lang]['LONGTITLE'] + '</h4>';
							  div +='</div><div class="modal-body">';
							   div+= data.VIDEO.POPUPS[pop][lang]['MODALE'];
								div+= '</div></div><!-- /.modal-content --> </div><!-- /.modal-dialog --></div><!-- /.modal -->';

							// Ajout en bas du DOM
							jQuery("#video-modals").append(div);
							// Ajout des liens en fin de séquence
							jQuery('#additionnals').append('<p><a data-toggle="modal" href="#mod'+ i +'">'+(i+1)+'. '+data.VIDEO.POPUPS[pop][lang]['TITLE'] + '</a></p>')
							i++;
						}
						if (jQuery('#additionnals a[data-toggle="modal"]').length==0) {
							jQuery('#additionnals').hide();
						}
						// Reprendre la lecture quand la modale ferme
						// ou afficher la modale fin de séquence si on est en début/fin de vidéo
						jQuery('#additionnals a[data-toggle="modal"]').on('click', function() {
								jQuery('#end-modal').modal('hide');
						});
						
						jQuery('#video-modals .modal').on('hidden.bs.modal', function (e) {
							if (video.currentTime()!=0 && video.currentTime()!=video.duration() ) {
								video.play();
							} else {
								jQuery('#end-modal').modal('show');
							}
						});
						
						var neucMarge = 35;
						// Dans une iframe, on nettoie
						if(top.location!=self.document.location) {
							jQuery('.video-nav, #back-city, #logo').hide();
							neucMarge = 0;
						// Pas dans une iframe...
						} else {
							// ...on affiche les markers...
							video.markers({
								setting:{
									markerTip:{
										display: true,
										default_text: ""
									}
								},
								marker_breaks: markers,
								marker_text: modales
							});
							
							// ...et on active les transitions
							if(data.VIDEO["PANNEAU"]=="2-VideoIntro") {	
								video.ready(function(){
									// instruction.html pour vidéo d'Intro
									video.on("ended", function(){
										window.location = "instructions.html";
									});
								});
							} else if (data.VIDEO["PANNEAU"]=="8-Portraits") {	
								video.ready(function(){
									// portraits.html pour les portraits
									video.on("ended", function(){
										window.location = "portraits.html";
									});
								});
							} else {
								video.ready(function(){
									// modale de fin de séquence
									video.on("ended", function(){
										jQuery('#end-modal').modal('show');
									});
									
								});
							}						
						}
						// Lecteur en plein ecran
						jQuery('#neuc-video, #neuc-video_html5_api').width(jQuery(window).width());
						jQuery('#neuc-video, #neuc-video_html5_api').height(jQuery(window).height() - neucMarge);
						jQuery(window).resize(function() {
							jQuery('#neuc-video, #neuc-video_html5_api').width(jQuery(window).width());
							jQuery('#neuc-video, #neuc-video_html5_api').height(jQuery(window).height() - neucMarge);
							
						});	
						video.load();
						// Sous-titres dans la langue par défaut
						jQuery("li.vjs-menu-item").eq(lang_id).trigger('click');
						jQuery('body').show(); // body s'affiche que lorsque le lecteur est fonctionnel et en plein écran (plus propre)
						if(top.location==self.document.location) {
							video.play();
						}
					});					
				})
				.fail(function() {
					console.log("videojs not loaded" );
				});
		}).fail(function() {
			console.log("erreur Ajax");
		});
	});
});
