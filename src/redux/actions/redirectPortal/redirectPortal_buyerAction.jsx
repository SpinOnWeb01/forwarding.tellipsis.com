import axios from "axios";
import { CREATE_REDIRECT_BUYER_FAIL, CREATE_REDIRECT_BUYER_REQUEST, CREATE_REDIRECT_BUYER_SUCCESS, DELETE_REDIRECT_BUYER_FAIL, DELETE_REDIRECT_BUYER_REQUEST, DELETE_REDIRECT_BUYER_SUCCESS, GET_REDIRECT_BUYER_FAIL, GET_REDIRECT_BUYER_REQUEST, GET_REDIRECT_BUYER_SUCCESS, UPDATE_REDIRECT_BUYER_FAIL, UPDATE_REDIRECT_BUYER_REQUEST, UPDATE_REDIRECT_BUYER_SUCCESS } from "../../constants/redirectPortal/redirectPortal_buyerConstants";
import { api } from "../../../mockData";
import { toast } from "react-toastify";

export const getRedirectBuyer = (filterValues) => async (dispatch) => {
    const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    
        try {
          dispatch({ type: GET_REDIRECT_BUYER_REQUEST });
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token.access_token} `
            },
          };
          const { data } = await axios.get(
            
            
            `${api.dev}/api/getuserredirectgroupdetails?camp_id=${filterValues}`,
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
          dispatch({ type: GET_REDIRECT_BUYER_SUCCESS, payload: data });
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
          dispatch({
            type: GET_REDIRECT_BUYER_SUCCESS,
            payload: [],
          });
        }
      };

      export const createRedirectBuyer =
      (
        addBuyer,
        setResponse,
        handleClose
      ) =>
      async (dispatch) => {
        const current_user = localStorage.getItem("current_user");
          const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
        try {
          dispatch({ type: CREATE_REDIRECT_BUYER_REQUEST });
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token} `,
            },
          };
          const { data } = await axios.post(
            `${api.dev}/api/getuserredirectgroupdetails`,
            addBuyer,
            config
          );
          if (data?.status === 200 || 201) {
            toast.success(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
            setResponse(data);
            handleClose();
          } else {
            toast.error(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
          }
          dispatch({ type: CREATE_REDIRECT_BUYER_SUCCESS, payload: data });
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
          dispatch({
            type: CREATE_REDIRECT_BUYER_FAIL,
            payload: error?.response?.data?.message,
          });
        }
      };

      export const updateRedirectBuyer = (updateAddBuyer, setOpenModal, setResponse,) => async (dispatch) => {
        const current_user = localStorage.getItem("current_user");
        const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
          try {
            dispatch({ type: UPDATE_REDIRECT_BUYER_REQUEST });
            const config = {
              headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.access_token} `
              },
            };
            const { data } = await axios.put(
              
              
              `${api.dev}/api/getuserredirectgroupdetails`,
              updateAddBuyer,
              config
            );
           if (data?.status === 200 || 201) {
              toast.success(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
              });
              setOpenModal(false);
              setResponse(data);      
            }  else {
              toast.error(data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
            }
            dispatch({ type: UPDATE_REDIRECT_BUYER_SUCCESS, payload: data });
          } catch (error) {
            toast.error(error?.response?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
            dispatch({
              type: UPDATE_REDIRECT_BUYER_FAIL,
              payload: error?.response?.data?.message,
            });
          }
        };

        export const deleteRedirectBuyer = (deleteAddBuyer, setResponse,) => async (dispatch) => {
                
  
            try {
              dispatch({ type: DELETE_REDIRECT_BUYER_REQUEST });
              const current_user = localStorage.getItem("current_user");
              const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
        
              fetch(`${api.dev}/api/getuserredirectgroupdetails`, {
                method: 'DELETE',
                body: deleteAddBuyer, // Using body instead of data for sending data
                headers: {
                  'Authorization': `Bearer ${token.access_token}`,
                  'Content-Type': 'application/json'
                },
              })
              .then(response => {
                if (response.status === 200 || 201) {
                  // Parse JSON response
                  return response.json();
                } else {
                  // Handle error status
                  throw new Error(`Request failed with status ${response.status}`);
                }
              })
              .then(data => {
                if(data.status === 403 || data.status === 404){
                  // Handle successful response
                  toast.error(data?.message, {
                   position: toast.POSITION.TOP_RIGHT,
                   autoClose: 1500,
                 });
                               }else if(data.status === 200 || data.status === 201){
                                 toast.success(data?.message, {
                                   position: toast.POSITION.TOP_RIGHT,
                                   autoClose: 1500,
                                 });
                               setResponse(data);
                dispatch({ type: DELETE_REDIRECT_BUYER_SUCCESS, payload: data });
                                }else{
                                  toast.error(data?.message, {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: 1500,
                                  });
                                }
              })
              .catch(error => {
                // Handle fetch errors
                toast.error('Error deleting. Please try again later.', {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1500,
                });
              });
              
              
            } 
             catch (error) {
              dispatch({ type: DELETE_REDIRECT_BUYER_FAIL, payload: error.response.data.message });
            }
          };