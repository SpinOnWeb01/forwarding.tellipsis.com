import { toast } from "react-toastify";
import { api } from "../../../mockData";
import { CREATE_ADMIN_PROMOTION_FAIL, CREATE_ADMIN_PROMOTION_REQUEST, CREATE_ADMIN_PROMOTION_SUCCESS, GET_ADMIN_PROMOTION_FAIL, GET_ADMIN_PROMOTION_REQUEST, GET_ADMIN_PROMOTION_SUCCESS } from "../../constants/adminPortal/adminPortal_promotionsConstants";
import axios from "axios";

export const getAdminPromotion = (camp_id) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: GET_ADMIN_PROMOTION_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/promotional`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_ADMIN_PROMOTION_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
          dispatch({
            type: GET_ADMIN_PROMOTION_SUCCESS,
            payload: [],
          });
        });
        
    } catch (error) {
      dispatch({
        type: GET_ADMIN_PROMOTION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const createAdminPromotion = (createAdminAddPromotion, handleReset, setResponse,) => async (dispatch) => {
    
    const token = JSON.parse(localStorage.getItem("admin"));
      try {
        dispatch({ type: CREATE_ADMIN_PROMOTION_REQUEST });
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        const { data } = await axios.post(
          
          
          `${api.dev}/api/promotional`,
          createAdminAddPromotion,
          config
        );
       if (data?.status === 201 || 200) {
          toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          handleReset();
          setResponse(data);

        }  else {
          toast.error(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        }
        dispatch({ type: CREATE_ADMIN_PROMOTION_SUCCESS, payload: data });
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        dispatch({
          type: CREATE_ADMIN_PROMOTION_FAIL,
          payload: error?.response?.data?.message,
        });
      }
    };