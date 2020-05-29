import { UPDATE_SEGMENT , INITIALIZE_SEGMENT , LOAD_ALL_SEGMENTS , LOAD_SELECTED_SEGMENT , NO_SEGMENTS , DELETE_SEGMENT , NAME_SEGMENT } from './types.js';

import axios from 'axios';
import { returnErrors , clearErrors , returnNotifications , clearNotifications } from './popUpActions';
import { tokenConfig } from './authActions';
import { API_URL } from '../helpers/utils.js';

export const initializeSegment = (segment_id) => dispatch =>{
    dispatch({
        type:INITIALIZE_SEGMENT,
        payload:segment_id
    })
}

export const nameSegment = (segment_name) => dispatch =>{
    dispatch({
        type:NAME_SEGMENT,
        payload:segment_name
    })
}

export const saveSegment = ( data ) => ( dispatch , getState ) =>{
    axios.post(`${API_URL}/segments/save`,{
        user:getState().auth.user,
        segment:{
            segment_id:getState().segment.segment_id,
            segment_name:getState().segment.segment_name,
            segment_body:data
        }
    } , tokenConfig(getState) )
    .then(res=>{
        dispatch({
            type:UPDATE_SEGMENT,
            payload:data
        })
        dispatch(returnNotifications("Segment Saved"))
        //console.log(res.data)
    })
    .catch(err=>{
        dispatch(returnErrors(err.data,err.status,"SEGMENT_NOT_SAVED"))
        console.log(err)
    })
}

export const loadSegmentList = () => {
    return async ( dispatch , getState ) => {
        await axios.get(`${API_URL}/segments/loadAll/${getState().auth.user._id} `,tokenConfig(getState))
        .then(item=>{
            console.log(item.data);
            (item.data) ? dispatch({
                type:LOAD_ALL_SEGMENTS,
                payload: item.data
            }) : dispatch({
                type:NO_SEGMENTS
            })
            //No Flows ka alert dalna hai
        })
    }
}

export const deleteSegment = (segment_id) => ( dispatch , getState ) =>{
    axios.delete(`${API_URL}/segments/${getState().auth.user._id}/deleteOne/${segment_id}`,tokenConfig(getState))
    .then(res=>{
            if(res.data.success)
            {
                var arr=getState().segment.allSegments.filter(function(item){
                    return item.segment.segment_id!=segment_id
                })
                dispatch({
                    type:DELETE_SEGMENT,
                    payload:arr
                })  
            }
            //notification wala alert dalna hai
            //console.log(res);
        }
    )
}

export const loadSelectedSegment = ( segment_id ) => {
    return async ( dispatch , getState ) => {
        await axios.get(`${API_URL}/segments/${getState().auth.user._id}/loadOne/${segment_id}`,tokenConfig(getState))
        .then(item=>{
                dispatch({
                    type:LOAD_SELECTED_SEGMENT,
                    paylaod:item.data.segment
                })
            }
        )
    }
} 