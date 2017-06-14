import { combineReducers } from 'redux';
import WatchReducer from './WatchReducer';

export default combineReducers({
    watch: WatchReducer
});