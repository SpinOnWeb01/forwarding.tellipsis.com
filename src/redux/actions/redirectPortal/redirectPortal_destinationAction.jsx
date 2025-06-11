import axios from "axios";
import { api } from "../../../mockData";
import { GET_REDIRECT_DESTINATION_FAIL, GET_REDIRECT_DESTINATION_REQUEST, GET_REDIRECT_DESTINATION_SUCCESS, GET_USER_REDIRECT_GROUPS_FAIL, GET_USER_REDIRECT_GROUPS_REQUEST, GET_USER_REDIRECT_GROUPS_SUCCESS, UPDATE_REDIRECT_DESTINATION_FAIL, UPDATE_REDIRECT_DESTINATION_REQUEST, UPDATE_REDIRECT_DESTINATION_SUCCESS } from "../../constants/redirectPortal/redirectportal_destinationConstants";
import { toast } from "react-toastify";

export const getRedirectDestination = (radioValue, setLoader) => async (dispatch) => {
    const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    
        try {
          dispatch({ type: GET_REDIRECT_DESTINATION_REQUEST });
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token.access_token} `
            },
          };
          const { data } = await axios.get(
            
            
            `${api.dev}/api/userdidresource?status=${radioValue}`,
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
          dispatch({ type: GET_REDIRECT_DESTINATION_SUCCESS, payload: data });
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
          dispatch({
            type: GET_REDIRECT_DESTINATION_FAIL,
            payload: error?.response?.data?.message,
          });
        }finally {
          setLoader(false); // This runs whether success or error
        }
      };

      export const getUserRedirectGroups = () => async (dispatch) => {
        const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
        try {
          dispatch({ type: GET_USER_REDIRECT_GROUPS_REQUEST });
          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${api.dev}/api/getuserredirectgroups`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token} `,
            },
          };
          await axios
            .request(config)
            .then((response) => {
              dispatch({
                type: GET_USER_REDIRECT_GROUPS_SUCCESS,
                payload: response?.data?.data,
              });
            })
            .catch((error) => {});
        } catch (error) {
          dispatch({
            type: GET_USER_REDIRECT_GROUPS_FAIL,
            payload: error.response.data.message,
          });
        }
      };

      export const updateRedirectDestination = (updateDestination, setResponse, handleEditClose) => async (dispatch) => {
        const current_user = localStorage.getItem("current_user");
        const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
          try {
            dispatch({ type: UPDATE_REDIRECT_DESTINATION_REQUEST });
            const config = {
              headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.access_token} `
              },
            };
            const { data } = await axios.put(
              
              
              `${api.dev}/api/userdidresource`,
              updateDestination,
              config
            );
           if (data?.status === 200 || 201) {
              toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
              });
              setResponse(data);   
              handleEditClose();    
            }  else {
              toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
            }
            dispatch({ type: UPDATE_REDIRECT_DESTINATION_SUCCESS, payload: data });
          } catch (error) {
            toast.error(error?.response?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
            dispatch({
              type: UPDATE_REDIRECT_DESTINATION_FAIL,
              payload: error?.response?.data?.message,
            });
          }
        };