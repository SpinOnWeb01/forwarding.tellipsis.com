import axios from "axios";
import { ALL_REPORT_FAIL, ALL_REPORT_REQUEST, ALL_REPORT_SUCCESS, CREATE_ADMIN_BLOCK_REPORT_FAIL, CREATE_ADMIN_BLOCK_REPORT_REQUEST, CREATE_ADMIN_BLOCK_REPORT_SUCCESS } from "../constants/reportConstants";
import { toast } from "react-toastify";
import { api } from "../../mockData";

export const getReport = (filterValues, setLoader) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("admin"));
  try {
    dispatch({ type: ALL_REPORT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.access_token}`,
      },
    };

    const { data } = await axios.post(`${api.dev}/api/allcdr`, filterValues, config);

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

    dispatch({ type: ALL_REPORT_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2500,
    });
    dispatch({
      type: ALL_REPORT_FAIL,
      payload: error?.response?.data?.message,
    });
  } finally {
    setLoader(false); // This runs whether success or error
  }
};


  export const createBlockReport = (createBlockReport, setResponse, setLoader) => async (dispatch) => {
 
    const token = JSON.parse(localStorage.getItem(`admin`));
            try {
              dispatch({ type: CREATE_ADMIN_BLOCK_REPORT_REQUEST });
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization" : `Bearer ${token.access_token} `
                },
              };
              const { data } = await axios.post(
                
                
                `${api.dev}/api/adminreportcallblock`,
                JSON.stringify(createBlockReport),
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
              dispatch({ type: CREATE_ADMIN_BLOCK_REPORT_SUCCESS, payload: data });
            } catch (error) {
              toast.error(error?.response?.data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
              dispatch({
                type: CREATE_ADMIN_BLOCK_REPORT_FAIL,
                payload: error?.response?.data?.message,
              });
            } finally {
              setLoader(false); // This runs whether success or error
            }
  };
  