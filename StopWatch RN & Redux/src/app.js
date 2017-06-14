import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { AppRegistry, View } from 'react-native';
import Header from './components/header';
import StopWatch from './components/stopwatch';

class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducers, {})}>
                <View style={{flex: 1}}>
                    <Header headerText={'A Stopwatch'} />
                    <StopWatch/>
                </View>
            </Provider>
        );
    }
}

export default App;
