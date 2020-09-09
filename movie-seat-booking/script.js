const container = document.querySelector(".container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieTicket = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
let ticketPrice = +movieTicket.value;

function updateSelectedCount() {
  const seatSelectesd = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...seatSelectesd].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedCount = seatSelectesd.length;
  count.innerText = selectedCount;
  total.innerText = selectedCount * ticketPrice;
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
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
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
