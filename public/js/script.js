// MODAL FUNCTIONS
var modal = document.querySelector(".modal");
var logTrigger = document.querySelector("button#logbtn.trigger");
var signTrigger = document.querySelector("button#signbtn.trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

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
