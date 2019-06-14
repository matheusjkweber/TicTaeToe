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

const createRanking = () => {
    return {
        player1Victories: 0,
        player2Victories: 0,
        totalGames: 0
    }
}

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

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

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

const getVictoryLine = (board, row, column) => {
    const fields = []                                       
    const rows = [row - 1, row, row + 1]                    
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c => {
            const diferent = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            if (diferent && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
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