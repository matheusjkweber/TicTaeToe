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
    createBoard
}