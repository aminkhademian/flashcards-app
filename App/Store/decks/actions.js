export const ADD_DECK_TO_STATE = "ADD_DECK_TO_STATE"
export const ADD_DECK_TO_STATE_SUCCEEDED = "ADD_DECK_TO_STATE_SUCCEEDED"

export const addDeckToState = payload => ({
  type: ADD_DECK_TO_STATE,
  payload
})