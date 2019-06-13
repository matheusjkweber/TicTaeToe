import React, { Component } from 'react'
import {  
    View,
    StyleSheet
} from 'react-native'
import Header from './Header'
import Board from './Board'
import Footer from './Footer'
import { gameState } from './../utils/gameLogic'

import { connect } from 'react-redux'

function mapStateToProps(state) {
    console.log(state)
    return {
        board: state.board,
        gameState: state.gameState
    }
}
class Game extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <Header style={styles.header} />
                <Board style={styles.board} board={this.props.board} />
                <Footer style={styles.footer} gameState={this.props.gameState} buttonAction={() => this.props.startNewGame()} />
            </View>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        startNewGame : () => dispatch({type: gameState.PLAYER1PLAYING})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game)

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