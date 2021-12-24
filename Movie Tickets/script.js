// first thing we want to do is grab the container

const container = document.querySelector('.container');
// grabs first one 
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
// selectorAll will select ALL of them, and put them in a node list, similar to a list
// so here, we are selecting all seats that are NOT occupied
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;
// this grabs the value of the current (not selected, need an event listener for that)
// note that the value comes out as a string, so add a "+" or parseInt to make it a number


function updateSelectedSeats() {
  const selectedSeats = document.querySelectorAll('.row .selected');
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;  
}

//    The Movie Select Event
// since this is a select list, you want a 'change' event
movieSelect.addEventListener('change', (e)=> {
  ticketPrice = +e.target.value
  updateSelectedSeats();
})



//    The Seat Click Event
// we want to add a class to ea selected seat.
// so one way is to use a forEach loop and add an event listener to ea seat
// better way: add an event listener to the container, make sure a seat is being clicked, then do something
container.addEventListener('click', (e) => {
  // console.log(e.target);
  // this shows us whatever's being clicked on.:<div class="screen"></div> or <div class="seat"></div> 
  // so if (e.target.classList.contains('seat')) narrows it down to seats only
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    // can do classList.add, .remove, or .toggle
    // toggle works beautifully here. on click, seat becomes blue. clicked again, its white.

    // to count all the selected Seats
    updateSelectedSeats();
  }
})