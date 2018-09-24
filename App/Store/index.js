import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootSaga from "App/Store/saga";
import rootReducer from "App/Store/reducer";

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga);

export { store, persistor };
