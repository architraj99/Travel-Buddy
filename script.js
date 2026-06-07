const placeInput = document.getElementById("placeInput");
const dateInput = document.getElementById("dateInput");
const budgetInput = document.getElementById("budgetInput");

const addBtn = document.getElementById("addBtn");
const tripList = document.getElementById("tripList");

addBtn.addEventListener("click", addTrip);

function addTrip() {

    let place = placeInput.value;
    let date = dateInput.value;
    let budget = budgetInput.value;

    if (place === "" || date === "" || budget === "") {
        alert("Fill all fields");
        return;
    }

    let card = document.createElement("div");
    card.className = "trip-card";

    card.innerHTML = 
    `
        <h3>${place}</h3>
        <p>Date: ${date}</p>
        <p>Budget: ₹${budget}</p>
    `;

    tripList.appendChild(card);

    placeInput.value = "";
    dateInput.value = "";
    budgetInput.value = "";
}