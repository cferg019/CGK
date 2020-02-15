// MODAL FUNCTIONS
// var modal = document.querySelector(".modal");
// var trigger = document.querySelector(".trigger");
// var closeButton = document.querySelector(".close-button");

// function toggleModal() {
//     modal.classList.toggle("show-modal");
// }

// function windowOnClick(event) {
//     if (event.target === modal) {
//         toggleModal();
//     }
// }

// trigger.addEventListener("click", toggleModal);
// closeButton.addEventListener("click", toggleModal);
// window.addEventListener("click", windowOnClick);

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
  
  