import React, { Component } from 'react';
import { ScrollView, Image, RefreshControl } from 'react-native';
import Util from '../utils';

class TwitterContent extends Component {
    constructor() {
        super();
        this.state = {
            refreshing: false,
        };
    }

    _onRefresh() {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({
                refreshing: false,
            });
        }, 1000);

    }

    render(){
        return(
            <ScrollView
                refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    />
                }>
                <Image source={require('../img/twitter.jpeg')} style={{width:Util.size.width, height:Util.size.height-110}}></Image>
            </ScrollView>
        )
    }
}

export default TwitterContent;