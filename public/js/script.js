// MODAL FUNCTIONS

var modal = document.querySelector(".modal");
var logTrigger = document.querySelector("button#logbtn.trigger");
var signTrigger = document.querySelector("button#signbtn.trigger");
var closeButton = document.querySelector(".close-button");


$(document).ready(function () {

    $(".watchedForm").on("submit", function (event) {
      event.preventDefault();
  
      var mediaID = $(this).children(".mediaID").val();
      console.log(mediaID);
      $.ajax({
        method: "PUT",
        url: "/watch/" + mediaID
      }).then(function (data) {
        // reload page to display new media proper column
        location.reload();
      });
    });
 
    $("#mediaSubmitForm").on("submit", function (event) {
      if ($("#mediaName").val() === "") {
        event.preventDefault();
        $("#error").text("Please fill out all fields.")
      }
    })
  });
  
if(logTrigger) {
    logTrigger.addEventListener("click", toggleModal)
}

if(signTrigger) {
    signTrigger.addEventListener("click", toggleModal)
}

if(closeButton) {
    closeButton.addEventListener("click", toggleModal)
}

if(window) {
    window.addEventListener("click", windowOnClick)
}

