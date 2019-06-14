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

export function EndGame(state, ranking) {
    return {
        type: state,
        payload: {
            ranking: ranking
        }
    }
}

export function UpdateRanking(ranking) {
    return {
        type: "UPDATE_RANKING",
        payload: {
            ranking: ranking
        }
    }
}