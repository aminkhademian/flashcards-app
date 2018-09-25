import { takeLatest, fork, put, call } from "redux-saga/effects";

import {
  ADD_DECK,
  ADD_DECK_SUCCEEDED,
  ADD_CARD,
  ADD_CARD_SUCCEEDED,
  REMOVE_DECK,
  REMOVE_DECK_SUCCEEDED,
} from "App/Store/decks/actions";

function* addDeck({ payload }) {
  yield put({
    type: ADD_DECK_SUCCEEDED,
    payload
  });
}

function* addCard({ payload, deckId }) {
  yield put({
    type: ADD_CARD_SUCCEEDED,
    payload,
    deckId
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
function* watchAddCard() {
  yield takeLatest(ADD_CARD, addCard);
}
function* watchRemoveDeck() {
  yield takeLatest(REMOVE_DECK, removeDeck);
}

export default function* decksSagas() {
  yield fork(watchAddDeck);
  yield fork(watchAddCard);
  yield fork(watchRemoveDeck);
}
