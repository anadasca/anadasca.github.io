var element = localStorage.getItem("came_from");
var user = localStorage.getItem("id");
var level = localStorage.getItem("level");
var created_new = false;

$(document).ready(function () {
  if (level < 1) $("#create_topic").hide();
  var request = new XMLHttpRequest();
    request.open('GET', `https://calm-shore-44304.herokuapp.com/leaderboard/topics`, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
            //alert("Response: " + this.response);
            myObj = JSON.parse(this.response);
            //alert("Leaderboard: "+ myObj.leaderboard);
            document.getElementById("topics").innerHTML="";
            $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
            var s;
            for(var i=0; i< myObj.leaderboard.length; i++){
                s = myObj.leaderboard[i].table.name;
                if(s!= ""){
                    document.getElementById("topics").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
        }
        else{
           alert("Something went wrong. Try again");
        }
    }
    request.send();
});

function create() {
 
  var topic_new = document.getElementById("new_topic").value;
  var topic = "";
  if (created_new) topic = topic_new;
  else topic = document.getElementById("topics").value;
  var desc = document.getElementById("description").value;
  var title = document.getElementById("post_title").value;
  if (desc == "" || title == "" || topic == "") {
    alert("Please enter a description or a title!");
    return;
  }
  if (topic == "") {
    alert("Please enter a topic!");
    return;
  }

  var obj = {
    topic_id: topic,
    user_id: user,
    name: title,
    text: desc,
    type_of_element: element,
  };
 
  var data = JSON.stringify(obj);
 

  var path = "https://calm-shore-44304.herokuapp.com/major_element";
  var request = new XMLHttpRequest();
  request.open("POST", path, false);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      //var risposta = JSON.parse(this.response);
      alert("Post created!");
      if (element == "theory") window.location.href = "../Theory/Theories.html";
      else if (element == "question")
        window.location.href = "../Question/Questions.html";
      else window.location.href = "../What_If/What_ifs.html";
    } else {
      alert(
        "Something went wrong! Please try again. Error: " + this.responseText
      );
    }
  };
  request.setRequestHeader("Content-type", "text/plain");
  request.send(data);
}

function create_topic(){
    var path = "https://calm-shore-44304.herokuapp.com/topic/new";
    var request = new XMLHttpRequest();
    var topic =  document.getElementById("new_topic").value;
    if(topic == "") {
        alert("Please insert a new topic before clicking the button!")
    }
    var obj = {
        name: topic,
        user_id: user,
       
      };
     
      var data = JSON.stringify(obj);
     
  request.open("POST", path, false);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      //var risposta = JSON.parse(this.response);
      alert("Topic created!");
      created_new = true;
      
    } else {
      alert(
        "Something went wrong! Please try again. Error: " + this.responseText
      );
    }
  };
  request.setRequestHeader("Content-type", "text/plain");
  request.send(data);



}