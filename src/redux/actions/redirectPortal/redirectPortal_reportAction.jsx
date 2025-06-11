import axios from "axios";
import { api } from "../../../mockData";
import { toast } from "react-toastify";
import { ALL_REDIRECT_REPORT_FAIL, ALL_REDIRECT_REPORT_REQUEST, ALL_REDIRECT_REPORT_SUCCESS, CREATE_USER_BLOCK_REPORT_FAIL, CREATE_USER_BLOCK_REPORT_REQUEST, CREATE_USER_BLOCK_REPORT_SUCCESS } from "../../constants/redirectPortal/redirectPortal_reportConstants";

export const getRedirectReport = (filterValues) => async (dispatch) => {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
  
      try {
        dispatch({ type: ALL_REDIRECT_REPORT_REQUEST });
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        const { data } = await axios.post(
          
          
          `${api.dev}/api/userallcdr`,
          filterValues,
          config
        );
       if (data?.status === 200) {
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
        dispatch({ type: ALL_REDIRECT_REPORT_SUCCESS, payload: data });
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        dispatch({
          type: ALL_REDIRECT_REPORT_FAIL,
          payload: error?.response?.data?.message,
        });
      }
    };

    export const createUserBlockReport = (createBlockReport, setResponse) => async (dispatch) => {
      const current_user = localStorage.getItem("current_user");
      const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
                try {
                  dispatch({ type: CREATE_USER_BLOCK_REPORT_REQUEST });
                  const config = {
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization" : `Bearer ${token.access_token} `
                    },
                  };
                  const { data } = await axios.post(
                    
                    
                    `${api.dev}/api/userreportcallblock`,
                    createBlockReport,
                    config
                  );
                 if (data?.status === 200) {
                    toast.success(data.data[0].message, {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 1500,
                    });
                    setResponse(data);  
                  }  else {
                    toast.error(data?.message, {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 2500,
                    });
                  }
                  dispatch({ type: CREATE_USER_BLOCK_REPORT_SUCCESS, payload: data });
                } catch (error) {
                  toast.error(error?.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500,
                  });
                  dispatch({
                    type: CREATE_USER_BLOCK_REPORT_FAIL,
                    payload: error?.response?.data?.message,
                  });
                }
      };