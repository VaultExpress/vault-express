(function () {
  // To Slide Down main container
  //$(".slide").hide();
  //$(".slide").slideDown(1500);

  // To give
  //$("input").on("focus",function() {
  //  $(this).parent().removeClass('input-blur').addClass('input-focus');
  //});
  //$("input").on("blur", function() {
  //  $(this).parent().removeClass('input-focus').addClass('input-blur');
  //});
  document.getElementById("buttonSignIn").addEventListener("click", function(e) {
    e.preventDefault();
    var data = {};
    data.username = document.getElementById("veuser").value;
    data.password = document.getElementById("vepass").value;
    var url = "/auth/signin";
    postForm(url, data, function(err, res) {
      if (!err) {
        console.log("success");
      } else {
        console.log(err);
      }
    });
  });

})();


