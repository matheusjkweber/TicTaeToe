import React from 'react'
import { 
        View,
        StyleSheet,
        TouchableWithoutFeedback
} from 'react-native'
import common from './../style/common'
import Icon from 'react-native-vector-icons/FontAwesome'
import { gameState } from '../utils/gameLogic';

export default props => {
    let style = null
    let diagonalOrientation = null

    if(props.horizontalLine) {
        style = styles.horizontalLine
    } else if(props.leftToRightDiagonal) {
        style = styles.diagonalLine
        diagonalOrientation = {transform: [{rotate: '45deg'}]};
    } else if(props.rightToLeftDiagonal) {
        style = styles.diagonalLine
        diagonalOrientation = {transform: [{rotate: '-45deg'}]};
    } else if(props.verticalLine) {
        style = styles.verticalLine
        diagonalOrientation = {transform: [{rotate: '90deg'}]};
    }

    let fieldValue = null

    if(props.fieldValue === gameState.PLAYER1PLAYED) {
        fieldValue = <Icon name="circle-thin" size={common.sizes.fieldSize} color={common.colors.player1Color} />
    } else if(props.fieldValue === gameState.PLAYER2PLAYED) {
        fieldValue = <Icon name="times" size={common.sizes.fieldSize} color={common.colors.player2Color} />
    }

    return (
        <TouchableWithoutFeedback onPress={props.onSelect}>
            <View style={styles.container}>
                <View style={[styles.fieldValue]}>
                    {fieldValue}
                </View>
                <View style={[style, diagonalOrientation]} />
                
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: common.sizes.fieldSize,
        height: common.sizes.fieldSize,
        borderWidth: 1,
        backgroundColor: '#E0E0E0',
        borderColor: common.colors.borderColor
    },
    horizontalLine: {
        height: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: '-50%'
    },
    diagonalLine: {
        height: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: '-50%',
        width: '140%',
        left: '-20%'
    },
    verticalLine: {
        height: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: '-50%',
        width: '100%',
    },
    fieldValue: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})