import { UPDATE_FLOW , INITIALIZE_FLOW , LOAD_ALL_FLOWS , NO_FLOWS , DELETE_FLOW , LOAD_SELECTED_FLOWS } from "../actions/types.js";
import { chartSimple } from '../components/flows/DefaultChart';

const initialState={
    flow_name: null,
    flow_id: null,
    flow_body: null,
    allFlows:[]
}

export default function ( state = initialState , action ) {
    switch (action.type) {
        case UPDATE_FLOW:
            return {
                ...state,
                flow_body:action.payload
            };
        case INITIALIZE_FLOW:
            return {
                ...state,
                flow_name:action.payload.flow_name,
                flow_id:action.payload.flow_id,
                flow_body:chartSimple
            };
        case LOAD_ALL_FLOWS:
            return{
                ...state,
                allFlows:action.payload
            };
        case LOAD_SELECTED_FLOWS:
            return{
                ...state,
                flow_name:action.payload.flow_name,
                flow_id:action.payload.flow_id,
                flow_body:action.payload.flow_body
            }
        case NO_FLOWS:
            return {
                ...state,
                allFlows:[]
            };
        case DELETE_FLOW:
            return{
                ...state,
                flow_name: null,
                flow_id: null,
                flow_body: null,
                allFlows:action.payload
            };
        default:
            return state;
    }
} 