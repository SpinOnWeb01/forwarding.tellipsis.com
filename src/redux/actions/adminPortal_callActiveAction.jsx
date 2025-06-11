import socketIOClient from 'socket.io-client';
import {
  GET_ADMIN_CALL_ACTIVE_FAIL,
  GET_ADMIN_CALL_ACTIVE_REQUEST,
  GET_ADMIN_CALL_ACTIVE_SUCCESS
} from "../constants/adminPortal_callActiveConstants";
import { api } from '../../mockData';

export const getAdminCallActive = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMIN_CALL_ACTIVE_REQUEST });
     const socket = socketIOClient(`${api.dev}`);
    socket.on("call_details", (data) => {
      // Handle the received data (e.g., update state, trigger a re-fetch)
      if (data?.data !== undefined) {
          // Get the count of objects in the received data
           const newDataCount = Object.keys(data.data).length;
          // Update state with the count of objects received in the current response
              dispatch({
          type: GET_ADMIN_CALL_ACTIVE_SUCCESS,
          payload: data?.data
        });
      }
  });

  return () => {
      // Disconnect the socket when the component unmounts
      socket.disconnect();
  };
// Empty dependency array ensures this effect runs once on mount


    // // Listen for events from the server
    // socket.on('response', (data) => {
    //   if (data?.data !== undefined) {
    //     dispatch({
    //       type: GET_ADMIN_CALL_ACTIVE_SUCCESS,
    //       payload: data?.data
    //     });
    //   }
    // });

    // // Clean up function
    // return () => {
    //   socket.disconnect();
    // };
  } catch (error) {
    dispatch({ type: GET_ADMIN_CALL_ACTIVE_FAIL, payload: error.message });
  }
};
