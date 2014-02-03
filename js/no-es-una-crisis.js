	
// vim:set sw=4 ts=4 sts=4 ft=javascript expandtab smartindent:
   var interf;
var lang="FR";
var urlName = "videos/8-Portraits/Carlos/HD_carlos.webm";
$().ready(function() {
   calcHeight('.portrait');
   calcHeight('#pan-content');
   calcHeight('#pan-content.accueil #pan-title');
   calcHeight('.kwicks-expanded > img');
   calcHeight('.kwicks-collapsed > img');
   calcHeight('.noo-accordion');
   calcHeight('.noo-accordion li');

   getInfos();
});


window.onresize = function() {
    calcHeight('.portrait');
    calcHeight('#highlight-wrapper');
    calcHeight('#pan-content');
    calcHeight('#pan-content.accueil #pan-title');
    calcHeight('.kwicks-expanded');
    calcHeight('.kwicks-collapsed');
    calcHeight('.noo-accordion');
    calcHeight('.noo-accordion li');
};

function calcHeight(selector) {
    var wheight = $(window).height() - 50;
    $(selector).height(wheight);
}
function getInfos(){
    //console.log("rien");
    $.get("json/interface.json", function(data) {
    console.log(data);
        interf=data;
        console.log(interf);        
    //$(".title_style1").each(function(){       
      //  var ed=$(this).attr("id");
     //   console.log(ed);
      //  console.log(interf.PORTRAITS[ed]);
 //       $(this).html(interf.PORTRAITS[ed]["TITLE"][lang]);
       // });
   //s $(this).next().html(interf.PORTRAITS[ed]["DESCRIPTION"][lang]);
         });
}
function portraitsCalcWidth() {
    var wwidth = $(window).width();
    $('.noo-accordion ul li:hover').width();
    $('.noo-accordion ul:hover li').width();
}

function requestFullScreen() {
    var element = document.body;
    if(document.fullscreenElement) {
        document.cancelFullScreen();
        document.webkitCancelFullScreen();
        document.mozCancelFullScreen();
        document.exitFullscreen();
    } else {
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

        if (requestMethod) { // Native full screen.
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }
}

