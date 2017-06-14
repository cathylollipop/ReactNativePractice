import React, { Component } from 'react';
import { ListView, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';

class WatchRecord extends Component {

    render() {
        console.log("this page is rendered");
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

const styles = StyleSheet.create({
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

const mapStateToProps = ({watch}) => {
    const{ recordCounter, record } = watch;
    return { recordCounter, record };
};

export default connect(mapStateToProps)(WatchRecord);