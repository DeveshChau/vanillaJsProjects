const word = document.getElementById("word");
const finalMessage = document.getElementById("final-message");
const popup = document.getElementById("popup-container");
const playAgainBtn = document.getElementById("play-button");
const wrongLettersEl = document.getElementById("wrong-letters");
const figureParts = document.querySelectorAll(".figure-part");
const notification = document.getElementById('notification-container');

const wordList = ["charter", "attention", "participate", "notorious"];
let selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
let correct = [];
let wrong = [];

function displayWord() {
  word.innerHTML = `
  ${[...selectedWord]
    .map(
      (letter) =>
        `<span class="letter">${correct.includes(letter) ? letter : ""}</span>`
    )
    .join("")}
  `;

  const innerWord = word.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
  }
}

displayWord();

function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
  ${wrong.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrong.map((letter) => `<span>${letter}</span>`)}
`;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrong.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrong.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
  }
}

function showNotification() {
  console.log("start");
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correct.includes(letter)) {
        correct.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrong.includes(letter)) {
        wrong.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

playAgainBtn.addEventListener("click", () => {
  correct.splice(0);
  wrong.splice(0);

  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
