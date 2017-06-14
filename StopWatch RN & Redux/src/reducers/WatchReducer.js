const INITIAL_STATE = {
    watchOn: false,
    startBtnText: 'start',
    startBtnColor: 'green',
    stopBtnText: 'lap',
    stopBtnColor: 'red',
    underlayColor: "#fff",
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
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'start_watch':
            return {
                ...state,
                startBtnColor:action.payload.startBtnColor,
                startBtnText:action.payload.startBtnText,
                stopBtnText:action.payload.stopBtnText,
                underlayColor:action.payload.underlayColor,
                watchOn:action.payload.watchOn,
                stopWatch:action.payload.stopWatch,
                resetWatch:action.payload.resetWatch,
                timeAccumulation:action.payload.timeAccumulation,
                initialTime:action.payload.initialTime
            };
        case 'stop_watch':
            return {
                ...state,
                startBtnColor:action.payload.startBtnColor,
                startBtnText:action.payload.startBtnText,
                underlayColor:action.payload.underlayColor,
                watchOn:action.payload.watchOn,
                stopBtnColor:action.payload.stopBtnColor,
                stopBtnText:action.payload.stopBtnText,
                stopWatch:action.payload.stopWatch,
                initialTime:action.payload.initialTime,
                timeAccumulation:action.payload.timeAccumulation
            };
        case 'start_count':
            return {
                ...state,
                currentTime:action.payload.currentTime,
                totalTime:action.payload.totalTime,
                sectionTime:action.payload.sectionTime
            };
        case 'add_record':
            return {
                ...state,
                record:action.payload.record,
                recordCounter:action.payload.recordCounter,
                recordTime:action.payload.recordTime,
                sectionTime:action.payload.sectionTime
            };
        case 'clear_record':
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
            return state;
    }
}