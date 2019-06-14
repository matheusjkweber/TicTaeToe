import React, { Component } from 'react'
import {  
    View,
    StyleSheet,
    Alert
} from 'react-native'
import Header from './Header'
import Board from './Board'
import Footer from './Footer'
import { 
        gameState,
        cloneBoard, 
        won
} from './../utils/gameLogic'

import { 
    StartNewGame,
    EndRound
} from '../actions/gameActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    return {
        board: state.board,
        gameState: state.gameState
    }
}

class Game extends Component {
    onSelectField = (row, column) => {
        // Verify if is in a valid state.
        if(this.props.gameState == gameState.PLAYER1PLAYING || this.props.gameState == gameState.PLAYER2PLAYING) {
            let board = cloneBoard(this.props.board)
            let field = board[row][column]
            // Verify if is already played.
            if(field.fieldValue !== null) {
                return
            }
    
            field.fieldValue = this.props.gameState == gameState.PLAYER1PLAYING ? gameState.PLAYER1PLAYED : gameState.PLAYER2PLAYED

            board[row][column] = field
            
            this.props.endRound(field.fieldValue, board)
            won(this.props.board)
        } 
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Header style={styles.header} />
                <Board style={styles.board} board={this.props.board} onSelectField={this.onSelectField}/>
                <Footer style={styles.footer} gameState={this.props.gameState} buttonAction={() => this.props.startNewGame()} />
            </View>
        )
    }
}

function mapDispatchToProps(dispatch, props){
    return {
        startNewGame : bindActionCreators(StartNewGame, dispatch),
        endRound : bindActionCreators(EndRound, dispatch)
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