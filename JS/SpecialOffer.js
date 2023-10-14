const showPopupButton = document.getElementById("showPopup");
const popup = document.getElementById("specialOffersPopup");
const closePopupButton = document.getElementById("closePopup");

function centerPopup() {
  const windowHeight = window.innerHeight;
  const popupHeight = popup.clientHeight;
  const topPosition = (windowHeight - popupHeight) / 2;
  popup.style.top = topPosition + "px";
}

showPopupButton.addEventListener("click", function () {
  popup.style.display = "block";
  //   popup.style.opacity = 100;

  centerPopup();
});

closePopupButton.addEventListener("click", function () {
  popup.style.display = "none";
});

// Close the popup when clicking outside of it
// window.addEventListener("click", function (event) {
//   if (event.target === popup) {
//     popup.style.display = "none";
//   }
// });

const questions = document.querySelectorAll(".question");
const result = document.querySelector(".result");
const offerText = document.getElementById("offerText");
const qualificationReasons = document.getElementById("qualificationReasons");
const timeSpent = document.getElementById("timeSpent");

let currentQuestionIndex = 0;
let answers = [];
let startTime;

function showQuestion(index) {
  questions.forEach((question) => {
    question.style.display = "none";
  });
  questions[index].style.display = "block";
  if (currentQuestionIndex === 0) {
    startTime = new Date();
  }
  //   startTime = new Date();
  //   console.log(startTime);
}

function showResult() {
  result.style.display = "block";
  const endTime = new Date();
  const timeDiff = (endTime - startTime) / 1000; // Time spent in seconds
  console.log(startTime, endTime, timeDiff);

  const isStudent = answers[0] === "yes";
  const isLowIncome = answers[1] === "yes";
  const hasShoppedBefore = answers[2] === "yes";

  let offer = "No special offer available.";
  let reasons = "";

  if (isStudent && isLowIncome && hasShoppedBefore) {
    offer = "You qualify for $100 off your purchase!";
    reasons =
      "You are a student, a low-income person, and a returning customer.";
  } else if ((isStudent && isLowIncome) || (hasShoppedBefore && isLowIncome)) {
    offer = "You qualify for $50 off your purchase!";
    reasons = "You are a student and a low-income person.";
  } else if (hasShoppedBefore) {
    offer = "You qualify for $25 off your purchase!";
    reasons = "You are a returning customer.";
  }

  offerText.textContent = offer;
  qualificationReasons.textContent = reasons;
  timeSpent.textContent = `${timeDiff} seconds`;
}

// Show the first question
showQuestion(currentQuestionIndex);

// Event listeners for "Next" buttons
document.getElementById("next1").addEventListener("click", () => {
  const selectedRadio = document.querySelector(`input[name=student]:checked`);
  if (selectedRadio) {
    answers.push(selectedRadio.value);
    currentQuestionIndex = 1;
    showQuestion(currentQuestionIndex);
  }
});

document.getElementById("next2").addEventListener("click", () => {
  const selectedRadio = document.querySelector(`input[name=income]:checked`);
  if (selectedRadio) {
    answers.push(selectedRadio.value);
    currentQuestionIndex = 2;
    showQuestion(currentQuestionIndex);
  }
});

// Event listener for "Skip" buttons
document.getElementById("skip1").addEventListener("click", () => {
  answers.push("skip");
  currentQuestionIndex = 1;
  showQuestion(currentQuestionIndex);
});

document.getElementById("skip2").addEventListener("click", () => {
  answers.push("skip");
  currentQuestionIndex = 2;
  showQuestion(currentQuestionIndex);
});
document.getElementById("skip3").addEventListener("click", () => {
  answers.push("skip");
  showResult();
});

// Event listener for "Show Result" button
document.getElementById("showResult").addEventListener("click", () => {
  const selectedRadio = document.querySelector(`input[name=income]:checked`);
  if (selectedRadio) {
    answers.push(selectedRadio.value);
    currentQuestionIndex = 3;
  }
  showResult();
});

popup.style.display = "none";
