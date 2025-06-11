import { Close, Edit, Label } from "@mui/icons-material";
import {
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  MenuItem,
  Select,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Grid,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import { getAdminCallActive } from "../../redux/actions/adminPortal_callActiveAction";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import Backdrop from "@mui/material/Backdrop";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getExtension,
  createExtension,
  updateExtension,
} from "../../redux/actions/extensionAction";
import { makeStyles } from "@mui/styles";
import "../../Switcher.scss";
import InfoIcon from "@mui/icons-material/Info";
import { getAllUsers } from "../../redux/actions/userAction";
import {
  createAdminMinutes,
  getAdminMinutes,
  updateAdminMinutes,
} from "../../redux/actions/adminPortal_minutesAction";
import axios from "axios";
import { api } from "../../mockData";
import { StyledDataGrid } from "../../pages/CustomDataGrid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
      top: "-4px !important",
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
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function AdminMinutes({ colorThem }) {
  const user = JSON.parse(localStorage.getItem("admin"));
  const token = JSON.parse(localStorage.getItem("admin"));
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [userId, setUserId] = useState("");
  const [response, setResponse] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [assignMinutes, setAssignMinutes] = useState("");
  const [totalMinutes, setTotalMinutes] = useState("");
  const [billingType, setBillingType] = useState("");
  const [billingRate, setBillingRate] = useState("");
  const [userName, setUserName] = useState("");
  const [callType, setCallType] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");

  const [values, setValues] = useState("");
  const [validation, setValidation] = useState({
    userId: "",
    billingType: "",
    totalMinutes: "",
    billingRate: "",
  });
  const [tMinutes, setTMinutes] = useState("");
  const handleOpen = () => setOpen(true);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    classes: {
      list: classes.list,
      paper: classes.paper,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    getContentAnchorEl: null,
  };

  // Function to determine whether a row should have the bordered style
  const isRowBordered = (params) => {
    const { row } = params;

    // Add your condition here, for example, adding border to rows where age is greater than 25
    return row.is_active === true;
  };

  const handleClose = () => {
    setOpen(false);
    setValidation({
      userId: "",
      billingType: "",
      totalMinutes: "",
      billingRate: "",
    });
    setUserId("");
    setBillingType("");
    setCallType("");
    setStatus("");
    setTotalMinutes("");
    setBillingRate("");
    setAssignMinutes("");
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setUserId("");
    setBillingType("");
    setCallType("");
    setStatus("");
    setTotalMinutes("");
    setBillingRate("");
    setAssignMinutes("");
  }, []);

  const handleButtonClick = useCallback((row) => {
    setOpenModal(true);
    setTotalMinutes(row.total_minutes);
    setUserId(row.user_id);
    setUserName(row.username);
    setId(row.minute_id);
    setBillingType(row.billing_type);
    setStatus(row.is_active.toString());
  }, []); // Memoize event handler

  const checkValidation = useCallback(() => {
    let errors = { ...validation };
    let isValid = true;
    //first Name validation
    if (!userId) {
      errors.userId = "User Name is required";
      isValid = false;
    } else {
      errors.userId = "";
    }

    if (!billingType) {
      errors.billingType = "Billing Type is required";
      isValid = false;
    } else {
      errors.billingType = "";
    }
    if (!totalMinutes) {
      errors.totalMinutes = "Total Minutes is required";
      isValid = false;
    } else {
      errors.totalMinutes = "";
    }
    if (!billingRate) {
      errors.billingRate = "Billing Rate is required";
      isValid = false;
    } else {
      errors.billingRate = "";
    }
    setValidation(errors);
    return isValid;
  }, [validation, userId, billingType, totalMinutes, billingRate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid) {
      let data = JSON.stringify({
        user_id: userId,
        call_type: callType,
        total_minutes: totalMinutes,
        billing_type: billingType,
      });
      dispatch(
        createAdminMinutes(
          data,
          setOpen,
          setResponse,
          setTotalMinutes,
          setUserId,
          setId,
          setBillingType,
          setStatus
        )
      );
    }
  };

  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault();
      let minutes = "";
      if (assignMinutes !== "") {
        minutes = JSON.parse(assignMinutes);
      }
      let data = JSON.stringify({
        id: id,
        user_id: userId,
        billing_type: billingType,
        assign_minute: minutes,
        is_active: status.charAt(0),
      });
      dispatch(
        updateAdminMinutes(
          data,
          setOpenModal,
          setResponse,
          setTotalMinutes,
          setUserId,
          setId,
          setBillingType,
          setStatus,
          setAssignMinutes
        )
      );
    },
    [
      id,
      billingType,
      assignMinutes,
      status,
      setOpenModal,
      setResponse,
      setTotalMinutes,
      setUserId,
      setId,
      setBillingType,
      setStatus,
      setAssignMinutes,
    ]
  );

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/resellerbilling`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token} `,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setValues(response?.data);
      })
      .catch((error) => {});
  }, [response]);

  useEffect(() => {
    dispatch(getAdminMinutes());
    dispatch(getAllUsers(""));
  }, [response]);

  useEffect(() => {
    if (user?.user_role === "Reseller") {
      setBillingType("Prepaid");
    }
  }, [user]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // < 600px
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // 600px - 900px
  const isMd = useMediaQuery(theme.breakpoints.only("md")); // 900px - 1200px
  const isSmallScreen = useMediaQuery(theme.breakpoints.between("sm"));

  const columns = [
    {
      field: "action",
      // headerName: "Recharge/Minues",
      headerName: "Action",
      sortable: false,
      width: isXs ? 60 : 60,
      minWidth: 60,
      maxWidth: 60,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
        >
          Action
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <Tooltip title="Edit" disableInteractive interactive>
              <IconButton onClick={() => handleButtonClick(params.row)}>
                <Edit
                  index={params.row.id}
                  style={{
                    cursor: "pointer",
                    color: "rgb(66, 118, 95)",
                    fontSize: isMobile ? "20px" : "25px",
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: isXs ? 100 : 120,
      minWidth: 100,
      maxWidth: 120,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
        >
          User name
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <span
            style={{
              textTransform: "capitalize",
              fontSize: "calc(0.6rem + 0.2vw)",
            }}
          >
            {params.row.username}
          </span>
        );
      },
    },
    {
      field: "total_used_minutes",
      headerName: "Total Used Minutes",
      width: isXs ? 120 : 130,
      minWidth: 120,
      maxWidth: 130,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
        >
          {isSmallScreen ? "Total Used Mint." : "Total Used Minutes"}
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
      field: "total_minutes",
      headerName: "Total Minutes",
      width: isXs ? 100 : 110,
      minWidth: 100,
      maxWidth: 110,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
        >
          {isSmallScreen ? "Total Minut." : "Total Minutes"}
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
      field: "remaining_minutes",
      headerName: "Remaining Minutes",
      width: isXs ? 120 : 140,
      minWidth: 120,
      maxWidth: 140,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
        >
          {isSmallScreen ? "Remaining Minut." : "Remaining Minutes"}
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
      field: "billing_type",
      headerName: "Billing Type",
      width: isXs ? 80 : 120,
      minWidth: 80,
      maxWidth: 120,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
        >
          Billing Type
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.billing_type === "Prepaid" ? (
              <>
                <div
                  style={{
                    color: "white",
                    background: "blue",
                    padding: isMobile ? "5px" : "7px",
                    borderRadius: "5px",
                    fontSize: "calc(0.6rem + 0.2vw)",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.billing_type.toString().toLowerCase()}
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "white",
                    background: "orange",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.billing_type.toString().toLowerCase()}
                </div>
              </>
            )}
          </div>
        );
      },
    },
    // {
    //   field: "call_type",
    //   headerName: "Call Type",
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   width: 130,
    //   align: "center",
    // },

    {
      field: "created_date",
      headerName: "Create Date",
      width: isXs ? 80 : 110,
      minWidth: 80,
      maxWidth: 110,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
        >
          Create Date
        </Typography>
      ),
      renderCell: (params) => {
        const valueFormatter = (params) => {
          const date = new Date(params.value);
          return `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
        };

        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "400",
                color: "blue",
                margin: "0",
                textTransform: "capitalize",
                fontSize: "calc(0.6rem + 0.2vw)",
              }}
            >
              {valueFormatter(params)}
            </p>
          </div>
        );
      },
      // valueFormatter: (params) => {
      //   if (params.value !== null) {
      //     const date = new Date(params.value);
      //     return `${date.getDate()}/${
      //       date.getMonth() + 1
      //     }/${date.getFullYear()}`;
      //   }
      // },
    },
    {
      field: "updated_date",
      headerName: "Update Date",
      width: isXs ? 80 : 110,
      minWidth: 80,
      maxWidth: 110,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
        >
          Update Date
        </Typography>
      ),
      renderCell: (params) => {
        const valueFormatter = (params) => {
          const date = new Date(params.value);
          return `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
        };

        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "400",
                color: "brown",
                margin: "0",
                textTransform: "capitalize",
                fontSize: "calc(0.6rem + 0.2vw)",
              }}
            >
              {valueFormatter(params)}
            </p>
          </div>
        );
      },
      // valueFormatter: (params) => {
      //   if (params.value !== null) {
      //     const date = new Date(params.value);
      //     return `${date.getDate()}/${
      //       date.getMonth() + 1
      //     }/${date.getFullYear()}`;
      //   }
      // },
    },
    {
      field: "is_active",
      headerName: "Status",
      width: isXs ? 80 : 110,
      minWidth: 80,
      maxWidth: 110,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important" }}
        >
          Status
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.is_active === true ? (
              <>
                <div
                  style={{
                    color: "green",
                    fontSize: "calc(0.6rem + 0.2vw)",
                    //  background: "green",
                    //  padding: "7px",
                    //  borderRadius: "5px",
                    //  fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  Active
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "red",
                    fontSize: "calc(0.6rem + 0.2vw)",
                    //  background: "red",
                    // padding: "7px",
                    // borderRadius: "5px",
                    //  fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  Deactive
                </div>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.getAdminMinutes?.adminminutes &&
      state?.getAdminMinutes?.adminminutes?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          billing_type: item?.billing_type,
          call_type: item?.call_type,
          created_date: item?.created_date,
          updated_date: item?.updated_date,
          is_active: item?.is_active,
          remaining_minutes: item?.remaining_minutes,
          total_minutes: item?.total_minutes,
          total_used_minutes: item?.total_used_minutes,
          user_id: item?.user_id,
          username: item?.username,
          minute_id: item?.id,
        });
      });
    return calculatedRows;
  }, [state?.getAdminMinutes?.adminminutes]);

  const num = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  return (
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
                        <div
                          className="cntnt_title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "c  enter",
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
                              Billing
                            </h3>
                            {/* <p>Use this to configure your Minutes.</p> */}
                          </div>
                          {user?.user_role === "Reseller" ? (
                            <>
                              {values?.data?.map((item, index) => {
                                return (
                                  <>
                                    {user?.uid === item.user_id ? (
                                      <>
                                        <div
                                          style={{ margin: "auto" }}
                                          className="billing_minute"
                                        >
                                          <h6>
                                            Total Remaining Minute:{" "}
                                            <span style={{ color: "#f5751d" }}>
                                              {item.remaining_minutes}
                                            </span>
                                          </h6>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            <></>
                          )}

                          <IconButton
                            className="all_button_clr mrgn_lft"
                            onClick={handleOpen}
                          >
                            Add Billing For User
                            <AddOutlinedIcon sx={{ ml: 1 }} />
                          </IconButton>

                          <Dialog
                            open={open}
                            onClose={handleCloseModal}
                            sx={{
                              textAlign: "center",
                              borderRadius: "10px  !important",
                            }}
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
                              Add Billing For User
                            </DialogTitle>
                            <DialogContent>
                              <form>
                                <Typography variant="body1">
                                  <form
                                    style={{
                                      textAlign: "center",
                                      height: "248px",
                                      // overflow: "auto",
                                      paddingTop: "10px",
                                      padding: "5px",
                                      width: "auto",
                                    }}
                                  >
                                    <FormControl
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        UserName
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="UserName"
                                        helperText="Select the language."
                                        style={{ textAlign: "left" }}
                                        value={userId}
                                        onChange={(e) => {
                                          setUserId(e.target.value);
                                        }}
                                        required
                                      >
                                        {state?.allUsers?.users
                                          ?.filter(
                                            (item) =>
                                              item.username !== "superadmin" &&
                                              item.username !== "admin"
                                          )
                                          .map((item, index) => {
                                            return (
                                              <MenuItem
                                                key={index}
                                                value={item?.id}
                                              >
                                                {item.username}
                                              </MenuItem>
                                            );
                                          })}
                                      </Select>
                                    </FormControl>

                                    {validation.userId && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.userId}
                                      </p>
                                    )}

                                    {/* <FormControl
                                    fullWidth
                                    style={{ width: "100%", margin: "7px 0" }}
                                  >
                                    <InputLabel id="demo-simple-select-label">
                                      Call Type
                                    </InputLabel>

                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Call Type"
                                      helperText="Select the language."
                                      style={{ textAlign: "left" }}
                                      value={callType}
                                      onChange={(e) => {
                                        setCallType(e.target.value);
                                      }}
                                    >
                                      <MenuItem value={"Inbound"}>
                                        Inbound
                                      </MenuItem>
                                      <MenuItem value={"Outbound"}>
                                        Outbound
                                      </MenuItem>
                                    </Select>
                                  </FormControl>

                                  <br /> */}

                                    <FormControl
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Billing Type
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Billing Type"
                                        helperText="Select the language."
                                        style={{ textAlign: "left" }}
                                        value={billingType}
                                        onChange={(e) => {
                                          setBillingType(e.target.value);
                                        }}
                                        disabled={
                                          user?.user_role === "Reseller"
                                        }
                                      >
                                        <MenuItem value={"Prepaid"}>
                                          Prepaid
                                        </MenuItem>
                                        <MenuItem value={"Postpaid"}>
                                          {" "}
                                          Postpaid
                                        </MenuItem>
                                      </Select>
                                    </FormControl>

                                    {validation.billingType && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.billingType}
                                      </p>
                                    )}
                                    {/* <InputLabel style={{textAlign:'left', fontSize: '14px',display:'flex',alignItems:'center'}}>
                                      <Tooltip style={{color:'#fff'}} title="test" classes={{ tooltip: classes.tooltip }}>
                                        <InfoIcon style={{fontSize:"18px",color:"#0E397F"}} />&nbsp;
                                        </Tooltip >
                                      </InputLabel> */}

                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Total Minutes"
                                      variant="outlined"
                                      name="userName"
                                      value={totalMinutes}
                                      onChange={(e) => {
                                        setTotalMinutes(e.target.value);
                                      }}
                                      required
                                    />
                                    {validation.totalMinutes && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.totalMinutes}
                                      </p>
                                    )}

                                    {/* <InputLabel style={{textAlign:'left', fontSize: '14px',display:'flex',alignItems:'center'}}>
                                      <Tooltip style={{color:'#fff'}} title="test" classes={{ tooltip: classes.tooltip }}>
                                        <InfoIcon style={{fontSize:"18px",color:"#0E397F"}} />&nbsp;
                                        </Tooltip >
                                      </InputLabel> */}
                                    {user?.user_role === "Reseller" ? (
                                      <></>
                                    ) : (
                                      <>
                                        {/* <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    type="text"
                                    label="Billing Rate"
                                    variant="outlined"
                                    name="billingRate"
                                    value={billingRate}
                                    onChange={(e) => {
                                      setBillingRate(e.target.value);
                                    }}
                                    required
                                  /> */}

                                        <FormControl
                                          fullWidth
                                          style={{
                                            width: "100%",
                                            margin: "7px 0",
                                          }}
                                        >
                                          <InputLabel id="demo-select-small-label">
                                            Billing Rate
                                          </InputLabel>
                                          <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            style={{ textAlign: "left" }}
                                            label="Billing Rate"
                                            value={billingRate}
                                            onChange={(e) => {
                                              setBillingRate(e.target.value);
                                            }}
                                            required
                                          >
                                            <MenuItem value={1}>1-1</MenuItem>
                                            <MenuItem value={6}>1-6</MenuItem>
                                            <MenuItem value={10}>1-10</MenuItem>
                                            <MenuItem value={30}>1-30</MenuItem>
                                            <MenuItem value={60}>1-60</MenuItem>
                                          </Select>
                                        </FormControl>
                                        {validation.billingRate && (
                                          <p
                                            className="mb-0"
                                            style={{
                                              color: "red",
                                              textAlign: "left",
                                            }}
                                          >
                                            {validation.billingRate}
                                          </p>
                                        )}

                                        <br />
                                      </>
                                    )}
                                  </form>
                                </Typography>
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
                        </div>

                        <div
                          style={{ margin: "auto" }}
                          className="billing_minute_mobile"
                        >
                          <h6>Total Remaining Minute:</h6>
                        </div>

                        {/* edit-modal */}
                        <Dialog
                          open={openModal}
                          onClose={handleCloseModal}
                          sx={{
                            textAlign: "center",
                            borderRadius: "10px  !important",
                          }}
                        >
                          <Box>
                            <IconButton
                              onClick={handleCloseModal}
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
                              width: "100%",
                              margin: "auto",
                            }}
                          >
                            <Box sx={{ margin: "auto", padding: "0 24px" }}>
                              <img src="/img/mdl_icon.png" alt="user icon" />
                            </Box>
                            Edit
                          </DialogTitle>
                          <DialogContent>
                            <form>
                              {/* <SelectComponent handleClose={handleClose} /> */}
                              <Typography variant="body1">
                                {/* <br /> */}
                                <form
                                  style={{
                                    textAlign: "center",
                                    height: "348px",
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
                                    label="Username"
                                    variant="outlined"
                                    name="userName"
                                    value={userName}
                                    required
                                    disabled
                                  />
                                  <br />

                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    type="text"
                                    label="Total Minutes"
                                    variant="outlined"
                                    name="userName"
                                    value={totalMinutes}
                                    onChange={(e) => {
                                      setTotalMinutes(e.target.value);
                                    }}
                                    required
                                    disabled
                                  />

                                  <FormControl
                                    fullWidth
                                    style={{ width: "100%", margin: "7px 0" }}
                                  >
                                    <InputLabel id="demo-simple-select-label">
                                      Billing Type
                                    </InputLabel>

                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Billing Type"
                                      helperText="Select the language."
                                      style={{ textAlign: "left" }}
                                      value={billingType}
                                      onChange={(e) => {
                                        setBillingType(e.target.value);
                                      }}
                                    >
                                      <MenuItem value={"Prepaid"}>
                                        Prepaid
                                      </MenuItem>
                                      {user?.user_role === "Reseller" ? (
                                        <></>
                                      ) : (
                                        <MenuItem value={"Postpaid"}>
                                          {" "}
                                          Postpaid
                                        </MenuItem>
                                      )}
                                    </Select>
                                  </FormControl>

                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    type="text"
                                    label="Assign Minutes"
                                    variant="outlined"
                                    name="userName"
                                    // helperText="Note: Reduce minutes for (example: -3100)"
                                    value={assignMinutes}
                                    onChange={(e) => {
                                      setAssignMinutes(e.target.value);
                                    }}
                                  />
                                  <InputLabel
                                    style={{
                                      textAlign: "left",
                                      fontSize: "14px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    Note: Reduce minutes for (example: -3100)
                                  </InputLabel>

                                  {user.user_role === "Reseller" ? (
                                    <></>
                                  ) : (
                                    <></>
                                  )}

                                  <FormControl
                                    fullWidth
                                    style={{ width: "100%", margin: "7px 0" }}
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
                                      onChange={(e) => {
                                        setStatus(e.target.value);
                                      }}
                                    >
                                      <MenuItem value={"true"}>Enable</MenuItem>
                                      <MenuItem value={"false"}>
                                        Disable
                                      </MenuItem>
                                    </Select>
                                  </FormControl>

                                  {user?.user_role === "Reseller" ? (
                                    <></>
                                  ) : (
                                    <>
                                      <TextField
                                        style={{
                                          width: "100%",
                                          margin: " 5px 0 5px 0",
                                        }}
                                        type="text"
                                        label="Billing Rate"
                                        variant="outlined"
                                        name="billingRate"
                                        value={billingRate}
                                        onChange={(e) => {
                                          setBillingRate(e.target.value);
                                        }}
                                        required
                                      />

                                      <br />
                                    </>
                                  )}

                                  {/* <FormControl
                                  fullWidth
                                  style={{ width: "100%", margin: "7px 0" }}
                                >
                                  <InputLabel id="demo-simple-select-label">
                                  Caller Id
                                  </InputLabel>

                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Caller Id"
                                    helperText="Select the language."
                                    style={{ textAlign: "left" }}
                                    value={callerId}
                                  onChange={(e) =>
                                    setCallerId(e.target.value)
                                  }
                                    required
                                  >
                                    {state?.allExtension?.allextension?.map(
                                      (item, index) => {
                                        return (
                                          <MenuItem
                                            key={index}
                                            value={item?.callerid}
                                          >
                                            {item.callerid}
                                          </MenuItem>
                                        );
                                      }
                                    )}
                                  </Select>
                                </FormControl>

                                <br />

                                <FormControl
                            fullWidth
                            style={{ width: "100%", margin: "7px 0" }}
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
                              onChange={(e)=>{setStatus(e.target.value)}}
                              required
                            >
                              <MenuItem value={"true"}>Enable</MenuItem>
                              <MenuItem value={"false"}>Disable</MenuItem>
                            </Select>
                          </FormControl> */}
                                </form>
                              </Typography>
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
                              onClick={handleCloseModal}
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
                              onClick={handleUpdate}
                            >
                              Update
                            </Button>
                          </DialogActions>
                        </Dialog>
                        {/* end-edit-modal*/}

                        <ThemeProvider theme={theme}>
                          <div
                            style={{
                              height: "100%",
                              width: "100%",
                              overflowY: "auto",
                            }}
                          >
                            <StyledDataGrid
                              rows={rows}
                              columns={columns}
                              headerClassName="custom-header"
                              // getRowClassName={(params) =>
                              //   `${params.rowClassName} ${
                              //     isRowBordered(params)
                              //       ? classes.borderedGreen
                              //       : classes.borderedRed
                              //   } ${classes.spacedRow}`
                              // }
                              components={{ Toolbar: GridToolbar }}
                              slots={{
                                toolbar: CustomToolbar,
                              }}
                              autoHeight
                              density="compact"
                              sx={{
                                "& .MuiDataGrid-toolbarContainer": {
                                  gap: "1px", // Spacing between buttons
                                },
                                "& .MuiButton-root": {
                                  // Targets all buttons (filter, export, density)
                                  fontSize: "calc(0.6rem + 0.4vw)", // Button text size
                                  minWidth: "unset", // Remove minimum width constraint
                                },
                                "& .MuiSvgIcon-root": {
                                  // Icons inside buttons
                                  fontSize: "calc(0.6rem + 0.4vw)", // Adjust icon size
                                },
                              }}
                            />
                          </div>
                        </ThemeProvider>
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
  );
}

export default AdminMinutes;
