function checkForm(){     

    var request = new XMLHttpRequest();
   
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(username==""|| password==""){
      alert("Please fill al the information!");
      return;
    }
   
    /*request.open('GET', 'https://pacific-stream-14038.herokuapp.com/user/'+ username+"/"+password , true)
    request.onload = function() {
    
    if (request.status >= 200 && request.status < 400) {
        var risposta = JSON.parse(this.response);
          
          //memorizzazione
          localStorage.setItem("username", risposta.nickname);
         //Reindirizzamento
          window.location.href = "Feed.html";
  
         } 
    else {
        
        alert("Wrong combination of username and password!");
        } 
  }
  
  request.send(); */
   }
  
   function googleSignUp(){
    //window.location.href='https://pacific-stream-14038.herokuapp.com/auth/begin';
    alert("Questa funzione fa il login con google")
  
  } 
  
  function githubSignUp(){
    window.location.href='https://git.heroku.com/calm-shore-44304.git//auth/google_oauth2';
  }