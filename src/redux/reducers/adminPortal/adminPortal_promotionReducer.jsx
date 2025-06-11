import { CREATE_ADMIN_PROMOTION_FAIL, CREATE_ADMIN_PROMOTION_REQUEST, CREATE_ADMIN_PROMOTION_SUCCESS, GET_ADMIN_PROMOTION_FAIL, GET_ADMIN_PROMOTION_REQUEST, GET_ADMIN_PROMOTION_SUCCESS } from "../../constants/adminPortal/adminPortal_promotionsConstants"

export const getAdminPromotionReducers = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_ADMIN_PROMOTION_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case GET_ADMIN_PROMOTION_SUCCESS:

            return {
                ...state,
                loading: false,
                promotions: action.payload
            }
        case GET_ADMIN_PROMOTION_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload

            }

        default:
            return state
    }

}

export const createAdminPromotionReducer = (state = { user: {} }, action) => {

    switch (action.type) {
         case CREATE_ADMIN_PROMOTION_REQUEST:

        return {
            ...state,
            loading: true,
        }
    case CREATE_ADMIN_PROMOTION_SUCCESS:

        return {
            ...state,
            loading: false,
            addPromotions: action.payload
        }
    case CREATE_ADMIN_PROMOTION_FAIL:

        return {
            ...state,
            loading: false,
            error: action.payload

        }

        default:
            return state;
    }

}