import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import Game from './src/components/Game'
import { 
  createBoard,
  gameState
} from './src/utils/gameLogic'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

const initialState = {
  board: createBoard(3, 3),
  gameState: gameState.PAUSE
}
const reducer = (state = initialState) => {
  return state
}

const store = createStore(reducer)

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  createState = () => {
     return {
      board: createBoard(3, 3),
      gameState: gameState.PAUSE
    }
  }

  render() {
    return (
        <Provider store={store}>
          <Game board={this.state.board} gameState={this.state.gameState}/>
        </Provider>
    );
  }
}
