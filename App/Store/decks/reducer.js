import filter from "lodash/filter";

import {
  SHOW_DECK,
  REJECT_CARD,
  REMOVE_DECK_SUCCEEDED,
  ADD_CARD_SUCCEEDED,
  ADD_DECK_SUCCEEDED
} from "App/Store/decks/actions";

const initialState = {
  list: [],
  current: {}
};

export default function(state = initialState, action) {
  const decksList = state.list;
  const currentDeck = state.current;
  switch (action.type) {
    case ADD_CARD_SUCCEEDED:
      currentDeck.cards.push(action.payload);
      return {
        ...state,
        list: [...decksList],
        current: { ...currentDeck }
      };
    case ADD_DECK_SUCCEEDED:
      return { ...state, list: [...decksList, action.payload] };
    case SHOW_DECK:
      return { ...state, current: action.payload };
    case REJECT_CARD:
      currentDeck.cards[action.payload.index] = action.payload.newCard;
      return {
        ...state,
        current: { ...currentDeck }
      };
    case REMOVE_DECK_SUCCEEDED:
      return {
        ...state,
        list: filter(decksList, deck => deck.id !== action.payload)
      };
    default:
      return state;
  }
}
