/**
 * Game logic file, will hold all the functions and enums needed in order to play the game.
 * 
 * 
 */

 // All the states that the game can assume.
 const gameState = {
    GAMESTARTED: 'gameStarted',
    PLAYER1PLAYING: 'player1Playing',
    PLAYER1PLAYED: 'player1Played',
    PLAYER2PLAYING: 'player2Playing',
    PLAYER2PLAYED: 'player2Played',
    PLAYER1WIN: 'player1win',
    PLAYER2WIN: 'player2win',
    TIE: 'tie',
    PAUSE: 'paused'
}

// All the lines that the player can win.
function createVictoryConditions() {
    return [
        [{r: 0, c: 0, played: null}, {r: 0, c: 1, played: null}, {r: 0, c: 2, played: null}],
        [{r: 1, c: 0, played: null}, {r: 1, c: 1, played: null}, {r: 1, c: 2, played: null}],
        [{r: 2, c: 0, played: null}, {r: 2, c: 1, played: null}, {r: 2, c: 2, played: null}],
    
        [{r: 0, c: 0, played: null}, {r: 1, c: 0, played: null}, {r: 2, c: 0, played: null}],
        [{r: 0, c: 1, played: null}, {r: 1, c: 1, played: null}, {r: 2, c: 1, played: null}],
        [{r: 0, c: 2, played: null}, {r: 1, c: 2, played: null}, {r: 2, c: 2, played: null}],
    
        [{r: 0, c: 0, played: null}, {r: 1, c: 1, played: null}, {r: 2, c: 2, played: null}],
        [{r: 0, c: 2, played: null}, {r: 1, c: 1, played: null}, {r: 2, c: 0, played: null}],
      ]
} 

// Initial ranking.
const createRanking = () => {
    return {
        player1Victories: 0,
        player2Victories: 0,
        totalGames: 0
    }
}

// Update ranking.
const updateRanking = (ranking, state) => {
    let copyRanking = {...ranking}
    if(state === gameState.PLAYER1WIN) {
        copyRanking.player1Victories++
    } else if(state === gameState.PLAYER2WIN) {
        copyRanking.player2Victories++
    }

    copyRanking.totalGames++
    return copyRanking
}

// Initial board.
const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                horizontalLine: null,
                leftToRightDiagonal: null,
                rightToLeftDiagonal: null,
                fieldValue: null,
                row: row,
                column: column
            }
        })
    })
}

// Clone the board.
const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

// Update the victory conditions by copying it and filling the field.
const updateVictoryConditions = (victoryConditions, field) => {
    let cloneVictories = [...victoryConditions]
    let line = 0
    cloneVictories.forEach ( victoryLine => {
        let fields = 0
        victoryLine.forEach ( victoryField => {
            if(victoryField.r === field.row && victoryField.c === field.column) {
                cloneVictories[line][fields].played = field.fieldValue
            }
            fields++
        })
        line++
    })

    return cloneVictories
}

// Return if someone and who wins the game.
const won = victoryConditions => {
    let victory = null
    victoryConditions.forEach( victoryLine => {
        let player1Win = victoryLine.filter(field => field.played === gameState.PLAYER1PLAYED).length === 3
        let player2Win = victoryLine.filter(field => field.played === gameState.PLAYER2PLAYED).length === 3
        if(player1Win || player2Win) {
            victory = victoryLine
        }
    })    
    return victory
}

// Return if there is a tie in the game.
const tie = victoryConditions => {
    let countPlayed = 0
    
    victoryConditions.forEach( victoryLine => {
        countPlayed += victoryLine.filter(field => field.played !== null).length === 3 ? 1 : 0
    })

    if(countPlayed === 8)  {
        return true
    }
    return false
}

export {
    createBoard,
    gameState,
    cloneBoard,
    createVictoryConditions,
    updateVictoryConditions,
    tie,
    won,
    createRanking,
    updateRanking
}