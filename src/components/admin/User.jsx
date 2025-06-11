import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Close, Edit, } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
  Tooltip,
  InputAdornment,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import "../../style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  register,
  getRoleUsers,
  updateUser,
  login,
  updateUserStaus,
} from "../../redux/actions/userAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import "../../Switcher.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "../../routes/route";
import { api } from "../../mockData";
import PersonIcon from "@mui/icons-material/Person";
import { IconBase } from "react-icons/lib";
import { ALL_USERS_RESET } from "../../redux/constants/userConstants";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 240;

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

// ===========>
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const inpVal = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  role: "",
  limit: 0,
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function User({ colorThem }) {
  const token = JSON.parse(localStorage.getItem("admin"));
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("admin"));
  const [validation, setValidation] = useState({
    userName: "",
    // lastname: "",
    email: "",
    // mobile: "",
    password: "",
    confirmPassword: "",
    status: "",
    role: "",
    service: "",
  });

  const [userActive, setUserActive] = React.useState("");
  const [roleId, setRoleId] = useState(user.user_role === "Reseller" ? 4 : "");
  const [inputValues, setInputValues] = useState(inpVal);
  const [response, setResponse] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [serviceType, setServiceType] = useState(
    user.user_role === "Reseller" ? ["Manage"] : ["Manage"]
  );
  const [service, setService] = useState([]);
  const [status, setStatus] = useState("");
  const [renewal, setRenewal] = useState(0);
  const [reseller, setReseller] = useState(
    user.user_role === "Reseller" ? user.uid : ""
  );
  const [uId, setUId] = useState(0);
  const [extension, setExtension] = useState("");
  const [attempts, setAttempts] = useState("");
  const [extensionNumber, setExtensionNumber] = useState([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [radioValue, setRadioValue] = useState("t");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [value, setValue] = useState("t");


  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setValidation("");
    setInputValues("");
    setUserActive("");
    setRoleId(user.user_role === "Reseller" ? 4 : "");
    setExtension("");
    setReseller("");
    setSelectedPermissions([]);
  };

  const handleAlertClose = () => setAlertMessage(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers(radioValue));
    dispatch(getRoleUsers());
  }, [radioValue, response]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };
  // ========Edit-button---->
  const [openModal, setOpenModal] = useState(false);

  const handleButtonClick = useCallback(
    (row) => {
      setInputValues({
        userName: row.username,
        email: row.email,
        role: row.role,
        limit: row.extensions_limit,
      });
      setRoleId(row?.role_id);
      setSelectedPermissions(row?.feature);
      setOpenModal(true);
      setStatus(row.status.toString());
      setUId(row.user_id);
      if (row?.service_type !== undefined && row?.service_type !== null) {
        let array = row?.service_type?.split(",");
        setService(array);
      } else {
        setService([]);
      }
      setExtension(row.extension);
      if (row.attempts <= 3) {
        setAttempts(4);
      } else {
        setAttempts(0);
      }
      setPassword(row.password);
      setReseller(row.reseller_id);
      setRenewal(row.account_renewal);
    },
    [setService]
  ); // Memoize event handler

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setInputValues({ userName: "", email: "", role: "", limit: "" });
    setService([]);
    setStatus("");
    setRenewal(0);
    setUId("");
    setRoleId("");
    setExtension("");
    setShowPassword(false);
    setReseller("");
    setSelectedPermissions([]);
  }, [
    setInputValues,
    setService,
    setStatus,
    setRenewal,
    setUId,
    setRoleId,
    setExtension,
    setShowPassword,
    setReseller,
    setSelectedPermissions,
  ]);

  // =============Edit-btton-end--->

  const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
    setServiceType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const checkValidation = useCallback(() => {
    let errors = { ...validation };
    let isValid = true;
    //first Name validation
    if (!inputValues.userName) {
      errors.userName = "User name is required";
      isValid = false;
    } else {
      errors.userName = "";
    }

    if (!userActive) {
      errors.status = "Field is required";
      isValid = false;
    } else {
      errors.status = "";
    }
    if (!roleId) {
      errors.role = "Role is required";
      isValid = false;
    } else {
      errors.role = "";
    }

    if (serviceType.length === 0) {
      errors.service = "Service is required";
      isValid = false;
    } else {
      errors.service = "";
    }
    const emailCond = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!inputValues.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!inputValues.email.match(emailCond)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    } else {
      errors.email = "";
    }

    //password validation
    const cond1 = "/^(?=.*[a-z]).{6,20}$/";
    const cond2 = "/^(?=.*[A-Z]).{6,20}$/";
    const cond3 = "/^(?=.*[0-9]).{6,20}$/";
    const password = inputValues.password;
    if (!password) {
      errors.password = "password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be longer than 6 characters";
      isValid = false;
    } else if (password.length >= 20) {
      errors.password = "Password must shorter than 20 characters";
      isValid = false;
    } else {
      errors.password = "";
    }
    //matchPassword validation
    if (!inputValues.confirmPassword) {
      errors.confirmPassword = "Password confirmation is required";
      isValid = false;
    } else if (inputValues.confirmPassword !== inputValues.password) {
      errors.confirmPassword = "Password does not match";
      isValid = false;
    } else {
      errors.confirmPassword = "";
    }

    setValidation(errors);
    return isValid;
  }, [validation, inputValues, userActive]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const isValid = checkValidation();
      if (isValid) {
        const request = {
          username: inputValues?.userName,
          emailid: inputValues?.email,
          password: inputValues?.password,
          role_id: roleId,
          is_active: userActive,
          reseller_id: reseller,
          feature: selectedPermissions,
        };
        dispatch(register(request, setOpen, setInputValues, setResponse));
      }
    },
    [
      checkValidation,
      inputValues,
      setOpen,
      setInputValues,
      setResponse,
      roleId,
      userActive,
      reseller,
      extension,
      selectedPermissions,
    ]
  ); // Memoize event handler
  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault();
      const request = {
        user_id: uId,
        username: inputValues?.userName,
        emailid: inputValues?.email,
        role_id: roleId,
        is_active: status.charAt(0),
        attempts: attempts,
        password: password,
        reseller_id: reseller,
        feature: selectedPermissions,
      };
      dispatch(updateUser(request, setOpenModal, setResponse));
    },
    [
      inputValues,
      roleId,
      service,
      status,
      uId,
      extension,
      password,
      reseller,
      selectedPermissions,
      renewal,
      setOpenModal,
      setInputValues,
      setService,
      setStatus,
      setUId,
      setResponse,
    ]
  );

  const handleMessage = useCallback((data) => {
    setName(data);
    setAlertMessage(true);
  }, []); // Memoize event handler

  const handleDelete = useCallback(() => {
    dispatch(deleteUser({ username: name }, setResponse));
    setAlertMessage(false);
  }, [dispatch, name, setResponse]); // Memoize event handler

  const handleView = (data) => {
    navigate(Router.ADMIN_VIEW, { state: { data: data } });
  };

  const classes = useStyles();

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

  const handleLogin = (data) => {
    const value = JSON.stringify({
      username: data.username,
      password: data.password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: value,
    };

    axios
      .request(config)
      .then((response) => {
        const values = response?.data;
        if (values?.status === 200) {
          if (values.user_role === "Superadmin") {
            localStorage.setItem("admin", JSON.stringify(values));
            window.open("/admin_portal");
          } else if (values.user_role === "Admin") {
            localStorage.setItem("admin", JSON.stringify(values));
            window.open("/admin_portal");
          } else if (values.user_role === "Reseller") {
            localStorage.setItem("reseller", JSON.stringify(values));
            window.open("/reseller_portal");
          } else if (values.user_role === "User") {
            localStorage.setItem(
              `user_${values.user_name}`,
              JSON.stringify(values)
            );
            localStorage.setItem("current_user", values.user_name);
            window.open("/redirect_portal");
          } else if (values.user_role === "Client") {
            localStorage.setItem("user", JSON.stringify(values));
            navigate("/redirect_portal");
          }

          dispatch(login(values));
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = [
    {
      field: "login",
      headerName: "User Login",
      width: isXs ? 80 : 80,
      minWidth: 80,
      maxWidth: 80,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      valueGetter: (params) => params.row.login || "", // Ensures value is fetched
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          User Login
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div>
            <Button
              sx={{
                ":hover": {
                  bgcolor: "warning.main",
                  color: "white",
                },
                padding: isMobile ? "0" : "2px",
                py: isMobile ? 1 : 0,
                textTransform: "capitalize",
                fontSize: "calc(0.6rem + 0.2vw)",
                color: "warning.main",
                borderColor: "info.main",
                border: "1px solid #ed6c02",
              }}
              onClick={() => handleLogin(params.row)}
            >
              Login
            </Button>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      sortable: false,
      disableColumnMenu: true,
      width: isXs ? 55 : 65,
      minWidth: 55,
      maxWidth: 65,
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          Action
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {user.user_role === "Reseller" ? (
              <>
                {" "}
                <Tooltip title="Edit" disableInteractive interactive>
                  <IconButton onClick={() => handleButtonClick(params.row)}>
                    <Edit
                      index={params.row.id}
                      style={{
                        cursor: "pointer",
                        color: "#42765f",
                        fontSize: isMobile ? "20px" : "25x",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Edit" disableInteractive interactive>
                  <IconButton onClick={() => handleButtonClick(params.row)}>
                    <Edit
                      index={params.row.id}
                      style={{
                        cursor: "pointer",
                        color: "#42765f",
                        fontSize: isMobile ? "20px" : "35x",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>
        );
      },
    },
    {
      field: "username",
      headerName: "User Name",
      width: isXs ? 140 : 150,
      minWidth: 140,
      maxWidth: 150,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          {isSmallScreen ? "Name" : "User Name"}
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className=" user_bdr d-flex justify-content-between align-items-center">
            <Tooltip title="View" disableInteractive interactive>
              <Box
                className="user_img"
                onClick={() => handleView(params.row.user_id)}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: "calc(0.6rem + 0.2vw)" }}
                >
                  <IconBase
                    style={{
                      fontSize: "20px",
                      color: "#f5751d",
                      marginRight: "5px",
                    }}
                  >
                    <PersonIcon />
                  </IconBase>
                  {params.row.username}
                </Typography>
              </Box>
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: "did_count",
      headerName: "No. of DID",
      width: isXs ? 45 : 60,
      minWidth: 45,
      maxWidth: 60,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          {isSmallScreen ? "DID" : "DID"}
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
    // {
    //   field: "subscriber_count",
    //   headerName: "No. of Extension",
    //   width: 150,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "reseller_id",
      headerName: "Reseller",
      width: isXs ? 65 : 70,
      minWidth: 65,
      maxWidth: 70,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          Reseller
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className=" user_bdr d-flex justify-content-between align-items-center">
            {state?.allUsers?.users?.map((name, index) => {
              if (name?.role === "Reseller") {
                return (
                  <span
                    key={index}
                    style={{
                      textTransform: "capitalize",
                      fontSize: "calc(0.6rem + 0.2vw)",
                    }}
                  >
                    {name.id === params.row.reseller_id ? (
                      <>{name.username}</>
                    ) : (
                      <></>
                    )}
                  </span>
                );
              }
            })}
          </div>
        );
      },
    },

    {
      field: "email",
      headerName: "Email",
      width: isXs ? 170 : 200,
      minWidth: 170,
      maxWidth: 200,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          Email
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
      field: "role",
      headerName: "Role",
      width: isXs ? 80 : 100,
      minWidth: 80,
      maxWidth: 100,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          Role
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.role === "Superadmin" ? (
              <>
                <div
                  className="role_box"
                  style={{
                    color: "black",
                    background: "white",
                    padding: isMobile ? "5px" : "7px",
                    borderRadius: "5px",
                    fontSize: "calc(0.6rem + 0.2vw)",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.role}
                </div>
              </>
            ) : (
              <></>
            )}
            {params.row.role === "Admin" ? (
              <>
                <div
                  className="role_box"
                  style={{
                    color: "black",
                    background: "#D6D8DB",
                    padding: isMobile ? "5px" : "7px",
                    borderRadius: "5px",
                    fontSize: "calc(0.6rem + 0.2vw)",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.role}
                </div>
              </>
            ) : (
              <></>
            )}
            {params.row.role === "Reseller" ? (
              <>
                <div
                  className="role_box"
                  style={{
                    color: "black",
                    background: "#C3E6CB",
                    padding: isMobile ? "5px" : "7px",
                    borderRadius: "5px",
                    fontSize: "calc(0.6rem + 0.2vw)",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.role}
                </div>
              </>
            ) : (
              <></>
            )}
            {params.row.role === "User" ? (
              <>
                <div
                  className="role_box"
                  style={{
                    color: "black",
                    background: "#B8DAFF",
                    padding: isMobile ? "5px" : "7px",
                    borderRadius: "5px",
                    fontSize: "calc(0.6rem + 0.2vw)",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.role}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "created_date",
      headerName: "Date",
      headerClassName: "custom-header",
      width: isXs ? 75 : 80,
      minWidth: 75,
      maxWidth: 80,
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          Date
        </Typography>
      ),
      renderCell: (params) => {
        if (params.value !== null) {
          const date = new Date(params.value);
          var day = date.getUTCDate();
          var month = date.getUTCMonth() + 1; // Month starts from 0
          var year = date.getUTCFullYear();

          // Formatting single-digit day/month with leading zero if needed
          day = (day < 10 ? "0" : "") + day;
          month = (month < 10 ? "0" : "") + month;
          return (
            <>
              <span style={{ color: "blue", fontSize: "calc(0.6rem + 0.2vw)" }}>
                {day}/{month}/{year}
              </span>
            </>
          );
        }
      },
    },

    {
      field: "attempts",
      headerName: "Account",
      headerClassName: "custom-header",
      width: isXs ? 75 : 80,
      minWidth: 75,
      maxWidth: 80,
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          Account
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.attempts >= 3 ? (
              <>
                <div
                  style={{
                    // color: "white",
                    color: "red",
                    padding: isMobile ? "4px" : "7px",
                    borderRadius: "5px",
                    fontSize: "calc(0.6rem + 0.2vw)",
                    textTransform: "capitalize",
                  }}
                >
                  Locked
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "green",
                    padding: isMobile ? "4px" : "7px",
                    borderRadius: "5px",
                    fontSize: "calc(0.6rem + 0.2vw)",
                    textTransform: "capitalize",
                  }}
                >
                  Unlocked
                </div>
              </>
            )}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: isXs ? 100 : 100,
      minWidth: 70,
      maxWidth: 100,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          Status
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.status === "t" ? (
              <>
                <div
                  style={{
                    color: "white",
                    background: "green",
                    padding: isMobile ? "5px" : "7px",
                    borderRadius: "5px",
                    fontSize: "calc(0.6rem + 0.2vw)",
                    textTransform: "capitalize",
                    textAlign: "center",
                  }}
                >
                  active
                </div>
              </>
            ) : params.row.status === "s" ? (
              <>
                <div
                  style={{
                    color: "black",
                    background: "yellow",
                    padding: isMobile ? "5px" : "7px",
                    borderRadius: "5px",
                    fontSize: "calc(0.6rem + 0.2vw)",
                    textTransform: "capitalize",
                  }}
                >
                  Suspend
                </div>
              </>
            ) : params.row.status === "r" ? (
              <>
                <div
                  style={{
                    color: "black",
                    background: "rgba(8, 206, 8, 0.74)",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  Renewal
                </div>
              </>
            ) : params.row.status === "n" ? (
              <>
                <div
                  style={{
                    color: "black",
                    background: "rgba(255, 0, 0, 0.47)",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  Not Renewal
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "white",
                    background: "red",
                    padding: isMobile ? "5px" : "7px",
                    borderRadius: "5px",
                    fontSize: "calc(0.6rem + 0.2vw)",
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
    {
      field: "status_changed_by",
      headerName: "Changed By",
      width: isXs ? 150 : 160,
      minWidth: 150,
      maxWidth: 160,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          Changed By
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {state?.roles?.users?.map((name, index) => {
              return (
                <div key={index}>
                  {name.id === params.row.status_role_id ? (
                    <>
                      <span style={{ fontSize: "calc(0.6rem + 0.2vw)" }}>
                        {params.row.status_changed_by}({name.name})
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (uId !== "") {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/getuserextensions?user_id=${uId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setExtensionNumber(response?.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [uId]);

  useEffect(() => {
    // Display error toast only if an error occurred and it hasn't been displayed yet
    if (state?.allUsers?.error) {
      toast.error(state.allUsers.error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      // Dispatch action to reset state
      dispatch({ type: ALL_USERS_RESET });
    }

    // Navigate to login page after state reset and error toast display
    if (state?.allUsers?.error && state?.allUsers?.users.length === 0) {
      //   localStorage.removeItem("theme-color");
      //   localStorage.removeItem("admin");
      //  // Immediate redirect to login page
      //  window.location.replace("/login");
    }
  }, [state?.allUsers?.error, state?.allUsers?.users.length, dispatch]);

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.allUsers?.users &&
      state?.allUsers?.users?.forEach((item, index) => {
        const createdDate = new Date(item.created_date).toISOString();
        calculatedRows.push({
          id: index + 1,
          user_id: item.id,
          email: item.email,
          service_type: item.service_type,
          name: item.name,
          phone: item.phone,
          cc: item.cc,
          role: item.role,
          role_id: item.role_id,
          status: item.is_active,
          username: item.username,
          password: item.password,
          created_date: createdDate,
          extensions_limit: item.extensions_limit,
          extension: item.extension,
          attempts: item.attempts,
          reseller_id: item.reseller_id,
          status_changed_by: item.status_changed_by,
          status_role_id: item.status_role_id,
          did_count: item.did_count,
          subscriber_count: item.subscriber_count,
          feature: item.feature,
          account_renewal: item.account_renewal,
        });
      });
    return calculatedRows;
  }, [state?.allUsers?.users]);

  const selectedCallerDataSet = new Set(); // Using Set to avoid duplicates

  selectedRows.forEach((id) => {
    const selectedRow = rows.find((row) => row.id === id);
    if (selectedRow) {
      selectedCallerDataSet.add(selectedRow.user_id); // Add only did_id
    }
  });

  const selectedCallerData = Array.from(selectedCallerDataSet); // Convert to comma-separated string

  const handleUpdateStatus = useCallback(() => {
    const request = {
      id: selectedCallerData,
      is_active: value
    };
    dispatch(updateUserStaus(request, setResponse));
  }, [selectedCallerData, value, dispatch, setResponse]); // Memoize event handler

  // const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  //   "& .highlighted-renewal": {
  //     backgroundColor: "rgba(0, 255, 0, 0.2) !important", // Blue for renewal
  //   },
  //   "& .highlighted-not-renewal": {
  //     backgroundColor: "rgba(255, 0, 0, 0.2) !important", // Gray for not renewal
  //   },
  // }));

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
            <Dialog
              open={openModal}
              onClose={handleCloseModal}
              sx={{ textAlign: "center", borderRadius: "10px" }}
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
                sx={{ color: "#133325", fontWeight: "600", width: "500px" }}
              >
                <Box>
                  {" "}
                  <img src="/img/mdl_icon.png" alt="user icon" />
                </Box>
                User Edit
              </DialogTitle>

              <DialogContent>
                <form>
                  {/* <SelectComponent handleClose={handleClose} /> */}
                  <Typography variant="body1">
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
                        label="User Name"
                        variant="outlined"
                        name="userName"
                        value={inputValues?.userName}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <br />
                      <TextField
                        style={{
                          width: "100%",
                          margin: " 5px 0 5px 0",
                        }}
                        type="text"
                        label="Email Id"
                        variant="outlined"
                        name="email"
                        value={inputValues?.email}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <br />

                      <TextField
                        style={{
                          width: "100%",
                          margin: " 5px 0 5px 0",
                        }}
                        type={showPassword ? "text" : "password"}
                        label="Change Password"
                        variant="outlined"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{ cursor: "pointer" }}
                              onClick={handlePasswordVisibility}
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />

                      {user.user_role === "Reseller" ? (
                        <>
                          <FormControl
                            fullWidth
                            style={{ width: "100%", margin: "7px 0" }}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Role
                            </InputLabel>

                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Role"
                              helperText="Select the language."
                              style={{ textAlign: "left" }}
                              defaultValue={roleId}
                              onChange={(e) => {
                                setRoleId(e.target.value);
                              }}
                              disabled={true}
                            >
                              {state?.roles?.users?.map((item, index) => {
                                return (
                                  <MenuItem key={index} value={item?.id}>
                                    <label
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {item?.name.toString().toLowerCase()}
                                    </label>
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </>
                      ) : (
                        <>
                          <FormControl
                            fullWidth
                            style={{ width: "100%", margin: "7px 0" }}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Role
                            </InputLabel>

                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Role"
                              helperText="Select the language."
                              style={{ textAlign: "left" }}
                              defaultValue={roleId}
                              onChange={(e) => {
                                setRoleId(e.target.value);
                              }}
                            >
                              {state?.roles?.users?.map((item, index) => {
                                return (
                                  <MenuItem key={index} value={item?.id}>
                                    <label
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {item?.name.toString().toLowerCase()}
                                    </label>
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </>
                      )}
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
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                        >
                          <MenuItem value={"t"}>Active</MenuItem>
                          <MenuItem value={"f"}>Deactive</MenuItem>
                          <MenuItem value={"s"}>Suspend</MenuItem>
                          <MenuItem value={"r"}>Renewal</MenuItem>
                          <MenuItem value={"n"}>Not renewal</MenuItem>
                        </Select>
                      </FormControl>
                      <br />
                      {user.user_role === "Reseller" ? (
                        <></>
                      ) : (
                        <>
                          {" "}
                          <FormControl
                            style={{
                              width: "100%",
                              margin: " 5px 0 5px 0",
                            }}
                          >
                            <InputLabel id="demo-multiple-checkbox-label">
                              Account
                            </InputLabel>
                            <Select
                              style={{ textAlign: "left" }}
                              labelId="demo-multiple-checkbox-label"
                              label="Extension"
                              id="demo-multiple-checkbox"
                              value={attempts}
                              onChange={(e) => {
                                setAttempts(e.target.value);
                              }}
                              MenuProps={MenuProps}
                            >
                              <MenuItem value={4}>Unlocked</MenuItem>
                              <MenuItem value={0}>Locked</MenuItem>
                            </Select>
                          </FormControl>
                        </>
                      )}
                      <br />
                      {user.user_role === "Reseller" ? (
                        <></>
                      ) : (
                        <>
                          <FormControl
                            style={{
                              width: "100%",
                              margin: " 5px 0 5px 0",
                            }}
                          >
                            <InputLabel id="demo-multiple-checkbox-label">
                              Reseller
                            </InputLabel>
                            <Select
                              style={{ textAlign: "left" }}
                              labelId="demo-multiple-checkbox-label"
                              label="Reseller"
                              id="demo-multiple-checkbox"
                              fullWidth
                              value={reseller}
                              onChange={(e) => {
                                setReseller(e.target.value);
                              }}
                            >
                              {state?.allUsers?.users?.map((name, index) => {
                                if (name?.role === "Reseller") {
                                  return (
                                    <MenuItem key={index} value={name?.id}>
                                      {name.username}
                                    </MenuItem>
                                  );
                                }
                              })}
                            </Select>
                          </FormControl>
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
                sx={{ color: "#07285d", fontWeight: "600" }}
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
                            User
                          </h3>

                          {/* <p>Add, edit, delete, and search users.</p> */}
                        </div>
                        {/*====================== Add-Button ============================ */}
                        {user.user_role === "Reseller" ? (
                          <>
                            <IconButton
                              className="all_button_clr"
                              onClick={handleOpen}
                            >
                              Add <AddOutlinedIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton
                              className="all_button_clr"
                              sx={{
                                fontSize: "15px",
                                borderRadius: "5px",
                                border: "none",
                                color: "#fff",
                                px: 4,
                                textTransform: "capitalize",
                                height: "35px",
                                width: "90px",
                                minWidth: "90px",
                                flexShrink: 0,
                                display: "inline-flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                position: "relative",
                                right: "-15px",
                              }}
                              onClick={handleOpen}
                            >
                              Add <AddOutlinedIcon />
                            </IconButton>
                          </>
                        )}

                        {/* -----   Add User Modal Start   ----- */}

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
                            <Box>
                              {" "}
                              <img src="/img/mdl_icon.png" alt="user icon" />
                            </Box>
                            Add User
                          </DialogTitle>

                          <DialogContent>
                            <form>
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
                                  label="User Name"
                                  variant="outlined"
                                  name="userName"
                                  value={inputValues?.userName}
                                  onChange={handleChange}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <AccountCircle />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {validation.userName && (
                                  <p
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      textAlign: "left",
                                    }}
                                  >
                                    {validation.userName}
                                  </p>
                                )}
                                <br />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Email Id"
                                  variant="outlined"
                                  name="email"
                                  value={inputValues?.email}
                                  onChange={handleChange}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <MailIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {validation.email && (
                                  <p
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      textAlign: "left",
                                    }}
                                  >
                                    {validation.email}
                                  </p>
                                )}
                                <br />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="password"
                                  label="Password"
                                  variant="outlined"
                                  name="password"
                                  value={inputValues?.password}
                                  onChange={handleChange}
                                />
                                {validation.password && (
                                  <p
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      textAlign: "left",
                                    }}
                                  >
                                    {validation.password}
                                  </p>
                                )}
                                <br />

                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="password"
                                  label="Confirm Password"
                                  variant="outlined"
                                  name="confirmPassword"
                                  value={inputValues?.confirmPassword}
                                  onChange={handleChange}
                                />
                                {validation.confirmPassword && (
                                  <p
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      textAlign: "left",
                                    }}
                                  >
                                    {validation.confirmPassword}
                                  </p>
                                )}
                                <br />
                                {user.user_role === "Reseller" ? (
                                  <></>
                                ) : (
                                  <>
                                    <FormControl
                                      fullWidth
                                      style={{
                                        width: "100%",
                                        margin: "7px 0",
                                      }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Role
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Role"
                                        helperText="Select the language."
                                        style={{ textAlign: "left" }}
                                        value={roleId}
                                        onChange={(e) => {
                                          setRoleId(e.target.value);
                                        }}
                                        required
                                      >
                                        {state?.roles?.users?.map(
                                          (item, index) => {
                                            // Filter out "Superadmin" role if the logged-in user is also a "Superadmin"
                                            if (
                                              user.user_role === "Superadmin" &&
                                              item.name === "Superadmin"
                                            ) {
                                              return null; // Skip rendering this MenuItem
                                            } else if (
                                              user.user_role === "Admin" &&
                                              (item.name === "Superadmin" ||
                                                item.name === "Admin")
                                            ) {
                                              return null;
                                            } else if (
                                              user.user_role === "Reseller" &&
                                              (item.name === "Reseller" ||
                                                item.name === "Superadmin" ||
                                                item.name === "Admin")
                                            ) {
                                              return null;
                                            } else {
                                              // Render other roles
                                              return (
                                                <MenuItem
                                                  key={index}
                                                  value={item?.id}
                                                >
                                                  <label
                                                    style={{
                                                      margin: "0px",
                                                      padding: "0px",
                                                      textTransform:
                                                        "capitalize",
                                                    }}
                                                  >
                                                    {item?.name
                                                      .toString()
                                                      .toLowerCase()}
                                                  </label>
                                                </MenuItem>
                                              );
                                            }
                                          }
                                        )}
                                      </Select>
                                    </FormControl>

                                    {validation.role && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.role}
                                      </p>
                                    )}

                                    <br />
                                  </>
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
                                    value={userActive}
                                    onChange={(e) => {
                                      setUserActive(e.target.value);
                                    }}
                                  >
                                    <MenuItem value={"t"}>Active</MenuItem>
                                    <MenuItem value={"f"}>Deactive</MenuItem>
                                    <MenuItem value={"s"}>Suspend</MenuItem>
                                    <MenuItem value={"r"}>Renewal</MenuItem>
                                    <MenuItem value={"n"}>Not renewal</MenuItem>
                                  </Select>
                                </FormControl>
                                {validation.status && (
                                  <p
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      textAlign: "left",
                                    }}
                                  >
                                    {validation.status}
                                  </p>
                                )}
                                <br />
                                {roleId === 4 ? (
                                  <>
                                    <FormControl
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                    >
                                      <InputLabel id="demo-multiple-checkbox-label">
                                        Reseller
                                      </InputLabel>
                                      <Select
                                        style={{ textAlign: "left" }}
                                        labelId="demo-multiple-checkbox-label"
                                        label="Reseller"
                                        id="demo-multiple-checkbox"
                                        fullWidth
                                        value={reseller}
                                        onChange={(e) => {
                                          setReseller(e.target.value);
                                        }}
                                      >
                                        {state?.allUsers?.users?.map(
                                          (name, index) => {
                                            if (name?.role === "Reseller") {
                                              return (
                                                <MenuItem
                                                  key={index}
                                                  value={name?.id}
                                                >
                                                  {name.username}
                                                </MenuItem>
                                              );
                                            }
                                          }
                                        )}
                                      </Select>
                                    </FormControl>
                                  </>
                                ) : (
                                  <></>
                                )}
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
                              //className="all_button_clr"
                              color="primary"
                              sx={{
                                fontSize: "16px !impotant",
                                background:
                                  "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
                                // marginTop: "20px",
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

                                marginLeft: "10px !important",
                                padding: "10px 20px !important",
                                textTransform: "capitalize !important",
                              }}
                              onClick={handleSubmit}
                            >
                              save
                            </Button>
                          </DialogActions>
                        </Dialog>

                        {/* -----   Add User Modal End   ----- */}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <FormControl>
                    {/* <FormLabel id="demo-row-radio-buttons-group-label">Live Calls</FormLabel> */}
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={radioValue} // Bind the selected value to state
                      onChange={(e) => setRadioValue(e.target.value)} // Handle change event
                    >
                      <FormControlLabel
                        value=""
                        control={<Radio />}
                        label="All"
                      />
                      <FormControlLabel
                        value="t"
                        control={<Radio />}
                        label="Active"
                      />
                      <FormControlLabel
                        value="f"
                        control={<Radio />}
                        label="Deactivated"
                      />
                      <FormControlLabel
                        value="s"
                        control={<Radio />}
                        label="Suspended"
                      />
                      <FormControlLabel
                        value={"r"}
                        control={<Radio />}
                        label="Renewal"
                      />
                      <FormControlLabel
                        value={"n"}
                        control={<Radio />}
                        label="Not Renewal"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <Grid container>
                  <Grid xs={12} sm={12} md={4}>
                    <Box sx={{ display: selectedRows[0] ? "block" : "none" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ flexGrow: 1, mr: 2 }}>
                          <Select
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            fullWidth
                            sx={{
                              mb: 1,
                              height: "35px", // Match button height
                            }}
                          >
                            <MenuItem value="t">Active</MenuItem>
                            <MenuItem value="f">Deactivated</MenuItem>
                            <MenuItem value="s">Suspended</MenuItem>
                            <MenuItem value="r">Renewal</MenuItem>
                            <MenuItem value="n">Not Renewal</MenuItem>
                          </Select>
                        </Box>

                        <Box>
                          <IconButton
                            className="all_button_clr"
                            sx={{
                              position: "relative",
                              top: "-5px",
                              fontSize: "15px",
                              borderRadius: "5px",
                              color: "#fff",
                              px: 4,
                              textTransform: "capitalize",
                              height: "35px",
                              width: "90px",
                              minWidth: "90px",
                              display: "inline-flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "primary.main", // Add proper color
                              "&:hover": {
                                backgroundColor: "primary.dark", // Add hover effect
                              },
                            }}
                            onClick={handleUpdateStatus}
                          >
                            Submit
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                {state?.allUsers?.loading === true ? (
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
                          rows={rows}
                          columns={columns}
                          density="compact"
                          checkboxSelection
                          disableRowSelectionOnClick
                          rowSelectionModel={selectedRows}
                          onRowSelectionModelChange={handleSelectionChange}
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

            {/* ========== */}
          </Box>
        </div>
      </div>
    </>
  );
}

export default User;
