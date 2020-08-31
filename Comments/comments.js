var element = localStorage.getItem("came_from");
var element_id = localStorage.getItem("element_id");
var user = localStorage.getItem("id");
var level = localStorage.getItem("level");
var points = localStorage.getItem("points");
var img = localStorage.getItem("avatar");

function findUpvotedComments() {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();

    var path = "https://calm-shore-44304.herokuapp.com/liked_comments/" + user;

    request.open("GET", path, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var risposta = JSON.parse(this.response);

        localStorage.setItem("upvoted_comments", JSON.stringify(risposta));

        resolve();
      } else {
        alert("Something went wrong. Message: " + this.responseText);
        reject();
      }
    };
    request.send();
  });
}

$(document).ready(function () {
  $("#my_img").attr("src", img);

  populateComments();
});
function report(){

  var mj_id = this.name;
 
    var path = "https://calm-shore-44304.herokuapp.com/report/comment" ;
    var obj = {user_id : user, comment_id: mj_id};
    var data = JSON.stringify(obj);
    var request = new XMLHttpRequest();
  
    request.open("POST", path, true);
  
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        document.getElementById(mj_id + "report").innerHTML = "Reported";
       
        document.getElementById(mj_id + "report").style.color = "#ffb780;";
        document.getElementById(mj_id + "report").style.cursor = "text";
        document.getElementById(mj_id + "report").style.textDecoration = "none";
  
        document.getElementById(mj_id + "report").onclick = function () {
          return false;
        };
        alert("Successully reported")
       
      } else {
        alert("Something went wrong, please try again!");
      }
    };
    request.setRequestHeader("Content-type", "text/plain");
    request.send(data);

}
async function populateComments() {
  var element = localStorage.getItem("came_from");
  var element_id = localStorage.getItem("element_id");
  var user = localStorage.getItem("id");
  var level = localStorage.getItem("level");
  var points = localStorage.getItem("points");
  var img = localStorage.getItem("avatar");

  await Promise.all([
    findUpvotedComments().catch(() => {
      alert("Could not load upvoted comments!");
      return;
    }),
  ]);

  var upvoted_comments = JSON.parse(localStorage.getItem("upvoted_comments"));

  var posts = JSON.parse(localStorage.getItem(element));

  comment_section = document.getElementById("new_comment");
  var request = new XMLHttpRequest();
  var path = "https://calm-shore-44304.herokuapp.com/major_element/get_specific/id/" + element_id;
  request.open("GET", path, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var risposta = JSON.parse(this.response);
      var risposta_str = JSON.stringify(this.response);
      //alert("Risposta: " + risposta_str);
      
      var found_element = risposta.major_element.table;
      var len = found_element.comments.length;

      for (var i = 0; i < len; i++) {
        var checked_upvoted = false;

        var upvoted_len = upvoted_comments.result.length;

        var element = upvoted_comments.result;

        for (var j = 0; j < upvoted_len; j++) {
          if (
            element[j].comment_id == found_element.comments[i].table.comment_id
          ) {
            checked_upvoted = true;
            break;
          }
        }

        var div_row = document.createElement("div");
        div_row.className = "row";

        var div_col = document.createElement("div");
        div_col.className = "col-sm-11";

        var div_new_comment = document.createElement("div");
        div_new_comment.className = "well";

        var username = document.createElement("p");
        username.className = "username";
        username.innerHTML =
          "<b> " + found_element.comments[i].table.user + "</b>";

        var div_comment_text = document.createElement("div");
        div_comment_text.className = "container";
        var text = document.createElement("p");
        text.innerHTML = found_element.comments[i].table.text;
        div_comment_text.appendChild(text);

        var upvote = document.createElement("a");
        upvote.name = found_element.comments[i].table.comment_id;

        upvote.id = found_element.comments[i].table.comment_id + "upvote";

        upvote.innerHTML = found_element.comments[i].table.upvotes;

        if (!checked_upvoted) {
          upvote.className = "my_link";

          upvote.onclick = upvote_comment;

          var span = document.createElement("span");
          span.className = "glyphicon glyphicon-star-empty";
          upvote.appendChild(span);
        } else {
          upvote.className = "upvoted";

          var span1 = document.createElement("span");

          span1.className = "glyphicon glyphicon-star";

          upvote.appendChild(span1);
        }

        var verify = document.createElement("a");
        verify.name = found_element.comments[i].table.comment_id;
        verify.id = found_element.comments[i].table.comment_id + "verify";
        verify.innerHTML = found_element.comments[i].table.verifications;

        if (level > 3) {
          verify.className = "my_link";
          verify.onclick = verify_comment;
          var span = document.createElement("span");
          span.className = "glyphicon glyphicon-star-empty";
          verify.appendChild(span);
        } else {
          verify.className = "verify-disabled";
          var span = document.createElement("span");
          span.className = "glyphicon glyphicon-ok";
          verify.appendChild(span);
        }

        var spazio = document.createElement("a");
        spazio.innerHTML = "spazio";
        spazio.className = "spazio";

        var spazio2 = document.createElement("a");
        spazio2.innerHTML = "spazio";
        spazio2.className = "spazio";
        //here
        var link3 = document.createElement("a");
        link3.name = found_element.comments[i].table.comment_id;
        link3.id = found_element.comments[i].table.comment_id  + "report";

        link3.className = "my_link";
        link3.innerHTML = " Report ";
        link3.onclick = report;
       
        var span3 = document.createElement("span");
        span3.className = "glyphicon glyphicon-scissors";

        link3.appendChild(span3);

        //fine

        div_new_comment.appendChild(username);

        div_new_comment.appendChild(div_comment_text);
        div_new_comment.appendChild(upvote);
        div_new_comment.appendChild(spazio);

        div_new_comment.appendChild(verify);
        div_new_comment.appendChild(spazio2);
        div_new_comment.appendChild(link3)

        div_col.appendChild(div_new_comment);

        div_row.appendChild(div_col);

        comment_section.appendChild(div_row);
        
      }
    } else {
      alert("Something went wrong. Message: " + this.responseText);
    }
  };
  request.send();
}

function upvote_comment() {
  var id = this.name;
 
  var request = new XMLHttpRequest();
  var obj = {
    user_id: user,
    comment_id: id,
  };
  var data = JSON.stringify(obj);
  var path = "https://calm-shore-44304.herokuapp.com/upvote/comment";

  request.open("POST", path, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      //var risposta = JSON.parse(this.response);
     
      document.getElementById(id + "upvote").innerHTML = "Upvoted";

      document.getElementById(id + "upvote").style.color = "#ffb780;";
      document.getElementById(id + "upvote").style.cursor = "text";
      document.getElementById(id + "upvote").style.textDecoration = "none";

      document.getElementById(id + "upvote").onclick = function () {
        return false;
      };
    } else {
      alert("Something went wrong. Message: " + this.responseText);
    }
  };
  request.setRequestHeader("Content-type", "text/plain");
  request.send(data);
}

function comment() {
  var request = new XMLHttpRequest();
  var text = document.getElementById("my_comment").value;

  if (text == "") return;
  else {
    var obj = {
      user_id: user,
      major_element_id: element_id,
      text: text,
    };
    var data = JSON.stringify(obj);
    var path = "https://calm-shore-44304.herokuapp.com/comment/major_element";
    request.open("POST", path, false);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        //var risposta = JSON.parse(this.response);
        alert("Comment posted!");

        window.location.href = "Comments.html";
      } else {
        alert(
          "Something went wrong! Please try again. Error: " + this.responseText
        );
      }
    };
    request.setRequestHeader("Content-type", "text/plain");
    request.send(data);
  }
}

function back_to() {
  if (element == "theory") window.location.href = "../Theory/Theories.html";
  else if (element == "what_if")
    window.location.href = "../What_If/What_ifs.html";
  else window.location.href = "../Question/Questions.html";
}
