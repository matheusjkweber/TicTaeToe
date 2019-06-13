import React, { Component } from 'react'
import {  
    View,
    StyleSheet
} from 'react-native'
import common from '../style/common'
import Header from './Header'
import Field from './Field'
import Board from './Board'
import Footer from './Footer'

export default props => {
    return (
        <View style={styles.mainContainer}>
            <Header style={styles.header} />
            <Board style={styles.board} board={props.board} />
            <Footer style={styles.footer} gameState={props.gameState} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        flex: 1
    },
    board: {
        flex: 3
    },
    footer: {
        flex: 1
    }
})