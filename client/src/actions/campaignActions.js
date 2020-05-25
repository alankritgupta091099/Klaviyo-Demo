import { UPDATE_CAMPAIGN , INITIALIZE_CAMPAIGN , LOAD_ALL_CAMPAIGNS , LOAD_SELECTED_CAMPAIGN , NO_CAMPAIGNS , DELETE_CAMPAIGN } from './types.js'

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