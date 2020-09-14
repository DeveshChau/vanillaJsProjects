const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

text.focus();

let difficulty = localStorage.getItem("difficulty") || "medium";
difficultySelect.value = localStorage.getItem("difficulty") || "medium";

let score = 0;
let time = 10;
let randomWord;

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

addWordToDom();

function upadateScore() {
  score++;
  scoreEl.innerText = score;
}

let interval = setInterval(updateTime, 1000);

function updateTime() {
  time--;
  timeEl.innerText = time + "s";
  if (time === 0) {
    clearInterval(interval);
    gameOver();
  }
}

function gameOver() {
  endgameEl.style.display = "flex";
  endgameEl.innerHTML = `
  <h1>Game Over</h1>
  <p>Your score is ${score}</p>
  <button onClick="location.reload()">Reload</button>
  `;
}

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

text.addEventListener("input", (e) => {
  if (e.target.value === randomWord) {
    upadateScore();
    e.target.value = "";
    addWordToDom();

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

settingsForm.addEventListener('change', (e) => {
  localStorage.setItem('difficulty', e.target.value)
})
