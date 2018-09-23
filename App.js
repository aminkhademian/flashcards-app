import React from 'react';
import { Root } from 'config/routes'
import { Provider } from "react-redux";
import Store from "App/Store"

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Root />
      </Provider>
    )
  }
}
