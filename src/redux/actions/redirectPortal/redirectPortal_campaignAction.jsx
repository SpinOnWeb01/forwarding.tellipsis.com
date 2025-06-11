import axios from "axios";
import { api } from "../../../mockData";
import { toast } from "react-toastify";
import {
  ALL_REDIRECT_CAMPAIGN_FAIL,
  ALL_REDIRECT_CAMPAIGN_REQUEST,
  ALL_REDIRECT_CAMPAIGN_SUCCESS,
  CREATE_REDIRECT_CAMPAIGN_FAIL,
  CREATE_REDIRECT_CAMPAIGN_REQUEST,
  CREATE_REDIRECT_CAMPAIGN_SUCCESS,
  DELETE_REDIRECT_CAMPAIGN_FAIL,
  DELETE_REDIRECT_CAMPAIGN_REQUEST,
  DELETE_REDIRECT_CAMPAIGN_SUCCESS,
  UPDATE_REDIRECT_CAMPAIGN_FAIL,
  UPDATE_REDIRECT_CAMPAIGN_REQUEST,
  UPDATE_REDIRECT_CAMPAIGN_SUCCESS,
} from "../../constants/redirectPortal/redirectPortal_campaignConstants";

export const getRedirectCampaign = (filterValues) => async (dispatch) => {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));

  try {
    dispatch({ type: ALL_REDIRECT_CAMPAIGN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token} `,
      },
    };
    const { data } = await axios.get(
      `${api.dev}/api/getuserredirectgroups`,
      config
    );
    if (data?.status === 200) {
      toast.success(data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    } else {
      toast.error(data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
    }
    dispatch({ type: ALL_REDIRECT_CAMPAIGN_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2500,
    });
    dispatch({
      type: ALL_REDIRECT_CAMPAIGN_SUCCESS,
      payload: [],
    });
  }
};

export const createRedirectCampaign =
  (createCampaign, setResponse, handleClose) => async (dispatch) => {
    const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));

    try {
      dispatch({ type: CREATE_REDIRECT_CAMPAIGN_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.post(
        `${api.dev}/api/getuserredirectgroups`,
        createCampaign,
        config
      );
      if (data?.status === 201 || 200) {
        toast.success("Created Successfully", {
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
      dispatch({ type: CREATE_REDIRECT_CAMPAIGN_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: CREATE_REDIRECT_CAMPAIGN_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const updateRedirectCampaign =
  (updateCampaign, setResponse, handleEditCampaignClose) =>
  async (dispatch) => {
    const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));

    try {
      dispatch({ type: UPDATE_REDIRECT_CAMPAIGN_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.put(
        `${api.dev}/api/getuserredirectgroups`,
        updateCampaign,
        config
      );
      if (data?.status === 200 || 201) {
        toast.success("Update Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setResponse(data);
        handleEditCampaignClose();
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: UPDATE_REDIRECT_CAMPAIGN_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: UPDATE_REDIRECT_CAMPAIGN_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const deleteRedirectCampaign =
  (deleteCampaign, setResponse) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REDIRECT_CAMPAIGN_REQUEST });
      const current_user = localStorage.getItem("current_user");
      const token = JSON.parse(localStorage.getItem(`user_${current_user}`));

      fetch(`${api.dev}/api/getuserredirectgroups`, {
        method: "DELETE",
        body: deleteCampaign, // Using body instead of data for sending data
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            // Parse JSON response
            return response.json();
          } else {
            // Handle error status
            throw new Error(`Request failed with status ${response.status}`);
          }
        })
        .then((data) => {
          if (data.status === 403 || data.status === 404) {
            // Handle successful response
            toast.error(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
          } else if (data.status === 200 || data.status === 201) {
            toast.success(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
            setResponse(data);

            dispatch({ type: DELETE_REDIRECT_CAMPAIGN_SUCCESS, payload: data });
          } else {
            toast.error(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
          }
        })
        .catch((error) => {
          // Handle fetch errors
          toast.error("Error deleting. Please try again later.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        });
    } catch (error) {
      dispatch({
        type: DELETE_REDIRECT_CAMPAIGN_FAIL,
        payload: error.response.data.message,
      });
    }

    // try {
    //   dispatch({ type: DELETE_REDIRECT_CAMPAIGN_REQUEST });
    //   const current_user = localStorage.getItem("current_user");
    //   const token = JSON.parse(localStorage.getItem(`user_${current_user}`));

    //   fetch(`${api.dev}/api/getuserredirectgroups`, {
    //     method: 'DELETE', // Using body instead of data for sending data
    //     body: deleteCampaign,
    //     headers: {
    //       'Authorization': `Bearer ${token.access_token}`,
    //       'Content-Type': 'application/json'
    //     },
    //   })
    //   .then(response => {
    //     if (response.status === 200 || 201) {
    //       // Parse JSON response
    //       return response.json();
    //     } else {
    //       // Handle error status
    //       throw new Error(`Request failed with status ${response.status}`);
    //     }
    //   })
    //   .then(data => {
    //     // Handle successful response
    //     toast.success(data?.message, {
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 1500,
    //     });
    //     setResponse(data);
    //     dispatch({ type: DELETE_REDIRECT_CAMPAIGN_SUCCESS, payload: data });
    //   })
    //   .catch(error => {
    //     // Handle fetch errors
    //     toast.error('Error deleting. Please try again later.', {
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 1500,
    //     });
    //   });

    // }
    //  catch (error) {
    //   dispatch({ type: DELETE_REDIRECT_CAMPAIGN_FAIL, payload: error.response.data.message });
    // }
  };
