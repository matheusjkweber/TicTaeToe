import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Game from './src/components/Game'
import Board from './src/components/Board'
import { createBoard } from './src/utils/gameLogic'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  createState = () => {
     return {
      board: createBoard(3, 3)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Game board={this.state.board} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
