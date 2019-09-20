// When the document is ready to execute javascript run the following function
$(document).ready(function() {
  // When the hamburger button is clicked
  $(".nav-button").click(function() {
    // Turn the hamburger menu into an "X" or back to a hamburger depending on its state
    $(".nav-button").toggleClass("change")
  });

  // When the user scrolls to the area/element that this function specifies
  $(window).scroll(function() {
    //Where to start changing the navbar
    let position = $(this).scrollTop();
    // If the value of position is greater than or equal to 200
    if(position >= 200) {
      // Initiate the navbar effect
      $(".nav-menu").addClass("custom-navbar")
    // If the value of position is less than 200
    }else{
      // Maintain the default navbar status
      $(".nav-menu").removeClass("custom-navbar");
    }
  });
});
