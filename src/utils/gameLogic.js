const gameState = {
    PLAYER1PLAYING: 'player1playing',
    PLAYER2PLAYING: 'player2playing',
    PLAYER1WIN: 'player1win',
    PLAYER2WIN: 'player2win',
    TIE: 'tie',
    PAUSE: 'paused'
}

const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                horizontalLine: null,
                leftToRightDiagonal: null,
                rightToLeftDiagonal: null,
                fieldValue: null,
            }
        })
    })
}

export {
    createBoard,
    gameState
}