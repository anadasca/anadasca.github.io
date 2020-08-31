$(document).ready(function () {
  var first_mj = true;
  var first_comment = true;
  var first_test = true;

  document.getElementById("reported_mj").style.color = "#ffb780";
    document.getElementById("reported_test").style.color = "rgb(153, 153, 153)";
    document.getElementById("reported_comment").style.color =
      "rgb(153, 153, 153)";

  function findMj() {
    $("#mj_section").show();
    $("#comment_section").hide();
    $("#test_section").hide();

    if (!first_mj) {
      $("#message").hide();
      return;
    } else {
      first_mj = false;
      //alert("Theories!");
      populatePost("mj_section", "major_element");
    }
  }

  function findComments() {
    $("#mj_section").hide();
    $("#comment_section").show();
    $("#test_section").hide();

    if (!first_comment) {
      $("#message").hide();
      return;
    } else {
      first_comment = false;
      //alert("Theories!");
      populatePost("comment_section", "comment");
    }
  }

  function findTest() {
    $("#mj_section").hide();
    $("#comment_section").hide();
    $("#test_section").show();

    if (!first_test) {
      $("#message").hide();
      return;
    } else {
      first_test = false;
      //alert("Theories!");
      populatePost("test_section", "test");
    }
  }

  findMj();

  $("#reported_mj").click(function () {
    document.getElementById("reported_mj").style.color = "#ffb780";
    document.getElementById("reported_test").style.color = "rgb(153, 153, 153)";
    document.getElementById("reported_comment").style.color =
      "rgb(153, 153, 153)";

    findMj();
  });

  $("#reported_comment").click(function () {
    document.getElementById("reported_comment").style.color = "#ffb780";
    document.getElementById("reported_test").style.color = "rgb(153, 153, 153)";
    document.getElementById("reported_mj").style.color = "rgb(153, 153, 153)";

    findComments();
  });

  $("#reported_test").click(function () {
    document.getElementById("reported_test").style.color = "#ffb780";
    document.getElementById("reported_mj").style.color = "rgb(153, 153, 153)";
    document.getElementById("reported_comment").style.color =
      "rgb(153, 153, 153)";
    findTest();
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

function populatePost(section, element) {
  var request = new XMLHttpRequest();

  var path =
    "https://calm-shore-44304.herokuapp.com/reported_elements/" + element;
  request.open("GET", path, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var risposta = JSON.parse(this.response)

      
      risposta = risposta.result;
     
      if (risposta.length == 0) {
        if (element == "major_element")
          document.getElementById("message").innerHTML =
            "No reported major elements";
        else if (element == "comment")
          document.getElementById("message").innerHTML = "No reported comments";
        else {
          document.getElementById("message").innerHTML = "No reported tests";
        }

        $("#message").show();
      } else {
        var risposta_len = risposta.length;
        $("#message").hide();

        var post_section = document.getElementById(section);
        var index = 0;

        for (index = 0; index < risposta_len; index++) {
         

         
          var div_row = document.createElement("div");
          div_row.className = "row";

          var div_col = document.createElement("div");
          div_col.className = "col-sm-11";

          var div_well = document.createElement("div");
          div_well.className = "well";
         

          var my_desc_title = document.createElement("p");
          my_desc_title.className = "my_title";
          my_desc_title.innerHTML = "Id: ";
          var my_desc = document.createElement("span");
          my_desc.className = "my_elem";
          my_desc.innerHTML = risposta[index].table.element_id;
          my_desc_title.appendChild(my_desc);

          div_well.appendChild(my_desc_title);

          var my_tag_title = document.createElement("p");
          my_tag_title.className = "my_title";
          my_tag_title.innerHTML = "Text: ";
          var my_tag = document.createElement("span");
          my_tag.className = "my_elem";
          my_tag.innerHTML = risposta[index].table.text;
          my_tag_title.appendChild(my_tag);
          div_well.appendChild(my_tag_title);

          var my_description_title = document.createElement("p");
          my_description_title.className = "my_title";
          my_description_title.innerHTML = "Reported by: ";
          div_well.appendChild(my_description_title);
          var my_content = document.createElement("span");
          my_content.className = "my_elem";
          my_content.innerHTML = risposta[index].table.user_id;
          my_description_title.appendChild(my_content);
          div_well.appendChild(my_description_title);

          var br = document.createElement("br");
           

          var link2 = document.createElement("a");
          link2.name = risposta[index].table.element_id;
          link2.id = element;

          link2.className = "my_link";
          link2.innerHTML ="Elimina ";
          link2.onclick = delete_element;
          var span2 = document.createElement("span");
          span2.className = "glyphicon glyphicon-remove";

          div_well.appendChild(br);
          
         
          link2.appendChild(span2);
          div_well.appendChild(link2);

          div_col.appendChild(div_well);

          div_row.appendChild(div_col);

          post_section.appendChild(div_row);
        }
        
      }
    } else {
      alert("Something went wrong. Message: " + this.responseText);
    }
  };
  request.send();
}

function delete_element(){
    var id= this.name;
    var element = this.id;
    var request = new XMLHttpRequest();
    var path = "https://calm-shore-44304.herokuapp.com/reported_elements/" + element + "/" + id;
    request.open("DELETE", path, false);
    request.onload = function () {
      
        if (request.status >= 200 && request.status < 400) {
          //var risposta = JSON.parse(this.response);
          
        alert("Deleted!");
        window.location.href= "Admin_Page.html";
        } else {
          alert(
            "Error! Please try again"
          );
        }
      };
      request.send();
}