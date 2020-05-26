import { UPDATE_EMAIL , INITIALIZE_EMAIL , LOAD_ALL_EMAILS , LOAD_SELECTED_EMAIL , NO_EMAILS , DELETE_EMAIL } from '../actions/types.js'

const initialState={
    email_name: null,
    email_id: null,
    email_body: null,
    allemails:[],
    email_html: '',
}

export default function ( state = initialState , action ){
    switch ( action.type ) {
         case UPDATE_EMAIL:
            return {
                ...state,
                email_body:action.payload.design,
                email_html:action.payload.html
            };
        case INITIALIZE_EMAIL:
            return {
                ...state,
                email_name:action.payload.email_name,
                email_id:action.payload.email_id
            };
        case LOAD_ALL_EMAILS:
            return{
                ...state,
                allemails:action.payload
            };
        case LOAD_SELECTED_EMAIL:
            return{
                ...state,
                email_html:action.paylaod.email_html,
                email_name:action.paylaod.email_name,
                email_id:action.paylaod.email_id,
                email_body:action.paylaod.email_body
            }
        case NO_EMAILS:
            return {
                ...state,
                allemails:null
            };
        case DELETE_EMAIL:
            return{
                ...state,
                email_name: null,
                email_id: null,
                email_body: null,
                allemails:action.payload
            };
        default:
            return state;
    }
}