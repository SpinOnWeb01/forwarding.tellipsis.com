import { CREATE_REDIRECT_CALL_BLOCK_FAIL, CREATE_REDIRECT_CALL_BLOCK_REQUEST, CREATE_REDIRECT_CALL_BLOCK_SUCCESS, DELETE_REDIRECT_CALL_BLOCK_FAIL, DELETE_REDIRECT_CALL_BLOCK_REQUEST, DELETE_REDIRECT_CALL_BLOCK_SUCCESS, GET_REDIRECT_CALL_BLOCK_FAIL, GET_REDIRECT_CALL_BLOCK_REQUEST, GET_REDIRECT_CALL_BLOCK_SUCCESS, UPDATE_REDIRECT_CALL_BLOCK_FAIL, UPDATE_REDIRECT_CALL_BLOCK_REQUEST, UPDATE_REDIRECT_CALL_BLOCK_SUCCESS } from "../../constants/redirectPortal/redirectPortal_callBlockConstants"

export const getRedirectCallBlockReducer = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_REDIRECT_CALL_BLOCK_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_REDIRECT_CALL_BLOCK_SUCCESS:

            return {
                ...state,
                loading: false,
                redirectCallBlock: action.payload
            }
        case GET_REDIRECT_CALL_BLOCK_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createRedirectCallBlockReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_REDIRECT_CALL_BLOCK_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_REDIRECT_CALL_BLOCK_SUCCESS:

        return {
            ...state,
            loading: false,
            callBlock: action.payload
        }
    case CREATE_REDIRECT_CALL_BLOCK_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const updateRedirectCallBlockReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case UPDATE_REDIRECT_CALL_BLOCK_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case UPDATE_REDIRECT_CALL_BLOCK_SUCCESS:

        return {
            ...state,
            loading: false,
            updateCallBlock: action.payload
        }
    case UPDATE_REDIRECT_CALL_BLOCK_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}

export const deleteRedirectCallBlockReducer = (state = {}, action) => {

    switch (action.type) {
        case DELETE_REDIRECT_CALL_BLOCK_REQUEST:

            return {
                ...state,

                loading: true,
            }
        case DELETE_REDIRECT_CALL_BLOCK_SUCCESS:

            return {
                ...state,
                loading: false,

                isDeleted: action.payload,
                message: action.payload.message
            }
        case DELETE_REDIRECT_CALL_BLOCK_FAIL:

            return {

                loading: false,

                error: action.payload,
            }

        default:
            return state
    }
}