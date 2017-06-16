import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class TwitterHead extends Component {
    render() {
        return(
            <View style={styles.viewStyle}>
                <View style={styles.navLeft}>
                    <Icon name="md-person-add" size={23} style={{color:"#1b95e0", paddingLeft:10}}></Icon>
                </View>
                <View style={styles.navMid}>
                    <Icon name="logo-twitter" size={23} style={{color:"#1b95e0"}}></Icon>
                </View>
                <View style={styles.navRight}>
                    <Icon name="ios-search" size={23} style={{color:"#1b95e0", width:30}}></Icon>
                    <Icon name="ios-create-outline" size={23} style={{color:"#1b95e0", width:30, paddingRight:10}}></Icon>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: "row",
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 30,
        paddingBottom:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    navLeft:{
        flex:1,
        alignItems:"flex-start",
        justifyContent:"center",
    },
    navMid:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    navRight:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",
        flexDirection:"row"
    }
});

export default TwitterHead;