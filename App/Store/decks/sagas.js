import { takeLatest, fork, put, call } from "redux-saga/effects";

import {
  ADD_DECK_TO_STATE,
  ADD_DECK_TO_STATE_SUCCEEDED
} from "App/Store/decks/actions";

function* addDeckToState({ payload }) {
  yield put({
    type: ADD_DECK_TO_STATE_SUCCEEDED,
    payload
  });
}

function* watchAddDeckToState() {
  yield takeLatest(ADD_DECK_TO_STATE, addDeckToState);
}

export default function* decksSagas() {
  yield fork(watchAddDeckToState);
}
