import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Close, Delete, Edit, Visibility } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  createTheme,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import "../../style.css";
import { json, useNavigate } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@mui/styles";
import "../../Switcher.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdminManageCampaign,
  deleteAdminManageCampaign,
  getAdminManageCampaign,
  updateAdminManageCampaign,
} from "../../redux/actions/adminPortal/adminPortal_manageCampaignAction";
import { getAdminUsersList } from "../../redux/actions/adminPortal_listAction";
import { StyledDataGrid } from "../../pages/CustomDataGrid";
const drawerWidth = 240;

// =======modal-popup---->
const style = {
  padding: "20px !Important",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // backgroundColor: "rgb(9, 56, 134)",
  // border: '2px solid #000',
  boxShadow: 24,
};

// ====table----->

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
});
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

function Manage_Campaign({ colorThem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [buyerOpen, setBuyerOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [campaignName, setCampaignName] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [callThreading, setCallThreading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCampaignName("");
    setCampaignId("");
    setDescription("");
    setUserId("");
    setCallThreading(false);
  };

  const handleAddBuyerOpen = () => setBuyerOpen(true);
  const handleAddBuyerClose = () => setBuyerOpen(false);
  const handleEditCampaignOpen = () => setEdit(true);
  const handleEditCampaignClose = () => {
    setEdit(false);
    setCampaignName("");
    setCampaignId("");
    setDescription("");
    setUserId("");
    setCallThreading(false);
  };

  const handleAlertClose = () => {
    setAlertMessage(false);
    setUserId("");
    setName("");
    setId("");
  };

  useEffect(() => {
    dispatch(getAdminManageCampaign());
    dispatch(getAdminUsersList());
  }, [dispatch, response]);

  useMemo(() => {
    if (state?.getAdminUsersList?.userList) {
      const usersArray = Object.keys(state?.getAdminUsersList?.userList)?.map(
        (key) => ({
          user_id: key,
          username: state?.getAdminUsersList?.userList[key],
        })
      );
      setUsers(usersArray);
    }
  }, [state?.getAdminUsersList?.userList]);
  // ------------->

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "campaignName":
        setCampaignName(value);
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

  const handleEdit = (data) => {
    handleEditCampaignOpen();
    setCampaignName(data?.group_name);
    setCampaignId(data?.campaign_id);
    setStatus(data?.status);
    setDescription(data?.description);
    setUserId(data?.user_id);
    setCallThreading(data?.call_threading);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const request = {
      user_id: userId,
      group_name: campaignName,
      call_threading: callThreading,
      description: description,
    };
    dispatch(createAdminManageCampaign(request, handleClose, setResponse));
  };
  const handleUpdate = () => {
    const request = {
      user_id: userId,
      id: campaignId,
      group_name: campaignName,
      call_threading: callThreading,
      description: description,
    };
    dispatch(
      updateAdminManageCampaign(request, handleEditCampaignClose, setResponse)
    );
  };

  const handleMessage = useCallback(
    (data) => {
      setName(data?.group_name);
      setId(data?.campaign_id);
      setAlertMessage(true);
    },
    [setName, setId]
  ); // Memoize event handler

  const handleDelete = useCallback(() => {
    const data = JSON.stringify({ id: id });
    dispatch(deleteAdminManageCampaign(data, setResponse));
    setAlertMessage(false);
  }, [dispatch, setResponse, id]);

  const handleView = (data) => {
    navigate("/admin_portal/viewbuyer", { state: { data: data } });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = [
    {
      field: "view_buyer",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "start",
      align: "start",
      sortable: false,
      width: isXs ? 120 : 90,
      minWidth: 120,
      maxWidth: 120,
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important" }}
        >
          Action
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <Tooltip title="View" disableInteractive interactive>
              <IconButton onClick={() => handleView(params.row)}>
                <Visibility
                  style={{
                    cursor: "pointer",
                    color: "#f5751d",
                    fontSize: isMobile ? "12px" : "18px",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" disableInteractive interactive>
              <IconButton onClick={() => handleEdit(params.row)}>
                <Edit
                  index={params.row.id}
                  style={{
                    cursor: "pointer",
                    color: "#42765f",
                    fontSize: isMobile ? "12px" : "18px",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" disableInteractive interactive>
              <IconButton onClick={() => handleMessage(params.row)}>
                <Delete
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: isMobile ? "12px" : "18px",
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
      headerAlign: "start",
      align: "start",
      width: isXs ? 100 : 140,
      minWidth: 100,
      maxWidth: 140,
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important" }}
        >
          Campaign Name
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "user_name",
      headerName: "User Name",
      headerClassName: "custom-header",
      headerAlign: "start",
      align: "start",
      width: isXs ? 80 : 120,
      minWidth: 80,
      maxWidth: 120,
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important" }}
        >
          {isSmallScreen ? "Name" : "User Name"}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },

    {
      field: "call_threading",
      headerName: "Call Threading",
      headerClassName: "custom-header",
      headerAlign: "start",
      align: "start",
      width: isXs ? 80 : 120,
      minWidth: 80,
      maxWidth: 120,
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important" }}
        >
          {isSmallScreen ? "Call Thread." : "Call Threading"}
        </Typography>
      ),
      renderCell: (params) => (
        <span
          style={{
            textTransform: "capitalize",
            fontSize: "calc(0.6rem + 0.2vw)",
          }}
        >
          {params.row.call_threading === true ? "Yes" : "No"}
        </span>
      ),
    },

    {
      field: "description",
      headerName: "Description",
      headerClassName: "custom-header",
      headerAlign: "start",
      align: "start",
      width: isXs ? 200 : 200,
      minWidth: 200,
      maxWidth: 200,
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important" }}
        >
          Description
        </Typography>
      ),
      renderCell: (params) => (
        <span
          style={{
            textTransform: "capitalize",
            fontSize: "calc(0.6rem + 0.2vw)",
          }}
        >
          {params.row.description}
        </span>
      ),
    },
  ];

  const mockDataTeam = useMemo(() => {
    const calculatedRows = [];
    state?.getAdminManageCampaign?.ManageCampaign &&
      state?.getAdminManageCampaign?.ManageCampaign.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          group_name: item?.group_name,
          user_name: item?.user_name,
          campaign_id: item?.id,
          user_id: item?.user_id,
          call_threading: item?.call_threading,
          description: item?.description,
        });
      });
    return calculatedRows;
  }, [state?.getAdminManageCampaign?.ManageCampaign]);

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
            {/* ========== */}
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
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
                          {/* <p>A ring group is a set of destinations that can be called with a ring strategy. </p> */}
                        </div>
                        {/* ==Add-modal== */}
                        <div>
                          <IconButton
                          size="small"
                            className="all_button_clr"
                            onClick={handleOpen}
                            aria-label="Add Campaign"
                            sx={{
                              // You can add custom styles here if needed
                              // For example:
                              color: "primary.main",
                              "&:hover": {
                                backgroundColor: "action.hover",
                              },
                            }}
                          >
                            Add Campaign <AddOutlinedIcon sx={{ ml: 1 }} />
                          </IconButton>
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
                                  // height: "348px",
                                  height: "230px",
                                  // overflow: "auto",
                                  paddingTop: "10px",
                                  padding: "5px",
                                  width: "auto",
                                }}
                              >
                                <TextField
                                  style={{ width: "100%", margin: "7px 0" }}
                                  type="text"
                                  label="Campaign Name"
                                  variant="outlined"
                                  value={campaignName}
                                  onChange={(e) => {
                                    setCampaignName(e.target.value);
                                  }}
                                />
                                <br />
                                <FormControl
                                  fullWidth
                                  style={{
                                    width: "100%",
                                    margin: "7px 0",
                                  }}
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    User Name
                                  </InputLabel>

                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="User Name"
                                    helperText="Select the language."
                                    style={{ textAlign: "left" }}
                                    value={userId}
                                    onChange={(e) => {
                                      setUserId(e.target.value);
                                    }}
                                  >
                                    {users?.map((item, index) => {
                                      return (
                                        <MenuItem
                                          key={index}
                                          value={item?.user_id}
                                        >
                                          {item.username}
                                        </MenuItem>
                                      );
                                    })}
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

                                <TextField
                                  style={{ width: "100%", margin: "7px 0" }}
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
                              className="all_button_clr"
                              color="primary"
                              sx={{
                                fontSize: "16px !impotant",
                                background:
                                  "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
                                marginTop: "20px",
                                padding: "10px 20px !important",
                                textTransform: "capitalize !important",
                              }}
                              onClick={handleClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              className="all_button_clr"
                              color="primary"
                              sx={{
                                fontSize: "16px !impotant",
                                background: "#092b5f",
                                marginTop: "20px",
                                padding: "10px 20px !important",
                                textTransform: "capitalize !important",
                              }}
                              onClick={handleSubmit}
                            >
                              save
                            </Button>
                          </DialogActions>
                        </Dialog>

                        {/* -----   Add Campaigns Modal End   ----- */}
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
                    <Fade in={buyerOpen}>
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
                        <form style={{ textAlign: "center" }}>
                          <TextField
                            style={{ width: "100%", margin: " 5px 0 5px 0" }}
                            type="text"
                            label="Name"
                            variant="outlined"
                          />
                          <br />
                          <TextField
                            style={{ width: "100%", margin: " 5px 0 5px 0" }}
                            type="text"
                            label="DID/TFN Number"
                            variant="outlined"
                          />
                          <br />
                          <TextField
                            style={{ width: "100%", margin: " 5px 0 5px 0" }}
                            type="text"
                            label="Weightage"
                            variant="outlined"
                          />
                          <br />
                          <TextField
                            style={{ width: "100%", margin: " 5px 0 5px 0" }}
                            type="text"
                            label="Ringing Timeout"
                            variant="outlined"
                          />
                          <br />
                          <TextField
                            style={{ width: "100%", margin: " 5px 0 5px 0" }}
                            type="text"
                            label="Max Calls In A Day"
                            variant="outlined"
                          />
                          <br />
                          <TextField
                            style={{ width: "100%", margin: " 5px 0 5px 0" }}
                            type="text"
                            label="No CC (Concurrent Call)"
                            variant="outlined"
                          />
                          <br />

                          <Button
                            variant="contained"
                            color="primary"
                            className="all_button_clr"
                            sx={{ background: "#092b5f", marginTop: "20px" }}
                          >
                            save
                          </Button>
                        </form>
                      </Box>
                    </Fade>
                  </Modal>
                  {/* -----   Add Buyer Modal End   ----- */}
                  {/* ----------------------------------------------
                     ----------------------------------------------
                     ----------------------------------------------
                     ---------------------------------------------- */}

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
                            // height: "348px",
                            height: "200px",
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
                          <br />
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
                        className="all_button_clr mt-3"
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

            {/* ========== */}

            <ThemeProvider theme={theme}>
              <div style={{ height: "100%", width: "100%" }}>
                <StyledDataGrid
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
                />
              </div>
            </ThemeProvider>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Manage_Campaign;
