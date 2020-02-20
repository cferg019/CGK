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

