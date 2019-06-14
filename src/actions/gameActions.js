import { 
    gameState 
} from './../utils/gameLogic' 

export const actionNames = {
    GAMESTARTED: gameState.GAMESTARTED,
    PLAYER1PLAYED: gameState.PLAYER1PLAYED,
    PLAYER2PLAYED: gameState.PLAYER2PLAYED,
    PLAYER1WIN: gameState.PLAYER1WIN,
    PLAYER2WIN: gameState.PLAYER2WIN,
    TIE: gameState.TIE,
    UPDATER_RANKING: "UPDATE_RANKING"

}
export function StartNewGame() {
    return {
        type: actionNames.GAMESTARTED
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

export function EndGame(state, ranking, victoryLine) {
    return {
        type: state,
        payload: {
            ranking: ranking,
            victoryLine: victoryLine
        }
    }
}

export function UpdateRanking(ranking) {
    return {
        type: actionNames.UPDATER_RANKING,
        payload: {
            ranking: ranking
        }
    }
}