import { CREATE_ADMIN_ADD_BUYER_FAIL, CREATE_ADMIN_ADD_BUYER_REQUEST, CREATE_ADMIN_ADD_BUYER_SUCCESS, DELETE_ADMIN_ADD_BUYER_FAIL, DELETE_ADMIN_ADD_BUYER_REQUEST, DELETE_ADMIN_ADD_BUYER_SUCCESS, GET_ADMIN_ADD_BUYER_FAIL, GET_ADMIN_ADD_BUYER_REQUEST, GET_ADMIN_ADD_BUYER_SUCCESS, UPDATE_ADMIN_ADD_BUYER_FAIL, UPDATE_ADMIN_ADD_BUYER_REQUEST, UPDATE_ADMIN_ADD_BUYER_SUCCESS } from "../../constants/adminPortal/adminPortal_addBuyerConstants"

export const getAdminAddBuyerReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_ADD_BUYER_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_ADD_BUYER_SUCCESS:

            return {
                ...state,
                loading: false,
                AddBuyer: action.payload
            }
        case GET_ADMIN_ADD_BUYER_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createAdminAddBuyerReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_ADMIN_ADD_BUYER_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_ADMIN_ADD_BUYER_SUCCESS:

        return {
            ...state,
            loading: false,
            addBuyer: action.payload
        }
    case CREATE_ADMIN_ADD_BUYER_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateAdminAddBuyerReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_ADMIN_ADD_BUYER_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_ADMIN_ADD_BUYER_SUCCESS:

        return {
            ...state,
            loading: false,
            update_buyer: action.payload
        }
    case UPDATE_ADMIN_ADD_BUYER_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const deleteAdminAddBuyerReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case DELETE_ADMIN_ADD_BUYER_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case DELETE_ADMIN_ADD_BUYER_SUCCESS:

        return {
            ...state,
            loading: false,
            delete_BUYER: action.payload
        }
    case DELETE_ADMIN_ADD_BUYER_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}