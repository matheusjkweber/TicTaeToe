import { 
    createBoard,
    gameState,
    createVictoryConditions,
    createRanking
  } from '../utils/gameLogic'

import {
    actionNames
} from '../actions/gameActions'
  
  const initialState = {
    board: createBoard(3, 3),
    victoryConditions: createVictoryConditions(),
    gameState: gameState.PAUSE,
    victoryLine: null,
    ranking: createRanking()
  }

  
export const appReducer = (state = initialState, action) => {
    switch(action.type) {
      case actionNames.GAMESTARTED: 
        return {
          board: createBoard(3, 3),
          victoryConditions: createVictoryConditions(),
          gameState: gameState.PLAYER1PLAYING,
          ranking: state.ranking,
          victoryLine: null
        }
      case actionNames.PLAYER1PLAYED:
      case actionNames.PLAYER2PLAYED:
        return {
          board: action.payload.board,
          victoryConditions: action.payload.victoryConditions,
          gameState: action.type == gameState.PLAYER1PLAYED ? gameState.PLAYER2PLAYING : gameState.PLAYER1PLAYING,
          ranking: state.ranking,
          victoryLine: state.victoryLine
        }
      case actionNames.PLAYER1WIN:
      case actionNames.PLAYER2WIN:
      case actionNames.TIE:
        return {
          board: state.board,
          victoryConditions: state.victoryConditions,
          gameState: action.type,
          ranking: action.payload.ranking,
          victoryLine: action.payload.victoryLine
        }
      case actionNames.UPDATER_RANKING:
        return {
          board: state.board,
          victoryConditions: state.victoryConditions,
          gameState: state.gameState,
          ranking: action.payload.ranking,
          victoryLine: state.victoryLine
        }
    }
    return state
  }