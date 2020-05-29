import { combineReducers } from 'redux';
import authReducer from './authReducer';
import popUpReducer from './popUpReducer';
import flowReducer from './flowReducer';
import emailReducer from './emailReducer';
import campaignReducer from './campaignReducer';
import segmentReducer from './segmentReducer';

export default combineReducers({
    auth:authReducer,
    popUp:popUpReducer,
    flow:flowReducer,
    email:emailReducer,
    campaign:campaignReducer,
    segment:segmentReducer
})
