var username = localStorage.getItem("username");
var level = localStorage.getItem("level");
var points = localStorage.getItem("points");
var img = localStorage.getItem("avatar");
var id = localStorage.getItem("id");

$(document).ready(function () {
  if(level<3) $("#btn3").prop("disabled", true);
  else $("#btn3").prop("disabled", false);
 path = "https://calm-shore-44304.herokuapp.com/major_element/what_if";
    
    populatePost("posts", "what_if", "all_what_ifs", path);
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
          alert("Upvoted!")
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
    if (tag == "All what_ifs") {
      var path =
        "https://calm-shore-44304.herokuapp.com/major_element/what_if";
      populatePost("posts", "what_if", "all_what_ifs", path) 
    } else {
      var path =
        `https://pacific-stream-14038.herokuapp.com/major_element/what_if/` +
        tag;
       populatePost("tag", "what_if", "topics", path) 
    }
  } 
  

  function findUpvotedWhatIfs() {
    //alert("Find upvoted what ifs");
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
  
      var path =
        "https://calm-shore-44304.herokuapp.com/major_element/upvoted/" +
        id +
        "/what_if";
      request.open("GET", path, true);
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          var risposta = JSON.parse(this.response);
  
          localStorage.setItem("upvoted_what_ifs", JSON.stringify(risposta));
         
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
    findUpvotedWhatIfs().catch(() => {
      alert("Could not load upvoted what_ifs!");
      return;
    }),
  ]);

  upvoted_theories = JSON.parse(localStorage.getItem("upvoted_what_ifs"));

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
      //alert("Errore: " + errore);
     
      if (errore == "No matches found") {
        if (mj_name == "what_if"){
          if(mode=="all wat_ifs"){
            document.getElementById("message").innerHTML =
            "Created what_ifs will appear here! Start creating now!";
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
      }  else {
       
        var risposta_len = risposta.length;
        $("#message").hide();

      
        if (mode == "all_what_ifs") {
          
            
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

         
          var br = document.createElement("br");

         

          var link = document.createElement("a");
          link.id = risposta[index].table.major_element.id + "upvote";
          link.name = risposta[index].table.major_element.id;
         
          if (!checked_upvoted) {
            link.className = "my_link";
            link.innerHTML = risposta[index].table.upvotes + "  ";
            
            var span1 = document.createElement("span");
            
            span1.className = "glyphicon glyphicon-star-empty";
            link.onclick = upvote_function;
          } else {
            link.className = "upvoted";
            link.innerHTML = risposta[index].table.upvotes + "   Upvoted";
         
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
          if(!checked_upvoted) link.appendChild(span1);
          div_well.appendChild(link);
          div_well.appendChild(spazio);
          link2.appendChild(span2);
          div_well.appendChild(link2);

       

          div_col.appendChild(div_well);

          div_row.appendChild(div_col);

          post_section.appendChild(div_row);
        }
        localStorage.setItem("what_if", JSON.stringify(posts));
      }
    } else {
      alert("Something went wrong. Message: " + this.responseText);
    }
  };
  request.send();
}

function comment(){
  
  id=this.name;
  localStorage.setItem("came_from", "what_if");
  localStorage.setItem("element_id", id);
  window.location.href = "../Comments/Comments.html"
}
