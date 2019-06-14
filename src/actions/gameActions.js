import { 
    gameState 
} from './../utils/gameLogic' 

export function StartNewGame() {
    return {
        type: gameState.GAMESTARTED
    }
}

export function EndRound(state, board) {
    return {
        type: state,
        payload: board
    }
}