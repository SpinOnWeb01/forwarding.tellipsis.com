import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CallIcon from "@mui/icons-material/Call";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import ReceiptIcon from "@mui/icons-material/Receipt";
import RingVolumeIcon from "@mui/icons-material/RingVolume";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import Router from "../../routes/route";

function Sidebar({ userThem, open, setOpen }) {
  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigateTo = (route) => {
    navigate(route);
    setOpen(false); // Close the sidebar after navigation
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <ProSidebar id="admin_sidebar" style={{ background: "#ffffff", color: "black" }}>
        <Menu iconShape="square">
          <MenuItem icon={<DashboardIcon />} onClick={() => navigateTo(Router.REDIRECT_DASHBOARD)}>
            Dashboard
          </MenuItem>
          <MenuItem icon={<CallIcon />} onClick={() => navigateTo(Router.REDIRECT_CAMPAIGNS)}>
            Manage Campaign
          </MenuItem>
          <MenuItem icon={<ReceiptIcon />} onClick={() => navigateTo(Router.REDIRECT_DESTINATION)}>
            DID Number
          </MenuItem>
          <MenuItem icon={<RingVolumeIcon />} onClick={() => navigateTo(Router.REDIRECT_CALL_ACTIVE)}>
          Active Calls
          </MenuItem>
          <MenuItem icon={<HomeOutlinedIcon />} onClick={() => navigateTo(Router.REDIRECT_XML_CDR)}>
          Reports
          </MenuItem>
          <MenuItem icon={<PhoneDisabledIcon />} onClick={() => navigateTo(Router.REDIRECT_CALL_BLOCK)}>
          Call Block
          </MenuItem>
          <MenuItem icon={<AvTimerIcon />} onClick={() => navigateTo(Router.REDIRECT_MINUTES_LOG)}>
          Minutes Log
          </MenuItem>
        </Menu>
      </ProSidebar>
    </Box>
  );

  return (
    <div className={`App ${userThem}`}>
      <div className="contant_box">
          <div className="right_sidebox">
              <div className="row">
                <div className="col-lg-12">
                 
                  <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                  </Drawer>
                </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default Sidebar;
