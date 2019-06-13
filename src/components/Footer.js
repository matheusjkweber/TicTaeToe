import React, { Component } from 'react'
import {  
    View,
    Button,
    Platform,
    Text,
    StyleSheet, 
    Dimensions,
} from 'react-native'
import common from '../style/common'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    gameState
} from '../utils/gameLogic'

export default props => {
    let textToShow = ""
    let buttonTitle = ""

    switch(props.gameState) {
        case gameState.PAUSE:
            textToShow = "Click on 'Start Game' to start a new game."
            buttonTitle = "Start Game"
            break
        case gameState.PLAYER1PLAYING:
            textToShow = "Player 1 is playing..."
            buttonTitle = "Restart Game"
            break
        case gameState.PLAYER2PLAYING:
            textToShow = "Player 2 is playing..."
            buttonTitle = "Restart Game"
            break
        case gameState.PLAYER1WIN:
            textToShow = "Player 1 WINS!"
            buttonTitle = "Restart Game"
            break
        case gameState.PLAYER2WIN:
            textToShow = "Player 2 WINS!."
            buttonTitle = "Restart Game"
            break
    }
    
    return (
        <View style={styles.container}>
            {(props.gameState === gameState.PLAYER1PLAYING || props.gameState === gameState.PLAYER2PLAYING) ? 
                <Icon name={props.gameState == gameState.PLAYER1PLAYING ? "circle-thin" : "times"} 
                    size={20} 
                    style={styles.playerIcon}
                    color={props.gameState == gameState.PLAYER1PLAYING ? common.colors.player1Color : common.colors.player2Color}/>
                : null
                }

                <Text style={styles.statusGame}>
                    {textToShow}
                </Text>

                <View style={styles.buttonContainer}>
                    <Button color={common.colors.buttonDefault} title={buttonTitle} onPress={props.buttonAction}/>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        alignItems: "flex-start",
        paddingTop: Platform.OS == "ios" ? 20 : 0,
        borderTopColor: common.colors.borderColor,
        borderTopWidth: 2,
        paddingTop: 15,
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    clearButton: {
        marginTop: 10,
        marginRight: 10,
        width: 70,
        paddingBottom: 10
    },
    statusGame: {
        marginLeft: 10
    },
    playerIcon: {
        marginLeft: 10
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10
    }
})