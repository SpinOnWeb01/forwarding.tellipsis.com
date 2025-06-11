import { toast } from "react-toastify";
import { api } from "../../../mockData";
import { CREATE_REDIRECT_CALL_BLOCK_FAIL, CREATE_REDIRECT_CALL_BLOCK_REQUEST, CREATE_REDIRECT_CALL_BLOCK_SUCCESS, DELETE_REDIRECT_CALL_BLOCK_FAIL, DELETE_REDIRECT_CALL_BLOCK_REQUEST, DELETE_REDIRECT_CALL_BLOCK_SUCCESS, GET_REDIRECT_CALL_BLOCK_FAIL, GET_REDIRECT_CALL_BLOCK_REQUEST, GET_REDIRECT_CALL_BLOCK_SUCCESS, UPDATE_REDIRECT_CALL_BLOCK_FAIL, UPDATE_REDIRECT_CALL_BLOCK_REQUEST, UPDATE_REDIRECT_CALL_BLOCK_SUCCESS } from "../../constants/redirectPortal/redirectPortal_callBlockConstants";
import axios from "axios";

export const getRedirectCallBlock = () => async (dispatch) => {
    const current_user = localStorage.getItem("current_user");
      const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
      try {
        dispatch({ type: GET_REDIRECT_CALL_BLOCK_REQUEST });
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api.dev}/api/usercalleridblock`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token} `,
          },
        };
        await axios
          .request(config)
          .then((response) => {
            dispatch({
              type: GET_REDIRECT_CALL_BLOCK_SUCCESS,
              payload: response?.data,
            });
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
          });
      } catch (error) {
        dispatch({
          type: GET_REDIRECT_CALL_BLOCK_FAIL,
          payload: error.response.data.message,
        });
      }
    };


    export const createRedirectCallBlock =
  (
    callBlock,
    setResponse,
    handleClose
  ) =>
  async (dispatch) => {
    const current_user = localStorage.getItem("current_user");
      const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    try {
      dispatch({ type: CREATE_REDIRECT_CALL_BLOCK_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.post(
        `${api.dev}/api/usercalleridblock`,
        callBlock,
        config
      );
      if (data?.status === 200) {
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
      dispatch({ type: CREATE_REDIRECT_CALL_BLOCK_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: CREATE_REDIRECT_CALL_BLOCK_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  export const updateRedirectCallBlock =
  (updateCallBlock, setResponse, handleCloseModal) =>
  async (dispatch) => {
    const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    try {
      dispatch({ type: UPDATE_REDIRECT_CALL_BLOCK_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.put(
        `${api.dev}/api/usercalleridblock`,
        updateCallBlock,
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setResponse(data);
        handleCloseModal();
        
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: UPDATE_REDIRECT_CALL_BLOCK_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: UPDATE_REDIRECT_CALL_BLOCK_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  export const deleteRedirectCallBlock = (userData, setResponse, setCallBlockId) => async (dispatch) => {
  
    try {
      dispatch({ type: DELETE_REDIRECT_CALL_BLOCK_REQUEST });
      const current_user = localStorage.getItem("current_user");
      const token = JSON.parse(localStorage.getItem(`user_${current_user}`));

      fetch(`${api.dev}/api/usercalleridblock`, {
        method: 'DELETE',
        body: JSON.stringify(userData), // Using body instead of data for sending data
        headers: {
          'Authorization': `Bearer ${token.access_token}`,
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        if (response.status === 200) {
          // Parse JSON response
          return response.json();
        } else {
          // Handle error status
          throw new Error(`Request failed with status ${response.status}`);
        }
      })
      .then(data => {
        // Handle successful response
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setResponse(data);
        setCallBlockId("")
        dispatch({ type: DELETE_REDIRECT_CALL_BLOCK_SUCCESS, payload: data });
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
      dispatch({ type: DELETE_REDIRECT_CALL_BLOCK_FAIL, payload: error.response.data.message });
    }
  };