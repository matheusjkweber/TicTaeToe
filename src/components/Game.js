import React, { Component } from 'react'
import {  
    View,
    StyleSheet
} from 'react-native'
import common from '../style/common'
import Header from './Header'
import Field from './Field'
import Board from './Board'

export default props => {
    return (
        <View style={styles.mainContainer}>
            <Header />
            <Board board={props.board} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
})