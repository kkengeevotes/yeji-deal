// Our cards as DATA: an array [ ] of objects { }
const cards = [
  { name: "Fansign Moments", type: "Collection", value: 4, rent: "3 / 8" },
  { name: "Selca Gallery",   type: "Collection", value: 2, rent: "1 / 2 / 4" },
  { name: "Money",           type: "Money",      value: 5 },
  { name: "Fancam Folder",   type: "Collection", value: 3, rent: "2 / 4 / 6" },
];

console.log("Number of cards:", cards.length);

// Find the empty box we made in the HTML
const hand = document.getElementById("hand");

// LOOP: for each card in the list, run the code inside { }
for (const card of cards) {
  // 1. Make a new empty <div>
  const div = document.createElement("div");
  div.className = "card";

  // 2. Money cards get an extra class, so CSS can colour them differently
  if (card.type === "Money") {
    div.classList.add("money");
  }

  // 3. Fill it. The `backticks` let us drop values in with ${ }
  div.innerHTML = `
    <div class="card-value">${card.value}♡</div>
    <div class="card-type">${card.type}</div>
    <h2 class="card-name">${card.name}</h2>
  `;

  // 4. Only Collection cards have rent, so only add it if it exists
  if (card.rent) {

    div.innerHTML += `<p class="card-rent">Rent: ${card.rent}</p>`;
  }

  // 5. Put the finished card inside the hand box
  hand.appendChild(div);
}