import { UPDATE_CAMPAIGN , INITIALIZE_CAMPAIGN , LOAD_ALL_CAMPAIGNS , LOAD_SELECTED_CAMPAIGN , NO_CAMPAIGNS , DELETE_CAMPAIGN , CHANGE_CAMPAIGN_CONFIG , INSTANT_MAIL_CAMPAIGN , SCHEDULE_MAIL_CAMPAIGN } from './types.js'

import axios from 'axios';
import { returnErrors , clearErrors , returnNotifications , clearNotifications } from './popUpActions';
import { tokenConfig } from './authActions';
import { API_URL } from '../helpers/utils.js';

export const initializeCampaign = (newCampaign) => dispatch =>{
    dispatch({
        type:INITIALIZE_CAMPAIGN,
        payload:newCampaign
    })
}

export const changeCampaignConfig = ( campaign_name , dd_type , dd_id , dd_name ) => dispatch =>{
    dispatch({
        type:CHANGE_CAMPAIGN_CONFIG,
        payload: { campaign_name , dd_type , dd_id , dd_name }
    })
}

export const saveCampaign = ( data ) => ( dispatch , getState ) =>{
    axios.post(`${API_URL}/campaigns/save`,{
        user:getState().auth.user,
        campaign:{
            campaign_id:getState().campaign.campaign_id,
            campaign_name:getState().campaign.campaign_name,
            campaign_receivers_type:getState().campaign.campaign_receivers_type,
            campaign_receivers_id:getState().campaign.campaign_receivers_id,
            campaign_receivers_name:getState().campaign.campaign_receivers_name,
            campaign_content:{
                from:data.from,
                replyTo:data.replyTo,
                subject:data.subject,
                previewText:data.previewText,
                email_name:data.email_name,
                email_id:data.email_id,
                email_html:data.email_html
            }
        }
    } , tokenConfig(getState) )
    .then(res=>{
        dispatch({
            type:UPDATE_CAMPAIGN,
            payload:data
        })
        dispatch(returnNotifications("Campaign Saved"))
        console.log(res.data)
    })
    .catch(err=>{
        dispatch(returnErrors(err.data,err.status,"CAMPAIGN_NOT_SAVED"))
        console.log(err)
    })
}

export const loadCampaignList = () => {
    return async ( dispatch , getState ) => {
        await axios.get(`${API_URL}/campaigns/loadAll/${getState().auth.user._id} `,tokenConfig(getState))
        .then(item=>{
            console.log(item.data);
            (item.data) ? dispatch({
                type:LOAD_ALL_CAMPAIGNS,
                payload: item.data
            }) : dispatch({
                type:NO_CAMPAIGNS
            })
            //No Campaigns ka alert dalna hai
        })
    }
}

export const deleteCampaign = ( campaign_id ) => ( dispatch , getState ) =>{
    axios.delete(`${API_URL}/campaigns/${getState().auth.user._id}/deleteOne/${campaign_id}`,tokenConfig(getState))
    .then(res=>{
            if(res.data.success)
            {
                var arr=getState().campaign.allcampaigns.filter(function(item){
                    return item.campaign.campaign_id!=campaign_id
                })
                dispatch({
                    type:DELETE_CAMPAIGN,
                    payload:arr
                })  
            }
            //notification wala alert dalna hai
            //console.log(res);
        }
    )
}

export const loadSelectedCampaign = ( campaign_id ) => {
    return async ( dispatch , getState ) => {
        await axios.get(`${API_URL}/campaigns/${getState().auth.user._id}/loadOne/${campaign_id}`,tokenConfig(getState))
        .then(item=>{
            console.log(item.data.campaign)
                dispatch({
                    type:LOAD_SELECTED_CAMPAIGN,
                    payload:item.data.campaign
                })
            }
        )
    }
} //currently not working

export const sendMailCampaign =()=> ( dispatch , getState )=>{
    axios.post(`${API_URL}/campaigns/${getState().auth.user._id}/sendMail/${getState().campaign.campaign_id}` ,{}, tokenConfig(getState))
    .then(res=>{
        dispatch({
            type:INSTANT_MAIL_CAMPAIGN
        })
    })
    .catch(err=>{
        dispatch(returnErrors(err.data,err.status,"MAIL_NOT_SENT"))
        console.log(err)
    })
}