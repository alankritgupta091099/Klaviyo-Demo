import { UPDATE_CAMPAIGN , INITIALIZE_CAMPAIGN , LOAD_ALL_CAMPAIGNS , LOAD_SELECTED_CAMPAIGN , NO_CAMPAIGNS , DELETE_CAMPAIGN } from '../actions/types.js'

const initialState={
    campaign_name: null,
    campaign_id: null,
    campaign_data: null,
    campaignList:'',
    smartSending:false,    
    allcampaigns:[]
}

export default function ( state = initialState , action ) {
    switch ( action.type ) {
        case UPDATE_CAMPAIGN:
            return{
                ...state
            };
        case INITIALIZE_CAMPAIGN:
            return{
                ...state,
                campaign_name:action.payload.campaign_name,
                campaign_id:action.payload.campaign_id
            };
        case LOAD_ALL_CAMPAIGNS:
            return{
                ...state
            };
        case LOAD_SELECTED_CAMPAIGN:
            return{
                ...state
            };
        case NO_CAMPAIGNS:
            return{
                ...state
            };
        case DELETE_CAMPAIGN:
            return{
                ...state
            };
        default:
            return state;
    }    
}