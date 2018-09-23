import { combineReducers } from "redux";

import deckReducer from "App/Store/decks/reducer"

const reducers = {
  decks: deckReducer
};

export default combineReducers(reducers);
