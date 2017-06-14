import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';

class WatchFace extends Component {

    render() {
        return(
            <View style={styles.watchFaceContainer}>
                <Text style={styles.sectionTextStyle}>{this.props.sectionTime}</Text>
                <Text style={styles.totalTimeStyle}>{this.props.totalTime}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    watchFaceContainer: {
        width: Dimensions.get('window').width,
        paddingTop: 50,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 40,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        height: 170
    },
    sectionTextStyle: {
        fontSize: 20,
        fontWeight: '100',
        paddingRight: 30,
        color: "#555",
        position: "absolute",
        left: Dimensions.get('window').width-140,
        top: 30
    },
    totalTimeStyle: {
        fontSize: Dimensions.get('window').width === 375? 70 : 60,
        fontWeight: '100',
        color: '#222',
        paddingLeft: 20
    }
});

const mapStateToProps = ({watch}) => {
    const { sectionTime, totalTime } = watch;
    return { sectionTime, totalTime };
}

export default connect(mapStateToProps)(WatchFace);