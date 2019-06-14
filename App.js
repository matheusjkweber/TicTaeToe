import React, { Component } from 'react';
import Game from './src/components/Game'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { appReducer } from './src/reducers/appReducer'

const store = createStore(appReducer)

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Game />
        </Provider>
    );
  }
}
