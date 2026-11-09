// =============================================
// YEJI DEAL: script.js (complete file as of Day 10)
// =============================================

// ===== FUNCTION 1: build the deck =====
// Turns "Money ×6" into 6 separate card objects.
function buildDeck() {
  const deck = [];
  let nextId = 1;

  for (const kind of CARD_LIST) {
    for (let i = 0; i < kind.count; i++) {
      deck.push({ ...kind, id: nextId });
      nextId = nextId + 1;
    }
  }
  return deck;
}

// ===== FUNCTION 2: shuffle (Fisher–Yates) =====
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// ===== FUNCTION 3: make the HTML for one card =====
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
function newGame(playerNames) {
  const state = {
    deck: shuffle(buildDeck()),
    discard: [],
    players: [],
    currentPlayer: 0,
  };

  for (const name of playerNames) {
    state.players.push({
      name: name,
      hand: [],
      bank: [],
      playArea: [],
    });
  }
  return state;
}

// ===== DRAWING =====
function drawCards(state, player, howMany) {
  for (let i = 0; i < howMany; i++) {
    if (state.deck.length === 0) {
      break;
    }
    const card = state.deck.pop();
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
    // Cover up, and don't even draw the cards underneath
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
  game.currentPlayer = (game.currentPlayer + 1) % game.players.length;
  handHidden = true;
  render();
}

function revealHand() {
  handHidden = false;
  render();
}

endTurnBtn.addEventListener("click", endTurn);
cover.addEventListener("click", revealHand);

render();
