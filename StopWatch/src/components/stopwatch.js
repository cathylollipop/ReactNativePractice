import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, ListView } from 'react-native';
import Dimensions from 'Dimensions';

class WatchFace extends Component {
    static propTypes: {
        sectionTime: React.PropTypes.string.isRequired,
        totalTime: React.PropTypes.string.isRequired,
    };

    render() {
        return(
            <View style={styles.watchFaceContainer}>
                <Text style={styles.secondTextStyle}>{this.props.sectionTime}</Text>
                <Text style={styles.totalTimeStyle}>{this.props.totalTime}</Text>
            </View>
        );
    }
}

class WatchControl extends Component {
    static propTypes: {
        startWatch: React.PropTypes.func.isRequired,
        stopWatch: React.PropTypes.func.isRequired,
        addRecord: React.PropTypes.func.isRequired,
        clearRecord: React.PropTypes.func.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            watchOn: false,
            startBtnText: 'Start',
            startBtnColor: 'green',
            stopBtnText: 'Lap',
            stopBtnColor: 'gray',
            underlayColor: "#fff"
        }
    }

    _startWatch() {
        if(!this.state.watchOn){
            this.props.startWatch();
            this.setState({
                startBtnText: 'Stop',
                startBtnColor: 'red',
                underlayColor: "#eee",
                watchOn: true
            })
        } else {
            this.props.stopWatch();
            this.setState({
                startBtnText: 'Start',
                startBtnColor: 'green',
                stopBtnText: 'Reset',
                stopBtnColor: 'gray',
                underlayColor: "#eee",
                watchOn: false
            })
        }
    }

    _addRecord() {
        if(this.state.watchOn) {
            this.props.addRecord()
        } else {
            this.props.clearRecord()
            this.setState({
                stopBtnText: 'Lap'
            })
        }

    }

    render() {
        return (
            <View style={styles.watchControlContainer}>
                <View style={{ flex: 1, alignItems: 'center'}}>
                    <TouchableHighlight style={styles.btnStop} underlayColor={this.state.underlayColor} onPress={() => this._addRecord()}>
                        <Text style={styles.btnStopText}>{this.state.stopBtnText}</Text>
                    </TouchableHighlight>
                </View>

                <View style={{ flex: 1, alignItems: 'center'}}>
                    <TouchableHighlight style={styles.btnStart} underlayColor="#eee"  onPress={() => this._startWatch()}>
                        <Text style={[styles.btnStartText,{color: this.state.startBtnColor}]}>{this.state.startBtnText}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

class WatchRecord extends Component {
    static propTypes = {
        record: React.PropTypes.array.isRequired
    };

    render() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            theDataSource = ds.cloneWithRows(this.props.record);
        return (
            <ListView
                style={styles.recordList}
                dataSource={theDataSource}
                renderRow={(rowData) =>
                    <View style={styles.recordItem}>
                        <Text style={styles.recordItemTitle}>{rowData.title}</Text>
                        <View style={{alignItems: "center"}}>
                            <Text style={styles.recordItemTime}>{rowData.time}</Text>
                        </View>
                    </View>}
            />
        )
    }
}

export default class StopWatch extends Component {
    constructor() {
        super();
        this.state = {
            stopWatch: false,
            resetWatch: true,
            initialTime: 0,
            currentTime: 0,
            recordTime: 0,
            timeAccumulation: 0,
            totalTime : "00:00:00",
            sectionTime : "00:00:00",
            recordCounter: 0,
            record:[
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""}
            ]
        }
    }

    componentWillUnmount() {
        this._stopWatch();
        this._clearRecord();
    }

    _startWatch() {
        if(this.state.resetWatch) {
            this.setState({
                stopWatch: false,
                resetWatch: false,
                timeAccumulation: 0,
                initialTime: (new Date()).getTime()
            })
        } else {
            this.setState({
                stopWatch: false,
                initialTime: (new Date()).getTime()
            })
        }

        let milSecond, second, minute, countingTime, secmilSecond, secsecond, secminute, seccountingTime;
        let interval = setInterval(
            () => {
                this.setState({
                    currentTime: (new Date()).getTime()
                })
                countingTime = this.state.timeAccumulation + this.state.currentTime - this.state.initialTime;
                minute = Math.floor(countingTime/(60*1000));
                second = Math.floor((countingTime-6000*minute)/1000);
                milSecond = Math.floor((countingTime%1000)/10);
                seccountingTime = countingTime - this.state.recordTime;
                secminute = Math.floor(seccountingTime/(60*1000));
                secsecond = Math.floor((seccountingTime-6000*secminute)/1000);
                secmilSecond = Math.floor((seccountingTime%1000)/10);
                this.setState({
                    totalTime: (minute<10? "0"+minute:minute)+":"+(second<10? "0"+second:second)+"."+(milSecond<10? "0"+milSecond:milSecond),
                    sectionTime: (secminute<10? "0"+secminute:secminute)+":"+(secsecond<10? "0"+secsecond:secsecond)+"."+(secmilSecond<10? "0"+secmilSecond:secmilSecond),
                })
                if (this.state.stopWatch) {
                    this.setState({
                        timeAccumulation: countingTime
                    })
                    clearInterval(interval)
                };
            },10);
    }

    _stopWatch() {
        this.setState({
            stopWatch: true
        })
    }

    _addRecord() {
        let {recordCounter, record} = this.state;
        recordCounter++;
        if(recordCounter < 8) {
            record.pop();
        }
        record.unshift({title:"Lap"+recordCounter, time:this.state.sectionTime});
        this.setState({
            recordTime: this.state.timeAccumulation + this.state.currentTime - this.state.initialTime,
            recordCounter: recordCounter,
            record: record
        })
    }

    _clearRecord() {
        this.setState({
            stopWatch: false,
            resetWatch: true,
            intialTime: 0,
            currentTime:0,
            recordTime:0,
            timeAccumulation:0,
            totalTime: "00:00.00",
            sectionTime: "00:00.00",
            recordCounter: 0,
            record:[
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""}
            ],
        });
    }


    render() {
        return(
            <View style={styles.watchContainer}>
                <WatchFace sectionTime={this.state.sectionTime} totalTime={this.state.totalTime}></WatchFace>
                <WatchControl startWatch={()=> this._startWatch()} stopWatch={()=>this._stopWatch()} addRecord={()=>this._addRecord()} clearRecord={()=>this._clearRecord()}></WatchControl>
                <WatchRecord record={this.state.record}></WatchRecord>
            </View>
        );
    }
};

const styles = StyleSheet.create ({
    watchContainer: {
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        marginTop: 10
    },
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
    secondTextStyle: {
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
    },
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
    },
    recordList:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 350,
        paddingLeft: 15,
        paddingTop: 10
    },
    recordItem:{
        height: 40,
        borderBottomWidth:0.8,
        borderBottomColor:"#bbb",
        paddingTop: 5, paddingLeft: 10, paddingRight:10, paddingBottom:5,
        flexDirection:"row",
        alignItems:"center"
    },
    recordItemTitle:{
        flex:1,
        textAlign:"left",
        paddingLeft:20,
        color:"#777"
    },
    recordItemTime:{
        flex:1,
        textAlign:"right",
        paddingRight:20,
        color:"#222"
    }
});