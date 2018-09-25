import filter from "lodash/filter"
import findIndex from "lodash/findIndex"

import {
  SHOW_DECK,
  REMOVE_DECK_SUCCEEDED,
  ADD_CARD_SUCCEEDED,
  ADD_DECK_SUCCEEDED,
} from "App/Store/decks/actions"

const initialState = {
  list: [],
  current: {}
};

export default function (state = initialState, action) {
  const decksList = state.list
  const currentDeck = state.current
  switch (action.type) {
    case ADD_CARD_SUCCEEDED:
      currentDeck.cards.push(action.payload)
      return {
        ...state,
        list: [...decksList],
        current: {...currentDeck}
      }
      break;
    case ADD_DECK_SUCCEEDED:
      return { ...state, list: [...decksList, action.payload]}
    case SHOW_DECK:
      return { ...state, current: action.payload}
    case REMOVE_DECK_SUCCEEDED:
      return { ...state, list: filter(decksList, deck => deck.id !== action.payload)}
    default:
      return state;
  }
}
