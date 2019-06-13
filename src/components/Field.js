import React from 'react'
import { 
        View,
        Dimensions,
        StyleSheet
} from 'react-native'
import common from './../style/common'

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
    }

    return (
        <View style={styles.container}>
            <View style={[style, diagonalOrientation]} />
            <View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
        borderWidth: 1,
        backgroundColor: '#E0E0E0',
        borderColor: common.colors.borderColor
    },
    horizontalLine: {
        height: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: '50%'
    },
    diagonalLine: {
        height: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: '50%',
        width: '140%',
        left: '-20%'
    }
})