const container = document.querySelector(".container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieTicket = document.getElementById("movie");
let ticketPrice = +movieTicket.value;

function updateSelectedCount() {
  const seatSelectesd = document.querySelectorAll(".row .seat.selected");
  const selectedCount = seatSelectesd.length;
  count.innerText = selectedCount;
  total.innerText = selectedCount * ticketPrice;
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
  updateSelectedCount();
});
