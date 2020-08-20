var username = localStorage.getItem("username");
var level = localStorage.getItem("level");
var points = localStorage.getItem("points");
var img = localStorage.getItem("avatar");
var id = localStorage.getItem("id");

$(document).ready(function () {
 path = "https://calm-shore-44304.herokuapp.com/major_element/theory";
    
    populatePost("posts", "theory", "all_theories", path);
  });
  
function logout() {
  var result = confirm("Are you sure you want to logout?");
  if (result) {
    localStorage.clear;
    alert("You are logging out! Bye!");
    window.location.href = "../Home/Home.html";
  }
}

function upvote_function() {
    var mj_id = this.name;
  
    var path = "https://calm-shore-44304.herokuapp.com/upvote/major_element" ;
    var obj = {user_id : id, major_element_id: mj_id};
    var data = JSON.stringify(obj);
    var request = new XMLHttpRequest();
  
    request.open("POST", path, true);
  
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
          alert("Tutto ok!")
        document.getElementById(mj_id + "upvote").innerHTML = "Upvoted";
       
        document.getElementById(mj_id + "upvote").style.color = "#ffb780;";
        document.getElementById(mj_id + "upvote").style.cursor = "text";
        document.getElementById(mj_id + "upvote").style.textDecoration = "none";
  
        document.getElementById(mj_id + "upvote").onclick = function () {
          return false;
        };
      } else {
        alert("Something went wrong, please try again!");
      }
    };
    request.setRequestHeader("Content-type", "text/plain");
    request.send(data);
  }
  
function SearchByTag() {
    document.getElementById("search_tag_name_msg").innerHTML = "";
 
    var tag = document.getElementById("tag").value;
    if (tag == "All theories") {
      var path =
        "https://calm-shore-44304.herokuapp.com/major_element/theory";
      populatePost("posts", "theory", "all_theories", path) 
      
    } else {
     
      var path =
        `https://calm-shore-44304.herokuapp.com/major_element/theory/` +
        tag;
       
       populatePost("tags", "theory", "topics", path) 
    }
  } 
  

function findUpvotedTheories() {
  
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
  
      var path =
        "https://calm-shore-44304.herokuapp.com/major_element/upvoted/" +
        id +
        "/theory";
      request.open("GET", path, true);
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          var risposta = JSON.parse(this.response);
  
          localStorage.setItem("upvoted_theories", JSON.stringify(risposta));
         
          
          resolve();
        } else {
          alert("Something went wrong. Message: " + this.responseText);
          reject();
        }
      };
      request.send();
    });
  }

async function populatePost(section, mj_name, mode, path) {
  await Promise.all([
    findUpvotedTheories().catch(() => {
      alert("Could not load upvoted theories!");
      return;
    }),
  ]);

  var upvoted_theories = JSON.parse(localStorage.getItem("upvoted_theories"));

  var posts = [];
  var request = new XMLHttpRequest();
 
  
  request.open("GET", path, true);
  
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      
      var risposta = JSON.parse(this.response);
      var errore = risposta.error;
      risposta = risposta.result;
      //var risposta_str = JSON.stringify(this.response);
      //alert("Risposta: " + risposta_str);

    
      if (errore == "No matches found") {
        if (mj_name == "theory"){
          if(mode=="all theories"){
            document.getElementById("message").innerHTML =
            "Created theories will appear here! Start creating now!";
            $("#search_btn").prop("disabled", true);
            $("#pop_btn").prop("disabled", true);
            $("#btn3").prop("disabled", true);
        $("#message").show();
          }
          else if(mode=="topics"){
            $("#posts").empty();
            $("#tag").empty();

            
            $("#tags").hide();
            $("#posts").hide();
            document.getElementById("search_tag_name_msg").innerHTML = "Topic not found!";


          }
        }
      } else {
        var risposta_len = risposta.length;
        $("#message").hide();

      
        if (mode == "all_theories") {
          
            
            $("#posts").empty();
            $("#pop_btn").show();
            $("#tags").hide();
            $("#popularity_feed").hide();
            $("#posts").show();
  
          }
          else if (mode == "topics") {
            
            
            $("#tags").empty();
            $("#posts").hide();
            $("#popularity_feed").hide();
            $("#pop_btn").hide();
            $("#tags").show();
            alert("Topics!")
            
          }

          else{
            $("#popularity_feed").empty();
            $("#posts").hide();
            $("#tags").hide();
         
            $("#popularity_feed").show();
            
            

          }
        var post_section = document.getElementById(section);
        var index = 0;

        for (index = 0; index < risposta_len; index++) {
          var checked_upvoted = false;
          var upvoted_len = 0;
          var element = "";

          //alert("Theory!")
          upvoted_len = upvoted_theories.result.length;
          //alert("Length: " + upvoted_len);
          element = upvoted_theories.result;
          //alert("Element: " + element);

          for (var j = 0; j < upvoted_len; j++) {
            if (
              element[j].table.major_element.id ==
              risposta[index].table.major_element.id
            ) {
              checked_upvoted = true;

              break;
            }
          }

          posts[index] = risposta[index];
          var div_row = document.createElement("div");
          div_row.className = "row";

          var div_col = document.createElement("div");
          div_col.className = "col-sm-11";

          var div_well = document.createElement("div");
          div_well.className = "well";

          var my_desc_title = document.createElement("p");
          my_desc_title.className = "my_title";
          my_desc_title.innerHTML = "Title: ";
          var my_desc = document.createElement("span");
          my_desc.className = "my_elem";
          my_desc.innerHTML = risposta[index].table.major_element.name;
          my_desc_title.appendChild(my_desc);

          div_well.appendChild(my_desc_title);

          var my_tag_title = document.createElement("p");
          my_tag_title.className = "my_title";
          my_tag_title.innerHTML = "Tag: ";
          var my_tag = document.createElement("span");
          my_tag.className = "my_elem";
          my_tag.innerHTML = risposta[index].table.topic;
          my_tag_title.appendChild(my_tag);
          div_well.appendChild(my_tag_title);

          var my_description_title = document.createElement("p");
          my_description_title.className = "my_title";
          my_description_title.innerHTML = "Content: ";
          div_well.appendChild(my_description_title);
          var my_content = document.createElement("span");
          my_content.className = "my_elem";
          my_content.innerHTML = risposta[index].table.major_element.text;
          my_description_title.appendChild(my_content);
          div_well.appendChild(my_description_title);

          var bottone = document.createElement("button");
          var br = document.createElement("br");

          bottone.type = "button";
          bottone.className += "post_button";
          bottone.name = risposta[index].table.major_element.id;

          var span = document.createElement("span");
          span.innerHTML = "Details";
          //bottone.onclick = reply_click;
          bottone.appendChild(span);

          var link = document.createElement("a");
          link.id = risposta[index].table.major_element.id + "upvote";
          link.name = risposta[index].table.major_element.id;
         
          if (!checked_upvoted) {
            link.className = "my_link";
            link.innerHTML = risposta[index].table.upvotes + "  ";
            //link.onclick = upvote_function;
            var span1 = document.createElement("span");
            
            span1.className = "glyphicon glyphicon-star-empty";
            link.onclick = upvote_function;
          } else {
            link.className = "upvoted";
            link.innerHTML = risposta[index].table.upvotes + "  ";
            var span1 = document.createElement("span");
            
            span1.className = "glyphicon glyphicon-star";
         
          }

          var spazio = document.createElement("a");
          spazio.innerHTML = "spazio";
          spazio.className = "spazio";

          var link2 = document.createElement("a");
          link2.name = risposta[index].table.major_element.id;
          link2.id = risposta[index].table.major_element.id + "comment";

          link2.className = "my_link";
          link2.innerHTML = risposta[index].table.comments.length + " ";
          link2.onclick = comment;
         
          var span2 = document.createElement("span");
          span2.className = "glyphicon glyphicon-edit";

          div_well.appendChild(br);
          link.appendChild(span1);
          div_well.appendChild(link);
          div_well.appendChild(spazio);
          link2.appendChild(span2);
          div_well.appendChild(link2);

          div_well.appendChild(bottone);

          div_col.appendChild(div_well);

          div_row.appendChild(div_col);

          post_section.appendChild(div_row);
        }
        localStorage.setItem("theory", JSON.stringify(posts));
        
        
      }
    } else {
      alert("Something went wrong. Message: " + this.responseText);
    }
  };
  request.send();
}

function comment(){
  
  id=this.name;
  localStorage.setItem("came_from", "theory");
  localStorage.setItem("element_id", id);
  window.location.href = "../Comments/Comments.html"
}


function popularity_order(){
 
  var path =
 "https://calm-shore-44304.herokuapp.com/major_element/order/upvotes/theory"
 
    

 
    populatePost("popularity_feed", "theory", "popularity", path) 
}