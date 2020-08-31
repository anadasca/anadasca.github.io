var level = "";
function sendData() {
    var params = new URL(document.location).searchParams;
    var code = params.get("id");
    var request = new XMLHttpRequest();
    var obj = {id: code};
    var data = JSON.stringify(obj); 
    var path =
      "https://calm-shore-44304.herokuapp.com/post_oauth" ;
    request.open("POST", path, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
          
        var risposta = JSON.parse(this.response);
        localStorage.setItem("username", risposta.username);
        localStorage.setItem("points", risposta.points);
        localStorage.setItem("level", risposta.level);
        level = localStorage.getItem("level");
        //alert("Level: "+ level);
        localStorage.setItem("id", risposta.id);
        alert(" Please take notes of these credentials as you might need to use them:\nYour nickname: " +
        risposta.username + 
        "\nYour password: " +
        risposta.password );
        document.getElementById("username").innerHTML = "Hi " + risposta.username;
        if (level < 1) $("#level1").hide();
        else $("#level1").show();
        if (level < 2) $("#level2").hide();
        else $("#level2").show();
        if (level < 3) $("#level3").hide();
        else $("#level3").show();
        if (level < 4) $("#level4").hide();
        else $("#level4").show();
      } else {
        alert("Something went wrong! Try again!\nMessage: " + this.responseText);
        window.location.href = "../Home/Home.html"
        
      }
    };
    request.setRequestHeader("Content-type", "text/plain");
    request.send(data);
  }
  //fine

  
  $(document).ready(function () {
    level = localStorage.getItem("level");
    //alert("Level: " + level);
    var url = window.location.href;
    var find = /\?/;
    if (level < 1) $("#level1").hide();
    else $("#level1").show();
    if (level < 2) $("#level2").hide();
    else $("#level2").show();
    if (level < 3) $("#level3").hide();
    else $("#level3").show();
    if (level < 4) $("#level4").hide();
    else $("#level4").show();
    if (find.test(String(url).toLowerCase()) == true) {
        //alert("Came from google or github!")
      sendData();
    }
    else{
      document.getElementById("username").innerHTML = "Hi " + localStorage.getItem("username");}
    

  });
  
  function start(){
  var image = $("input[type='radio'][name='avatar']:checked").val();
  var img_src = "";
    
    if(image == "Uncle Vernon") img_src = "../Images/Avatars_images/vern1.jpg";
  else if(image == "Aunt Petunia") img_src = "../Images/Avatars_images/pet1.jpg" ;
  else if(image == "Jacob Kowalski") img_src = "../Images/Avatars_images/kowalski2.JPG";
  else if(image=="Aunt Marge") img_src ="../Images/Avatars_images/marge1.jpg";
  else if(image == "Obi-Wan Kenobi") img_src = "../Images/Avatars_images/obi2.JPG" ;
  else if(image == "Ashoka") img_src = "../Images/Avatars_images/ashoka2.JPG";
  else if(image=="Luke Skywalker") img_src ="../Images/Avatars_images/luke1.JPG";
  else if(image == "Leia Organa") img_src = "../Images/Avatars_images/leia2.JPG" ;
  else if(image == "Black Widow") img_src = "../Images/Avatars_images/black_widow2.JPG";
  else if(image=="Ironman") img_src ="../Images/Avatars_images/ironman1.JPG";
  else if(image == "Captain Marvel") img_src = "../Images/Avatars_images/captainm2.JPG" ;
  else if(image == "Black Panther") img_src = "../Images/Avatars_images/bp2.JPG";
  else if(image=="Neo") img_src ="../Images/Avatars_images/neo1.JPG";
  else if(image == "Daenerys") img_src = "../Images/Avatars_images/daenerys.JPG" ;
  else if(image == "Harry Potter") img_src = "../Images/Avatars_images/harry1.JPG";
  else if(image=="Rey") img_src ="../Images/Avatars_images/rey2.JPG";
  else if(image == "Darth Vader") img_src = "../Images/Avatars_images/vader2.JPG" ;
  else if(image == "Elsa") img_src = "../Images/Avatars_images/elsa.JPG";
  else if(image=="Kratos") img_src ="../Images/Avatars_images/kratos2.JPG";
  else img_src ="../Images/Avatars_images/maleficent.png";
  var request = new XMLHttpRequest();
  //alert("You selected: " + img_src);
  var obj = {username :  localStorage.username , avatar: img_src};
  var data = JSON.stringify(obj); 

  
  
  request.open('POST', 'https://calm-shore-44304.herokuapp.com/user/set_avatar' , true)
  request.onload = function() {
  // Begin accessing JSON data here
  if (request.status >= 200 && request.status < 400) {
      
      alert("You have successfully completed the sign up!");
      //memorizzazione
      localStorage.setItem("avatar", img_src);
       //Reindirizzamento
        window.location.href = "../Profile/Profile.html";
       
       } 
  else {
      
      alert("Something went wrong! Please try again :)");
      } 
}
request.setRequestHeader("Content-type", "text/plain");
request.send(data); 

  }