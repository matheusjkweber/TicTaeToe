/**
 * Game component that will hold all the game logic and UI.
 * Also will show when a play win or tie the game and will be enable to restart the game and the ranking.
 * 
 */

import React, { Component } from 'react'
import {  
    View,
    StyleSheet,
    Alert,
    ScrollView
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
    UpdateRanking,
    actionNames
} from '../actions/gameActions'

import {
    getRanking,
    saveRanking
} from '../utils/storage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

// Redux function, map the state of the app to props.
function mapStateToProps(state) {
    return {
        board: state.board,
        gameState: state.gameState,
        victoryConditions: state.victoryConditions,
        ranking: state.ranking,
        victoryLine: state.victoryLine
    }
}

class Game extends Component {
    // Constructor needed to update the ranking async.
    constructor(props) {
        super(props);
        (async () => {
            const ranking = await getRanking()
            if(ranking != null) {
                this.props.updateRanking(ranking, this.props.state)
            }
        })();
    }

    // End game function, will verify if is a victory or a tie and update the ranking.
    onEndGame = () => {
        let victory = won(this.props.victoryConditions)
        if(victory !== null) {
            let text = victory[0].played === gameState.PLAYER1PLAYED ? "Congratulations! Player 1 WINS! Click on 'Restart Game' to play again." 
                : "Congratulations! Player 2 WINS! Click on 'Restart Game' to play again."                
            
            Alert.alert("YOU WIN!", text)

            let nextState = victory[0].played === gameState.PLAYER1PLAYED ? actionNames.PLAYER1WIN : actionNames.PLAYER2WIN

            let ranking = updateRanking(this.props.ranking, nextState)
            saveRanking(ranking)
            this.props.endGame(nextState, ranking, victory)
        } else if(tie(this.props.victoryConditions) === true) {
            Alert.alert("TIE!!", "It`s a tie!")

            let ranking = updateRanking(this.props.ranking, gameState.TIE)
            saveRanking(ranking)

            this.props.endGame(actionNames.TIE, ranking, null)
        }
    }

    // Select field function, will update the game state and the board, also will change the state of the app and verify if the game ends.
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

            let nextAction = this.props.gameState == gameState.PLAYER1PLAYING ? actionNames.PLAYER1PLAYED : actionNames.PLAYER2PLAYED

            board[row][column] = field
            
            let victoryConditions = updateVictoryConditions(this.props.victoryConditions, field)
            this.props.endRound(nextAction, board, victoryConditions)
            this.onEndGame()
        } 
    }

    // Reset function, will reset the ranking.
    onClickReset = () => {
        let ranking = {
            player1Victories: 0,
            player2Victories: 0,
            totalGames: 0
        }
        saveRanking(ranking)
        this.props.updateRanking(ranking, this.props.state)
    }

    // Will convert the victory line in victory fields.
    getVictoryFields = () => {
        if(this.props.victoryLine == null) {
            return null
        }
        let fields = []
        this.props.victoryLine.forEach(line => {
            fields.push(this.props.board[line.r][line.c])
        })
        return fields
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <Header style={styles.header} 
                        player1Score={this.props.ranking.player1Victories} 
                        player2Score={this.props.ranking.player2Victories} 
                        numberOfGames={this.props.ranking.totalGames}
                        onClickReset={() => this.onClickReset()} />
                    <Board style={styles.board} board={this.props.board} onSelectField={this.onSelectField} victoryLine={this.getVictoryFields()}/>
                    <Footer style={styles.footer} gameState={this.props.gameState} buttonAction={() => this.props.startNewGame()} />
                </ScrollView>
            </View>
        )
    }
}

// Redux function, will control the dispatchs.
function mapDispatchToProps(dispatch){
    return {
        startNewGame : bindActionCreators(StartNewGame, dispatch),
        endRound : bindActionCreators(EndRound, dispatch),
        endGame : bindActionCreators(EndGame, dispatch),
        updateRanking: bindActionCreators(UpdateRanking, dispatch)
    }
}

// Redux expression, will connect redux functions to the Game class.
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