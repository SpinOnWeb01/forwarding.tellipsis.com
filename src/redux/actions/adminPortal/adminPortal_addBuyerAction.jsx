import axios from "axios";
import {
  CREATE_ADMIN_ADD_BUYER_FAIL,
  CREATE_ADMIN_ADD_BUYER_REQUEST,
  CREATE_ADMIN_ADD_BUYER_SUCCESS,
  DELETE_ADMIN_ADD_BUYER_FAIL,
  DELETE_ADMIN_ADD_BUYER_REQUEST,
  DELETE_ADMIN_ADD_BUYER_SUCCESS,
  GET_ADMIN_ADD_BUYER_FAIL,
  GET_ADMIN_ADD_BUYER_REQUEST,
  GET_ADMIN_ADD_BUYER_SUCCESS,
  UPDATE_ADMIN_ADD_BUYER_FAIL,
  UPDATE_ADMIN_ADD_BUYER_REQUEST,
  UPDATE_ADMIN_ADD_BUYER_SUCCESS,
} from "../../constants/adminPortal/adminPortal_addBuyerConstants";
import { api } from "../../../mockData";
import { toast } from "react-toastify";

export const getAdminAddBuyer = (camp_id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("admin"));
  try {
    dispatch({ type: GET_ADMIN_ADD_BUYER_REQUEST });
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/redirectgroupdetails?camp_id=${camp_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token} `,
      },
    };
    await axios
      .request(config)
      .then((response) => {
        dispatch({
          type: GET_ADMIN_ADD_BUYER_SUCCESS,
          payload: response?.data?.data,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        dispatch({
          type: GET_ADMIN_ADD_BUYER_SUCCESS,
          payload: [],
        });
      });
  } catch (error) {
     toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
    dispatch({
      type: GET_ADMIN_ADD_BUYER_SUCCESS,
      payload: [],
    });
    // dispatch({
    //   type: GET_ADMIN_ADD_BUYER_FAIL,
    //   payload: error.response.data.message,
    // });
  }
};

export const createAdminAddBuyer =
  (createAdminAddBuyer, setOpen, setResponse) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: CREATE_ADMIN_ADD_BUYER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.post(
        `${api.dev}/api/redirectgroupdetails`,
        createAdminAddBuyer,
        config
      );
      if (data?.status === 201 || 200) {
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
      dispatch({ type: CREATE_ADMIN_ADD_BUYER_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: CREATE_ADMIN_ADD_BUYER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const updateAdminAddBuyer =
  (updateAddBuyer, setOpenModal, setResponse) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: UPDATE_ADMIN_ADD_BUYER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.put(
        `${api.dev}/api/redirectgroupdetails`,
        updateAddBuyer,
        config
      );
      if (data?.status === 201 || 200) {
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
      dispatch({ type: UPDATE_ADMIN_ADD_BUYER_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: UPDATE_ADMIN_ADD_BUYER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const deleteAdminAddBuyer =
  (deleteAddBuyer, setResponse) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_ADMIN_ADD_BUYER_REQUEST });
      const token = JSON.parse(localStorage.getItem("admin"));

      fetch(`${api.dev}/api/redirectgroupdetails`, {
        method: "DELETE",
        body: deleteAddBuyer, // Using body instead of data for sending data
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
          // Handle successful response
          toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          setResponse(data);
          dispatch({ type: DELETE_ADMIN_ADD_BUYER_SUCCESS, payload: data });
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
        type: DELETE_ADMIN_ADD_BUYER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
