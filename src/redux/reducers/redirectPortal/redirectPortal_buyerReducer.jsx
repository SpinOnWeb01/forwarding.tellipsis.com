import { CREATE_REDIRECT_BUYER_FAIL, CREATE_REDIRECT_BUYER_REQUEST, CREATE_REDIRECT_BUYER_SUCCESS, DELETE_REDIRECT_BUYER_FAIL, DELETE_REDIRECT_BUYER_REQUEST, DELETE_REDIRECT_BUYER_SUCCESS, GET_REDIRECT_BUYER_FAIL, GET_REDIRECT_BUYER_REQUEST, GET_REDIRECT_BUYER_SUCCESS, UPDATE_REDIRECT_BUYER_FAIL, UPDATE_REDIRECT_BUYER_REQUEST, UPDATE_REDIRECT_BUYER_SUCCESS } from "../../constants/redirectPortal/redirectPortal_buyerConstants"

export const getRedirectBuyerReducer = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_REDIRECT_BUYER_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_REDIRECT_BUYER_SUCCESS:

            return {
                ...state,
                loading: false,
                RedirectBuyer: action.payload
            }
        case GET_REDIRECT_BUYER_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createRedirectBuyerReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_REDIRECT_BUYER_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_REDIRECT_BUYER_SUCCESS:

        return {
            ...state,
            loading: false,
            addBuyer: action.payload
        }
    case CREATE_REDIRECT_BUYER_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateRedirectBuyerReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_REDIRECT_BUYER_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_REDIRECT_BUYER_SUCCESS:

        return {
            ...state,
            loading: false,
            update_buyer: action.payload
        }
    case UPDATE_REDIRECT_BUYER_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const deleteRedirectBuyerReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case DELETE_REDIRECT_BUYER_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case DELETE_REDIRECT_BUYER_SUCCESS:

        return {
            ...state,
            loading: false,
            delete_BUYER: action.payload
        }
    case DELETE_REDIRECT_BUYER_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}