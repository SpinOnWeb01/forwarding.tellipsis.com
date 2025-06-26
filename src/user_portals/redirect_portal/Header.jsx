import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../src/style.css";
import "../redirect_portal/redirect_style.css";
import { toast } from "react-toastify";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { Dropdown } from "react-bootstrap";
import LiveCall from "../../pages/LiveCall";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Grid
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import NightlightIcon from "@mui/icons-material/Nightlight";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CallIcon from "@mui/icons-material/Call";
import { api } from "../../mockData";
import Sidebar from "./Sidebar";

function Header({ userThem, handleClickUser, toggleDrawer, open, setOpen }) {
  const [number, setNumber] = useState(0);
  const [minutest, setMinutest] = useState([]);
  const current_user = localStorage.getItem("current_user");
  const user = JSON.parse(localStorage.getItem(`user_${current_user}`));
  const navigate = useNavigate();

  useEffect(() => {
    const socket = socketIOClient(`${api.dev}`);

    // Get the current user information from localStorage
    const current_user = localStorage.getItem("current_user");
    const user = JSON.parse(localStorage.getItem(`user_${current_user}`));

    // Listen for events from the server
    socket.on("call_details", (data) => {
      // Handle the received data (e.g., update state, trigger a re-fetch)
      if (data?.data !== undefined) {
        // Filter the data based on UserId matching user.uid
        const filteredData = Object.keys(data?.data)
          .map((key) => {
            try {
              const parsedValue = JSON.parse(data?.data[key]); // Parse JSON string
              return {
                id: key, // Add the key as 'id'
                ...parsedValue, // Spread the parsed object
              };
            } catch (error) {
              console.error(`Failed to parse JSON for key: ${key}`, error);
              return null; // Return null or handle error as needed
            }
          })
          .filter(Boolean) // Filter out any null entries
          .filter((row) => row.UserId === user.uid); // Filter rows where UserId matches userId.uid

        // Get the count of filtered objects
        const newDataCount = filteredData.length;
        setNumber(newDataCount);
      }
    });

    return () => {
      // Disconnect the socket when the component unmounts
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  const logout = () => {
    // let data = JSON.stringify({
    //   "user_uuid": user?.user_uuid
    // });

    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'http://95.217.227.234:5000/logout',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data : data
    // };

    // axios.request(config)
    // .then((res) => {
    //   if (res?.data?.message !== "") {
    toast.info("Logout Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("current_user");
    localStorage.removeItem("selectedTab");
    navigate("/");
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    // axios
    //   .get("https://ikalyuga.com/api/index.php?action=logout", {})
    //   .then((res) => {
    //     if (res?.data?.response?.message !== "") {
    //       toast.info(res.data.response.message, {
    //         position: toast.POSITION.TOP_RIGHT,
    //         autoClose: 1500,
    //       });
    //       localStorage.removeItem("user");
    //       navigate("/");
    //     }
    //   });
  };

  const minutes = async () => {
    const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/userminute`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      await axios
        .request(config)
        .then((response) => {
          setMinutest(response.data.data);
        })
        .catch((error) => {
          let errorMessage = "An error occurred while fetching data.";
          if (error.response) {
            if (error.response.status === 403) {
              errorMessage = "Permission Denied";
            } else if (
              error.response.status === 400 ||
              error.response.status === 401 ||
              error.response.status === 500
            ) {
              errorMessage = error.response.data.message || "Bad Request";
            }
          }
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    minutes();
  }, []);

  const refershLogo = () => {
    window.location.href = "/redirect_portal";
  };

  return (
    <>
      <div className={`App ${userThem} `}>
        <div className="contant_box">
          <Box sx={{ flexGrow: 1 }} className={`App ${userThem} manage_boxx`}>
            <Box className="manage_mobile_logo d-lg-none d-md-none d-sm-block d-block">
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                style={{ margin: "auto", width: "100%" }}
                className="d-flex align-items-center logo_image d-lg-none d-md-none d-sm-block d-block text-center"
              >
                <img
                  src="/img/logo_white11.png"
                  alt="Manage Logo"
                  className="img-fluid d-block"
                  style={{ cursor: "pointer", margin: "auto", width: "100%" }}
                  onClick={refershLogo}
                />
                <IconButton
                  style={{ position: "relative", zIndex: 999, top: "-40px" }}
                  className="menu_icon_button"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Typography>
            </Box>

            <AppBar position="static" className="manage_top_header">
              <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  className="d-flex align-items-center d-xxl-block d-xl-block d-lg-block d-md-block d-sm-none d-none"
                >
                  {/* <img
                  src="/img/Tellepsis-green.png"
                  alt="Manage Logo"
                  className="img-fluid d-block"
                  style={{ cursor: "pointer", }}
                  onClick={refershLogo}
                /> */}
                  <Grid container>
                    <Grid item xs={12} sm={12} md={2}>
                      <a href="/redirect_portal" style={{ maxWidth: "auto" }}>
                        {userThem === "user_theme_white" ? (
                          <>
                            {" "}
                            <img
                              src="/img/logo_white11.png"
                              alt="Manage Logo"
                              className="img-fluid d-block admin_logo"
                              style={{ cursor: "pointer" }}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              // src="/img/logo-4-edit-1.png"
                              src="/img/Tellepsis-green.png"
                              alt="Manage Logo"
                              className="img-fluid d-block admin_logo"
                              style={{ cursor: "pointer" }}
                            />
                          </>
                        )}
                      </a>
                    </Grid>
                  </Grid>
                </Typography>

                <div className="manage_rgiht_bdr d-flex align-items-center">
                  <p
                    style={{
                      color: "#000",
                      textTransform: "capitalize",
                      fontSize: "14px",
                      margin: "0",
                    }}
                  >
                    Balance{" "}
                    <span
                      style={{
                        fontSize: "17px",
                        fontWeight: "600",
                        color: "#00f500",
                      }}
                    >
                      {minutest[0]?.remaining_minutes}
                    </span>
                  </p>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    className="manage_call"
                  >
                    <CallIcon className="call_icon" />
                    <div>
                      <sub
                        style={{
                          color: "#000",
                          textTransform: "capitalize",
                          fontSize: "14px",
                        }}
                        className="live_icon"
                      >
                        {number}
                      </sub>
                    </div>
                    Live
                    {/* <LiveCall /> */}
                  </IconButton>

                  {/* Dark-mode */}

                  <div className="theme_options">
                    {userThem === "user_theme_white" ? (
                      <>
                        <Tooltip
                          title="Light Theme"
                          disableInteractive
                          interactive
                        >
                          <IconButton
                            onClick={() => handleClickUser("user_theme_dark")}
                          >
                            {" "}
                            <DarkModeIcon
                              id="user_theme_white"
                              className={`${
                                userThem === "user_theme_white" ? "active" : ""
                              }`}
                            />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip
                          title="Dark Theme"
                          disableInteractive
                          interactive
                        >
                          <IconButton
                            onClick={() => handleClickUser("user_theme_white")}
                          >
                            {" "}
                            <NightlightIcon
                              id="user_theme_dark"
                              style={{ color: "#f5751D " }}
                              className={`${
                                userThem === "user_theme_white" ? "active" : ""
                              } fa-solid fa-moon`}
                            />
                          </IconButton>
                        </Tooltip>{" "}
                      </>
                    )}
                  </div>

                  <div className="dshbrd_hdr_icon">
                    <ul>
                      <li>
                        <ul className="hdr_profile">
                          <li>
                            {/* Add a class to the image element */}
                            {/* <img
                          src="/img/nav_author.jpg"
                          className="img-fluid d-block rounded-circle" // Apply rounded-circle class for circular display
                          alt="profile"
                        /> */}
                            <div
                              className="profile_name"
                              style={{ paddingLeft: "0px", marginLeft: "0px" }}
                            >
                              <b style={{ color: "#000" }}>{user?.user_name}</b>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    style={{ paddingRight: "0" }}
                    onClick={logout}
                  >
                    <LogoutIcon className="call_icon " />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            {/* <!--navbar-sec--> */}
            <div className="d-xxl-block d-xl-block d-lg-block d-md-block d-sm-none d-xs-none d-none">
              <Navbar />
            </div>

            {/* ====mobile sidebar===== */}
            <div className="d-xxl-none d-xl-none d-lg-none d-md-none d-sm-block d-xs-block d-block">
              <Sidebar open={open} setOpen={setOpen} />
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Header;
