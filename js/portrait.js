	
// vim:set sw=4 ts=4 sts=4 ft=javascript expandtab smartindent:
var interf;
var lang="FR";
var urlName = "videos/8-Portraits/Carlos/HD_carlos.webm";
$().ready(function() {

var interf;
$.get("json/interface.json", function(data) {
    	interf=data;
    	$(".play").each(function(){
    	var ed=$(this).attr("id");
    	//console.log(ed);
    	//console.log(interf.PORTRAITS[ed][lang]);
    	    $(this).html(interf.PORTRAITS[ed]["TITLE"][lang]+ "<br><a href=\""+urlName+"\"><span>"+ interf.PORTRAITS[ed]["DESCRIPTION"][lang]+"<span><br></a><video  id=\""+ed+"-vid\" class=\"video-js vjs-default-skin\" data-setup=\"{../videos/8-portraits/Carlos/carlos.json}\">");
 
    	});
    		});

})
