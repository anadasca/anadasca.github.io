$(document).ready(function () {
  $("#hide1").hide();
  $("#hide2").hide();
});
function checkForm() {
    var request = new XMLHttpRequest();
    var password = document.getElementById("password").value;
  
    if (username == "" || password == "" ) {
      alert("Please fill all the information!");
      return;
    }
    
    var obj = {
      password: password
     
    };
    var data = JSON.stringify(obj);
  
   
    request.open("POST", "https://calm-shore-44304.herokuapp.com/admin", false);
    request.onload = function () {
      
      if (request.status >= 200 && request.status < 400) {
        //var risposta = JSON.parse(this.response);
        
        window.location.href = "Admin_Page.html";
      } else {
        alert(
          "Error! Please try again"
        );
      }
    };
    request.setRequestHeader("Content-type", "text/plain");
    request.send(data);
  }
  
