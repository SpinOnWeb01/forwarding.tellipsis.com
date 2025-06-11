import { styled } from "@mui/material/styles";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Close,
  Delete,
  Edit,
  PlayArrow,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { toast } from "react-toastify";
import "../../Switcher.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  createAdminAddBuyer,
  deleteAdminAddBuyer,
  getAdminAddBuyer,
  updateAdminAddBuyer,
} from "../../redux/actions/adminPortal/adminPortal_addBuyerAction";
import { GET_ADMIN_ADD_BUYER_SUCCESS } from "../../redux/constants/adminPortal/adminPortal_addBuyerConstants";
import {
  DateTimePicker,
  LocalizationProvider,
  MobileTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { makeStyles } from "@mui/styles";
import "../admin/adminstyle.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import dayjs from "dayjs";
import { StyledDataGrid } from "../../pages/CustomDataGrid";

// import React from 'react'
const drawerWidth = 240;
const useStyles = makeStyles({
  borderedGreen: {
    borderLeft: "3px solid green", // Add your border styling here
    boxShadow: "2px -1px 4px -3px #686868",
    margin: "4px 4px 1px 4px !important",
  },
  borderedRed: {
    borderLeft: "3px solid red", // Add your border styling here
    boxShadow: "2px -1px 4px -3px #686868",
    margin: "4px 4px 1px 4px !important",
  },
  formControl: {
    "& .MuiInputBase-root": {
      color: "#666",
      borderColor: "transparent",
      borderWidth: "1px",
      borderStyle: "solid",
      height: "45px",
      minWidth: "120px",
      justifyContent: "center",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px",
    },
    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
      top: "-4px",
    },
  },
  select: {
    width: "auto",
    fontSize: "12px",
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  selectIcon: {
    position: "relative",
    color: "#6EC177",
    fontSize: "14px",
  },
  paper: {
    borderRadius: 12,
    marginTop: 8,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    "& li": {
      fontWeight: 200,
      paddingTop: 8,
      paddingBottom: 8,
      fontSize: "12px",
    },
    "& li.Mui-selected": {
      color: "white",
      background: "#6EC177",
    },
    "& li.Mui-selected:hover": {
      background: "#6EC177",
    },
  },
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-row": {
            minHeight: "auto", // Adjust row height to make it more compact
          },
        },
      },
      defaultProps: {
        density: "compact", // Set default density to compact
      },
    },
  },
});

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
      {/* <GridToolbarExport /> */}
    </GridToolbarContainer>
  );
}

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 52,
  height: 31,
  padding: 0,
  borderRadius: "33px",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 27,
    height: 27,
    // right: '0px',
    // position: 'relative',
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function ManageAddBuyer({ colorThem }) {
  const state = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [status, setStatus] = useState("");
  const [forwardNumber, setForwardNumber] = useState("");
  const [cc, setCc] = useState("");
  const [weightage, setWeightage] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");
  const [redirectId, setRedirectId] = useState("");
  const [deleteRow, setDeleteRow] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [ringTimeout, setRingTimeout] = useState(60);
  const [toDate, setToDate] = useState(null);
  const [followWorkTime, setFollowWorkTime] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  // State to manage the switch value
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Handler function for switch toggle
  const handleSwitchChange = (event) => {
    setIsSwitchChecked(event.target.checked);
  };
  const handleAddBuyerOpen = () => setOpen(true);

  const handleAlertClose = () => {
    setAlertMessage(false);
  };
  const handleAddBuyerClose = () => {
    setOpen(false);
    setWeightage("");
    setForwardNumber("");
    setBuyerName("");
    setDailyLimit("");
    setCc("");
    setFromDate(null);
    setToDate(null);
    setFollowWorkTime(false);
    setRingTimeout(60);
  };
  const handleEditrOpen = () => setEdit(true);
  const handleEditClose = () => {
    setEdit(false);
    setWeightage("");
    setForwardNumber("");
    setBuyerName("");
    setDailyLimit("");
    setCc("");
    setStatus("");
    setFromDate(null);
    setToDate(null);
    setFollowWorkTime(false);
    setRingTimeout(60);
  };

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  const handleEdit = useCallback(
    (data) => {
      handleEditrOpen();
      setForwardNumber(data?.forward_number);
      setBuyerName(data?.buyer_name);
      setCc(data?.cc);
      setWeightage(data?.weightage);
      setDailyLimit(data?.daily_limit);
      setStatus(data?.status);
      setBuyerId(data?.buyer_id);
      setRedirectId(data?.redirect_group_id);
      setFromDate(data?.working_start_time);
      setToDate(data?.working_end_time);
      setFollowWorkTime(data?.follow_working_time === false ? "f" : "t");
      setRingTimeout(data.ring_timeout);
    },
    [setFromDate, setToDate]
  );

  const handleFromDateChange = (date) => {
    if (dayjs(date, "HH:mm", true).isValid()) {
      // Convert the selected date to the desired format before updating state
      setFromDate(dayjs(date).format("HH:mm"));
    } else {
      setFromDate(null);
    }
  };
  const handleToDateChange = (date) => {
    if (dayjs(date, "HH:mm", true).isValid()) {
      // Convert the selected date to the desired format before updating state
      setToDate(dayjs(date).format("HH:mm"));
    } else {
      setToDate(null);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "forwardNumber":
        const trimmedValue = value.trim();
        setForwardNumber(trimmedValue);
        break;
      case "buyerName":
        setBuyerName(value);
        break;
      case "dailyLimit":
        setDailyLimit(value);
        break;
      case "cc":
        setCc(value);
        break;
      case "weightage":
        setWeightage(value);
        break;
      case "status":
        setSelectedValue(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      redirect_group_id: location.state.data.campaign_id,
      buyer_name: buyerName,
      forward_number: forwardNumber,
      cc: cc,
      weightage: weightage,
      daily_limit: dailyLimit,
      working_start_time: fromDate,
      working_end_time: toDate,
      follow_working_time: followWorkTime === false ? "f" : "t",
      ring_timeout: JSON.parse(ringTimeout),
    });
    dispatch(createAdminAddBuyer(data, handleAddBuyerClose, setResponse));
  };

  const handleMessage = useCallback(
    (data) => {
      setName(data?.buyer_name);
      setId(data?.buyer_id);
      setAlertMessage(true);
    },
    [setName]
  ); // Memoize event handler

  // const handleDelete = useCallback(() => {
  //   dispatch(deleteAdminAddBuyer(JSON.stringify({ id: id }), setResponse));
  //   setAlertMessage(false);
  // }, [dispatch, setResponse, id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      id: buyerId,
      redirect_group_id: redirectId,
      buyer_name: buyerName,
      cc: cc,
      daily_limit: dailyLimit,
      forward_number: forwardNumber,
      status: status,
      weightage: weightage,
      working_start_time: fromDate,
      working_end_time: toDate,
      follow_working_time: followWorkTime,
      ring_timeout: JSON.parse(ringTimeout),
    });
    dispatch(updateAdminAddBuyer(data, handleEditClose, setResponse));
  };

  const handleTrigger = (val) => {
    let data = JSON.stringify({
      id: val.buyer_id,
      status: val.status === true ? false : true,
      redirect_group_id: val?.redirect_group_id,
      buyer_name: val.buyer_name,
      cc: val.cc,
      daily_limit: val.daily_limit,
      forward_number: val.forward_number,
      weightage: val.weightage,
      working_start_time: val.working_start_time,
      working_end_time: val.working_end_time,
      follow_working_time: val.follow_working_time === false ? "f" : "t",
    });
    if (
      window.confirm(
        `Are you sure! Do you want to ${
          val.status === true ? "Deactive" : "Active"
        }`
      )
    ) {
      setResponse(data);
      dispatch(updateAdminAddBuyer(data, setResponse));
    }
  };

  useEffect(() => {
    dispatch(getAdminAddBuyer(location.state.data.campaign_id));
  }, [response, deleteRow, location.state.data.campaign_id]);

  const columns = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 87,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <Tooltip title="Edit" disableInteractive interactive>
              <IconButton onClick={() => handleEdit(params.row)}>
                <Edit
                  index={params.row.id}
                  style={{ cursor: "pointer", color: "#42765f" }}
                />
              </IconButton>
            </Tooltip>
            {params.row.status === true ? (
              <Tooltip title="Deactive" disableInteractive interactive>
                <IconButton onClick={() => handleTrigger(params.row)}>
                  <PauseIcon style={{ cursor: "pointer", color: "#254336" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Active" disableInteractive interactive>
                <IconButton onClick={() => handleTrigger(params.row)}>
                  <PlayArrowIcon
                    style={{ cursor: "pointer", color: "#ff7d00" }}
                  />
                </IconButton>
              </Tooltip>
            )}
            {/* <Tooltip title="Delete" disableInteractive interactive>
              <IconButton onClick={() => handleMessage(params.row)}>
                <Delete style={{ cursor: "pointer", color: "red" }} />
              </IconButton>
            </Tooltip> */}
          </div>
        );
      },
    },
    {
      field: "buyer_name",
      headerName: "Buyer Name",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 150,
      align: "center",
      renderCell: (params) => {
        const formattedDate = dayjs(params.row.createdAt).format(
          "DD MMM, YYYY"
        );
        return (
          <>
            <p style={{ margin: "0", lineHeight: "14px" }}>
              {params.row.buyer_name}
              <br />
              <i style={{ margin: "0", fontSize: "11px" }}>
                {" "}
                <b>Created: {formattedDate}</b>
              </i>
            </p>
          </>
        );
      },
    },
    {
      field: "user_name",
      headerName: "User Name",
      width: 160,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <span style={{ textTransform: "capitalize" }}>
          {params.row.user_name}
        </span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderCell: (params) => {
        return (
          <>
            {params.row.status === true ? (
              <>
                <Tooltip title="Active" disableInteractive interactive>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{
                      color: "#254336",
                      //padding: "5px 12.5px",
                      // borderRadius: "5px",
                      // background: "#254336",
                      // width: "65px",
                      // cursor: "pointer",
                      //transition: "background 0.3s, transform 0.2s",
                    }}
                  >
                    Active
                  </div>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Deactivated" disableInteractive interactive>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{
                      color: "#ff7d00",
                      // border: "1px solid red",
                      //padding: "5px 4.5px",
                      // borderRadius: "5px",
                      // width: "65px",
                      // background: "rgb(255 0 0)",
                      // cursor: "pointer",
                    }}
                  >
                    Deactivated
                  </div>
                </Tooltip>
              </>
            )}
          </>
        );
      },
    },
    {
      field: "forward_number",
      headerName: "Forward Number",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "cc",
      headerName: "CC",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 65,
      align: "center",
    },
    {
      field: "current_cc",
      headerName: "Live Calls",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 120,
      align: "center",
      renderCell: (params) => {
        return (
          <span style={{ fontWeight: "bold" }}>{params.row.current_cc}</span>
        );
      },
    },

    {
      field: "daily_limit",
      headerName: "Daily Limit",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 125,
      align: "center",
    },
    {
      field: "current_daily_limit",
      headerName: "Current Daily Limit",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 175,
      align: "center",
    },
    {
      field: "weightage",
      headerName: "Weightage",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 120,
      align: "center",
    },
    {
      field: "ring_timeout",
      headerName: "Ring Timeout",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 120,
      align: "center",
    },

    {
      field: "follow_working_time",
      headerName: "Follow Working Time",
      width: 175,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderCell: (params) => {
        return (
          <>
            {params.row.follow_working_time === true ? (
              <>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    color: "green",
                    padding: "5px 4.5px",
                  }}
                >
                  Yes
                </div>
              </>
            ) : (
              <>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    color: "red",
                    padding: "5px 4.5px",
                  }}
                >
                  No
                </div>
              </>
            )}
          </>
        );
      },
    },

    {
      field: "working_start_time",
      headerName: "Start Time",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 115,
      align: "center",
    },
    {
      field: "working_end_time",
      headerName: "End Time",
      width: 110,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
  ];
  let totalCC = 0;
  let ccT = 0;
  let dailyLimt = 0;
  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.getAdminAddBuyer?.AddBuyer &&
      state?.getAdminAddBuyer?.AddBuyer.forEach((item, index) => {
        if (isSwitchChecked ? item.status === true : true) {
          calculatedRows.push({
            id: index + 1,
            buyer_name: item?.buyer_name,
            cc: item?.cc,
            current_cc: item?.current_cc,
            current_daily_limit: item?.current_daily_limit,
            daily_limit: item?.daily_limit,
            forward_number: item.forward_number,
            group_name: item.group_name,
            buyer_id: item.id,
            redirect_group_id: item.redirect_group_id,
            status: item.status,
            user_name: item.username,
            weightage: item.weightage,
            createdAt: item.created_at,
            follow_working_time: item.follow_working_time,
            working_end_time: item.working_end_time,
            working_start_time: item.working_start_time,
            ring_timeout: item.ring_timeout,
          });
        }
        totalCC += item.status === true ? item.current_cc : 0;
        ccT += item.status === true ? item.cc : 0;
        dailyLimt += item.current_daily_limit;
      });
    return calculatedRows;
  }, [state?.getAdminAddBuyer?.AddBuyer, isSwitchChecked]);

  const handleBackClick = () => {
    // clear table data
    dispatch({
      type: GET_ADMIN_ADD_BUYER_SUCCESS,
      payload: [],
    });
    // Navigate back
    navigate("/admin_portal/manage_campaign");
  };

  const selectedCallerDataSet = new Set(); // Using Set to avoid duplicates

  selectedRows.forEach((id) => {
    const selectedRow = rows.find((row) => row.id === id);
    if (selectedRow) {
      selectedCallerDataSet.add(selectedRow.buyer_id); // Add only buyer_id
    }
  });

  const selectedCallerData = Array.from(selectedCallerDataSet); // Convert to comma-separated string

  const handleDelete = useCallback(() => {
    dispatch(
      deleteAdminAddBuyer(
        JSON.stringify({ id: selectedCallerData }),
        setResponse
      )
    );
    setAlertMessage(false);
    setSelectedRows([]);
  }, [dispatch, setResponse, setSelectedRows, selectedCallerData]);

  return (
    <>
      <div className={`App ${colorThem} `}>
        <div className="contant_box">
          <Box
            className="right_sidebox mobile_top_pddng"
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="">
                    {/* <!----> */}
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        {/* <!--role-contet--> */}
                        <div className="">
                          {/* <div className="cntnt_title"> */}
                          <div
                            className="cntnt_title"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <h3 style={{ margin: "0px" }}>Buyer View</h3>

                            <FormGroup
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: "30px",
                              }}
                            >
                              <Stack
                                direction="row"
                                spacing={1}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Typography style={{ fontSize: "15px" }}>
                                  All
                                </Typography>
                                <FormControlLabel
                                  control={
                                    <IOSSwitch
                                      defaultChecked
                                      checked={isSwitchChecked}
                                      onChange={handleSwitchChange}
                                    />
                                  }
                                />
                                <Typography style={{ fontSize: "15px" }}>
                                  Active
                                </Typography>
                              </Stack>
                            </FormGroup>
                          </div>

                          {/* mobile_view */}
                          <p
                            style={{ fontSize: "17px", color: "#000" }}
                            className="d-xxl-none d-xl-none d-lg-none d-md-none d-sm-block d-block"
                          >
                            <b className="fnt_bld"> Campaign Name:</b>
                            {location.state.data.group_name}
                          </p>
                          {/* mobile_view_end */}

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "end",
                              marginBottom: "40px",
                            }}
                            className="mobile_justify_end"
                          >
                            <p
                              style={{ fontSize: "17px", color: "#000" }}
                              className="d-xxl-block d-xl-block d-lg-block d-md-block d-sm-none d-none"
                            >
                              <b className="fnt_bld"> Campaign Name:</b>{" "}
                              {location.state.data.group_name}
                            </p>

                            <div>
                              <IconButton
                                className="all_button_clr "
                                style={{
                                  padding: "10px",
                                  fontSize: "15px",
                                  borderRadius: "5px",
                                  border: "none",
                                  backgroundColor: "rgb(9, 56, 134)",
                                  color: "#fff",
                                  marginLeft: "auto",
                                  marginRight: "30px",
                                }}
                                onClick={
                                  () => handleBackClick()
                                  // () => navigate("/admin_portal/manage_campaign")
                                }
                              >
                                <ArrowBackIcon style={{ fontSize: "24px" }} />
                                {/* Back */}
                              </IconButton>

                              <IconButton
                                className="all_button_clr"
                                style={{
                                  padding: "10px",
                                  fontSize: "15px",
                                  borderRadius: "5px",
                                  border: "none",
                                  backgroundColor: "rgb(9, 56, 134)",
                                  color: "#fff",
                                  marginLeft: "auto",
                                  marginRight: "30px",
                                }}
                                onClick={handleAddBuyerOpen}
                              >
                                Add Buyer
                                <AddOutlinedIcon />
                              </IconButton>
                            </div>
                          </div>
                          {/* </div> */}

                          {/* -----   Add Campaigns Modal Start   ----- */}

                          <Dialog
                            open={open}
                            //   onClose={handleClose}
                            sx={{ textAlign: "center" }}
                          >
                            <Box>
                              <IconButton
                                onClick={handleAddBuyerClose}
                                sx={{ float: "inline-end" }}
                              >
                                <Close />
                              </IconButton>
                            </Box>
                            <DialogTitle
                              className="modal_heading"
                              sx={{
                                color: "#133325",
                                fontWeight: "600",
                                width: "500px",
                              }}
                            >
                              Add Buyer
                            </DialogTitle>
                            <DialogContent>
                              <form
                                style={{
                                  textAlign: "center",
                                  height: "348px",
                                  // overflow: "auto",
                                  paddingTop: "10px",
                                  padding: "5px",
                                  overflowX: "clip",
                                }}
                              >
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Buyer Name"
                                  variant="outlined"
                                  name="buyerName"
                                  value={buyerName}
                                  onChange={(e) => {
                                    setBuyerName(e.target.value);
                                  }}
                                />
                                <br />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="number"
                                  label="Forward Number"
                                  variant="outlined"
                                  name="forwardNumber"
                                  value={forwardNumber}
                                  onChange={(e) => {
                                    setForwardNumber(e.target.value);
                                  }}
                                />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="CC (Concurrent Call)"
                                  variant="outlined"
                                  name="cc"
                                  value={cc}
                                  onChange={(e) => {
                                    setCc(e.target.value);
                                  }}
                                />

                                <br />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Weightage"
                                  variant="outlined"
                                  name="weightage"
                                  value={weightage}
                                  onChange={(e) => {
                                    setWeightage(e.target.value);
                                  }}
                                />
                                <br />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Daily Limit"
                                  variant="outlined"
                                  value={dailyLimit}
                                  onChange={(e) => {
                                    setDailyLimit(e.target.value);
                                  }}
                                />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: "7px 0",
                                  }}
                                  type="text"
                                  label="Ring Timeout"
                                  variant="outlined"
                                  name="tfnNumber"
                                  value={ringTimeout}
                                  onChange={(e) => {
                                    const numericValue = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    setRingTimeout(numericValue);
                                  }}
                                  inputProps={{
                                    inputMode: "numeric",
                                    // pattern: '[0-9]*',
                                  }}
                                />
                                <FormControl
                                  fullWidth
                                  style={{ margin: " 5px 0 5px 0" }}
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    Follow Work Time
                                  </InputLabel>
                                  <Select
                                    style={{ textAlign: "left" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Follow Work Time"
                                    value={followWorkTime}
                                    onChange={(e) =>
                                      setFollowWorkTime(e.target.value)
                                    }
                                  >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                  </Select>
                                </FormControl>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                  className={classes.formControl}
                                >
                                  <DemoContainer
                                    components={["TimePicker"]}
                                    sx={{ width: "100%" }}
                                  >
                                    <MobileTimePicker
                                      className="frm_date"
                                      label="Working Start Time"
                                      value={
                                        fromDate
                                          ? dayjs(fromDate, "HH:mm")
                                          : null
                                      }
                                      onChange={handleFromDateChange}
                                      renderInput={(props) => (
                                        <TextField
                                          {...props}
                                          style={{ width: "100%" }}
                                          InputProps={{
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                <AccessTimeIcon />
                                              </InputAdornment>
                                            ),
                                          }}
                                        />
                                      )}
                                    />
                                  </DemoContainer>
                                </LocalizationProvider>

                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                  className={classes.formControl}
                                >
                                  <DemoContainer
                                    components={["TimePicker"]}
                                    sx={{ width: "100%" }}
                                  >
                                    <MobileTimePicker
                                      className="frm_date"
                                      label="Working End Time"
                                      value={
                                        toDate ? dayjs(toDate, "HH:mm") : null
                                      } // Convert selectedDate to a dayjs object
                                      onChange={handleToDateChange}
                                      renderInput={(props) => (
                                        <TextField
                                          {...props}
                                          style={{ width: "100%" }}
                                        /> // Ensures TextField takes full width
                                      )}
                                    />
                                  </DemoContainer>
                                </LocalizationProvider>
                              </form>
                            </DialogContent>
                            <DialogActions
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                paddingBottom: "20px",
                              }}
                            >
                              <Button
                                variant="contained"
                                className="all_button_clr"
                                color="primary"
                                sx={{
                                  fontSize: "16px !impotant",
                                  background: "#092b5f",

                                  marginLeft: "10px !important",
                                  padding: "10px 20px !important",
                                  textTransform: "capitalize !important",
                                }}
                                onClick={handleSubmit}
                              >
                                Save
                              </Button>
                            </DialogActions>
                          </Dialog>

                          {/* -----   Add Campaigns Modal End   ----- */}

                          {/* Delete Confirmation Modal Start  */}
                          <Dialog
                            open={alertMessage}
                            onClose={handleAlertClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            sx={{ textAlign: "center" }}
                            //className="bg_imagess"
                          >
                            <DialogTitle
                              className="modal_heading"
                              id="alert-dialog-title"
                              sx={{ color: "#133325", fontWeight: "600" }}
                            >
                              {"Delete Confirmation"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText
                                id="alert-dialog-description"
                                sx={{ paddingBottom: "0px !important" }}
                              >
                                Are you sure you want to delete {name} ?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                paddingBottom: "20px",
                              }}
                            >
                              <Button
                                variant="contained"
                                sx={{
                                  fontSize: "16px !impotant",
                                  background:
                                    "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
                                  marginTop: "20px",
                                  marginLeft: "0px !important",
                                  padding: "10px 20px !important",
                                  textTransform: "capitalize !important",
                                }}
                                className="all_button_clr"
                                color="info"
                                onClick={handleAlertClose}
                                autoFocus
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="contained"
                                sx={{
                                  fontSize: "16px !impotant",
                                  marginTop: "20px",
                                  padding: "10px 20px !important",
                                  textTransform: "capitalize !important",
                                  marginLeft: "0px !important",
                                  marginRight: "0px !important",
                                }}
                                className="all_button_clr"
                                color="error"
                                onClick={handleDelete}
                                startIcon={<DeleteIcon />}
                              >
                                Delete
                              </Button>
                            </DialogActions>
                          </Dialog>
                          {/* Delete Confirmation Modal End  */}

                          {/* -----   Edit Modal Start   ----- */}

                          <Dialog
                            open={edit}
                            //   onClose={handleClose}
                            sx={{ textAlign: "center" }}
                          >
                            <Box>
                              <IconButton
                                onClick={handleEditClose}
                                sx={{ float: "inline-end" }}
                              >
                                <Close />
                              </IconButton>
                            </Box>
                            <DialogTitle
                              className="modal_heading"
                              sx={{
                                color: "#133325",
                                fontWeight: "600",
                                width: "500px",
                              }}
                            >
                              Add Buyer
                            </DialogTitle>
                            <DialogContent>
                              <form
                                style={{
                                  textAlign: "center",
                                  height: "348px",
                                  // overflow: "auto",
                                  paddingTop: "10px",
                                  padding: "5px",
                                  overflowX: "clip",
                                }}
                              >
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Buyer Name"
                                  variant="outlined"
                                  name="buyerName"
                                  value={buyerName}
                                  onChange={handleChange}
                                />
                                <br />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Forward Number"
                                  variant="outlined"
                                  name="forwardNumber"
                                  value={forwardNumber}
                                  onChange={handleChange}
                                />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="CC (Concurrent Call)"
                                  variant="outlined"
                                  name="cc"
                                  value={cc}
                                  onChange={handleChange}
                                />

                                <br />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Weightage"
                                  variant="outlined"
                                  name="weightage"
                                  value={weightage}
                                  onChange={handleChange}
                                />
                                <br />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Daily Limit"
                                  variant="outlined"
                                  name="dailyLimit"
                                  value={dailyLimit}
                                  onChange={handleChange}
                                />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: "7px 0",
                                  }}
                                  type="text"
                                  label="Ring Timeout"
                                  variant="outlined"
                                  name="tfnNumber"
                                  value={ringTimeout}
                                  onChange={(e) => {
                                    const numericValue = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    setRingTimeout(numericValue);
                                  }}
                                  inputProps={{
                                    inputMode: "numeric",
                                    // pattern: '[0-9]*',
                                  }}
                                />
                                <FormControl
                                  fullWidth
                                  style={{ margin: " 5px 0 5px 0" }}
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    Status
                                  </InputLabel>
                                  <Select
                                    style={{ textAlign: "left" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Status"
                                    onChange={(e) => setStatus(e.target.value)}
                                  >
                                    <MenuItem value={true}>Active</MenuItem>
                                    <MenuItem value={false}>Deactive</MenuItem>
                                  </Select>
                                </FormControl>

                                <FormControl
                                  fullWidth
                                  style={{ margin: " 5px 0 5px 0" }}
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    Follow Work Time
                                  </InputLabel>
                                  <Select
                                    style={{ textAlign: "left" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Follow Work Time"
                                    value={followWorkTime}
                                    onChange={(e) =>
                                      setFollowWorkTime(e.target.value)
                                    }
                                  >
                                    <MenuItem value={"t"}>Yes</MenuItem>
                                    <MenuItem value={"f"}>No</MenuItem>
                                  </Select>
                                </FormControl>

                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                  className={classes.formControl}
                                >
                                  <DemoContainer
                                    components={["TimePicker"]}
                                    sx={{ width: "100%" }}
                                  >
                                    <MobileTimePicker
                                      className="frm_date"
                                      label="Working Start Time"
                                      value={
                                        fromDate
                                          ? dayjs()
                                              .hour(
                                                parseInt(
                                                  fromDate.split(":")[0],
                                                  10
                                                )
                                              )
                                              .minute(
                                                parseInt(
                                                  fromDate.split(":")[1],
                                                  10
                                                )
                                              )
                                              .second(0) // Set the time using the stored string (11:00:00)
                                          : null
                                      }
                                      onChange={(newValue) => {
                                        // Save only the time in "HH:mm:ss" format when the user changes the time
                                        handleFromDateChange(
                                          newValue
                                            ? dayjs(newValue).format("HH:mm:ss")
                                            : null
                                        );
                                      }}
                                      renderInput={(props) => (
                                        <TextField
                                          {...props}
                                          style={{ width: "100%" }}
                                        />
                                      )}
                                    />
                                  </DemoContainer>
                                </LocalizationProvider>

                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                  className={classes.formControl}
                                >
                                  <DemoContainer
                                    components={["TimePicker"]}
                                    sx={{ width: "100%" }}
                                  >
                                    <MobileTimePicker
                                      className="frm_date"
                                      label="Working End Time"
                                      value={
                                        toDate
                                          ? dayjs()
                                              .hour(
                                                parseInt(
                                                  toDate.split(":")[0],
                                                  10
                                                )
                                              )
                                              .minute(
                                                parseInt(
                                                  toDate.split(":")[1],
                                                  10
                                                )
                                              )
                                              .second(0) // Set the time using the stored string (11:00:00)
                                          : null
                                      } // Convert selectedDate to a dayjs object
                                      onChange={handleToDateChange}
                                      renderInput={(props) => (
                                        <TextField
                                          {...props}
                                          style={{ width: "100%" }}
                                        /> // Ensures TextField takes full width
                                      )}
                                    />
                                  </DemoContainer>
                                </LocalizationProvider>
                              </form>
                            </DialogContent>
                            <DialogActions
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                paddingBottom: "20px",
                              }}
                            >
                              <Button
                                variant="contained"
                                className="all_button_clr"
                                color="primary"
                                sx={{
                                  fontSize: "16px !impotant",
                                  background: "#092b5f",

                                  marginLeft: "10px !important",
                                  padding: "10px 20px !important",
                                  textTransform: "capitalize !important",
                                }}
                                onClick={handleUpdate}
                              >
                                Update
                              </Button>
                            </DialogActions>
                          </Dialog>

                          {/* -----   Edit Modal End   ----- */}

                          <div
                            style={{
                              display: "flex",
                              //justifyContent: "space-between",
                              width: "100%",
                              alignItems: "baseline",
                            }}
                          >
                            <IconButton
                              className="filter_block_btn"
                              style={{
                                marginLeft: "0 !important",
                                background: selectedCallerData.length
                                  ? "red"
                                  : "grey",
                                padding: "6px 10px !important",
                                fontSize: "15px !important",
                                marginBottom: "0.8rem",
                              }}
                              disabled={selectedCallerData.length === 0}
                              onClick={handleMessage}
                            >
                              Delete &nbsp;
                              <DeleteIcon />
                            </IconButton>
                            <div style={{ display: "flex", gap: "20px" }}>
                              <label
                                style={{
                                  fontSize: "large",
                                  fontWeight: "bold",
                                }}
                              >
                                CC Limit:
                                <span>&nbsp;{ccT}</span>
                              </label>
                              <label
                                style={{
                                  fontSize: "large",
                                  fontWeight: "bold",
                                }}
                              >
                                Live Calls:
                                <span>&nbsp;{totalCC}</span>
                              </label>

                              <label
                                style={{
                                  fontSize: "large",
                                  fontWeight: "bold",
                                }}
                              >
                                Current Daily Limit:
                                <span>&nbsp;{dailyLimt}</span>
                              </label>
                            </div>
                            {/* <div>
                              <FormControl>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                  value={radioValue} // Bind the selected value to state
                                  onChange={(e) =>
                                    setRadioValue(e.target.value)
                                  } // Handle change event
                                >
                                  <FormControlLabel
                                    value="n"
                                    control={<Radio />}
                                    label="New"
                                  />
                                  <FormControlLabel
                                    value="o"
                                    control={<Radio />}
                                    label="Old"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </div> */}
                          </div>
                          {state?.getAdminAddBuyer?.AddBuyer === undefined ? (
                            <>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  width: "90%",
                                  marginTop: "9rem !important",
                                }}
                              >
                                <CircularProgress />
                              </Box>
                            </>
                          ) : (
                            <>
                              <ThemeProvider theme={theme}>
                                <div style={{ height: "100%", width: "100%" }}>
                                  <StyledDataGrid
                                    rows={rows}
                                    columns={columns}
                                    density="standard"
                                    // getRowClassName={(params) =>
                                    //   isRowBordered(params)
                                    //     ? "borderedGreen"
                                    //     : "borderedRed"
                                    // }
                                    checkboxSelection
                                    disableRowSelectionOnClick // Prevent row click from selecting checkbox
                                    rowSelectionModel={selectedRows} // Bind selection model
                                    onRowSelectionModelChange={
                                      handleSelectionChange
                                    } // Handle selection change
                                    components={{ Toolbar: GridToolbar }}
                                    slots={{
                                      toolbar: CustomToolbar,
                                    }}
                                    autoHeight // Automatically adjust the height to fit all rows
                                  />
                                </div>
                              </ThemeProvider>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default ManageAddBuyer;
