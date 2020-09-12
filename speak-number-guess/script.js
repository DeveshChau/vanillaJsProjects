const msgEl = document.getElementById("msg");

const randomNumber = Math.floor(Math.random() * 100 + 1);

console.log(randomNumber);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();
function onSpeak(e) {
  msg = e.results[0][0].transcript;
  showMessage(msg);
  checkNumber(msg);
}

function showMessage(msg) {
  msgEl.innerHTML = `
    <div> You said: </div>
    <span class="box">${msg}</span>`;
}

function checkNumber(msg) {
  const num = +msg;
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>";
    return;
  }
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be between 1 and 100</div>";
    return;
  }
  if (num === randomNumber) {
    document.body.innerHTML = ` 
    <h2>Congrats! You have guessed the number! <br><br>
    It was ${num}</h2>
    <button class="play-again" id="play-again">Play Again</button>
  `;
  } else if (num < randomNumber) {
    msgEl.innerHTML += "<div>GO HIGHER</div>";
  } else {
    msgEl.innerHTML += "<div>GO LOWER</div>";
  }
}

function playAgain(e) {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
}
recognition.addEventListener("result", onSpeak);
recognition.addEventListener("end", () => recognition.start());
document.body.addEventListener("click", playAgain);
