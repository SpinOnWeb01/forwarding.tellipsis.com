import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Router from "../../routes/route";
import "../redirect_portal/redirect_style.css";
import { Box, Tab, Tabs } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CallIcon from "@mui/icons-material/Call";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import ReceiptIcon from "@mui/icons-material/Receipt";
import RingVolumeIcon from "@mui/icons-material/RingVolume";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { useDispatch } from "react-redux";
import { GET_REDIRECT_BUYER_SUCCESS } from "../../redux/constants/redirectPortal/redirectPortal_buyerConstants";

function Navbar({ selectedValue }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const current_user = localStorage.getItem("current_user");
  const user = localStorage.getItem(`user_${current_user}`);
  const [value, setValue] = useState(() => {
    switch (location.pathname) {
      case Router.REDIRECT_DASHBOARD:
        return 0;
      case Router.REDIRECT_CAMPAIGNS:
        return 1;
      case Router.REDIRECT_DESTINATION:
        return 2;
      case Router.REDIRECT_CALL_ACTIVE:
        return 3;
      case Router.REDIRECT_XML_CDR:
        return 4;
      case Router.REDIRECT_CALL_BLOCK:
        return 5;
      case Router.REDIRECT_MINUTES_LOG:
        return 6;
      default:
        return 0;
    }
  });

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    navigate(tabOptions[newValue].path);
    switch (newValue) {
      case 0:
        navigate(Router.REDIRECT_DASHBOARD);
        break;
      case 1:
        navigate(Router.REDIRECT_CAMPAIGNS);
        break;
      case 2:
        navigate(Router.REDIRECT_DESTINATION);
        break;
      case 3:
        navigate(Router.REDIRECT_CALL_ACTIVE);
        break;
      case 4:
        navigate(Router.REDIRECT_XML_CDR);
        break;
      case 5:
        navigate(Router.REDIRECT_CALL_BLOCK);
        break;
      case 6:
        navigate(Router.REDIRECT_MINUTES_LOG);
        break;
      default:
        break;
    }
  };

  const handleRightClick = (event, path) => {
    event.preventDefault(); // Prevent default context menu
    const newTab = window.open(path, "_blank");
    newTab.focus();
  };

  const clearData = (data) => {
    dispatch({
      type: GET_REDIRECT_BUYER_SUCCESS,
      payload: [],
    });
     navigate(data);
  }

  const tabOptions = [
    {
      label: "Dashboard",
      icon: <DashboardIcon className="me-1 nav_icn" />,
      path: Router.REDIRECT_DASHBOARD,
    },
    {
      label: "Manage Campaign",
      icon: <CallIcon className="me-1 nav_icn" />,
      path: Router.REDIRECT_CAMPAIGNS,
    },
    {
      label: "DID/TFN NUMBER",
      icon: <ReceiptIcon className="me-1 nav_icn" />,
      path: Router.REDIRECT_DESTINATION,
    },
    {
      label: "Active Calls",
      icon: <RingVolumeIcon className="me-1 nav_icn" />,
      path: Router.REDIRECT_CALL_ACTIVE,
    },
    {
      label: "Reports",
      icon: <HelpOutlineIcon className="me-1 nav_icn" />,
      path: Router.REDIRECT_XML_CDR,
    },
    {
      label: "Call Block",
      icon: <PhoneDisabledIcon className="me-1 nav_icn" />,
      path: Router.REDIRECT_CALL_BLOCK,
    },
    {
      label: "Minutes Log",
      icon: <AvTimerIcon className="me-1 nav_icn" />,
      path: Router.REDIRECT_MINUTES_LOG,
    },
  ];

  return (
    <>
      {user?.user_type === "admin" ? (
        <></>
      ) : (
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            className="redirect_header_row"
          >
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="basic tabs example"
              className="redirect_tab"
            >
              {tabOptions.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  icon={tab.icon}
                  className="tabbs"
                  onClick={() => clearData(tab.path)} // Navigate on left-click
                  onContextMenu={(event) => handleRightClick(event, tab.path)} // Open new tab on right-click
                />
              ))}
            </Tabs>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Navbar;
