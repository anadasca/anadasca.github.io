var user = localStorage.getItem("id");
var test = localStorage.getItem("test_id");
var arr_questions = [];
var points_tot = 0;

$(document).ready(function () {
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://calm-shore-44304.herokuapp.com/test/specific/` + test,
    false
  );
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      //alert("Response: " + this.response);
      myObj = JSON.parse(this.response);
      var desc = document.getElementById("desc");
      if (myObj.difficulty == 1){
        desc.innerHTML = "Each correct answer will assign one point";
        points_tot = 1;}
      else if (myObj.difficulty == 2){
        desc.innerHTML = "Each correct answer will assign two points";
        points_tot = 2;
      }
      
      else if (myObj.difficulty == 3){
        desc.innerHTML = "Each correct answer will assign three points";
        points_tot = 3;
      }
     
      else if (myObj.difficulty == 4){
        desc.innerHTML = "Each correct answer will assign four points";
        points_tot = 4;

      }
      
      else {
        desc.innerHTML = "Each correct answer will assign five points";
        points_tot = 5;

      }

      var title = document.getElementById("name");
      title.innerHTML = myObj.name;

      var questions = myObj.questions;
      arr_questions = test_conversion(questions);
    } else {
      alert("Something went wrong. Try again");
    }
  };
  request.send();

  //alert("Arr: " + arr_questions);
  var container = document.getElementById("questions");
  var length = arr_questions.length;
  var i = 0;
  for (i = 0; i < length; i++) {
    var my_question = document.createElement("p");
    my_question.innerHTML = "<b class=\"question\" >Question " + (i+1) + ": </b> " + arr_questions[i][0];

    container.appendChild(my_question);
    //alert("Appended");
   
   
    var random = random_display_answer(arr_questions[i]);
    var arr_length = random.length;
    //alert("Random: " + random);
   var t = 0;
    for (t = 0; t < arr_length; t++) {
        //alert("Elem: " + random[t]);
      var elem = random[t];

      var input = document.createElement('input');
      input.type = 'radio';
      input.value = elem;
      input.name = "answer" + i;
      input.id = "answer" + i;
        var label = document.createElement("label");
       
        label.innerHTML = elem;
       
     
      var br = document.createElement("br");

      container.appendChild(input);
      container.appendChild(label);
      container.appendChild(br);
      
    }
  }
});

function test_conversion(questions) {
  var arr = questions.split("\n");
  var result = new Array();
  var element = new Array();
  for (var i = 0; i < arr.length; i++) {
    var element = new Array();
    element = arr[i].split("#");
    result.push(element);
  }
  return result; //array [[question, right, answer2, answer3, answer4], ...]
}

function random_display_answer(array) {
  //il primo elemento dell'array è la domanda, quindi si salta
  var result = array.slice(1);
  result.sort(() => Math.random() - 0.5);
  return result;
}


function send(){
    var length = arr_questions.length;
    var points = 0;
    for(var i=0; i<length; i++){
        var name = "input[name='answer" + i +"']:checked" ;
      
       var checked = $(name).val();
      
       if(checked == arr_questions[i][1]) points += points_tot;
    }
    var request = new XMLHttpRequest();
    var obj = {
        id: user,
        points: points
    }
    var data = JSON.stringify(obj);
    
  request.open(
    "POST",
    `https://calm-shore-44304.herokuapp.com/assign_points`,
    true
  );
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      //alert("Response: " + this.response);
     alert("You earned " + points + " points!");
     window.location.href = "Tests.html"
      
    } else {
      alert("Something went wrong. Try again");
    }
  };
  request.setRequestHeader("Content-type", "text/plain");
  request.send(data);

}