import { UPDATE_EMAIL , INITIALIZE_EMAIL , LOAD_ALL_EMAILS , LOAD_SELECTED_EMAIL , NO_EMAILS , DELETE_EMAIL } from './types.js'

import axios from 'axios';
import { returnErrors , clearErrors , returnNotifications , clearNotifications } from './popUpActions';
import { tokenConfig } from './authActions';
import { API_URL } from '../helpers/utils.js';

export const initializeEmail = (newEmail) => dispatch =>{
    dispatch({
        type:INITIALIZE_EMAIL,
        payload:newEmail
    })
}

export const saveEmail = ( data ) => ( dispatch , getState ) =>{
    axios.post(`${API_URL}/emails/save`,{
        user:getState().auth.user,
        email:{
            email_id:getState().email.email_id,
            email_name:getState().email.email_name,
            email_body:data.design,
            email_html:data.html,
        }
    } , tokenConfig(getState) )
    .then(res=>{
        dispatch({
            type:UPDATE_EMAIL,
            payload:data
        })
        dispatch(returnNotifications("Template Saved"))
        //console.log(res.data)
    })
    .catch(err=>{
        dispatch(returnErrors(err.data,err.status,"EMAIL_NOT_SAVED"))
        console.log(err)
    })
}

export const loadEmailList = () => {
    return async ( dispatch , getState ) => {
        await axios.get(`${API_URL}/emails/loadAll/${getState().auth.user._id} `,tokenConfig(getState))
        .then(item=>{
            console.log(item.data);
            (item.data) ? dispatch({
                type:LOAD_ALL_EMAILS,
                payload: item.data
            }) : dispatch({
                type:NO_EMAILS
            })
            //No Flows ka alert dalna hai
        })
    }
}

export const deleteEmail = (email_id) => ( dispatch , getState ) =>{
    axios.delete(`${API_URL}/emails/${getState().auth.user._id}/deleteOne/${email_id}`,tokenConfig(getState))
    .then(res=>{
            if(res.data.success)
            {
                var arr=getState().email.allemails.filter(function(item){
                    return item.email.email_id!=email_id
                })
                dispatch({
                    type:DELETE_EMAIL,
                    payload:arr
                })  
            }
            //notification wala alert dalna hai
            //console.log(res);
        }
    )
}

export const loadSelectedEmail = ( email_id ) => {
    return async ( dispatch , getState ) => {
        await axios.get(`${API_URL}/emails/${getState().auth.user._id}/loadOne/${email_id}`,tokenConfig(getState))
        .then(item=>{
                dispatch({
                    type:LOAD_SELECTED_EMAIL,
                    paylaod:item.data.email
                })
            }
        )
    }
} 