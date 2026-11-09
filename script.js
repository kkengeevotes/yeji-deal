// ===== FUNCTION 1: build the deck =====
// Turns "Money ×6" into 6 separate card objects.
function buildDeck() {
  const deck = [];
  let nextId = 1;

  for (const kind of CARD_LIST) {
    // Repeat "count" times: i = 0, 1, 2... up to count - 1
    for (let i = 0; i < kind.count; i++) {
      // { ...kind } copies all the facts of this kind of card.
      // We also give each copy its own id number, so every card is unique.
      deck.push({ ...kind, id: nextId });
      nextId = nextId + 1;
    }
  }
  return deck;   // hand the finished deck back
}

// ===== FUNCTION 2: shuffle =====
// The standard fair shuffle (called Fisher–Yates).
// Go from the last card to the first. Swap each one with
// a random card at or before its position.
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));   // random position 0..i
    [deck[i], deck[j]] = [deck[j], deck[i]];        // swap the two cards
  }
  return deck;
}

// ===== FUNCTION 3: make the HTML for one card =====
// Same code as Day 6, just moved into a function so we can reuse it.
function createCardElement(card) {
  const div = document.createElement("div");
  div.className = "card";

  if (card.type === "Money") {
    div.classList.add("money");
  }

  div.innerHTML = `
    <div class="card-value">${card.value}♡</div>
    <div class="card-type">${card.type} #${card.id}</div>
    <h2 class="card-name">${card.name}</h2>
  `;

  if (card.rent) {
    div.innerHTML += `<p class="card-rent">Rent: ${card.rent.join(" / ")}</p>`;
  }
  return div;
}

// ===== Using the functions =====
const hand = document.getElementById("hand");
const deckInfo = document.getElementById("deck-info");
const shuffleBtn = document.getElementById("shuffle-btn");

let deck = shuffle(buildDeck());   // build it, then shuffle it

function showTopCards() {
  hand.innerHTML = "";                       // clear the old cards
  const topTen = deck.slice(0, 10);          // the first 10 cards
  for (const card of topTen) {
    hand.appendChild(createCardElement(card));
  }
  deckInfo.textContent = "Deck: " + deck.length + " cards. Showing the top 10.";
}

showTopCards();
console.log("Deck size:", deck.length);   // should be 43

// Tap the button to shuffle the same deck again
shuffleBtn.addEventListener("click", function () {
  shuffle(deck);
  showTopCards();
});