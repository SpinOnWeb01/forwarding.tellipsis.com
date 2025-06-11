import { ALL_REDIRECT_REPORT_FAIL, ALL_REDIRECT_REPORT_REQUEST, ALL_REDIRECT_REPORT_SUCCESS, CREATE_USER_BLOCK_REPORT_FAIL, CREATE_USER_BLOCK_REPORT_REQUEST, CREATE_USER_BLOCK_REPORT_SUCCESS } from "../../constants/redirectPortal/redirectPortal_reportConstants"

export const getRedirectReportReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case ALL_REDIRECT_REPORT_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case ALL_REDIRECT_REPORT_SUCCESS:

            return {
                ...state,
                loading: false,
                RedirectReport: action.payload
            }
        case ALL_REDIRECT_REPORT_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const blockUserReportReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case CREATE_USER_BLOCK_REPORT_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case CREATE_USER_BLOCK_REPORT_SUCCESS:

            return {
                ...state,
                loading: false,
                blockUserReport: action.payload
            }
        case CREATE_USER_BLOCK_REPORT_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}