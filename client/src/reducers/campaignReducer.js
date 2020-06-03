import { UPDATE_CAMPAIGN , INITIALIZE_CAMPAIGN , LOAD_ALL_CAMPAIGNS , LOAD_SELECTED_CAMPAIGN , NO_CAMPAIGNS , DELETE_CAMPAIGN , CHANGE_CAMPAIGN_CONFIG , INSTANT_MAIL_CAMPAIGN , SCHEDULED_MAIL_CAMPAIGN } from '../actions/types.js'

const initialState={
    campaign_name: null,
    campaign_id: null,
    campaign_receivers_type:"",
    campaign_receivers_id:"",
    campaign_receivers_name:"",
    campaign_content:{
        from:"",
        replyTo:"",
        subject:"",
        previewText:"",
        email_name:"",
        email_id:"",
        email_html:""
    },
    campaign_timing:{
        date:"",
        time:""
    },
    allcampaigns:[]
}

export default function ( state = initialState , action ) {
    switch ( action.type ) {
        case UPDATE_CAMPAIGN:
            return{
                ...state,
                campaign_content:{
                    from:action.payload.from,
                    replyTo:action.payload.replyTo,
                    subject:action.payload.subject,
                    previewText:action.payload.previewText,
                    email_name:action.payload.email_name,
                    email_id:action.payload.email_id
                }
            };
        case INITIALIZE_CAMPAIGN:
            return{
                ...state,
                campaign_name:action.payload.campaign_name,
                campaign_id:action.payload.campaign_id
            };
        case LOAD_ALL_CAMPAIGNS:
            return{
                ...state,
                allcampaigns:action.payload
            };
        case LOAD_SELECTED_CAMPAIGN:
            return{
                ...state,
                campaign_name:action.payload.campaign_name,
                campaign_id: action.payload.campaign_id,
                campaign_receivers_type:action.payload.campaign_receivers_type,
                campaign_receivers_id:action.payload.campaign_receivers_id,   
                campaign_receivers_name:action.payload.campaign_receivers_name, 
                campaign_timing:{
                    time:action.payload.campaign_timing.time,
                    date:action.payload.campaign_timing.date,
                },
                campaign_content:{
                    from:action.payload.campaign_content.from,
                    replyTo:action.payload.campaign_content.replyTo,
                    subject:action.payload.campaign_content.subject,
                    previewText:action.payload.campaign_content.previewText,
                    email_name:action.payload.campaign_content.email_name,
                    email_id:action.payload.campaign_content.email_id,
                    email_html:action.payload.campaign_content.email_html
                }
            };
        case NO_CAMPAIGNS:
            return{
                ...state,
                allcampaigns:[]
            };
        case DELETE_CAMPAIGN:
            return{
                ...state,
                allcampaigns:action.payload
            };
        case CHANGE_CAMPAIGN_CONFIG:
            return{
                ...state,
                campaign_name:action.payload.campaign_name,
                campaign_receivers_type:action.payload.dd_type,
                campaign_receivers_id:action.payload.dd_id,
                campaign_receivers_name:action.payload.dd_name,
            };
        case SCHEDULED_MAIL_CAMPAIGN:
            return{
                ...state,
                campaign_timing:{
                    time:action.payload.time,
                    date:action.payload.date
                }
            };
        default:
            return state;
    }    
}