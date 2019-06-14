import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import Game from './src/components/Game'
import { 
  createBoard,
  gameState,
  createVictoryConditions,
  createRanking
} from './src/utils/gameLogic'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

const initialState = {
  board: createBoard(3, 3),
  victoryConditions: createVictoryConditions(),
  gameState: gameState.PAUSE,
  ranking: createRanking()
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case gameState.GAMESTARTED: 
      return {
        board: createBoard(3, 3),
        victoryConditions: createVictoryConditions(),
        gameState: gameState.PLAYER1PLAYING,
        ranking: createRanking()
      }
    case gameState.PLAYER1PLAYED:
    case gameState.PLAYER2PLAYED:
      return {
        board: action.payload.board,
        victoryConditions: action.payload.victoryConditions,
        gameState: action.type == gameState.PLAYER1PLAYED ? gameState.PLAYER2PLAYING : gameState.PLAYER1PLAYING,
        ranking: state.ranking
      }
    case gameState.PLAYER1WIN:
    case gameState.PLAYER2WIN:
    case gameState.TIE:
      return {
        board: state.board,
        victoryConditions: state.victoryConditions,
        gameState: action.type,
        ranking: action.payload.ranking
      }
  }
  return state
}

const store = createStore(reducer)

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Game />
        </Provider>
    );
  }
}
