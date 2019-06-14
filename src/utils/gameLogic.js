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

export const victoryConditions = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2],
    [0, 0], [1, 0], [2, 0],
    [0, 1], [1, 1], [1, 2],
    [0, 2], [1, 2], [2, 2],
    [0, 0], [1, 1], [2, 2],
    [0, 2], [1, 1], [2, 0],
  ]
  

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

const won = board => {
    board.forEach(col => {
        console.log(col[0])
        let result = col.filter(field => (field.fieldValue === gameState.PLAYER1PLAYED))
        console.log(result)
    })
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
    won
}