import { UPDATE_LIST , INITIALIZE_LIST , LOAD_ALL_LISTS , LOAD_SELECTED_LIST , NO_LISTS , DELETE_LIST , NAME_LIST } from '../actions/types.js'

const initialState={
    list_name: null,
    list_id: null,
    list_data:[],
    list_type:"",
    allLists:[]
}

export default function ( state = initialState , action ) {
    switch ( action.type ) {
        case UPDATE_LIST:
            return{
                ...state,
                list_data:action.payload
            };
        case INITIALIZE_LIST:
            return{
                ...state,
                list_id:action.payload
            };
        case NAME_LIST:
            return{
                ...state,
                list_name:action.payload.list_name,
                list_type:action.payload.list_type
            };
        case LOAD_ALL_LISTS:
            return{
                ...state,
                allLists:action.payload
            };
        case LOAD_SELECTED_LIST:
            return{
                ...state,
                list_name:action.payload.list_name,
                list_id: action.payload.list_id,   
                list_type:action.payload.list_type,
                list_data:action.payload.list_data
            };
        case NO_LISTS:
            return{
                ...state,
                allcampaigns:[]
            };
        case DELETE_LIST:
            return{
                ...state,
                allLists:action.payload
            };
        default:
            return state;
    }    
}