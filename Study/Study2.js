//This fines the text within a specific point



window.onload= function () {
    
    //output/find a value: $ to where you want and .firstChild.nodeValue.....
   // alert ($("email_address_error").firstChild.nodeValue)
   //var text = document.getElementById("labels");
   //alert(text.firstChild.nodeValue);

    //change the text of a value same as above and add = "whatever you want"...
    $("email_address_error").firstChild.nodeValue = "This entry is required"

    //changed the <h1> to <h1 id = "h1"> and then accessed there
    document.getElementById("h1").style.border = "black" 

    $("labels").style.color = "red";
    //document.getElementById("labels").style.color="red";

  
    document.getElementById("join_list").style.color="red";
   

    
    
 
 
 }




var $ = function (id) {
return document.getElementById("email_address_error");
}

//$("email_address_error_span".firstChild.nodeValue = "this entry is required")

