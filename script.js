const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.getElementById("count");
const total = document.getElementById("total");

const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

populateUI();

function updateSelectedMovie(movieIndex, moviePrice) {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);
}

function updatedSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsIndex = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
  const selectedSeatIndex = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeatIndex !== null && selectedSeatIndex.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeatIndex.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updatedSelectedCount();
  updateSelectedMovie(e.target.selectedIndex, e.target.value);
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updatedSelectedCount();
  }
});
