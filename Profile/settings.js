var username = localStorage.getItem("username");
var level = localStorage.getItem("level");

var points = localStorage.getItem("points");
var img = localStorage.getItem("avatar");
var id = localStorage.getItem("id");

function logout() {
  var result = confirm("Are you sure you want to logout?");
  if (result) {
    localStorage.clear;
    alert("You are logging out! Bye!");
    window.location.href = "../Home/Home.html";
  }
}

$(document).ready(function () {
  $("#change_pswd").hide();
  //$("#change_avatar").hide();
  $("#center").hide();
  $("#my_img").attr("src", img);
  //sezione controllo form password
  $("#my_a_pswd").click(function () {
    $("#change_avatar").hide();
    $("#center").show();
    document.getElementById("my_a_pswd").style.color = "#ffb780";
    document.getElementById("my_a_avatar").style.color = "rgb(153, 153, 153)";
    document.getElementById("new_pass").value = "";
    document.getElementById("old_pass").value = "";
    document.getElementById("new_pass_bis").value = "";
    document.getElementById("new_mess").innerHTML = "";
    document.getElementById("new_bis_mess").innerHTML = "";
    var test_pass_bis = false;
    var test_pass = false;
    //Funzione che controlla che le due password sono uguali, se lo sono abilita il bottone di submit, altrimenti lo disabilita.
    function checkValidity() {
      if (test_pass_bis && test_pass) $("#submit").attr("disabled", false);
      else $("#submit").attr("disabled", true);
    }

    $("#change_pswd").show();
    $("#submit").prop("disabled", true);
    $("#new_pass").keyup(function () {
      var regex = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@$!%*&]).{8,}$"
      );

      var password = document.getElementById("new_pass").value;

      if (regex.test(password)) {
        document.getElementById("new_mess").style.color = "white";
        document.getElementById("new_mess").innerHTML = "Looks good!";
        test_pass = true;
      } else {
        test_pass = false;
        document.getElementById("new_mess").style.color = "black";
        document.getElementById("new_mess").innerHTML =
          "Please insert a password and respect the format";
      }

      checkValidity();
    });

    //controllo nuove password uguali
    $("#new_pass_bis").keyup(function () {
      var new_password = document.getElementById("new_pass").value;
      var new_password_bis = document.getElementById("new_pass_bis").value;

      if (new_password == new_password_bis) {
        document.getElementById("new_bis_mess").style.color = "white";
        document.getElementById("new_bis_mess").innerHTML = "Matching";
        test_pass_bis = true;
      } else {
        test_pass_bis = false;
        document.getElementById("new_bis_mess").style.color = "black";
        document.getElementById("new_bis_mess").innerHTML = "Not matching";
      }

      checkValidity();
    });
    //fine controllo

    //sezione submit
    $("#submit").click(function () {
      //Funzione per controllare validità password
      var old_password = document.getElementById("old_pass").value;
      var new_password = document.getElementById("new_pass").value;
      var new_password_bis = document.getElementById("new_pass_bis").value;
      //Funzione per controllare validità password
      if (new_password == old_password) {
        alert("Your new password shouldn't match your old password! Retry");
        return;
      }

      if (old_password == "" || new_password == "" || new_password_bis == "") {
        alert("Please fill al the information!");
        return;
      }
      var request = new XMLHttpRequest();
     
      var path = "https://calm-shore-44304.herokuapp.com/signin";
     
      var obj = { username: username, password: old_password };
     
      var data = JSON.stringify(obj);
      
      request.open("POST", path, true);
     
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
         
          var request2 = new XMLHttpRequest();
          var obj = {
            username: username,

            new_password: new_password,
            old_password: old_password,
          };
          var data = JSON.stringify(obj);

          request2.open(
            "POST",
            "https://calm-shore-44304.herokuapp.com/user/new_password",
            true
          );
          request2.onload = function () {
            if (request2.status >= 200 && request2.status < 400) {
              alert("Password updated successfully!");
              window.location.href = "Settings.html";
            } else {
              alert(
                "Something went wrong!Message: " +
                  this.responseText +
                  "\nPlease retry."
              );
            }
          };
          request2.setRequestHeader("Content-type", "application/json");
          request2.send(data);
        } else {
          alert("Your password was not correct. Please try again!");
        }
      };
      request.setRequestHeader("Content-type", "text/plain");
      request.send(data);
    });
    //fine sezione submit
  });
  //fine sezione controllo form password

  //inizio delete profile
  $("#my_a_avatar").click(function () {
    document.getElementById("my_a_avatar").style.color = "#ffb780";
    document.getElementById("my_a_pswd").style.color = "rgb(153, 153, 153)";

    //document.getElementById("pass").value = "";

    $("#change_pswd").hide();

    $("#center").show();

    $("#change_avatar").show();
    if (level < 1) $("#level1").hide();
    else $("#level1").show();
    if (level < 2) $("#level2").hide();
    else $("#level2").show();
    if (level < 3) $("#level3").hide();
    else $("#level3").show();
    if (level < 4) $("#level4").hide();
    else $("#level4").show();

    $("#change").click(function () {
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
      var obj = { username: localStorage.username, avatar: img_src };
      var data = JSON.stringify(obj);

      request.open(
        "POST",
        "https://calm-shore-44304.herokuapp.com/user/set_avatar",
        true
      );
      request.onload = function () {
        // Begin accessing JSON data here
        if (request.status >= 200 && request.status < 400) {
          alert("You have successfully updated your avatar!");
          //memorizzazione
          localStorage.setItem("avatar", img_src);
          //Reindirizzamento
          window.location.href = "Settings.html";
        } else {
          alert("Something went wrong! Please try again :)");
        }
      };
      request.setRequestHeader("Content-type", "text/plain");
      request.send(data);
    });
  });
  //fine delete profile
});
