import { 
    gameState 
} from './../utils/gameLogic' 

export function StartNewGame() {
    return {
        type: gameState.GAMESTARTED
    }
}

export function EndRound(state, board, victoryConditions) {
    return {
        type: state,
        payload: {
            board: board,
            victoryConditions: victoryConditions
        }
    }
}

export function EndGame(state) {
    return {
        type: state
    }
}