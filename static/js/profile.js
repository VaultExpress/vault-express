(function () {
  $(document).ready(function() {
    
  // To Slide Down repeat password
  $(".hide").hide();
  $("input[name='password']").focus(function() {
  $("#password_repeat").slideDown();
  });

  // To give
  $("input").on("focus",function() {
  $(this).parent().removeClass('input-blur').addClass('input-focus');
  });
  $("input").on("blur", function() {
  $(this).parent().removeClass('input-focus').addClass('input-blur');
  });
  });

})();