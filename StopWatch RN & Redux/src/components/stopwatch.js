import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import WatchFace from './WatchFace';
import WatchControl from './WatchControl';
import WatchRecord from './WatchRecord';

export default class StopWatch extends Component {

    render() {
        return(
            <View style={styles.watchContainer}>
                <WatchFace />
                <WatchControl />
                <WatchRecord />
            </View>
        );
    }
};

const styles = StyleSheet.create ({
    watchContainer: {
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        marginTop: 10
    }
});
