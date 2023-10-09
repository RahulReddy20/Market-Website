function validateForm() {
  var errorMessages = [];
  var firstName = document.querySelector('input[name="firstName"]').value;
  var lastName = document.querySelector('input[name="lastName"]').value;
  var gender = document.querySelector('input[name="gender"]:checked');
  var email = document.querySelector('input[name="email"]').value;
  var phoneNumber = document.querySelector('input[name="contact"]').value;
  var comments = document.querySelector('textarea[name="comments"]').value;

  var nameRegex = /^[A-Z][a-zA-Z]*$/;
  var phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
    errorMessages.push(
      "First name and last name should be alphabetic and start with a capital letter."
    );
  }

  if (firstName === lastName) {
    errorMessages.push("First name and last name cannot be the same.");
  }

  if (!gender) {
    errorMessages.push("Please select a gender.");
  }

  if (!email.match(emailRegex)) {
    errorMessages.push("Email address must contain @ and .");
  }

  if (!phoneNumber.match(phoneRegex)) {
    errorMessages.push("Phone number must be formatted as (ddd) ddd-dddd.");
  }

  if (comments.length < 10) {
    errorMessages.push("Comments must be at least 10 characters long.");
  }

  var errorContainer = document.getElementById("error-messages");
  errorContainer.innerHTML = ""; // Clear previous error messages

  if (errorMessages.length > 0) {
    errorContainer.innerHTML =
      "<strong>Error(s):</strong><br>" + errorMessages.join("<br>");
    return false;
  } else {
    return true;
  }
}
