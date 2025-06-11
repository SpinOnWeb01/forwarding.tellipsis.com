import React, { useCallback, useEffect, useState } from "react";
import "../../../src/style.css";
import { Link, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles, ThemeProvider } from "@mui/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  CircularProgress,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  Delete,
  Edit,
  Visibility,
  Close,
  AccessTime as AccessTimeIcon,
  Add,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  createRedirectCampaign,
  deleteRedirectCampaign,
  getRedirectCampaign,
  updateRedirectCampaign,
} from "../../redux/actions/redirectPortal/redirectPortal_campaignAction";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { createRedirectBuyer } from "../../redux/actions/redirectPortal/redirectPortal_buyerAction";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import dayjs from "dayjs";

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
  // backgroundColor: "rgb(9, 56, 134)",
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

function Campaigns({ userThem }) {
  const current_user = localStorage.getItem("current_user");
  const user_id = JSON.parse(localStorage.getItem(`user_${current_user}`));
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [buyerOpen, setBuyerOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [strategy, setStrategy] = useState("");
  const [status, setStatus] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [forwardNumber, setForwardNumber] = useState("");
  const [cc, setCc] = useState("");
  const [weightage, setWeightage] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");
  const [description, setDescription] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [followWorkTime, setFollowWorkTime] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [descModal, setDescModal] = useState(false);
  const [callThreading, setCallThreading] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const classes = useStyles();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCampaignName("");
    setDescription("");
    setCallThreading(false);
  };
  const handleAlertClose = () => {
    setAlertMessage(false);
  };
  const handleAddBuyerOpen = (data) => {
    setBuyerOpen(true);
    setCampaignId(data?.campaignId);
  };
  const handleAddBuyerClose = () => {
    setBuyerOpen(false);
    setWeightage("");
    setForwardNumber("");
    setBuyerName("");
    setDailyLimit("");
    setCc("");
    setFromDate(null);
    setToDate(null);
    setFollowWorkTime(false);
    setCallThreading(false);
  };
  const handleEditCampaignOpen = () => setEdit(true);
  const handleEditCampaignClose = () => {
    setEdit(false);
    setCampaignName("");
    setDescription("");
  };

  useEffect(() => {
    dispatch(getRedirectCampaign());
  }, [response]);

  const handleOpenDesc = (description) => {
    setSelectedDescription(description);
    setDescModal(true);
  };
  const handleCloseDesc = () => setDescModal(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "campaignName":
        setCampaignName(value);
        break;
      case "strategy":
        setStrategy(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

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

  const handleSubmit = () => {
    const data = JSON.stringify({
      user_id: user_id.uid,
      group_name: campaignName,
      description: description,
      call_threading: callThreading,
    });
    dispatch(createRedirectCampaign(data, setResponse, handleClose));
  };

  const handleSubmitBuyer = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      redirect_group_id: campaignId,
      buyer_name: buyerName,
      forward_number: forwardNumber,
      cc: cc,
      weightage: weightage,
      daily_limit: dailyLimit,
      working_start_time: fromDate,
      working_end_time: toDate,
      follow_working_time: followWorkTime === false ? "f" : "t",
    });
    dispatch(createRedirectBuyer(data, setResponse, handleAddBuyerClose));
  };

  const handleUpdate = () => {
    const data = JSON.stringify({
      id: campaignId,
      user_id: user_id.uid,
      group_name: campaignName,
      description: description,
      call_threading: callThreading,
    });
    dispatch(
      updateRedirectCampaign(data, setResponse, handleEditCampaignClose)
    );
  };

  const handleMessage = useCallback(
    (data) => {
      setName(data?.group_name);
      setId(data?.campaignId);
      setAlertMessage(true);
    },
    [setName]
  ); // Memoize event handler

  const handleDelete = useCallback(() => {
    dispatch(deleteRedirectCampaign(JSON.stringify({ id: id }), setResponse));
    setAlertMessage(false);
  }, [dispatch, setResponse, id]);

  const handleEdit = (data) => {
    handleEditCampaignOpen();
    setCampaignName(data?.group_name);
    setDescription(data?.description);
    setCampaignId(data?.campaignId);
    setCallThreading(data?.call_threading);
  };

  const handleView = (data) => {
    navigate("/redirect_portal/buyer_view", { state: { data: data } });
  };

  const capitalize = (text) => {
    if (!text) return "";
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // --------------Columns Data Condition For Mobile View and Desktop View---------------------
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // < 600px
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // 600px - 900px
  const isMd = useMediaQuery(theme.breakpoints.only("md")); // 900px - 1200px
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = [
    {
      field: "view_buyer",
      headerName: "View Buyer",
      headerClassName: "redirect_custom-header",
      flex: 1,
      width: isXs ? 70 : "100%",
      minWidth: 70,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.5rem + 0.3vw)", fontWeight: "bold" }}
        >
          View Buyer
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-left">
            <Tooltip title="View" disableInteractive interactive>
              <IconButton
                onClick={() => handleView(params.row)}
                sx={{ padding: "1px" }}
              >
                <Visibility
                  style={{
                    cursor: "pointer",
                    color: "#f5751D ",
                    fontSize: "calc(0.5rem + 0.55vw) !important",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" disableInteractive interactive>
              <IconButton
                onClick={() => handleEdit(params.row)}
                sx={{ padding: "1px" }}
              >
                <Edit
                  index={params.row.id}
                  style={{
                    cursor: "pointer",
                    color: "#42765f",
                    fontSize: "calc(0.5rem + 0.55vw) !important",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" disableInteractive interactive>
              <IconButton
                onClick={() => handleMessage(params.row)}
                sx={{ padding: "1px" }}
              >
                <Delete
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: "calc(0.5rem + 0.55vw) !important",
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: "group_name",
      headerName: "Campaign Name",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 77 : "100%",
      minWidth: 77,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Keeps column menu enabled
      sortable: false, // Disables sorting on both hover and click
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.5rem + 0.3vw)", fontWeight: "bold" }}
        >
          {isSmallScreen ? "Camp. Name" : "Campaign Name"}
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <span sx={{ fontSize: "calc(0.4rem + 0.3vw)" }}>
            {params.row.group_name}
          </span>
        );
      },
    },
    {
      field: "call_threading",
      headerName: "Call Threading",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 60 : "100%",
      minWidth: 60,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Keeps column menu enabled
      sortable: false, // Disables sorting on both hover and click
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.5rem + 0.3vw)", fontWeight: "bold" }}
        >
          {isSmallScreen ? "Call Thrd." : "Call Threading"}
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <span
            style={{
              textTransform: "capitalize",
              fontSize: "calc(0.6rem + 0.3vw)",
            }}
          >
            {params.row.call_threading === true ? "Yes" : "No"}
          </span>
        );
      },
    },
    {
      field: "add_buyer",
      headerName: "Add Buyer",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 75 : "100%",
      minWidth: 75,
      maxWidth: "100%",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      //headerClassName: "redirect_custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.5rem + 0.3vw)", fontWeight: "bold" }}
        >
          Add Buyer
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => handleAddBuyerOpen(params.row)}
          >
            <div>
              <Typography
                sx={{
                  fontSize: "calc(0.6rem + 0.3vw)",
                  textTransform: "capitalize !important",
                  marginLeft: "0px !important",
                  marginRight: "0px !important",
                  // borderRadius:'5px',
                  background: "transparent",
                  color: "#f76b0b",
                  margin: "3px 0",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                // className="campaign_add_btn"
                color="error"
                onClick={() => handleAddBuyerOpen(params.row)}
                // startIcon={<Add />}
              >
                Add Buyer
              </Typography>
            </div>
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 60 : "100%",
      minWidth: 60,
      maxWidth: "100%",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      //headerClassName: "redirect_custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.3vw)", fontWeight: "bold" }}
        >
          {isSmallScreen ? "Descrip." : "Description"}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{
            fontSize: "calc(0.6rem + 0.3vw)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
            maxWidth: "100%",
            //color: "white",
          }}
          onClick={() => handleOpenDesc(params.value)}
          title="Click to expand"
        >
          {params.value.length > 50
            ? params.value.substring(0, 50) + "..."
            : params.value}
        </div>
      ),
    },
  ];

  const mockDataTeam = [];
  state?.getRedirectCampaign?.RedirectCampaign?.data &&
    state?.getRedirectCampaign?.RedirectCampaign?.data?.forEach(
      (item, index) => {
        mockDataTeam.push({
          id: index + 1,
          description: item.description,
          group_name: item.group_name,
          user_id: item.user_id,
          campaignId: item.id,
          call_threading: item.call_threading,
        });
      }
    );
  return (
    <>
      {/* <div className="main"> */}
      <div className={`App ${userThem} `}>
        <div className="contant_box">
          <section className="sidebar-sec">
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

                        <div className="tab_cntnt_box">
                          <div
                            className="cntnt_title"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "end",
                            }}
                          >
                            <div>
                              <h3
                                style={{
                                  margin: "0px",
                                  color: "#f5751D",
                                  fontWeight: "500",
                                  fontSize: "2rem",
                                }}
                              >
                                Campaign
                              </h3>
                              {/* <p>
                              A ring group is a set of destinations that can be
                              called with a ring strategy.
                            </p> */}
                            </div>

                            <Dialog
                              open={descModal}
                              onClose={handleCloseDesc}
                              fullWidth
                              maxWidth="sm"
                            >
                              <DialogTitle>
                                Full Description
                                <IconButton
                                  aria-label="close"
                                  onClick={handleCloseDesc}
                                  sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 8,
                                  }}
                                >
                                  <CloseIcon />
                                </IconButton>
                              </DialogTitle>
                              <DialogContent>
                                <p
                                  style={{
                                    wordBreak: "break-word",
                                    whiteSpace: "pre-wrap",
                                  }}
                                >
                                  {selectedDescription}
                                </p>
                              </DialogContent>
                            </Dialog>

                            {/* ========= */}
                            <box className="d-xxl-block d-xl-block d-lg-block d-md-block d-sm-none d-none">
                              <IconButton
                                className="redirect_all_button_clr"
                                onClick={handleOpen}
                              >
                                Add Campaign
                                <AddOutlinedIcon />
                              </IconButton>
                            </box>

                            {/* mobile_view_start */}
                            <box className="d-xxl-none d-xl-none d-lg-none d-md-none d-sm-block d-block">
                              <Button
                                sx={{
                                  fontSize: "15px",
                                  borderRadius: "5px",
                                  border: "none",
                                  color: "#fff",
                                  marginRight: "0px",
                                  px: 4,
                                  textTransform: "capitalize",
                                  height: "35px",
                                  width: "90px",
                                  minWidth: "90px",
                                  flexShrink: 0,
                                  display: "inline-flex",
                                  justifyContent: "space-evenly",
                                  alignItems: "center",
                                }}
                                className="redirect_all_button_clr"
                                onClick={handleOpen}
                              >
                                Add
                                <AddOutlinedIcon />
                              </Button>
                            </box>

                            {/* mobile_view_end*/}
                          </div>
                          {/* -----   Add Campaigns Modal Start   ----- */}

                          <Dialog
                            open={open}
                            onClose={handleClose}
                            sx={{ textAlign: "center" }}
                          >
                            <Box>
                              <IconButton
                                onClick={handleClose}
                                sx={{
                                  float: "inline-end",
                                  display: "flex",
                                  justifyContent: "end",
                                  margin: "10px 10px 0px 0px",
                                }}
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
                              Add Campaign
                            </DialogTitle>

                            <DialogContent>
                              <form>
                                <form
                                  style={{
                                    textAlign: "center",
                                    height: "180px",
                                    // overflow: "auto",
                                    paddingTop: "10px",
                                    padding: "5px",
                                    width: "auto",
                                  }}
                                >
                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    type="text"
                                    label="Campaign Name"
                                    variant="outlined"
                                    padding={"0px 0 !important"}
                                    value={campaignName}
                                    onChange={(e) =>
                                      setCampaignName(e.target.value)
                                    }
                                  />
                                  <FormControl
                                    fullWidth
                                    style={{
                                      width: "100%",
                                      margin: "7px 0",
                                    }}
                                  >
                                    <InputLabel id="demo-simple-select-label">
                                      Call Threading
                                    </InputLabel>

                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Call Threading"
                                      helperText="Select the language."
                                      style={{ textAlign: "left" }}
                                      value={callThreading}
                                      onChange={(e) => {
                                        setCallThreading(e.target.value);
                                      }}
                                    >
                                      <MenuItem value={true}>Yes</MenuItem>
                                      <MenuItem value={false}>No</MenuItem>
                                    </Select>
                                  </FormControl>
                                  <br />

                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    type="text"
                                    label="Description"
                                    variant="outlined"
                                    value={description}
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                  />
                                </form>
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
                                className="redirect_all_button_clr"
                                color="primary"
                                sx={{
                                  background: "#092b5f",
                                  marginTop: "20px",
                                }}
                                onClick={handleSubmit}
                              >
                                save
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

                          {state?.getRedirectCampaign?.loading === true ? (
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
                                  <DataGrid
                                    className="custom_header_redirect"
                                    rows={mockDataTeam}
                                    columns={columns}
                                    density="compact"
                                    // getRowClassName={(params) =>
                                    //   isRowBordered(params)
                                    //     ? "borderedGreen"
                                    //     : "borderedRed"
                                    // }
                                    components={{ Toolbar: GridToolbar }}
                                    slots={{
                                      toolbar: CustomToolbar,
                                    }}
                                    autoHeight // Automatically adjust the height to fit all rows
                                    disableColumnResize={false} // Allow column resizing
                                    hideFooterPagination={
                                      window.innerWidth < 600
                                    } // Hide pagination for small screens
                                    sx={{
                                      "& .MuiDataGrid-cell": {
                                        fontSize: {
                                          xs: "12px",
                                          sm: "14px",
                                          md: "14px",
                                        }, // Responsive font sizes
                                        wordBreak: "break-word !important", // Break long words
                                        whiteSpace: "break-spaces !important", // Allow multi-line text
                                      },
                                    }}
                                  />
                                </div>
                              </ThemeProvider>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* -----   Add Buyer Modal Start   ----- */}
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={buyerOpen}
                      closeAfterTransition
                      slots={{ backdrop: Backdrop }}
                      slotProps={{
                        backdrop: {
                          timeout: 500,
                        },
                      }}
                      borderRadius={"10px"}
                    >
                      <Fade in={buyerOpen} className="bg_imagess">
                        <Box sx={style} borderRadius={"10px"}>
                          <IconButton
                            onClick={handleAddBuyerClose}
                            sx={{ float: "inline-end", borderRadius: "10px;" }}
                          >
                            <Close />
                          </IconButton>
                          <br />
                          <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            color={"#092b5f"}
                            fontSize={"18px"}
                            fontWeight={"600"}
                            textAlign={"center"}
                          >
                            Add Buyer
                          </Typography>
                          <Typography
                            id="transition-modal-description"
                            sx={{ mt: 2 }}
                            fontSize={"16px"}
                            color={"#000"}
                            paddingBottom={"10px"}
                            textAlign={"center"}
                          >
                            {/* A ring group is a set of destinations that can be called with a ring strategy. */}
                          </Typography>
                          <form
                            style={{
                              textAlign: "center",
                              height: "348px",
                              overflow: "auto",
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
                              type="text"
                              label="Forward Number"
                              variant="outlined"
                              name="forwardNumber"
                              value={forwardNumber}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                setForwardNumber(numericValue);
                              }}
                              inputProps={{
                                inputMode: "numeric",
                                // pattern: '[0-9]*',
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
                                    fromDate ? dayjs(fromDate, "HH:mm") : null
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
                                  value={toDate ? dayjs(toDate, "HH:mm") : null} // Convert selectedDate to a dayjs object
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
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
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
                              onClick={handleSubmitBuyer}
                            >
                              Save
                            </Button>
                          </Box>
                        </Box>
                      </Fade>
                    </Modal>
                    {/* -----   Add Buyer Modal End   ----- */}
                    {/* ----------------------------------------------
                     ----------------------------------------------
                     ----------------------------------------------
                     ---------------------------------------------- */}
                    {/* -----   Edit Campaign Modal Start   ----- */}

                    <Dialog
                      open={edit}
                      onClose={handleEditCampaignClose}
                      sx={{ textAlign: "center" }}
                    >
                      <Box>
                        <IconButton
                          onClick={handleEditCampaignClose}
                          sx={{
                            float: "inline-end",
                            display: "flex",
                            justifyContent: "end",
                            margin: "10px 10px 0px 0px",
                          }}
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
                        Update Campaign
                      </DialogTitle>

                      <DialogContent>
                        <form>
                          <form
                            style={{
                              textAlign: "center",
                              height: "180px",
                              // overflow: "auto",
                              paddingTop: "10px",
                              padding: "5px",
                              width: "auto",
                            }}
                          >
                            <TextField
                              style={{ width: "100%", margin: " 5px 0 5px 0" }}
                              type="text"
                              label="Campaign Name"
                              variant="outlined"
                              name="campaignName"
                              value={campaignName}
                              onChange={handleChange}
                            />
                            <FormControl
                              fullWidth
                              style={{
                                width: "100%",
                                margin: "7px 0",
                              }}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Call Threading
                              </InputLabel>

                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Call Threading"
                                helperText="Select the language."
                                style={{ textAlign: "left" }}
                                value={callThreading}
                                onChange={(e) => {
                                  setCallThreading(e.target.value);
                                }}
                              >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                              </Select>
                            </FormControl>
                            <br />
                            <TextField
                              style={{ width: "100%", margin: " 5px 0 5px 0" }}
                              type="text"
                              label="Description"
                              variant="outlined"
                              name="description"
                              value={description}
                              onChange={handleChange}
                            />
                          </form>
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
                          className="redirect_all_button_clr"
                          color="primary"
                          sx={{
                            fontSize: "16px !impotant",
                            marginTop: "20px",
                            padding: "10px 20px !important",
                            textTransform: "capitalize !important",
                          }}
                          onClick={handleUpdate}
                        >
                          Update
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {/* -----   Edit Campaign Modal End   ----- */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Campaigns;
