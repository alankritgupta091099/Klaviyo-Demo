import { UPDATE_SEGMENT , INITIALIZE_SEGMENT , LOAD_ALL_SEGMENTS , LOAD_SELECTED_SEGMENT , NO_SEGMENTS , DELETE_SEGMENT , NAME_SEGMENT } from '../actions/types.js';

const initialState={
    segment_name: null,
    segment_id: null,
    segment_body: null,
    allSegments:[]
}

export default function ( state = initialState , action ){
    switch ( action.type ) {
         case UPDATE_SEGMENT:
            return {
                ...state,
                segment_body:action.payload,
            };
        case INITIALIZE_SEGMENT:
            return {
                ...state,
                segment_id:action.payload
            };
        case NAME_SEGMENT:
            return {
                ...state,
                segment_name:action.payload
            };
        case LOAD_ALL_SEGMENTS:
            return{
                ...state,
                allSegments:action.payload
            };
        case LOAD_SELECTED_SEGMENT:
            return{
                ...state,
                segment_name:action.paylaod.segment_name,
                segment_id:action.paylaod.segment_id,
                segment_body:action.paylaod.segment_body
            }
        case NO_SEGMENTS:
            return {
                ...state,
                allSegments:null
            };
        case DELETE_SEGMENT:
            return{
                ...state,
                segment_name: null,
                segment_id: null,
                segment_body: null,
                allSegments:action.payload
            };
        default:
            return state;
    }
}