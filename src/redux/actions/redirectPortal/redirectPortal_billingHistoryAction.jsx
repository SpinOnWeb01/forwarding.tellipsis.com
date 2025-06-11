import axios from "axios";
import { api } from "../../../mockData";
import { GET_REDIRECT_BILLING_HISTORY_FAIL, GET_REDIRECT_BILLING_HISTORY_REQUEST, GET_REDIRECT_BILLING_HISTORY_SUCCESS } from "../../constants/redirectPortal/redirectPortal_billingHistoryConstants";
import { toast } from "react-toastify";

export const getRedirectBillingHistory = () => async (dispatch) => {
    const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    
        try {
          dispatch({ type: GET_REDIRECT_BILLING_HISTORY_REQUEST });
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token.access_token} `
            },
          };
          const { data } = await axios.get(
            
            
            `${api.dev}/api/userbillinghistory`,
            config
          );
         if (data?.status === 200 || 201) {
            toast.success(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
               
          }  else {
            toast.error(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
          }
          dispatch({ type: GET_REDIRECT_BILLING_HISTORY_SUCCESS, payload: data });
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
          dispatch({
            type: GET_REDIRECT_BILLING_HISTORY_FAIL,
            payload: error?.response?.data?.message,
          });
        }
      };