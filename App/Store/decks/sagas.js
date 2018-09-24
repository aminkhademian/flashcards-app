import { takeLatest, fork, put, call } from "redux-saga/effects";

import {
  ADD_DECK,
  ADD_DECK_SUCCEEDED,
  REMOVE_DECK,
  REMOVE_DECK_SUCCEEDED,
} from "App/Store/decks/actions";

function* addDeck({ payload }) {
  yield put({
    type: ADD_DECK_SUCCEEDED,
    payload
  });
}

function* removeDeck({ payload }) {
  yield put({
    type: REMOVE_DECK_SUCCEEDED,
    payload
  });
}

function* watchAddDeck() {
  yield takeLatest(ADD_DECK, addDeck);
}
function* watchRemoveDeck() {
  yield takeLatest(REMOVE_DECK, removeDeck);
}

export default function* decksSagas() {
  yield fork(watchAddDeck);
  yield fork(watchRemoveDeck);
}
