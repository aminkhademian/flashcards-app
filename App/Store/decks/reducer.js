import { ADD_DECK_TO_STATE_SUCCEEDED } from "App/Store/decks/actions"

const initialState = {
  list: [],
  current: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_DECK_TO_STATE_SUCCEEDED:
      return {...state, list: action.payload}
    default:
      return state;
  }
}
