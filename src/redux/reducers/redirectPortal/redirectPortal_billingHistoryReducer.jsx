import { GET_REDIRECT_BILLING_HISTORY_FAIL, GET_REDIRECT_BILLING_HISTORY_REQUEST, GET_REDIRECT_BILLING_HISTORY_SUCCESS } from "../../constants/redirectPortal/redirectPortal_billingHistoryConstants"

export const getRedirectBillingHistoryReducer = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_REDIRECT_BILLING_HISTORY_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_REDIRECT_BILLING_HISTORY_SUCCESS:

            return {
                ...state,
                loading: false,
                RedirectBillingHistory: action.payload
            }
        case GET_REDIRECT_BILLING_HISTORY_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}