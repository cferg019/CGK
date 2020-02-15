// MODAL FUNCTIONS

var modal = document.querySelector(".modal");
var logTrigger = document.querySelector("button#logbtn.trigger");
var signTrigger = document.querySelector("button#signbtn.trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    $(document).ready(function () {
        if (event.target === modal) {
            toggleModal();
        }
    });
}

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

    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
  
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password) {
      $.post("/api/signup", {
        email: email,
        password: password
      })
        .then(function(data) {
          window.location.replace("/members");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
});

if (logTrigger) {
    logTrigger.addEventListener("click", toggleModal)
}

if (signTrigger) {
    signTrigger.addEventListener("click", toggleModal)
}

if (closeButton) {
    closeButton.addEventListener("click", toggleModal)
}

if (window) {
    window.addEventListener("click", windowOnClick)
}

