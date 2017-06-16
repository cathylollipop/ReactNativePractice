import React, { Component } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../utils';


const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class TwitterEntrance extends Component {
    static propTypes = {
        hideThis: React.PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            transformAnim: new Animated.Value(1),
            opacityAnim: new Animated.Value(1)
        };
    }

    componentDidMount() {
        Animated.timing(
            this.state.transformAnim,
            {toValue: 50,
                duration: 1200,
                delay:2000,
                easing: Easing.elastic(1),
            },
        ).start();
        Animated.timing(
            this.state.opacityAnim,
            {toValue: 0,
                duration: 800,
                easing: Easing.elastic(1),
                delay:2200,
            },
        ).start();
        setTimeout(() => {
            this.props.hideThis();
        }, 2800);
    }

    render () {
        return(
            <Animated.View style={[styles.entrance,{opacity:this.state.opacityAnim}]}>
                <AnimatedIcon size={60} style={[styles.twitter,{transform:[{scale:this.state.transformAnim}]}]} name="logo-twitter"></AnimatedIcon>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    entrance:{
        position: "absolute",
        top:0, left:0,
        height: Util.size.height,
        width: Util.size.width,
        backgroundColor:"#1b95e0",
        alignItems:"center",
        justifyContent:"center"
    },
    twitter:{
        color:"#fff",
        position:"relative",
        top: -20,
        textAlign: "center"
    }
});

export default TwitterEntrance;