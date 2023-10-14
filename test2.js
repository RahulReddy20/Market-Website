const showPopupButton = document.getElementById("showPopup");
const closePopupButton = document.getElementById("closePopup");
const popup = document.querySelector(".popup");

showPopupButton.addEventListener("click", function () {
  popup.style.display = "block";
});

closePopupButton.addEventListener("click", function () {
  popup.style.display = "none";
});

// Close the popup when clicking outside of it
window.addEventListener("click", function (event) {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});
