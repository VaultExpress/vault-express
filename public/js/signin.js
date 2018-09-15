(function () {

  document.getElementById("buttonSignIn").addEventListener("click", function(e) {
    e.preventDefault();
    var data = {};
    data.username = document.getElementById("veuser").value;
    data.password = document.getElementById("vepass").value;
    var url = "/auth/signin";
    postForm(url, data, function(err, ret) {
      if (!err) {
        let res = JSON.parse(ret);
        if (!res.error) {
          window.location.href = "/secure/profile";
        } else {
          console.log(res.error);
        }
      }
    });
  });

})();


