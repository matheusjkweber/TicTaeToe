import React, { Component } from 'react'
import {  
    View,
    StyleSheet
} from 'react-native'
import common from '../style/common'
import Header from './Header'
import Field from './Field'

export default props => {
    return (
        <View style={styles.mainContainer}>
            <Header />
            <Field />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
})