import { UPDATE_LIST , INITIALIZE_LIST , LOAD_ALL_LISTS , LOAD_SELECTED_LIST , NO_LISTS , DELETE_LIST , NAME_LIST } from './types.js'

import axios from 'axios';
import { returnErrors , clearErrors , returnNotifications , clearNotifications } from './popUpActions';
import { tokenConfig } from './authActions';
import { API_URL } from '../helpers/utils.js';

export const initializeList = (list_id) => dispatch =>{
    dispatch({
        type:INITIALIZE_LIST,
        payload:list_id
    })
}

export const nameList = (list_name,list_type) => dispatch =>{
    dispatch({
        type:NAME_LIST,
        payload:{list_name,list_type}
    })
}

export const saveList = ( data ) => ( dispatch , getState ) =>{
    console.log(data)
    axios.post(`${API_URL}/lists/save`,{
        user:getState().auth.user,
        list:{
            list_id:getState().list.list_id,
            list_name:getState().list.list_name,
            list_type:getState().list.list_type,
            list_data:data
        }
    } , tokenConfig(getState) )
    .then(res=>{
        dispatch({
            type:UPDATE_LIST,
            payload:data
        })
        dispatch(returnNotifications("List Saved"))
        //console.log(res.data)
    })
    .catch(err=>{
        dispatch(returnErrors(err.data,err.status,"LIST_NOT_SAVED"))
        console.log(err)
    })
}

export const loadList = () => {
    return async ( dispatch , getState ) => {
        await axios.get(`${API_URL}/lists/loadAll/${getState().auth.user._id} `,tokenConfig(getState))
        .then(item=>{
            console.log(item.data);
            (item.data) ? dispatch({
                type:LOAD_ALL_LISTS,
                payload: item.data
            }) : dispatch({
                type:NO_LISTS
            })
            //No Lists ka alert dalna hai
        })
    }
}

export const deleteList = (list_id) => ( dispatch , getState ) =>{
    axios.delete(`${API_URL}/lists/${getState().auth.user._id}/deleteOne/${list_id}`,tokenConfig(getState))
    .then(res=>{
            if(res.data.success)
            {
                var arr=getState().list.allLists.filter(function(item){
                    return item.list.list_id!=list_id
                })
                dispatch({
                    type:DELETE_LIST,
                    payload:arr
                })  
            }
            //notification wala alert dalna hai
            //console.log(res);
        }
    )
}

export const loadSelectedList = ( list_id ) => {
    console.log(list_id)
    return async ( dispatch , getState ) => {
        await axios.get(`${API_URL}/lists/${getState().auth.user._id}/loadOne/${list_id}`,tokenConfig(getState))
        .then(item=>{
                dispatch({
                    type:LOAD_SELECTED_LIST,
                    payload:item.data.list
                })
            }
        )
    }
} 