import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';

class WatchControl extends Component {

    _startWatch() {
        if(!this.props.watchOn){
            let milSecond, second, minute, countingTime, secmilSecond, secsecond, secminute, seccountingTime;
            let interval = setInterval(
                () => {
                    countingTime = this.props.timeAccumulation + this.props.currentTime - this.props.initialTime;
                    minute = Math.floor(countingTime/(60*1000));
                    second = Math.floor((countingTime-6000*minute)/1000);
                    milSecond = Math.floor((countingTime%1000)/10);
                    seccountingTime = countingTime - this.props.recordTime;
                    secminute = Math.floor(seccountingTime/(60*1000));
                    secsecond = Math.floor((seccountingTime-6000*secminute)/1000);
                    secmilSecond = Math.floor((seccountingTime%1000)/10);

                    this.props.dispatch({
                        type: 'start_count',
                        payload: {
                            currentTime: (new Date()).getTime(),
                            totalTime: (minute<10? "0"+minute:minute)+":"+(second<10? "0"+second:second)+"."+(milSecond<10? "0"+milSecond:milSecond),
                            sectionTime: (secminute<10? "0"+secminute:secminute)+":"+(secsecond<10? "0"+secsecond:secsecond)+"."+(secmilSecond<10? "0"+secmilSecond:secmilSecond)
                        }
                    });
                    if (this.props.stopWatch) {
                        clearInterval(interval);
                    }
                },10);

            this.props.dispatch({
                type: 'start_watch',
                payload: {
                    startBtnText: 'stop',
                    stopBtnText: 'lap',
                    startBtnColor: 'red',
                    underlayColor: "#eee",
                    watchOn: true,
                    stopWatch: false,
                    resetWatch: false,
                    timeAccumulation: 0,
                    initialTime: (new Date()).getTime(),
                }
            })
        } else {
            this.props.dispatch( {
                type: 'stop_watch',
                payload: {
                    startBtnText: 'Start',
                    startBtnColor: 'green',
                    stopBtnText: 'Reset',
                    stopBtnColor: 'gray',
                    underlayColor: "#eee",
                    watchOn: false,
                    stopWatch: true,
                    initialTime: (new Date()).getTime(),
                    timeAccumulation:this.props.timeAccumulation + this.props.currentTime - this.props.initialTime
                }
            });
        };
    }

    _addRecord() {
        if(this.props.watchOn){
            let {recordCounter, record} = this.props;
            recordCounter++;
            if(recordCounter < 8) {
                record.pop();
            }
            record.unshift({title:"Lap"+recordCounter, time:this.props.sectionTime});
            this.props.dispatch({
                type: 'add_record',
                payload: {
                    recordTime: this.props.timeAccumulation + this.props.currentTime - this.props.initialTime,
                    recordCounter: recordCounter,
                    record: record,
                    sectionTime: "00:00:00"
                }
            });
        } else {
            this.props.dispatch({
                type: 'clear_record'
            });
        }
    }

    render() {
        return (
            <View style={styles.watchControlContainer}>
                <View style={{ flex: 1, alignItems: 'center'}}>
                    <TouchableHighlight style={styles.btnStop} underlayColor={this.props.underlayColor} onPress={this._addRecord.bind(this)}>
                        <Text style={styles.btnStopText}>{this.props.stopBtnText}</Text>
                    </TouchableHighlight>
                </View>

                <View style={{ flex: 1, alignItems: 'center'}}>
                    <TouchableHighlight style={styles.btnStart} underlayColor="#eee"  onPress={this._startWatch.bind(this)}>
                        <Text style={[styles.btnStartText,{color: this.props.startBtnColor}]}>{this.props.startBtnText}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    watchControlContainer: {
        width: Dimensions.get('window').width,
        height: 100,
        flexDirection: 'row',
        backgroundColor: '#f3f3f3',
        paddingTop: 30,
        paddingLeft: 60, paddingRight: 60,
        paddingBottom: 0
    },
    btnStart: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#e2e2e2',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnStop: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#e2e2e2',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnStartText:{
        fontSize:14,
        backgroundColor:"transparent"
    },
    btnStopText:{
        fontSize:14,
        backgroundColor:"transparent",
        color:"#555"
    }
});

const mapStateToProps = ({watch}) => {
    const{ startBtnColor, startBtnText, underlayColor, watchOn, stopBtnColor, stopBtnText, recordCounter, record, timeAccumulation, currentTime, recordTime, initialTime, sectionTime, totalTime, stopWatch } = watch;
    return { startBtnColor, startBtnText, underlayColor, watchOn, stopBtnColor, stopBtnText, recordCounter, record, timeAccumulation, currentTime, recordTime, initialTime, sectionTime, totalTime, stopWatch };
};

export default connect(mapStateToProps)(WatchControl);