const container = document.querySelector(".container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieTicket = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
populateUI();
let ticketPrice = +movieTicket.value;

function updateSelectedCount() {
  const seatSelected = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...seatSelected].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  const selectedCount = seatSelected.length;
  count.innerText = selectedCount;
  total.innerText = selectedCount * ticketPrice;
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function populateUI() {
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieTicket.selectedIndex = selectedMovieIndex;
  }
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  updateSelectedCount();
});

movieTicket.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
updateSelectedCount();
