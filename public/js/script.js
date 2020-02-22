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

    $.ajax({
        method: "GET",
        url: "/api/user_data"
    }).then(function (data) {
        // reload page to display new media proper column
        $('#username').text('Welcome ' + data.email + '!')
    }).catch(function (err) {
        console.log('could not get user', err)
    });

    $("button#logbtn.trigger").on("click", function () { toggleModal("loginmodal") })
    $("button#signbtn.trigger").on("click", function () { toggleModal("signupmodal") })
    $("#closeButtonSignUp").on("click", function () { toggleModal("signupmodal") })
    $("#closeButtonLogIn").on("click", function () { toggleModal("loginmodal") })

    $(".watch-content").on("click", function (event) {
        event.preventDefault();
        var mediaID = $(this).attr("data-id")
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
        event.preventDefault();
        if ($("#mediaName").val() === "") {
            $("#error").text("Please fill out all fields.")
            return;
        }

        var formData = {
            name: $("#mediaName").val(),
            genre: $("#genre").val(),
            mediaType: $("input[name='media-type']:checked").val()
        }

        console.log('sending new media', formData)

        $.post("/watch", formData)
            .then(function (data) {
                // reload page to display new media proper column
                location.reload();
            })
            .catch(function() {
                alert('Sorry, something went wrong, please try again later.')
            })


    })

    $(".remove-from-list").on("click", function () {
        console.log("you got clicked", $(this).attr("data-id"));
        event.preventDefault();
        $.ajax({
            url: "/watch/" + $(this).attr("data-id"),
            type: "delete",
        }).then(function (data) {
            console.log(data);
            window.location.reload();
        })
    })
});

if (window) {
    window.addEventListener("mousedown", closeModalIfClickedOutside)
}

// Code below to find movie or movie on click
$("#find-movie").on("click", function (event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();

    // Here we grab the text from the input box
    var movie = $("#movie-input").val();

    // Here we construct our URL
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#movie-view").text(JSON.stringify(response));
    });
}
);
