import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Root } from "config/routes"
import { store, persistor } from "App/Store";

export default class App extends React.Component {
  render() {
    console.log(store)
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    )
  }
}
