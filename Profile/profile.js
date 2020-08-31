var username = localStorage.getItem("username");
var level = localStorage.getItem("level");
var points = localStorage.getItem("points");
var img = localStorage.getItem("avatar");
var id = localStorage.getItem("id");

$(document).ready(function () {
  var url = window.location.href;
  var find = /\?/;
  if (find.test(String(url).toLowerCase()) == true) {
    sendData();
  }

  function sendData() {
    var params = new URL(document.location).searchParams;
    var code = params.get("id");
    var request = new XMLHttpRequest();
    var obj = { id: code };
    var data = JSON.stringify(obj);
    var path = "https://calm-shore-44304.herokuapp.com/post_oauth";
    request.open("POST", path, false);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var risposta = JSON.parse(this.response);

        localStorage.setItem("username", risposta.username);
        username = localStorage.getItem("username");

        localStorage.setItem("points", risposta.points);
        points = localStorage.getItem("points");

        localStorage.setItem("level", risposta.level);
        level = localStorage.getItem("level");

        localStorage.setItem("avatar", risposta.avatar);
        img = localStorage.getItem("avatar");

        localStorage.setItem("id", risposta.id);
        id = localStorage.getItem("id");
      } else {
        alert(
          "Something went wrong! Try again!\nMessage: " + this.responseText
        );
      }
    };
    request.setRequestHeader("Content-type", "text/plain");
    request.send(data);
  }
  checkLevel();
  function checkLevel() {
    if (level < 2) {
      document.getElementById("my_what_ifs").className = "disabled";
      document.getElementById("my_what_ifs").style.color = "#d1d1d1";
    } else {
      document.getElementById("my_what_ifs").className = "abled";
      document.getElementById("my_what_ifs").style.color = "rgb(153,153,153)";
    }

    if (level < 3) {
      document.getElementById("my_tests").className = "disabled";
      document.getElementById("my_tests").style.color = "#d1d1d1";
    } else {
      document.getElementById("my_tests").className = "abled";
      document.getElementById("my_tests").style.color = "rgb(153,153,153)";
    }
  }

  var first_theory = true;
  var first_what_if = true;
  var first_question = true;
  var first_test = true;
  var first_l_theory = true;
  var first_l_what_if = true;
  var first_l_question = true;

  $("#my_img").attr("src", img);

  document.getElementById("username_here").innerHTML = username + "'s profile";
  var name = "";
  var quote = "";
  if (level == 0) {
    name = "Muggle";
    quote =
      '"Muggles have garden gnomes, too, you know," Harry told Ron as they crossed the lawn.' +
      "<br>" +
      '"Yeah, I\'ve seen those things they think are gnomes," said Ron, bent double with his head in a peony bush, "like fat little Santa Clauses with fishing rods...”\
  ' +
      "<br>" +
      "― J.K. Rowling, Harry Potter and the Chamber of Secrets";
  } else if (level == 1) {
    name = "Padawan";
    quote =
      "“Patience, young Padawan. At this rate, you’ll never become a Jedi Knight.” <br> ― Jason Medina, The Manhattanville Incident: An Undead Novel";
  } else if (level == 2) {
    name = "Avenger";
    quote =
      "“Everyone fails at who they are supposed to be. The measure of a person, of a hero, is how well they succeed at being who they are. It's time for me to be who I am rather than who I'm supposed to be.” <br> ― Avengers Endgame";
  } else if (level == 3) {
    name = "The chosen one";
    quote = "“Be careful not to choke on your aspirations.” <br> -Darth Vader";
  } else {
    name = "God of Nerd";
    quote =
      "“YOU'RE STRONG, BUT I COULD SNAP MY FINGERS AND YOU'D ALL CEASE TO EXIST!” <br> - Thanos";
  }

  document.getElementById("level_here").innerHTML =
    "Level: " + level + " - " + name;
  document.getElementById("points_here").innerHTML = "Points: " + points;
  document.getElementById("quote").innerHTML = quote;

  //Codice per capire quanti punti mancano
  //document.getElementById("points_until_here").innerHTML = "<b>Level: </b> " + level;

  $("#message").hide();
  document.getElementById("message").innerHTML =
    "Your posts will appear here! Start creating now";
  document.getElementById("my_theories").style.color = "#ffb780";

  //created
  function findTheories() {
    $("#questions_section").hide();
    $("#what_ifs_section").hide();
    $("#tests_section").hide();
    $("#l_theories_section").hide();
    $("#l_questions_section").hide();
    $("#l_what_ifs_section").hide();

    $("#theories_section").show();

    if (!first_theory) {
      $("#message").hide();
      return;
    } else {
      first_theory = false;
      //alert("Theories!");
      populatePost("theories_section", "theory", "created");
    }
  }

  function findWhatIfs() {
    $("#theories_section").hide();
    $("#questions_section").hide();
    $("#tests_section").hide();
    $("#l_theories_section").hide();
    $("#l_questions_section").hide();

    $("#l_what_ifs_section").hide();

    $("#what_ifs_section").show();

    if (!first_what_if) {
      $("#message").hide();
      return;
    } else {
      first_what_if = false;
     
      populatePost("what_ifs_section", "what-if", "created");
    }
  }
  function findQuestions() {
    $("#theories_section").hide();
    $("#what_ifs_section").hide();
    $("#tests_section").hide();
    $("#l_theories_section").hide();
    $("#l_what_ifs_section").hide();

    $("#l_questions_section").hide();

    $("#questions_section").show();

    if (!first_question) {
      $("#message").hide();
      return;
    } else {
      first_question = false;
      
      populatePost("questions_section", "question", "created");
    }
  }
  function findTests() {
    $("#theories_section").hide();
    $("#what_ifs_section").hide();
    $("#questions_section").hide();
    $("#l_theories_section").hide();
    $("#l_what_ifs_section").hide();
    $("#l_questions_section").hide();

    $("#tests_section").show();
    if (!first_test) {
      $("#message").hide();
      return;
    } else {
      first_test = false;
      
      //codice per test;
    }
  }

  //liked
  function findLikedTheories() {
    $("#questions_section").hide();
    $("#what_ifs_section").hide();
    $("#tests_section").hide();
    $("#theories_section").hide();
    $("#l_questions_section").hide();
    $("#l_what_ifs_section").hide();

    $("#l_theories_section").show();

    if (!first_l_theory) {
      $("#message").hide();
      return;
    } else {
      first_l_theory = false;

      populatePost("l_theories_section", "theory", "upvoted");
    }
  }

  function findLikedWhatIfs() {
    $("#theories_section").hide();
    $("#questions_section").hide();
    $("#tests_section").hide();
    $("#l_theories_section").hide();
    $("#l_questions_section").hide();

    $("#what_ifs_section").hide();

    $("#l_what_ifs_section").show();

    if (!first_l_what_if) {
      $("#message").hide();
      return;
    } else {
      first_l_what_if = false;
     
      populatePost("l_what_ifs_section", "what-if", "upvoted");
    }
  }
  function findLikedQuestions() {
    $("#theories_section").hide();
    $("#what_ifs_section").hide();
    $("#tests_section").hide();
    $("#l_theories_section").hide();
    $("#l_what_ifs_section").hide();

    $("#questions_section").hide();

    $("#l_questions_section").show();

    if (!first_l_question) {
      $("#message").hide();
      return;
    } else {
      first_l_question = false;
      populatePost("l_questions_section", "question", "upvoted");
    }
  }

  //chiamo questa subito perché di default si parte  con my nights selezionato
  findTheories();

  $("#my_theories").click(function () {
    document.getElementById("my_theories").style.color = "#ffb780";
    document.getElementById("my_questions").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_l_theories").style.color = "rgb(153, 153, 153)";
    checkLevel();
    findTheories();
  });

  $("#my_questions").click(function () {
    document.getElementById("my_questions").style.color = "#ffb780";
    document.getElementById("my_theories").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_l_theories").style.color = "rgb(153, 153, 153)";
    checkLevel();
    findQuestions();
  });

  $("#my_what_ifs").click(function () {
    document.getElementById("my_what_ifs").style.color = "#ffb780";
    document.getElementById("my_theories").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_questions").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_tests").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_l_what_ifs").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_l_theories").style.color = "rgb(153, 153, 153)";
    findWhatIfs();
  });

  $("#my_tests").click(function () {
    document.getElementById("my_tests").style.color = "#ffb780";
    document.getElementById("my_theories").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_what_ifs").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_questions").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_l_theories").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_l_what_ifs").style.color = "rgb(153, 153, 153)";
    findTests();
  });

  $("#my_l_theories").click(function () {
    document.getElementById("my_l_theories").style.color = "#ffb780";
    document.getElementById("my_l_questions").style.color =
      "rgb(153, 153, 153)";
    document.getElementById("my_theories").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_questions").style.color = "rgb(153, 153, 153)";

    document.getElementById("my_l_what_ifs").style.color = "rgb(153, 153, 153)";
    checkLevel();
    findLikedTheories();
  });

  $("#my_l_questions").click(function () {
    document.getElementById("my_l_questions").style.color = "#ffb780";
    document.getElementById("my_l_theories").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_questions").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_theories").style.color = "rgb(153, 153, 153)";

    document.getElementById("my_l_what_ifs").style.color = "rgb(153, 153, 153)";
    checkLevel();
    findLikedQuestions();
  });

  $("#my_l_what_ifs").click(function () {
    document.getElementById("my_l_what_ifs").style.color = "#ffb780";
    document.getElementById("my_l_theories").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_l_questions").style.color =
      "rgb(153, 153, 153)";

    document.getElementById("my_what_ifs").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_theories").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_questions").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_tests").style.color = "rgb(153, 153, 153)";
    checkLevel();
    findLikedWhatIfs();
  });
});

function logout() {
  var result = confirm("Are you sure you want to logout?");
  if (result) {
    localStorage.clear;
    alert("You are logging out! Bye!");
    window.location.href = "../Home/Home.html";
  }
}

/*function reply_click() {
  window.localStorage.setItem("night_id", this.name);
  window.location.href = "Post_profile.html";
} */

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
function findUpvotedQuestions() {
 
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();

    var path =
      "https://calm-shore-44304.herokuapp.com/major_element/upvoted/" +
      id +
      "/question";
    request.open("GET", path, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var risposta = JSON.parse(this.response);

        localStorage.setItem("upvoted_questions", JSON.stringify(risposta));
        
        resolve();
      } else {
        alert("Something went wrong. Message: " + this.responseText);
        reject();
      }
    };
    request.send();
  });
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

async function populatePost(section, mj_name, mode) {
  await Promise.all([
    findUpvotedTheories().catch(() => {
      alert("Could not load upvoted theories!");
      return;
    }),
    findUpvotedWhatIfs().catch(() => {
      alert("Could not load upvoted what-ifs!");
      return;
    }),
    findUpvotedQuestions().catch(() => {
      alert("Could not load upvoted questions!");
      return;
    })]
  );
 
  upvoted_theories = JSON.parse(localStorage.getItem("upvoted_theories"));
  upvoted_questions = JSON.parse(localStorage.getItem("upvoted_questions"));
  upvoted_what_ifs = JSON.parse(localStorage.getItem("upvoted_what_ifs"));
  
  var posts = [];
  var request = new XMLHttpRequest();

  var path =
    "https://calm-shore-44304.herokuapp.com/major_element/" +
    mode +
    "/" +
    id +
    "/" +
    mj_name;
  request.open("GET", path, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
    
      var risposta = JSON.parse(this.response);
      risposta = risposta.result;
      //var risposta_str = JSON.stringify(this.response);
      //alert("Risposta: " + risposta_str);

      if (risposta.length == 0) {
        if (mode == "created") {
          if (mj_name == "theory")
            document.getElementById("message").innerHTML =
              "Your theories will appear here! Start creating now!";
          else if (mj_name == "question")
            document.getElementById("message").innerHTML =
              "Your questions will appear here! Start asking now!";
          else if (mj_name == "what-if")
            document.getElementById("message").innerHTML =
              "Your what-ifs will appear here! Start suggesting some now!";
        } else {
          if (mj_name == "theory")
            document.getElementById("message").innerHTML =
              "Your liked theories will appear here! Start browsing some now!";
          else if (mj_name == "question")
            document.getElementById("message").innerHTML =
              "Your liked questions will appear here! Start browsing some now!";
          else if (mj_name == "what-if")
            document.getElementById("message").innerHTML =
              "Your liked what-ifs will appear here! Start browsing some now!";
        }
        $("#message").show();
      } else {
        var risposta_len = risposta.length;
        $("#message").hide();

        var post_section = document.getElementById(section);
        var index = 0;

        for (index = 0; index < risposta_len; index++) {
         
          var checked_upvoted = false;
          var upvoted_len = 0;
          var element = "";
          if (mj_name == "theory") {
            //alert("Theory!")
            upvoted_len = upvoted_theories.result.length;
            //alert("Length: " + upvoted_len);
            element = upvoted_theories.result;
            //alert("Element: " + element);
          } else if (mj_name == "question") {
            upvoted_len = upvoted_questions.length;
            element = upvoted_questions.result;
          } else {
            upvoted_len = upvoted_what_ifs.result.length;
            element = upvoted_what_ifs.result;
          }

          for (var j = 0; j < upvoted_len; j++) {
            if (element[j].table.major_element.id == risposta[index].table.major_element.id) {
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
          link.className = "my_link";
          if (!checked_upvoted) {
            link.innerHTML = risposta[index].table.upvotes + "  ";
            //link.onclick = upvote_function;
            var span = document.createElement("span");
            span.className = "glyphicon glyphicon-star-empty";
          } else {
            link.innerHTML = risposta[index].table.upvotes + "  ";
            var span = document.createElement("span");
            span.className = "glyphicon glyphicon-star";
          }

          var spazio = document.createElement("a");
          spazio.innerHTML = "spazio";
          spazio.className = "spazio";

          var link2 = document.createElement("a");
          link2.name = risposta[index].table.major_element.id;
          link2.id = risposta[index].table.major_element.id + "comment";

          link2.className = "my_link";
          link2.innerHTML = risposta[index].table.comments.length + " ";
          //link2.onclick = comment_function;
          var span2 = document.createElement("span");
          span2.className = "glyphicon glyphicon-edit";

          div_well.appendChild(br);
          link.appendChild(span);
          div_well.appendChild(link);
          div_well.appendChild(spazio);
          link2.appendChild(span2);
          div_well.appendChild(link2);

        
          div_col.appendChild(div_well);

          div_row.appendChild(div_col);

          post_section.appendChild(div_row);
        }
        localStorage.setItem("posts", JSON.stringify(posts));
      }
    } else {
      alert("Something went wrong. Message: " + this.responseText);
    }
  };
  request.send();
}