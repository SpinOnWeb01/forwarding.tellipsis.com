import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";
import { api } from '../mockData';
function Cps() {
    const [cps, setCps] = useState(0);
    useEffect(() => {
        // const socket = socketIOClient(`${api.dev}`);
    
        // // Listen for events from the server
        // socket.on("mcps", (data) => {
        //   // Handle the received data (e.g., update state, trigger a re-fetch)
        //   if(data?.data !== undefined){
        //   // const jsonData = JSON.parse(data?.data);
        //   // console.log('jsonData', jsonData)
        //   setCps(data?.data);
        //   }
        // });
    
        // return () => {
        //   // Disconnect the socket when the component unmounts
        //   socket.disconnect();
        // };
        // dispatch(getReport());
      }, []); // Empty dependency array ensures this effect runs once on mount
  return (
    <div>{cps !== 0 ?(<>{cps}</>):(<>0</>)}</div>
  )
}

export default Cps