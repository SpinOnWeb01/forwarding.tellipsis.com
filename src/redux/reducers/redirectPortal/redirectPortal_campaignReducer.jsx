import { ALL_REDIRECT_CAMPAIGN_FAIL, ALL_REDIRECT_CAMPAIGN_REQUEST, ALL_REDIRECT_CAMPAIGN_SUCCESS, CREATE_REDIRECT_CAMPAIGN_FAIL, CREATE_REDIRECT_CAMPAIGN_REQUEST, CREATE_REDIRECT_CAMPAIGN_SUCCESS, DELETE_REDIRECT_CAMPAIGN_FAIL, DELETE_REDIRECT_CAMPAIGN_REQUEST, DELETE_REDIRECT_CAMPAIGN_SUCCESS, UPDATE_REDIRECT_CAMPAIGN_FAIL, UPDATE_REDIRECT_CAMPAIGN_REQUEST, UPDATE_REDIRECT_CAMPAIGN_SUCCESS } from "../../constants/redirectPortal/redirectPortal_campaignConstants"


export const getRedirectCampaignReducer = (state = { users: [] }, action) => {

    switch (action.type) {
        case ALL_REDIRECT_CAMPAIGN_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case ALL_REDIRECT_CAMPAIGN_SUCCESS:

            return {
                ...state,
                loading: false,
                RedirectCampaign: action.payload
            }
        case ALL_REDIRECT_CAMPAIGN_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createRedirectCampaignReducer = (state = { users: [] }, action) => {

    switch (action.type) {
        case CREATE_REDIRECT_CAMPAIGN_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case CREATE_REDIRECT_CAMPAIGN_SUCCESS:

            return {
                ...state,
                loading: false,
                RedirectCampaign: action.payload
            }
        case CREATE_REDIRECT_CAMPAIGN_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const updateRedirectCampaignReducer = (state = { users: [] }, action) => {

    switch (action.type) {
        case UPDATE_REDIRECT_CAMPAIGN_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case UPDATE_REDIRECT_CAMPAIGN_SUCCESS:

            return {
                ...state,
                loading: false,
                RedirectCampaign: action.payload
            }
        case UPDATE_REDIRECT_CAMPAIGN_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const deleteRedirectCampaignReducer = (state = {}, action) => {

    switch (action.type) {
        case DELETE_REDIRECT_CAMPAIGN_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case DELETE_REDIRECT_CAMPAIGN_SUCCESS:

            return {
                ...state,
                loading: false,

                isDeleted: action.payload,
                message: action.payload.message
            }
        case DELETE_REDIRECT_CAMPAIGN_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}