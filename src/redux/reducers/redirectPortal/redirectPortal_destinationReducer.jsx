import { GET_REDIRECT_DESTINATION_FAIL, GET_REDIRECT_DESTINATION_REQUEST, GET_REDIRECT_DESTINATION_SUCCESS, GET_USER_REDIRECT_GROUPS_FAIL, GET_USER_REDIRECT_GROUPS_REQUEST, GET_USER_REDIRECT_GROUPS_SUCCESS, UPDATE_REDIRECT_DESTINATION_FAIL, UPDATE_REDIRECT_DESTINATION_REQUEST, UPDATE_REDIRECT_DESTINATION_SUCCESS } from "../../constants/redirectPortal/redirectportal_destinationConstants"

export const getRedirectDestinationReducer = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_REDIRECT_DESTINATION_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_REDIRECT_DESTINATION_SUCCESS:

            return {
                ...state,
                loading: false,
                RedirectDestination: action.payload
            }
        case GET_REDIRECT_DESTINATION_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const getRedirectGroupsReducer = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_USER_REDIRECT_GROUPS_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_USER_REDIRECT_GROUPS_SUCCESS:

            return {
                ...state,
                loading: false,
                RedirectGroup: action.payload
            }
        case GET_USER_REDIRECT_GROUPS_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}
export const updateRedirectDestinationReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_REDIRECT_DESTINATION_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_REDIRECT_DESTINATION_SUCCESS:

        return {
            ...state,
            loading: false,
            destination: action.payload
        }
    case UPDATE_REDIRECT_DESTINATION_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}