// =============================================
// YEJI DEAL: card list
// One line per KIND of card. "count" = how many copies are in the deck.
// Day 6: Money (20) + Collections (23) = 43 cards.
// Wilds, Rent and Action cards get added later.
// =============================================
 
const CARD_LIST = [
  // ---------- MONEY (20) ----------
  { count: 6, name: "Money", type: "Money", value: 1 },
  { count: 5, name: "Money", type: "Money", value: 2 },
  { count: 3, name: "Money", type: "Money", value: 3 },
  { count: 3, name: "Money", type: "Money", value: 4 },
  { count: 2, name: "Money", type: "Money", value: 5 },
  { count: 1, name: "Money", type: "Money", value: 10 },
 
  // ---------- COLLECTIONS (23) ----------
  // count = cards needed for a full set
  // rent = rent by number of cards you hold, e.g. [1, 3] = 1 card: 1♡, 2 cards: 3♡
  { count: 2, name: "Lightstick Ocean",     type: "Collection", value: 1, rent: [1, 3] },
  { count: 2, name: "Fansign Moments",      type: "Collection", value: 4, rent: [3, 8] },
  { count: 3, name: "Photocard Binder",     type: "Collection", value: 1, rent: [1, 2, 3] },
  { count: 3, name: "Selca Gallery",        type: "Collection", value: 2, rent: [1, 2, 4] },
  { count: 3, name: "Dance Practice Clips", type: "Collection", value: 2, rent: [2, 3, 5] },
  { count: 3, name: "Fancam Folder",        type: "Collection", value: 3, rent: [2, 4, 6] },
  { count: 3, name: "Variety Show Clips",   type: "Collection", value: 3, rent: [2, 4, 7] },
  { count: 4, name: "Stage Outfit Closet",  type: "Collection", value: 2, rent: [1, 2, 3, 4] },
];