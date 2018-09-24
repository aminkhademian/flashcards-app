export const ADD_DECK = "ADD_DECK"
export const ADD_DECK_SUCCEEDED = "ADD_DECK_SUCCEEDED"

export const REMOVE_DECK = "REMOVE_DECK"
export const REMOVE_DECK_SUCCEEDED = "REMOVE_DECK_SUCCEEDED"

export const addDeck = payload => ({
  type: ADD_DECK,
  payload
})

export const removeDeck = payload => ({
  type: REMOVE_DECK,
  payload
})