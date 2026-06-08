const placeInput = document.getElementById("placeInput");
const dateInput = document.getElementById("dateInput");
const budgetInput = document.getElementById("budgetInput");

const addBtn = document.getElementById("addBtn");
const tripList = document.getElementById("tripList");
const tripCount = document.getElementById("tripCount");

let trips = JSON.parse(localStorage.getItem("trips")) || [];

showTrips();

addBtn.addEventListener("click", addTrip);

function addTrip() {

    let place = placeInput.value;
    let date = dateInput.value;
    let budget = budgetInput.value;

    if (place === "" || date === "" || budget === "") {
        alert("Fill all fields");
        return;
    }

    trips.push( {
        place: place,
        date: date,
        budget: budget
    });

    saveTrips();
    showTrips();

    placeInput.value = "";
    dateInput.value = "";
    budgetInput.value = "";
}

function showTrips() {

    tripList.innerHTML = "";
    tripCount.textContent = trips.length + "Trips Added";

    trips.forEach(function(trip) {

        let daysLeft = getDaysLeft(trip.date);

        let card = document.createElement("div");
        card.className = "trip-card";

        card.innerHTML = 
        `
            <h3>${trip.place}</h3>
            <p>Date: ${trip.date}</p>
            <p>Budget: ₹${trip.budget}</p>

            <p class="days-left">${daysLeft} Days Left</p>
        `;
   
    tripList.appendChild(card);

    });
}
    function saveTrips() {

        localStorage.setItem("trips",JSON.stringify(trips));
    }
  


function getDaysLeft(date) {

    let today = new Date();
    let tripDate = new Date(date);

    let diff = tripDate - today;

    return Math.ceil(diff / (1000 * 60 * 60 * 24) );
}