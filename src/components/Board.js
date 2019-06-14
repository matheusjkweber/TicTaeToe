/**
 * Board component of the game, it build the board using the Field component.
 *
 * 
 */

import React from 'react'
import { 
    View,
    StyleSheet
} from 'react-native'
import Field from './Field'

export default props => {
    // Map the matrix board array to react elements.
    const rows = props.board.map((row, r) => {
        const columns = row.map((field, c) => {
            let leftToRightDiagonal = false
            let rightToLeftDiagonal = false
            let horizontalLine = false
            let verticalLine = false

            if(props.victoryLine != null) {
                props.victoryLine.forEach(victoryField => {
                    if(field.row === victoryField.row && field.column === victoryField.column) {
                        leftToRightDiagonal = props.victoryLine[0].row === 0 && props.victoryLine[0].column === 0 && props.victoryLine[2].column === 2 && props.victoryLine[2].row === 2
                        rightToLeftDiagonal = props.victoryLine[0].row === 0 && props.victoryLine[0].column === 2 && props.victoryLine[2].column === 0 && props.victoryLine[2].row === 2
                        verticalLine = props.victoryLine[0].row === 0 && props.victoryLine[2].row === 2 && props.victoryLine[0].column === props.victoryLine[2].column
                        horizontalLine = !(leftToRightDiagonal || rightToLeftDiagonal || verticalLine)
                    }
                })
            }
            return <Field {...field} key={c} onSelect={() => props.onSelectField(r, c)} 
            leftToRightDiagonal={leftToRightDiagonal} rightToLeftDiagonal={rightToLeftDiagonal} horizontalLine={horizontalLine} verticalLine={verticalLine} />
        })
        return <View key={r}
            style={{flexDirection: 'row'}}>{columns}</View>
    })
    return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
    }
})