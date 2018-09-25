export const ADD_DECK = "ADD_DECK";
export const ADD_DECK_SUCCEEDED = "ADD_DECK_SUCCEEDED";

export const SHOW_DECK = "SHOW_DECK";

export const ADD_CARD = "ADD_CARD";
export const ADD_CARD_SUCCEEDED = "ADD_CARD_SUCCEEDED";

export const REMOVE_DECK = "REMOVE_DECK";
export const REMOVE_DECK_SUCCEEDED = "REMOVE_DECK_SUCCEEDED";

export const addDeck = payload => ({
  type: ADD_DECK,
  payload
});

export const showDeck = payload => ({
  type: SHOW_DECK,
  payload
});

export const addCard = (deckId, payload) => ({
  type: ADD_CARD,
  payload,
  deckId
});

export const removeDeck = payload => ({
  type: REMOVE_DECK,
  payload
});
