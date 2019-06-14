/**
 * Header component that will hold the ranking.
 * 
 * 
 */

 import React, { Component } from 'react'
import {  
    View,
    Button,
    StyleSheet,
    Dimensions,
    Platform,
    Text
} from 'react-native'
import common from '../style/common'

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.clearButton}>
                <Button color={common.colors.buttonDefault} onPress={props.onClickReset} title={"Reset"}/>
            </View>
            <View style={styles.board}>
                <Text style={styles.player1Score}>Player 1: 
                    <Text style={{fontWeight: 'bold'}}>
                         {'  '}{props.player1Score || 0}
                    </Text>
                </Text>
                <Text style={styles.player2Score}>Player 2: 
                    <Text style={{fontWeight: 'bold'}}>
                        {'  '}{props.player2Score || 0}
                    </Text>
                </Text>
                <Text style={styles.gamesScore}>Games: 
                    <Text style={{fontWeight: 'bold'}}>
                        {'  '}{props.numberOfGames || 0}
                    </Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        alignItems: "flex-end",
        paddingTop: Platform.OS == "ios" ? 20 : 0,
        borderBottomColor: common.colors.borderColor,
        borderBottomWidth: 2,
        paddingBottom: 15
    },
    clearButton: {
        marginTop: 10,
        marginRight: 10,
        width: 70,
        paddingBottom: 10
    },
    board: {
        width: Dimensions.get('window').width,
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: Platform.OS == "ios" ? 22 : 10,
        justifyContent: "space-between"
    },
    player1Score: {
        color: common.colors.player1Color
    },
    player2Score: {
        color: common.colors.player2Color
    },
    gamesScore: {
        color: common.colors.neutralColor
    }
})