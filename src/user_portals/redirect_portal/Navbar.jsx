import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Router from "../../routes/route";
import { Box, ListItemIcon, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CallIcon from "@mui/icons-material/Call";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import ReceiptIcon from "@mui/icons-material/Receipt";
import RingVolumeIcon from "@mui/icons-material/RingVolume";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { useDispatch } from "react-redux";
import { GET_REDIRECT_BUYER_SUCCESS } from "../../redux/constants/redirectPortal/redirectPortal_buyerConstants";

const tabConfig = {
  dashboard: {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: Router.REDIRECT_DASHBOARD,
  },
  manage_campaign: {
    label: "Manage Campaign",
    icon: <CallIcon />,
    path: Router.REDIRECT_CAMPAIGNS,
  },
  did_tfn_number: {
    label: "DID/TFN NUMBER",
    icon: <ReceiptIcon />,
    path: Router.REDIRECT_DESTINATION,
  },
  report: {
    label: "Report",
    icon: <HelpOutlineIcon />,
    path: Router.REDIRECT_XML_CDR,
  },
  call_block: {
    label: "Call Block",
    icon: <PhoneDisabledIcon />,
    path: Router.REDIRECT_CALL_BLOCK,
  },
  active_calls: {
    label: "Active Calls",
    icon: <RingVolumeIcon />,
    path: Router.REDIRECT_CALL_ACTIVE,
  },
  minutes_log: {
    label: "Minutes Log",
    icon: <AvTimerIcon />,
    path: Router.REDIRECT_MINUTES_LOG,
  },
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const current_user = localStorage.getItem("current_user");
  const user = JSON.parse(localStorage.getItem(`user_${current_user}`));

  // Filter tabs based on user permissions
  const availableTabs = user?.blocked_features?.filter(
    (key) => tabConfig[key]
  ) || [];

  const tabPaths = availableTabs.map((key) => tabConfig[key]?.path);

  // Set initial tab based on location or localStorage
  const getInitialTab = () => {
    const storedValue = localStorage.getItem("selectedTab");
    if (storedValue !== null && tabPaths[storedValue]) {
      return parseInt(storedValue, 10);
    }

    const currentIndex = tabPaths.findIndex(
      (path) => path === location.pathname
    );
    return currentIndex !== -1 ? currentIndex : 0;
  };

  const [value, setValue] = useState(getInitialTab);

  // Sync tab selection to localStorage
  useEffect(() => {
    localStorage.setItem("selectedTab", value);
    if (tabPaths[value]) {
      navigate(tabPaths[value]);
    }
  }, [value]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="redirect_header_row">
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="Navigation Tabs"
          className="redirect_tab"
        >
          {availableTabs.map((key) => (
            <Tab
              key={key}
              label={tabConfig[key]?.label}
              icon={tabConfig[key]?.icon}
              className="tabbs"
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}

export default Navbar;
