import axios from "axios";
import {
  CREATE_ADMIN_MANAGE_CAMPAIGN_FAIL,
  CREATE_ADMIN_MANAGE_CAMPAIGN_REQUEST,
  CREATE_ADMIN_MANAGE_CAMPAIGN_SUCCESS,
  DELETE_ADMIN_MANAGE_CAMPAIGN_FAIL,
  DELETE_ADMIN_MANAGE_CAMPAIGN_REQUEST,
  DELETE_ADMIN_MANAGE_CAMPAIGN_SUCCESS,
  GET_ADMIN_MANAGE_CAMPAIGN_FAIL,
  GET_ADMIN_MANAGE_CAMPAIGN_REQUEST,
  GET_ADMIN_MANAGE_CAMPAIGN_SUCCESS,
  UPDATE_ADMIN_MANAGE_CAMPAIGN_FAIL,
  UPDATE_ADMIN_MANAGE_CAMPAIGN_REQUEST,
  UPDATE_ADMIN_MANAGE_CAMPAIGN_SUCCESS,
} from "../../constants/adminPortal/adminPortal_manageCampaignConstants";
import { api } from "../../../mockData";
import { toast } from "react-toastify";

export const getAdminManageCampaign = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("admin"));
  try {
    dispatch({ type: GET_ADMIN_MANAGE_CAMPAIGN_REQUEST });
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/redirectgroups`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token} `,
      },
    };
    await axios
      .request(config)
      .then((response) => {
        dispatch({
          type: GET_ADMIN_MANAGE_CAMPAIGN_SUCCESS,
          payload: response?.data?.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ADMIN_MANAGE_CAMPAIGN_SUCCESS,
          payload: [],
        });
      });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_MANAGE_CAMPAIGN_FAIL,
      payload: [],
    });
  }
};

export const createAdminManageCampaign =
  (createAdminManageCampaign, setOpen, setResponse) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: CREATE_ADMIN_MANAGE_CAMPAIGN_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.post(
        `${api.dev}/api/redirectgroups`,
        JSON.stringify(createAdminManageCampaign),
        config
      );
      if (data?.status === 201) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setOpen(false);
        setResponse(data);
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: CREATE_ADMIN_MANAGE_CAMPAIGN_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: CREATE_ADMIN_MANAGE_CAMPAIGN_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const updateAdminManageCampaign =
  (updateManageCampaign, setOpenModal, setResponse) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: UPDATE_ADMIN_MANAGE_CAMPAIGN_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.put(
        `${api.dev}/api/redirectgroups`,
        JSON.stringify(updateManageCampaign),
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setOpenModal(false);
        setResponse(data);
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: UPDATE_ADMIN_MANAGE_CAMPAIGN_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: UPDATE_ADMIN_MANAGE_CAMPAIGN_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const deleteAdminManageCampaign =
  (userData, setResponse) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_ADMIN_MANAGE_CAMPAIGN_REQUEST });
      const token = JSON.parse(localStorage.getItem("admin"));

      fetch(`${api.dev}/api/redirectgroups`, {
        method: "DELETE",
        body: userData, // Using body instead of data for sending data
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 201 || 200) {
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
            dispatch({
              type: DELETE_ADMIN_MANAGE_CAMPAIGN_SUCCESS,
              payload: data,
            });
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
        type: DELETE_ADMIN_MANAGE_CAMPAIGN_FAIL,
        payload: error.response.data.message,
      });
    }
  };
