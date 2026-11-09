// CARD_LIST comes from cards.js, which loaded first
const hand = document.getElementById("hand");

let totalCards = 0;   // we'll add up all the copies

for (const card of CARD_LIST) {
  // Count the copies: 6 + 5 + 3 + ...
  totalCards = totalCards + card.count;

  const div = document.createElement("div");
  div.className = "card";

  if (card.type === "Money") {
    div.classList.add("money");
  }

  div.innerHTML = `
    <div class="card-value">${card.value}♡</div>
    <div class="card-type">${card.type} ×${card.count}</div>
    <h2 class="card-name">${card.name}</h2>
  `;

  if (card.rent) {
    // .join(" / ") turns [1, 2, 4] into the text "1 / 2 / 4"
    div.innerHTML += `<p class="card-rent">Rent: ${card.rent.join(" / ")}</p>`;
  }

  hand.appendChild(div);
}

console.log("Kinds of cards:", CARD_LIST.length);   // should be 14
console.log("Total cards:", totalCards);            // should be 43