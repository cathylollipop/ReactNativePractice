import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet } from 'react-native';
import TwitterTab from './components/TwitterTab';
import TwitterHead from './components/TwitterHead';
import TwitterContent from './components/TwitterContent';
import TwitterEntrance from './components/TwitterEntrance';
import Util from './utils';

class App extends Component {
    constructor() {
        super();
        this.state = {
            show:true
        };
    }

    _hideEntrance() {
        this.setState({
            show:false
        })
    }

    render() {
        let entrance = this.state.show? <TwitterEntrance hideThis={()=> this._hideEntrance()}/>:<View></View>

        return (
            <View style = {styles.twitterContainer}>
                <TwitterHead/>
                <TwitterContent/>
                <TwitterTab/>
                {entrance}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    twitterContainer: {
        width: Util.size.width,
        height: Util.size.height
    }
})

export default App;