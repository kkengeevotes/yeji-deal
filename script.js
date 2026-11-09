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

// ===== THE GAME STATE =====
// One object that describes the whole table.
function newGame(playerNames) {
  const state = {
    deck: shuffle(buildDeck()),   // the face-down draw pile
    discard: [],                  // used cards go here
    players: [],                  // filled in below
    currentPlayer: 0,             // whose turn: 0 = first player
  };

  // Every player gets the same empty spaces
  for (const name of playerNames) {
    state.players.push({
      name: name,
      hand: [],       // private: only this player sees it
      bank: [],       // public: their money
      playArea: [],   // public: their laid-down Collections
    });
  }
  return state;
}

// ===== DRAWING =====
// Moves cards from the top of the deck into a player's hand.
function drawCards(state, player, howMany) {
  for (let i = 0; i < howMany; i++) {
    if (state.deck.length === 0) {
      break;   // deck is empty: stop (Day 15 handles reshuffling)
    }
    const card = state.deck.pop();   // .pop() REMOVES the last card and gives it to us
    player.hand.push(card);
  }

}

function dealStartingHands(state) {
  for (const player of state.players) {
    drawCards(state, player, 5);
  }
}

// ===== START A GAME =====
let game = newGame(["Dita", "Friend"]);
dealStartingHands(game);

// ===== SCREEN STATE (only this phone's view, not the game) =====
let handHidden = true;   // start covered, so player 1 also gets a reveal

// ===== FIND THE SCREEN PARTS (once) =====
const deckInfo   = document.getElementById("deck-info");
const handLabel  = document.getElementById("hand-label");
const hand       = document.getElementById("hand");
const endTurnBtn = document.getElementById("end-turn-btn");
const cover      = document.getElementById("cover");
const coverName  = document.getElementById("cover-name");

// ===== RENDER: draw the screen from the state =====
function render() {
  const player = game.players[game.currentPlayer];

  deckInfo.textContent = "Deck: " + game.deck.length + " cards left";
  handLabel.textContent = player.name + "'s hand (" + player.hand.length + " cards)";

  hand.innerHTML = "";

  if (handHidden) {
    // Cover up, and don't even draw the cards underneath. Nothing to peek at!
    cover.classList.remove("hidden");
    coverName.textContent = player.name;
  } else {
    cover.classList.add("hidden");
    for (const card of player.hand) {
      hand.appendChild(createCardElement(card));
    }
  }
}

// ===== ACTIONS =====
function endTurn() {
  game.currentPlayer = (game.currentPlayer + 1) % game.players.length;  // next player
  handHidden = true;                                                     // cover up
  render();
}

function revealHand() {
  handHidden = false;
  render();
}

endTurnBtn.addEventListener("click", endTurn);
cover.addEventListener("click", revealHand);

render();   // draw the first screen