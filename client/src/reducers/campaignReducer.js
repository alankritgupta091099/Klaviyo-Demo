import { UPDATE_CAMPAIGN , INITIALIZE_CAMPAIGN , LOAD_ALL_CAMPAIGNS , LOAD_SELECTED_CAMPAIGN , NO_CAMPAIGNS , DELETE_CAMPAIGN , CHANGE_CAMPAIGN_CONFIG } from '../actions/types.js'
const initialState={
    campaign_name: null,
    campaign_id: null,
    smartSending:false,    
    allcampaigns:[],
    campaign_content:{
        from:"",
        replyTo:"",
        subject:"",
        previewText:"",
        email_name:"",
        email_id:""
    },
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
                // campaign_name:action.payload.campaign_name,
                // campaign_id: action.payload.campaign_id,
                // smartSending:action.payload.smartSending,    
                // campaign_content:{
                //     from:action.payload.campaign_content.from,
                //     replyTo:action.payload.campaign_content.replyTo,
                //     subject:action.payload.campaign_content.subject,
                //     previewText:action.payload.campaign_content.previewText,
                //     email_name:action.payload.campaign_content.email_name,
                //     email_id:action.payload.campaign_content.email_id
                // }
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
                campaign_name:action.payload
            };
        default:
            return state;
    }    
}