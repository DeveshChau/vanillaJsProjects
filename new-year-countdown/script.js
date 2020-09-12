const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const loading = document.getElementById("loading");
const countdown = document.getElementById("countdown");
const year = document.getElementById("year");

const currentYear = new Date().getFullYear();
year.innerText = currentYear + 1;

function updateCountDown() {
  timeToNextYear = new Date(currentYear + 1, 0, 1, 0, 0, 0) - new Date();
  days.innerHTML = Math.floor(`${timeToNextYear}` / 1000 / 60 / 60 / 24);
  hours.innerHTML = Math.floor(`${timeToNextYear}` / 1000 / 60 / 60) % 24;
  minutes.innerHTML = Math.floor(`${timeToNextYear}` / 1000 / 60) % 60;
  seconds.innerHTML = Math.floor(`${timeToNextYear}` / 1000) % 60;
}

setTimeout(() => {
  loading.remove();
  countdown.style.display = "flex";
}, 1000);

setInterval(updateCountDown, 1000);
