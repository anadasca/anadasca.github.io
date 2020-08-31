var username = localStorage.getItem("username");
var level = localStorage.getItem("level");
var points = localStorage.getItem("points");
var img = localStorage.getItem("avatar");
var id = localStorage.getItem("id");
var t_visited = false;
var w_visited = false;
var q_visited = false;
var u_visited = false;
var to_visited = false;


$(document).ready(function () {
     t_visited = false;
      w_visited = false;
      q_visited = false;
      u_visited = true;
      to_visited = false;

      document.getElementById("user_button").style.color = "black"
      document.getElementById("question").style.color = " white"
      document.getElementById("theory").style.color = " white"
      document.getElementById("what_if").style.color = "white"
      document.getElementById("topic").style.color = "white"
  path = "https://calm-shore-44304.herokuapp.com/leaderboard/users";
  populatePost("user_ranks", "user", path);
});

function logout() {
  var result = confirm("Are you sure you want to logout?");
  if (result) {
    localStorage.clear;
    alert("You are logging out! Bye!");
    window.location.href = "../Home/Home.html";
  }
}

function theories_rank(){
    path = "https://calm-shore-44304.herokuapp.com/leaderboard/major_elements/theory";
    document.getElementById("theory").style.color = "black"
    document.getElementById("question").style.color = " white"
    document.getElementById("user_button").style.color = " white"
    document.getElementById("what_if").style.color = "white"
    document.getElementById("topic").style.color = "white"
   


    $("#theory_ranks").show();
    $("#questions_ranks").hide();
    $("#what_ifs_ranks").hide();
    $("#user_ranks").hide();
    $("#topic_ranks").hide();

    if(t_visited == false) populatePostMj("theory_ranks", "theory", path);
    
   

   

}
function questions_rank(){
    document.getElementById("question").style.color = "black"
    document.getElementById("theory").style.color = " white"
    document.getElementById("user_button").style.color = " white"
    document.getElementById("what_if").style.color = "white"
    document.getElementById("topic").style.color = "white"
    path = "https://calm-shore-44304.herokuapp.com/leaderboard/major_elements/question";
    $("#questions_ranks").show();
    $("#user_ranks").hide();
    $("#what_ifs_ranks").hide();
    $("#theory_ranks").hide();
    $("#topic_ranks").hide();


    if(q_visited == false)populatePostMj("questions_ranks", "question", path);

}

function what_ifs_rank(){
    document.getElementById("what_if").style.color = "white"
    document.getElementById("question").style.color = " white"
    document.getElementById("user_button").style.color = " white"
    document.getElementById("theory").style.color = "white"
    document.getElementById("topic").style.color = "white"
    path = "https://calm-shore-44304.herokuapp.com/leaderboard/major_elements/what_if";
    $("#what_ifs_ranks").show();
    $("#questions_ranks").hide();
    $("#theory_ranks").hide();
    $("#user_ranks").hide();
    $("#topic_ranks").hide();

    if(w_visited == false)populatePostMj("what_ifs_ranks", "what_if", path);

}
function users_rank(){
    document.getElementById("user_button").style.color = "black"
    document.getElementById("question").style.color = " white"
    document.getElementById("theory").style.color = " white"
    document.getElementById("what_if").style.color = "white"
    document.getElementById("topic").style.color = "white"
    path = "https://calm-shore-44304.herokuapp.com/leaderboard/users";
    $("#user_ranks").show();
    $("#questions_ranks").hide();
    $("#what_ifs_ranks").hide();
    $("#theory_ranks").hide();
    $("#topic_ranks").hide();

    if(u_visited==false)populatePost("user_ranks", "user", path);

}

function topics_rank(){
    document.getElementById("topic").style.color = "black"
    document.getElementById("question").style.color = " white"
    document.getElementById("user_button").style.color = " white"
    document.getElementById("what_if").style.color = "white"
    document.getElementById("theory").style.color = "white"
    path = "https://calm-shore-44304.herokuapp.com/leaderboard/topics";
    $("#topic_ranks").show();
    $("#questions_ranks").hide();
    $("#what_ifs_ranks").hide();
    $("#theory_ranks").hide();
    $("#user_ranks").hide();


    if(to_visited == false)populatePostMj("topic_ranks", "topic", path);

}

function populatePost(section, mj_name, path) {
    
 u_visited = true;

   
  
  var request = new XMLHttpRequest();

  request.open("GET", path, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var risposta = JSON.parse(this.response);

      risposta = risposta.leaderboard;

      var risposta_len = risposta.length;
      var post_section = document.getElementById(section);
      var index = 0;

      for (index = 0; index < risposta_len; index++) {
        
        var div_row = document.createElement("div");
        div_row.className = "row";

        var div_col = document.createElement("div");
        div_col.className = "col-sm-11";

        var div_well = document.createElement("div");
        div_well.className = "well";
       
        var list = document.createElement("div");
        list.className = "my_list";


        var container1 = document.createElement("container");
        container1.className = "elem1";
        var position = document.createElement("p");
        position.className = "position";
        position.innerHTML = index+1;
        container1.appendChild(position);
        list.appendChild(container1);
        //alert("Container 1 created")
     

        var container2 = document.createElement("container");
        container2.className = "elem2";
        var avatar = document.createElement("img");
        avatar.className = "avatar";
        avatar.id = "avatar";
        avatar.src = risposta[index].avatar;
        container2.appendChild(avatar);
        list.appendChild(container2);
         //alert("Container 2 created")
       
      
        var container3 = document.createElement("container");
        container3.className = "elem3";
        var user = document.createElement("p");
        user.className = "username";
        user.innerHTML = risposta[index].username;
        container3.appendChild(user);
        list.appendChild(container3);
        //alert("Container 3 created")
        

       
        var container4 = document.createElement("container");
        container4.className = "elem4";
        var points = document.createElement("p");
        points.className = "points";
        points.innerHTML = risposta[index].points;
        container4.appendChild(points);
        list.appendChild(container4);
        //alert("Container 4 created")

        div_well.appendChild(list);
      
        div_col.appendChild(div_well);

        div_row.appendChild(div_col);

        post_section.appendChild(div_row);
      }
      localStorage.setItem("question", JSON.stringify(posts));
    } else {
      alert("Something went wrong. Message: " + this.responseText);
    }
  };
  request.send();
}




function populatePostMj(section, mj_name, path) {
    if(mj_name == "theory") t_visited = true;
   else if(mj_name == "what_if") w_visited = true;
   else if(mj_name == "question") q_visited = true;
   else if(mj_name=="topic")to_visited = true;
  
    var request = new XMLHttpRequest();
  
    request.open("GET", path, true);
  
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var risposta = JSON.parse(this.response);
  
        risposta = risposta.leaderboard;
  
        var risposta_len = risposta.length;
        var post_section = document.getElementById(section);
        var index = 0;
  
        for (index = 0; index < risposta_len; index++) {
         
          var div_row = document.createElement("div");
          div_row.className = "row";
  
          var div_col = document.createElement("div");
          div_col.className = "col-sm-11";
  
          var div_well = document.createElement("div");
          div_well.className = "well";
         
          var list = document.createElement("div");
          list.className = "my_list";
            if(mj_name=="topic"){
                var container1 = document.createElement("container");
                container1.className = "elem1";
                var position = document.createElement("p");
                position.className = "position";
                position.innerHTML = index+1;
                container1.appendChild(position);
                list.appendChild(container1);
                //alert("Container 1 created")
             
        
                var container2 = document.createElement("container");
                container2.className = "elem2";
                var name = document.createElement("p");
                name.className = "name";
                name.id = "name";
                name.innerHTML = risposta[index].table.name;
                container2.appendChild(name);
                list.appendChild(container2);
                 //alert("Container 2 created")
                 
          var container3 = document.createElement("container");
          container3.className = "elem3";
          var points = document.createElement("p");
          points.className = "points";
          points.innerHTML = risposta[index].table.points;
          container3.appendChild(points);
          list.appendChild(container3);
          //alert("Container 4 created")


            }
            else{
                var container1 = document.createElement("container");
                container1.className = "elem1";
                var position = document.createElement("p");
                position.className = "position";
                position.innerHTML = index+1;
                container1.appendChild(position);
                list.appendChild(container1);
                //alert("Container 1 created")
             
        
                var container2 = document.createElement("container");
                container2.className = "elem2";
                var name = document.createElement("p");
                name.className = "name";
                name.id = "name";
                name.innerHTML = risposta[index].table.name;
                container2.appendChild(name);
                list.appendChild(container2);
                 //alert("Container 2 created")
               
              
                var container3 = document.createElement("container");
                container3.className = "elem3";
                var user = document.createElement("p");
                user.className = "username";
                user.innerHTML = risposta[index].table.username;
                container3.appendChild(user);
                list.appendChild(container3);
                //alert("Container 3 created")
                
        
               
                var container4 = document.createElement("container");
                container4.className = "elem4";
                var points = document.createElement("p");
                points.className = "points";
                points.innerHTML = risposta[index].table.points;
                container4.appendChild(points);
                list.appendChild(container4);
                //alert("Container 4 created")
            }
         
  
          div_well.appendChild(list);
        
          div_col.appendChild(div_well);
  
          div_row.appendChild(div_col);
  
          post_section.appendChild(div_row);
        }
        localStorage.setItem("question", JSON.stringify(posts));
      } else {
        alert("Something went wrong. Message: " + this.responseText);
      }
    };
    request.send();
  }
