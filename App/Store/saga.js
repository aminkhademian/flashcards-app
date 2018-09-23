import { all } from "redux-saga/effects";

import decksSagas from "App/Store/decks/sagas"

export default function* rootSaga() {
  yield all([
    decksSagas()
  ]);
}
