var user = localStorage.getItem("id");
var level = localStorage.getItem("level");
var created_new = false;

var no_login = localStorage.getItem("no_login");

$(document).ready(function () {
  if(no_login == "true" ) $("#btn3").prop("disabled", true);
  else $("#btn3").prop("disabled", false);

  if(no_login == "true" ) $("#btn3").prop("disabled", true);
  else $("#btn3").prop("disabled", false);


  if(level<3) $("#btn3").prop("disabled", true);
  else $("#btn3").prop("disabled", false);
   
    var request = new XMLHttpRequest();
      request.open('GET', `https://calm-shore-44304.herokuapp.com/leaderboard/topics`, false);
      request.onload = function() {
          if (request.status >= 200 && request.status < 400){
              //alert("Response: " + this.response);
              myObj = JSON.parse(this.response);
             
              //alert("Leaderboard: "+ myObj.leaderboard);
              document.getElementById("menu_category").innerHTML="";
             
              $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
              $("#menu_category").append($("<option>").attr('value', "All tests").text("All tests"));
              var s;
             
              for(var i=0; i< myObj.leaderboard.length; i++){
                s = myObj.leaderboard[i].table.name;
                //alert("Elemento: " + s)
                if(s!= ""){
                   // document.getElementById("menu_category").innerHTML +=  `<option value=${s}> ${s}</option>`;
                   
                   $("#menu_category").append($("<option>").attr('value', s).text(s));
                }
            }
          }
          else{
             alert("Something went wrong. Try again");
          }
      }
      request.send();

      path = "https://calm-shore-44304.herokuapp.com/test/all";
    
      populatePost("posts", "test", "all_tests", path);
  });

  function SearchByTag() {
    document.getElementById("search_tag_name_msg").innerHTML = "";
 
    var tag = document.getElementById("tag").value;
    if (tag == "All tests") {
      var path =
        "https://calm-shore-44304.herokuapp.com/test/all";
      populatePost("posts", "test", "all_tests", path) 
      
    } else {
     
      var path =
        "https://calm-shore-44304.herokuapp.com/test/by_topic/" + tag;
       
       populatePost("tags", "test", "topics", path) 
    }
  }


function populatePost(section, mj_name, mode, path) {
    
  
   
    var posts = [];
    var request = new XMLHttpRequest();
   
    
    request.open("GET", path, true);
    
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        
        var risposta = JSON.parse(this.response);
        var errore = risposta.error;
       
        //var risposta_str = JSON.stringify(this.response);
        //alert("Risposta: " + risposta_str);
  
      
        if (risposta.length==0) {
          if (mj_name == "test"){
            if(mode=="All tests"){
              document.getElementById("message").innerHTML =
              "Created tests will appear here! Start creating now!";
              $("#search_btn").prop("disabled", true);
              
              
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
  
        
          if (mode == "all_tests") {
            
              
              $("#posts").empty();
             
              $("#tags").hide();
            
              $("#posts").show();
    
            }
            else if (mode == "topics") {
              
              
              $("#tags").empty();
              $("#posts").hide();
              $("#tags").show();
              
              
            }
  
          
          var post_section = document.getElementById(section);
          var index = 0;
  
          for (index = 0; index < risposta_len; index++) {
  
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
            my_desc.innerHTML = risposta[index].name;
            my_desc_title.appendChild(my_desc);
  
            div_well.appendChild(my_desc_title);
  
            var my_tag_title = document.createElement("p");
            my_tag_title.className = "my_title";
            my_tag_title.innerHTML = "Tag: ";
            var my_tag = document.createElement("span");
            my_tag.className = "my_elem";
            my_tag.innerHTML = risposta[index].topic_id;
            my_tag_title.appendChild(my_tag);
            div_well.appendChild(my_tag_title);
  
            var my_description_title = document.createElement("p");
            my_description_title.className = "my_title";
            my_description_title.innerHTML = "Difficulty: ";
            div_well.appendChild(my_description_title);
            var my_content = document.createElement("span");
            my_content.className = "my_elem";
            my_content.innerHTML = risposta[index].difficulty;
            my_description_title.appendChild(my_content);
            div_well.appendChild(my_description_title);
  
            if(no_login != "true"){
            
            var link3 = document.createElement("a");
            link3.name =  risposta[index].id;
            link3.id =  risposta[index].id + "report";
  
            link3.className = "my_link";
            link3.innerHTML = " Report ";
            link3.onclick = report;
           
            var span3 = document.createElement("span");
            span3.className = "glyphicon glyphicon-scissors";

            link3.appendChild(span3)
            div_well.appendChild(link3)

            var button = document.createElement("button");
            button.className = "btn-login"
            button.name = risposta[index].id;
           var span = document.createElement("span");
           span.innerHTML = "Take test!"
           button.onclick = takeTest;
           button.appendChild(span);
          
             div_well.appendChild(button);
            }
           
         
  
           
  
        
            
  
           
  
          
  
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
  

  function takeTest(){
    var id=this.name;
    localStorage.setItem("test_id", id);
     window.location.href="Take_test.html"
  }






  function logout() {
    var result = confirm("Are you sure you want to logout?");
    if (result) {
      localStorage.clear;
      alert("You are logging out! Bye!");
      window.location.href = "../Home/Home.html";
    }
  }
  

function create(){
    window.location.href  = "Create_test.html"}



    function report(){

        var mj_id = this.name;
        
          var path = "https://calm-shore-44304.herokuapp.com/report/test" ;
          var obj = {user_id : user, test_id: mj_id};
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