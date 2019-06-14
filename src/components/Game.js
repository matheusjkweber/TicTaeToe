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
        updateVictoryConditions,
        tie,
        updateRanking,
        won
} from './../utils/gameLogic'

import { 
    StartNewGame,
    EndRound,
    EndGame,
    UpdateRanking
} from '../actions/gameActions'

import {
    getRanking,
    saveRanking
} from '../utils/storage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    return {
        board: state.board,
        gameState: state.gameState,
        victoryConditions: state.victoryConditions,
        ranking: state.ranking
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
        (async () => {
            const ranking = await getRanking()
            console.log(ranking)
            this.props.updateRanking(ranking, this.props.state)
        })();
    }

    onEndGame = () => {
        let victory = won(this.props.victoryConditions)
        if(victory !== null) {
            let text = victory[0].played === gameState.PLAYER1PLAYED ? "Congratulations! Player 1 WINS! Click on 'Restart Game' to play again." 
                : "Congratulations! Player 2 WINS! Click on 'Restart Game' to play again."                
            
            Alert.alert("YOU WIN!", text)

            let nextState = victory[0].played === gameState.PLAYER1PLAYED ? gameState.PLAYER1WIN : gameState.PLAYER2WIN

            let ranking = updateRanking(this.props.ranking, nextState)
            saveRanking(ranking)
            this.props.endGame(nextState, ranking)
        } else if(tie(this.props.victoryConditions) === true) {
            Alert.alert("TIE!!", "It`s a tie!")

            let ranking = updateRanking(this.props.ranking, gameState.TIE)
            saveRanking(ranking)

            this.props.endGame(gameState.TIE, ranking)
        }
    }

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
            
            let victoryConditions = updateVictoryConditions(this.props.victoryConditions, field)
            this.props.endRound(field.fieldValue, board, victoryConditions)
            this.onEndGame()
        } 
    }

    onClickReset = () => {
        let ranking = {
            player1Victories: 0,
            player2Victories: 0,
            totalGames: 0
        }
        saveRanking(ranking)
        this.props.updateRanking(ranking, this.props.state)
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Header style={styles.header} player1Score={this.props.ranking.player1Victories} 
                    player2Score={this.props.ranking.player2Victories} 
                    numberOfGames={this.props.ranking.totalGames}
                    onClickReset={() => this.onClickReset()} />
                <Board style={styles.board} board={this.props.board} onSelectField={this.onSelectField}/>
                <Footer style={styles.footer} gameState={this.props.gameState} buttonAction={() => this.props.startNewGame()} />
            </View>
        )
    }
}

function mapDispatchToProps(dispatch, props){
    return {
        startNewGame : bindActionCreators(StartNewGame, dispatch),
        endRound : bindActionCreators(EndRound, dispatch),
        endGame : bindActionCreators(EndGame, dispatch),
        updateRanking: bindActionCreators(UpdateRanking, dispatch)
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