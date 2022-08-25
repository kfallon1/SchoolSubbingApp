function showPic(whichpic){
	var placeholder=document.getElementById("placeholder");
	placeholder.src=whichpic.href;
    var description=document.getElementById("description");
	description.firstChild.nodeValue= whichpic.title;

}

function prepareGallery(){
	var gallery=document.getElementById("imagegallery");
        var links =gallery.getElementsByTagName("a");
            for (var i=0; i<links.length; i++){
		links[i].onclick=function(){
                 showPic(this);
                return false;
                ;}
	}         

} 

window.onload=alerting;