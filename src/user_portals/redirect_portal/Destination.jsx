import React, { useEffect, useMemo, useState } from "react";
import "../../../src/style.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  FormControl,
  RadioGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
  Typography,
  InputAdornment,
  CircularProgress,
  Radio,
  FormControlLabel,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/styles";
import { Close, Edit } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import { getDid } from "../../redux/actions/destinationAction";
import { getAllUsers } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  getRedirectDestination,
  getUserRedirectGroups,
  updateRedirectDestination,
} from "../../redux/actions/redirectPortal/redirectPortal_destinationAction";
import { IconBase } from "react-icons/lib";
import { StyledDataGrid } from "../../pages/CustomDataGrid";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { GET_REDIRECT_DESTINATION_SUCCESS } from "../../redux/constants/redirectPortal/redirectportal_destinationConstants";
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
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

function Destination({ userThem }) {
  const [edit, setEdit] = useState(false);
  const [destination, setDestination] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [recording, setRecording] = useState("");
  const [description, setDescription] = useState("");
  const [ivrAuthentication, setIvrAuthentication] = useState("");
  const [redirectGroup, setRedirectGroup] = useState("");
  const [redirectGroupData, setRedirectGroupData] = useState([]);
  const [status, setStatus] = useState("");
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [radioValue, setRadioValue] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const state = useSelector((state) => state);
  const [searchDestination, setSearchDestination] = useState("");
  const dispatch = useDispatch();
  const handleEditOpen = () => setEdit(true);
  const handleEditClose = () => {
    setEdit(false);
    setDestination("");
    setDestinationId("");
    setRecording("");
    setDescription("");
    setIvrAuthentication("");
    setRedirectGroup("");
    setStatus("");
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "destination":
        setDestination(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleEdit = (data) => {
    handleEditOpen();
    setRecording(data?.recording);
    setIvrAuthentication(data?.ivr_authendication);
    setDescription(data?.description);
    setDestination(data?.didnumber);
    setDestinationId(data?.destinationId);
    setStatus(data?.status);
    setRedirectGroup(data?.redirect_group_id);
  };

  const handleOpen = (description) => {
    setSelectedDescription(description);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useMemo(() => {
    setRedirectGroupData(state.getUserRedirectGroups.RedirectGroup);
  }, [state.getUserRedirectGroups.RedirectGroup]);

  const handleUpdate = () => {
    const data = JSON.stringify({
      id: destinationId,
      recording: recording,
      description: description,
      ivr_options: ivrAuthentication,
      redirect_group_id: redirectGroup,
      status: status === true ? "t" : "f",
    });
    dispatch(updateRedirectDestination(data, setResponse, handleEditClose));
  };

  useEffect(() => {
    dispatch(getRedirectDestination(radioValue, setLoader));
    dispatch(getUserRedirectGroups());
    dispatch({ type: GET_REDIRECT_DESTINATION_SUCCESS, payload: [] });
  }, [response, radioValue, setLoader]);

  // --------------Columns Data Condition For Mobile View and Desktop View---------------------
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // < 600px

  // ------------All Columns Data------------------------------
  const allColumns = [
    {
      field: "edit",
      headerName: "Action",
      headerClassName: "redirect_custom-header",
      flex: 1,
      width: isXs ? 55 : 80,
      minWidth: 55,
      maxWidth: 80,
      headerAlign: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: true, // Allows sorting on click but not on hover
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold" }}
        >
          Action
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {/* <IconButton
              onClick={() => handleEdit(params.row)}
              style={{
                border: "1px solid #04255C",
                borderRadius: "5px",
                padding: "6px",
                fontSize: "15px",
                color: "#04255C",
              }}
            >
              Edit
            </IconButton> */}
            <Tooltip title="Edit" disableInteractive interactive>
              <IconButton
                onClick={() => handleEdit(params.row)}
                style={{
                  fontSize: "22px",
                }}
              >
                <Edit
                  index={params.row.id}
                  style={{
                    cursor: "pointer",
                    color: "#42765f",
                    fontSize: "calc(0.8rem + 0.8vw)",
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: "didnumber",
      headerName: "Destination",
      headerClassName: "redirect_custom-header",
      headerAlign: "left",
      flex: 1,
      width: isXs ? 100 : "100%",
      minWidth: 100,
      maxWidth: "100%",
      align: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: true, // Allows sorting on click but not on hover
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold" }}
        >
          Destination
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.3vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "redirect_group_name",
      headerName: "Campaign Name",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 80 : "100%",
      minWidth: 80,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Keeps column menu enabled
      sortable: true, // Disables sorting on both hover and click
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold" }}
        >
          Campaign Name
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <span
            style={{
              fontSize: "calc(0.6rem + 0.3vw)",
            }}
          >
            {params.row.redirect_group_name}
          </span>
        );
      },
    },
    // {
    //   field: "carrier_name",
    //   headerName: "Carrier Name",
    //   headerClassName: "custom-header",
    //   width: 100,
    //   headerAlign: "left",
    //   align: "left",
    // },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      width: isXs ? 58 : "100%",
      minWidth: 58,
      maxWidth: "100%",
      headerAlign: "left",
      align: "left",
      disableColumnMenu: true,
      sortable: true,
      headerClassName: "custom-header",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold" }}
        >
          Status
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <>
            {params.row.status === true ? (
              <>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    color: "green",
                    fontSize: "calc(0.5rem + 0.3vw)",
                  }}
                >
                  Active
                </div>
              </>
            ) : (
              <>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    color: "red",
                    fontSize: "calc(0.5rem + 0.3vw)",
                  }}
                >
                  Deactive
                </div>
              </>
            )}
          </>
        );
      },
    },
    {
      field: "ivr_authendication",
      headerName: "IVR Auth",
      headerClassName: "custom-header",
      // width: 130,
      flex: 1, // Makes column width responsive
      minWidth: 70, // Ensures a minimum width
      maxWidth: "100%", // Optional: Restricts maximum width
      disableColumnMenu: true, // Prevents menu on hover
      sortable: true, // Allows sorting on click but not on hover
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        const val = params.row.ivr_authendication;
        return (
          <>
            <span>{val}</span>
          </>
        );
      },
    },
    {
      field: "recording",
      headerName: "Recording",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 55 : "100%",
      minWidth: 55,
      maxWidth: "100%",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: true, // Allows sorting on click but not on hover
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold" }}
        >
          Recording
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.recording === false ? (
              <>
                <div
                  style={{
                    color: "red",
                    // background: "red",
                    // padding: "7px",
                    // borderRadius: "5px",
                    // fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {/* {params.row.recording.toString().toLowerCase()} */}
                  No
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "green",
                    // background: "green",
                    // padding: "7px",
                    // borderRadius: "5px",
                    // fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {/* {params.row.recording.toString().toLowerCase()} */}
                  Yes
                </div>
              </>
            )}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      headerClassName: "custom-header",
      flex: 1,
      minWidth: 92,
      maxWidth: "100%",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: true, // Allows sorting on click but not on hover
      //headerClassName: "redirect_custom-header",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
            maxWidth: "100%",
            //color: "white",
          }}
          onClick={() => handleOpen(params.value)}
          title="Click to expand"
        >
          {params.value && params.value.length > 50
            ? params.value.substring(0, 50) + "..."
            : params.value}
        </div>
      ),
    },
  ];

  // --------------Only Mobile View Columns Data---------------------
  const mobileColumns = allColumns.filter((col) =>
    [
      "edit",
      "didnumber",
      "redirect_group_name",
      "status",
      "recording",
      "daily_limit",
      "current_daily_limit",
      "status",
    ].includes(col.field)
  );

  // --------------Table Options---------------------
  const columns = isMobile ? mobileColumns : allColumns;

  const rows = [];
  state?.getRedirectDestination?.RedirectDestination &&
    state?.getRedirectDestination?.RedirectDestination?.data?.forEach(
      (item, index) => {
        return rows.push({
          id: index + 1,
          carrier_name: item?.carrier_name,
          didnumber: item?.didnumber,
          description: item?.description,
          recording: item?.recording,
          redirect_group_id: item?.redirect_group_id,
          status: item?.status,
          user_id: item?.user_id,
          username: item?.username,
          destinationId: item?.id,
          ivr_authendication: item?.ivr_options,
          group_name: item.group_name,
          redirect_group_name: item.redirect_group_name,
        });
      }
    );

  const filteredRows = rows.filter((row) =>
    row.didnumber?.toLowerCase().includes(searchDestination.toLowerCase())
  );

  return (
    <>
      <div className={`App ${userThem} `}>
        <div className="contant_box">
          <div className="main">
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
                            <div className="cntnt_title d-flex justify-content-between">
                              <h3
                                style={{
                                  margin: "0px",
                                  color: "#f5751D",
                                  fontWeight: "500",
                                  fontSize: "2rem",
                                }}
                              >
                                Destination
                              </h3>
                              <Box sx={{ width: "auto" }}>
                                <TextField
                                  size="small"
                                  fullWidth
                                  variant="outlined"
                                  placeholder="Search destination numbers..."
                                  value={searchDestination} // Controlled by internal state
                                  onChange={(e) =>
                                    setSearchDestination(e.target.value)
                                  } // Updates the state
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                      </InputAdornment>
                                    ),
                                    endAdornment: searchDestination && ( // Show clear button only when there's input
                                      <InputAdornment position="end">
                                        <IconButton
                                          edge="end"
                                          size="small"
                                          sx={{ mr: -1 }}
                                          onClick={() =>
                                            setSearchDestination("")
                                          } // Clears the input
                                        >
                                          <ClearIcon fontSize="small" />
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                    sx: {
                                      fontSize: { xs: "0.875rem", sm: "1rem" },
                                      height: { xs: "36px", sm: "40px" },
                                    },
                                  }}
                                />
                              </Box>
                              {/* <p>
                            Use this to monitor and interact with the call bock.
                          </p> */}
                            </div>

                            {/* -------------Description------------- */}

                            <Dialog
                              open={open}
                              onClose={handleClose}
                              fullWidth
                              maxWidth="sm"
                            >
                              <DialogTitle>
                                Full Description
                                <IconButton
                                  aria-label="close"
                                  onClick={handleClose}
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

                            <div>
                              <div>
                                <FormControl>
                                  {/* <FormLabel id="demo-row-radio-buttons-group-label">Live Calls</FormLabel> */}
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={radioValue} // Bind the selected value to state
                                    onChange={(e) => {
                                      setRadioValue(e.target.value);
                                      setLoader(true);
                                    }} // Handle change event
                                  >
                                    <FormControlLabel
                                      value=""
                                      control={<Radio />}
                                      label={`All(${
                                        radioValue === "t" || radioValue === "f"
                                          ? 0
                                          : rows.length
                                      })`}
                                    />
                                    <FormControlLabel
                                      value="t"
                                      control={<Radio />}
                                      label={`Active(${
                                        radioValue === "" || radioValue === "f"
                                          ? 0
                                          : rows.length
                                      })`}
                                    />
                                    <FormControlLabel
                                      value="f"
                                      control={<Radio />}
                                      label={`Deactivated(${
                                        radioValue === "" || radioValue === "t"
                                          ? 0
                                          : rows.length
                                      })`}
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </div>

                            {/* ----------------Table------------- */}

                            {loader ? (
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
                                  <div
                                    style={{ width: "100%", overflowX: "auto" }}
                                  >
                                    <StyledDataGrid
                                      rows={filteredRows}
                                      columns={columns}
                                      // getRowClassName={(params) =>
                                      //   isRowBordered(params) ? 'borderedGreen' : 'borderedRed'
                                      // }
                                      components={{ Toolbar: GridToolbar }}
                                      slots={{
                                        toolbar: CustomToolbar,
                                      }}
                                      autoHeight // Automatically adjust the height to fit all rows
                                      disableColumnResize={false} // Allow column resizing
                                      density="compact"
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
                            {/* -----   Edit Campaign Modal Start   ----- */}
                            <Dialog
                              open={edit}
                              onClose={handleEditClose}
                              sx={{ textAlign: "center" }}
                            >
                              <Box>
                                <IconButton
                                  onClick={handleEditClose}
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
                                Update Destination
                              </DialogTitle>

                              <DialogContent>
                                <form>
                                  <form style={{ textAlign: "center" }}>
                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Destination"
                                      variant="outlined"
                                      name="destination"
                                      value={destination}
                                      onChange={handleChange}
                                      padding={"0px 0 !important"}
                                      disabled
                                    />
                                    <br />
                                    <FormControl
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        IVR Authentication
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="IVR Authentication"
                                        helperText="Select the language."
                                        style={{ textAlign: "left" }}
                                        value={ivrAuthentication}
                                        onChange={(e) => {
                                          setIvrAuthentication(e.target.value);
                                        }}
                                        required
                                      >
                                        <MenuItem value={"no"}>No</MenuItem>
                                        <MenuItem value={"random"}>
                                          Random
                                        </MenuItem>
                                        <MenuItem value={"0"}>0</MenuItem>
                                        <MenuItem value={"1"}>1</MenuItem>
                                        <MenuItem value={"2"}>2</MenuItem>
                                        <MenuItem value={"3"}>3</MenuItem>
                                        <MenuItem value={"4"}>4</MenuItem>
                                        <MenuItem value={"5"}>5</MenuItem>
                                        <MenuItem value={"6"}>6</MenuItem>
                                        <MenuItem value={"7"}>7</MenuItem>
                                        <MenuItem value={"8"}>8</MenuItem>
                                        <MenuItem value={"9"}>9</MenuItem>
                                      </Select>
                                    </FormControl>

                                    <FormControl
                                      fullWidth
                                      style={{
                                        width: "100%",
                                        margin: "7px 0",
                                      }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Status
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Status"
                                        helperText="Select the language."
                                        style={{ textAlign: "left" }}
                                        value={status}
                                        onChange={(e) =>
                                          setStatus(e.target.value)
                                        }
                                        required
                                      >
                                        <MenuItem value={true}>Active</MenuItem>
                                        <MenuItem value={false}>
                                          Deactive
                                        </MenuItem>
                                      </Select>
                                    </FormControl>

                                    <FormControl
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                    >
                                      <InputLabel id="demo-multiple-checkbox-label">
                                        Ring groups
                                      </InputLabel>
                                      <Select
                                        style={{ textAlign: "left" }}
                                        labelId="demo-multiple-checkbox-label"
                                        label="Ring groups"
                                        id="demo-multiple-checkbox"
                                        fullWidth
                                        value={redirectGroup}
                                        onChange={(e) =>
                                          setRedirectGroup(e.target.value)
                                        }
                                        input={
                                          <OutlinedInput label="Ring groups" />
                                        }
                                        MenuProps={MenuProps}
                                      >
                                        {redirectGroupData &&
                                          redirectGroupData?.map((name) => (
                                            <MenuItem
                                              key={name}
                                              value={name.id}
                                            >
                                              {name.group_name}
                                            </MenuItem>
                                          ))}
                                      </Select>
                                    </FormControl>

                                    <FormControl
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Recording
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Recording"
                                        helperText="Select the language."
                                        style={{ textAlign: "left" }}
                                        value={recording}
                                        onChange={(e) => {
                                          setRecording(e.target.value);
                                        }}
                                        required
                                      >
                                        <MenuItem value={"true"}>Yes</MenuItem>
                                        <MenuItem value={"false"}>No</MenuItem>
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
                                      name="description"
                                      value={description}
                                      onChange={handleChange}
                                      padding={"0px 0 !important"}
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
                                  onClick={handleEditClose}
                                  autoFocus
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="all_button_clr"
                                  sx={{
                                    fontSize: "16px !impotant",
                                    marginTop: "20px",
                                    marginLeft: "0px !important",
                                    padding: "10px 20px !important",
                                    textTransform: "capitalize !important",
                                  }}
                                  variant="contained"
                                  color="primary"
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
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Destination;
