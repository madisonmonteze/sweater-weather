var modal = document.querySelector(".modal");
var trigger = document.querySelector(".desc");
var closeButton = document.querySelector(".close");

function toggleModal() {
    modal.classList.toggle("show-modal");
    trigger.classList.toggle("clicked");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
