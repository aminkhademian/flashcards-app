import filter from "lodash/filter"

import {
  REMOVE_DECK_SUCCEEDED,
  ADD_DECK_SUCCEEDED,
} from "App/Store/decks/actions"

const initialState = {
  list: [],
  current: {}
};

export default function (state = initialState, action) {
  const decksList = state.list
  switch (action.type) {
    case ADD_DECK_SUCCEEDED:
      return { ...state, list: [...decksList, action.payload]}
    case REMOVE_DECK_SUCCEEDED:
      return { ...state, list: filter(decksList, deck => deck.id !== action.payload)}
    default:
      return state;
  }
}
