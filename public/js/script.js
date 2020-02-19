function toggleModal(modalId) {
    $("#" + modalId).toggleClass("show-modal");
}

function closeModalIfClickedOutside(event) {
    if (event.target.id === 'loginmodal' || event.target.id === 'signupmodal') {
        $("#loginmodal").removeClass("show-modal")
        $("#signupmodal").removeClass("show-modal")
    }
}

$(document).ready(function () {

    $("button#logbtn.trigger").on("click", function () { toggleModal("loginmodal") })
    $("button#signbtn.trigger").on("click", function () { toggleModal("signupmodal") })
    $("#closeButtonSignUp").on("click", function () { toggleModal("signupmodal") })
    $("#closeButtonLogIn").on("click", function () { toggleModal("loginmodal") })

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
    signUpForm.on("submit", function (event) {
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
            .then(function (data) {
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




if (window) {
    window.addEventListener("mousedown", closeModalIfClickedOutside)
}

