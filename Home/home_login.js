function logout() {
    var result = confirm("Are you sure you want to logout?");
    if (result) {
      localStorage.clear;
      alert("You are logging out! Bye!");
      window.location.href = "../Home/Home.html";
    }
  }