const placeInput = document.getElementById("placeInput");
const dateInput = document.getElementById("dateInput");
const budgetInput = document.getElementById("budgetInput");

const addBtn = document.getElementById("addBtn");
const tripList = document.getElementById("tripList");
const tripCount = document.getElementById("tripCount");
const totalBudget = document.getElementById("totalBudget");
const searchInput = document.getElementById("searchInput");

const itemInput = document.getElementById("itemInput");
const addItemBtn = document.getElementById("addItemBtn");

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

function showTrips(searchText = "") {

    tripList.innerHTML = "";
    tripCount.textContent = trips.length + "Trips Added";

    let budgetTotal = 0;

    trips.forEach(function(trip, index) {
        
        budgetTotal += Number(trip.budget);

        if(searchText && !trip.place.toLowerCase().includes(searchText.toLowerCase()) ) {
            return;
        }
 
        let daysLeft = getDaysLeft(trip.date);

        let card = document.createElement("div");
        card.className = "trip-card";

        card.innerHTML = 
        `
            <h3>${trip.place}</h3>
            <p>Date: ${trip.date}</p>
            <p>Budget: ₹${trip.budget}</p>

            <p class="days-left">${daysLeft} Days Left</p>

            <button class="delete-btn" data-id="${index}">Remove</button>
        `;
   
    tripList.appendChild(card);

    });

    totalBudget.textContent = "Total Budget: ₹" + budgetTotal;

    let deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(function(button) {

        button.addEventListener("click", function() {
            deleteTrip(button.dataset.id);
        });
    });
}

function deleteTrip(index) {

    trips.splice(index, 1);

    saveTrips();
    showTrips(searchInput.value);
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

searchInput.addEventListener("input", function() {
    
    showTrips(searchInput.value);
});

addItemBtn.addEventListener("click", function() {

    if(itemInput.value === "") {
        return;
    }

    let item = document.createElement("div");
    item.className = "check-item";

    item.innerHTML = 
    `
        <input type="checkbox">
        <label>${itemInput.value}</label>
    `;

    document.querySelector(".checklist-card").appendChild(item);
    itemInput.value = "";
}); 