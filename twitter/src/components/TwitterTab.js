import React, { Component } from 'react';
import { View, Text, TabBarIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class TwitterTab extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab:'Home',
            title:'Home',
        };
    }

    changeTab(tabName) {
        this.setState({
            selectedTab: tabName
        });
    }

    render(){
        return(
            <TabBarIOS
                barTintColor='#fff'
                tintColor='#1b95e0'>
                <Icon.TabBarItem
                    title="Home"
                    iconName="ios-home-outline"
                    selectedIconName="ios-home"
                    onPress={() => this.changeTab('Home') }>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="Notifications"
                    iconName="ios-notifications-outline"
                    selectedIconName="ios-notifications"
                    onPress={() => this.changeTab('Notifications') }>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="Messages"
                    iconName="ios-mail-outline"
                    selectedIconName="ios-mail"
                    onPress={() => this.changeTab('Messages') }>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="Me"
                    iconName="ios-person-outline"
                    selectedIconName="ios-person"
                    onPress={() => this.changeTab('Me') }>
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
};

export default TwitterTab;