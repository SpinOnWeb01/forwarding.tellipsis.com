import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import '../admin/adminstyle.css';


function AdminLayout({colorThem,handleClick}) {
 // alert(colorThem)
  return (
    <>
    <div className={`App ${colorThem} `} id='admin1'>
      <Header colorThem={colorThem} handleClick={handleClick} />
      <Sidebar colorThem={colorThem} handleClick={handleClick} />
      <Outlet />
      </div>
    </>
  )
}

export default AdminLayout