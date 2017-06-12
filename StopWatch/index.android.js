import React from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './src/components/header';
import StopWatch from './src/components/stopwatch';

const App = () => (
    <View style={{ flex: 1 }}>
      <Header headerText={'A Stopwatch'} />
      <StopWatch/>
    </View>
);

AppRegistry.registerComponent('StopWatch', () => App);
