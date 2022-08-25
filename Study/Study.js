var content;

window.onload = function () {
   var ul = document.getElementsByTagName("ul");
   alert(ul.length);
 
    
    
  
}

//function for outputting a list make sure is withing ONLOAD    
var content = document.getElementsByTagName("li");
  var output = "";
  for (var i = 0; i < content.length; i++) {
    output += content[i].firstChild.nodeValue + "\n";
  }
  //alert(output);


//Unordered List, length will be 1, make sure not to mix up with list items which are 3
  var ul = document.getElementsByTagName("ul");
 //alert (ul.length);

