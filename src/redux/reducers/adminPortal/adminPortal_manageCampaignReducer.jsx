import { CREATE_ADMIN_MANAGE_CAMPAIGN_FAIL, CREATE_ADMIN_MANAGE_CAMPAIGN_REQUEST, CREATE_ADMIN_MANAGE_CAMPAIGN_SUCCESS, DELETE_ADMIN_MANAGE_CAMPAIGN_FAIL, DELETE_ADMIN_MANAGE_CAMPAIGN_REQUEST, DELETE_ADMIN_MANAGE_CAMPAIGN_SUCCESS, GET_ADMIN_MANAGE_CAMPAIGN_FAIL, GET_ADMIN_MANAGE_CAMPAIGN_REQUEST, GET_ADMIN_MANAGE_CAMPAIGN_SUCCESS, UPDATE_ADMIN_MANAGE_CAMPAIGN_FAIL, UPDATE_ADMIN_MANAGE_CAMPAIGN_REQUEST, UPDATE_ADMIN_MANAGE_CAMPAIGN_SUCCESS } from "../../constants/adminPortal/adminPortal_manageCampaignConstants"

export const getAdminManageCampaignReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_MANAGE_CAMPAIGN_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_MANAGE_CAMPAIGN_SUCCESS:

            return {
                ...state,
                loading: false,
                ManageCampaign: action.payload
            }
        case GET_ADMIN_MANAGE_CAMPAIGN_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createAdminManageCampaignReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_ADMIN_MANAGE_CAMPAIGN_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_ADMIN_MANAGE_CAMPAIGN_SUCCESS:

        return {
            ...state,
            loading: false,
            ManageCampaign: action.payload
        }
    case CREATE_ADMIN_MANAGE_CAMPAIGN_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateAdminManageCampaignReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_ADMIN_MANAGE_CAMPAIGN_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_ADMIN_MANAGE_CAMPAIGN_SUCCESS:

        return {
            ...state,
            loading: false,
            updateManageCampaign: action.payload
        }
    case UPDATE_ADMIN_MANAGE_CAMPAIGN_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const deleteAdminManageCampaignReducer= (state = {}, action) => {

    switch (action.type) {
        case DELETE_ADMIN_MANAGE_CAMPAIGN_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case DELETE_ADMIN_MANAGE_CAMPAIGN_SUCCESS:

            return {
                ...state,
                loading: false,

                isDeleted: action.payload,
                message: action.payload.message
            }
        case DELETE_ADMIN_MANAGE_CAMPAIGN_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}