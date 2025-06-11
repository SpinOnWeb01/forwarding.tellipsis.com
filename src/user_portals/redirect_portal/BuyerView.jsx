import React, { useCallback, useEffect, useState } from "react";
import "../../../src/style.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Chip from "@mui/material/Chip";
import {
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
  Stack,
  TextField,
  Tooltip,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  Edit,
  Close,
  Visibility,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createRedirectBuyer,
  deleteRedirectBuyer,
  getRedirectBuyer,
  updateRedirectBuyer,
} from "../../redux/actions/redirectPortal/redirectPortal_buyerAction";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { ThemeProvider } from "@mui/styles";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { api } from "../../mockData";
import { toast } from "react-toastify";
import { StyledDataGrid } from "../../pages/CustomDataGrid";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

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
// ---------------><-----------------

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 43,
  height: 25,
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
    width: 21,
    height: 21,
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
        density: "standard", // Set default density to standard
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
const InitialValues = {
  buyerId: "",
  buyerName: "",
  status: "",
  forwardNumber: "",
  cc: "",
  weightage: "",
  dailyLimit: "",
  redirectId: "",
  fromDate: null,
  toDate: null,
  followWorkTime: false,
  ringTimeout: 60,
};

const staticNumbers = Array.from(
  { length: 100 },
  (_, i) => `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`
);

function BuyerView({ userThem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [campaignNumbers, setCampaignNumbers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [buyerData, setBuyerData] = useState(InitialValues);
  const [errors, setErrors] = useState({
    buyerName: "",
    forwardNumber: "",
  });
  const [borderColor, setBorderColor] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState("");

  // --------------Columns Data Condition For Mobile View and Desktop View---------------------
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // < 600px
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // 600px - 900px
  const isMd = useMediaQuery(theme.breakpoints.only("md")); // 900px - 1200px
  const isSmallScreen = useMediaQuery(theme.breakpoints.between("sm"));

  const handleSwitchChange = (event) => {
    setIsSwitchChecked(event.target.checked);
  };

  const handleAddBuyerOpen = () => setOpen(true);
  const handleAddBuyerClose = () => {
    setOpen(false);
    setBuyerData({
      buyerId: "",
      buyerName: "",
      status: "",
      forwardNumber: "",
      cc: "",
      weightage: "",
      dailyLimit: "",
      redirectId: "",
      fromDate: null,
      toDate: null,
      followWorkTime: false,
      ringTimeout: 60,
    });
    setErrors({ buyerName: "", forwardNumber: "" }); // Reset error when switching users
    setBorderColor(""); // Reset border color when switching users
  };

  const handleAlertClose = () => {
    setAlertMessage(false);
  };

  const handleEditrOpen = () => setEdit(true);
  const handleEditClose = () => {
    setEdit(false);
    setBuyerData({
      buyerId: "",
      buyerName: "",
      status: "",
      forwardNumber: "",
      cc: "",
      weightage: "",
      dailyLimit: "",
      redirectId: "",
      fromDate: null,
      toDate: null,
      followWorkTime: false,
      ringTimeout: 60,
    });
    setErrors({ buyerName: "", forwardNumber: "" });
  };

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  const handleEdit = (data) => {
    handleEditrOpen();
    setBuyerData({
      buyerId: data?.buyer_id,
      buyerName: data?.buyer_name,
      status: data?.status,
      forwardNumber: data?.forward_number,
      cc: data?.cc,
      weightage: data?.weightage,
      dailyLimit: data?.daily_limit,
      redirectId: data?.redirect_group_id,
      fromDate: data.working_start_time,
      toDate: data.working_end_time,
      followWorkTime: data.follow_working_time === false ? "f" : "t",
      ringTimeout: data.ring_timeout,
    });
    setErrors({ buyerName: "", forwardNumber: "" });
    setBorderColor(""); // Reset border color when switching users
  };

  const checkValidation = useCallback(() => {
    let isValid = true;
    const { buyerName, forwardNumber } = buyerData;
    const newErrors = {
      buyerName: "",
      forwardNumber: "",
    };

    // Forward Number validations
    if (!/\d/.test(forwardNumber)) {
      newErrors.forwardNumber = "Forward Number must include numbers (0-9)";
      isValid = false;
    } else if (forwardNumber.length < 11 || forwardNumber.length > 11) {
      newErrors.forwardNumber = "Forward Number should be 11 digits";
      isValid = false;
    } else if (/\s/.test(forwardNumber)) {
      newErrors.forwardNumber = "Forward Number cannot contain spaces";
      isValid = false;
    }

    // Buyer Name validations
    if (buyerName.length < 3) {
      newErrors.buyerName = "Buyer Name must be at least 3 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [buyerData]);

  const handleFromDateChange = (date) => {
    if (dayjs(date, "HH:mm", true).isValid()) {
      setBuyerData((prevData) => ({
        ...prevData,
        fromDate: dayjs(date).format("HH:mm"),
      }));
    } else {
      setBuyerData((prevData) => ({
        ...prevData,
        fromDate: null,
      }));
    }
  };

  const handleToDateChange = (date) => {
    if (dayjs(date, "HH:mm", true).isValid()) {
      setBuyerData((prevData) => ({
        ...prevData,
        toDate: dayjs(date).format("HH:mm"),
      }));
    } else {
      setBuyerData((prevData) => ({
        ...prevData,
        toDate: null,
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBuyerData((prevData) => ({
      ...prevData,
      [name]: name === "forwardNumber" ? value.trim() : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid) {
      let data = JSON.stringify({
        redirect_group_id: location.state.data.campaignId,
        buyer_name: buyerData.buyerName,
        forward_number: buyerData.forwardNumber,
        cc: buyerData.cc,
        weightage: buyerData.weightage,
        daily_limit: buyerData.dailyLimit,
        working_start_time: buyerData.fromDate,
        working_end_time: buyerData.toDate,
        follow_working_time: buyerData.followWorkTime === false ? "f" : "t",
        ring_timeout: JSON.parse(buyerData.ringTimeout),
      });
      dispatch(createRedirectBuyer(data, setResponse, handleAddBuyerClose));
    }
  };

  const handleMessage = useCallback(
    (data) => {
      setBuyerData((prevData) => ({
        ...prevData,
        buyerName: data?.buyer_name,
        buyerId: data?.buyer_id,
      }));
      setAlertMessage(true);
    },
    [setBuyerData]
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid) {
      let data = JSON.stringify({
        id: buyerData.buyerId,
        redirect_group_id: buyerData.redirectId,
        buyer_name: buyerData.buyerName,
        cc: buyerData.cc,
        daily_limit: buyerData.dailyLimit,
        forward_number: buyerData.forwardNumber,
        status: buyerData.status,
        weightage: buyerData.weightage,
        working_start_time: buyerData.fromDate,
        working_end_time: buyerData.toDate,
        follow_working_time: buyerData.followWorkTime,
        ring_timeout: JSON.parse(buyerData.ringTimeout),
      });
      dispatch(updateRedirectBuyer(data, handleEditClose, setResponse));
    }
  };

  useEffect(() => {
    dispatch(getRedirectBuyer(location.state.data.campaignId));
  }, [location.state.data.campaignId, response]);

  useEffect(() => {
    const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      axios
        .get(
          `${api.dev}/api/getdidfromgroup?group_id=${location.state.data.campaignId}`,
          config
        )
        .then((res) => {
          setCampaignNumbers(res?.data?.data);
        });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
    }
  }, []);

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
      dispatch(updateRedirectBuyer(data, setResponse));
    }
  };

  // --------Campaigns number Dialog handls------------------

  const openNumbersDialog = () => {
    setIsDialogOpen(true);
  };

  const closeNumbersDialog = () => {
    setIsDialogOpen(false);
    setSearchTerm("");
  };

  const copyToClipboard = (number) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setSnackbarOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredNumbers = campaignNumbers.filter((number) =>
    number.toLowerCase().includes(searchTerm)
  );

  // Calculate dialog dimensions based on content
  const tableMaxHeight = filteredNumbers.length > 10 ? "60vh" : "auto";

  // ------------All Columns Data------------------------------
  const allColumns = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: isXs ? 70 : isSm ? 70 : isMd ? 80 : 80,
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Action
        </Typography>
      ),
      renderCell: (params) => (
        <div className="d-flex justify-content-around align-items-center">
          <Tooltip title="Edit" disableInteractive interactive>
            <IconButton onClick={() => handleEdit(params.row)}>
              <Edit
                index={params.row.id}
                sx={{
                  cursor: "pointer",
                  color: "#42765f",
                  fontSize: "calc(0.8rem + 0.8vw)",
                }}
              />
            </IconButton>
          </Tooltip>
          {params.row.status === true ? (
            <Tooltip title="Deactive" disableInteractive interactive>
              <IconButton onClick={() => handleTrigger(params.row)}>
                <PauseIcon
                  sx={{
                    cursor: "pointer",
                    color: "#254336",
                    fontSize: "calc(0.8rem + 0.8vw)",
                  }}
                />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Active" disableInteractive interactive>
              <IconButton onClick={() => handleTrigger(params.row)}>
                <PlayArrowIcon
                  sx={{
                    cursor: "pointer",
                    color: "#ff7d00",
                    fontSize: "calc(0.8rem + 0.8vw)",
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      field: "buyer_name",
      headerName: "Buyer Name",
      headerClassName: "custom-header",
      headerAlign: "start",
      width: isXs ? 120 : isSm ? 100 : isMd ? 170 : 170,
      align: "start",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Buyer Name
        </Typography>
      ),
      renderCell: (params) => {
        const formattedDate = dayjs(params.row.created_at).format(
          "DD MMM, YYYY"
        );
        return (
          <p
            style={{
              margin: "0",
              lineHeight: "20px",
              fontSize: "calc(0.7rem + 0.2vw)",
              position: "relative",
              top: 3,
            }}
          >
            {params.row.buyer_name}
            <br />
            <i
              style={{
                margin: "0",
                fontSize: "calc(0.5rem + 0.2vw)",
                position: "relative",
                top: -6,
              }}
            >
              <b>Created: {formattedDate}</b>
            </i>
          </p>
        );
      },
    },
    {
      field: "forward_number",
      headerName: "Forward Number",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: isXs ? 90 : isSm ? 90 : isMd ? 130 : 130,
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Forward Number
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <span
            style={{ fontWeight: "bold", fontSize: "calc(0.5rem + 0.25vw)" }}
          >
            {params.row.forward_number}
          </span>
        );
      },
    },
    {
      field: "cc",
      headerName: "CC Limit",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: isXs ? 60 : isSm ? 60 : isMd ? 100 : 100,
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          CC Limit
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.25vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "current_cc",
      headerName: "Live Calls",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: isXs ? 60 : isSm ? 60 : isMd ? 100 : 100,
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Live Calls
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <span
            style={{ fontWeight: "bold", fontSize: "calc(0.5rem + 0.25vw)" }}
          >
            {params.row.current_cc}
          </span>
        );
      },
    },
    {
      field: "daily_limit",
      headerName: "Daily Calls",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: isXs ? 110 : isSm ? 110 : isMd ? 110 : 110,
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Daily Calls
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <span
            style={{ fontWeight: "bold", fontSize: "calc(0.5rem + 0.25vw)" }}
          >
            {params.row.current_daily_limit}/{params.row.daily_limit}
          </span>
        );
      },
    },
    // {
    //   field: "current_daily_limit",
    //   headerName: "Current Daily Limit",
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   width: 150,
    //   align: "center",
    //   renderCell: (params) => {
    //     return (
    //       <span style={{ fontWeight: "bold" }}>
    //         {params.row.current_daily_limit}
    //       </span>
    //     );
    //   },
    // },
    {
      field: "weightage",
      headerName: "WGT",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 70,
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          WGT
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.5rem + 0.25vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "ring_timeout",
      headerName: "Ring Timeout",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 110,
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Ring Timeout
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.5rem + 0.25vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      width: isXs ? 60 : isSm ? 60 : isMd ? 80 : 80,
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Status
        </Typography>
      ),
      renderCell: (params) => (
        <Tooltip
          title={params.row.status === true ? "Active" : "Deactivated"}
          disableInteractive
          interactive
        >
          <div
            className=""
            style={{
              color: params.row.status === true ? "#254336" : "#ff7d00",
              fontWeight: "bold",
              fontSize: "calc(0.5rem + 0.25vw)",
            }}
          >
            {params.row.status === true ? "Active" : "Deactivated"}
          </div>
        </Tooltip>
      ),
    },
    {
      field: "follow_working_time",
      headerName: "Follow Working Time",
      width: 160,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Follow Working Time
        </Typography>
      ),
      renderCell: (params) => (
        <div
          className=""
          style={{
            color: params.row.follow_working_time === true ? "green" : "red",
          }}
        >
          {params.row.follow_working_time === true ? "Yes" : "No"}
        </div>
      ),
    },
    {
      field: "working_start_time",
      headerName: "Start Time",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 90,
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Start Time
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.5rem + 0.25vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "working_end_time",
      headerName: "End Time",
      width: 90,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sx: { display: { xs: "none", sm: "table-cell" } },
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          End Time
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.5rem + 0.25vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
  ];

  // --------------Only Mobile View Columns Data---------------------
  const mobileColumns = allColumns.filter((col) =>
    [
      "action",
      "buyer_name",
      "forward_number",
      "cc",
      "current_cc",
      "daily_limit",
      "current_daily_limit",
      "status",
    ].includes(col.field)
  );

  // --------------Table Options---------------------
  const columns = isMobile ? mobileColumns : allColumns;

  let totalCC = 0;
  let cc = 0;
  let dailyLimt = 0;
  const mockDataTeam = [];
  state?.getRedirectBuyer?.RedirectBuyer?.data &&
    state?.getRedirectBuyer?.RedirectBuyer?.data?.forEach((item, index) => {
      if (isSwitchChecked ? item.status === true : true) {
        mockDataTeam.push({
          id: index + 1,
          cc: item.cc,
          group_name: item.group_name,
          created_at: item.created_at,
          current_cc: item.current_cc,
          current_daily_limit: item.current_daily_limit,
          daily_limit: item.daily_limit,
          follow_working_time: item.follow_working_time,
          forward_number: item.forward_number,
          buyer_name: item.buyer_name,
          buyer_id: item.id,
          redirect_group_id: item.redirect_group_id,
          status: item.status,
          username: item.username,
          weightage: item.weightage,
          working_end_time: item.working_end_time,
          working_start_time: item.working_start_time,
          ring_timeout: item.ring_timeout,
        });
      }
      totalCC += item.status === true ? item.current_cc : 0;
      cc += item.status === true ? item.cc : 0;
      dailyLimt += item.current_daily_limit;
    });

  const selectedCallerDataSet = new Set(); // Using Set to avoid duplicates

  selectedRows.forEach((id) => {
    const selectedRow = mockDataTeam.find((row) => row.id === id);
    if (selectedRow) {
      selectedCallerDataSet.add(selectedRow.buyer_id); // Add only buyer_id
    }
  });

  const selectedCallerData = Array.from(selectedCallerDataSet); // Convert to comma-separated string

  const handleDelete = useCallback(() => {
    dispatch(
      deleteRedirectBuyer(
        JSON.stringify({ id: selectedCallerData }),
        setResponse
      )
    );
    setAlertMessage(false);
    setSelectedRows([]);
  }, [dispatch, setResponse, setSelectedRows, selectedCallerData]);
  return (
    <>
      <div className={`App ${userThem} `}>
        <div className="contant_box">
          <div className="main">
            <section className="sidebar-sec">
              <div className="container-fluid">
                <div className="row">
                  {/* --------------Main Page Content-------------- */}
                  <div className="col-lg-12">
                    <div className="">
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                        >
                          <div className="tab_cntnt_box">
                            {/* -----------head line and active and all switch----- */}
                            <div
                              className="cntnt_title"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <h3
                                style={{
                                  margin: "0px",
                                  color: "#f5751D",
                                  fontWeight: "500",
                                  fontSize: "2rem",
                                }}
                              >
                                Buyer View
                              </h3>

                              <FormGroup
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginRight: "5px",
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
                                  <Typography
                                    style={{
                                      fontSize: "15px",
                                      fontWeight: 600,
                                    }}
                                  >
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
                                  <Typography
                                    style={{
                                      fontSize: "15px",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Active
                                  </Typography>
                                </Stack>
                              </FormGroup>
                            </div>

                            {/* ------------Campaign Name button and add and Delete button------------- */}
                            <div className="d-xxl-block d-xl-block d-lg-block d-md-block d-sm-block d-block">
                              <div className="d-flex justify-content-between">
                                {/* ------------User Name and Campagin number search box------------------*/}
                                <div>
                                  <p
                                    style={{
                                      fontSize: "calc(0.7rem + 0.6vw)",
                                      color: "#000",
                                    }}
                                  >
                                    <b
                                      className="fnt_bld"
                                      style={{
                                        px: 2,
                                        fontWeight: 500,
                                        fontSize: "calc(0.8rem + 0.6vw)",
                                      }}
                                    >
                                      {" "}
                                      Campaign Name:{" "}
                                    </b>{" "}
                                    {location.state.data.group_name}
                                    <>
                                      {campaignNumbers[0] && (
                                        <>
                                          <Tooltip
                                            title="View Campaign Numbers"
                                            disableInteractive
                                            interactive
                                          >
                                            <IconButton
                                              onClick={openNumbersDialog}
                                              sx={{ m: 1 }}
                                            >
                                              <Visibility
                                                style={{
                                                  cursor: "pointer",
                                                  color: "#f5751D ",
                                                  fontSize: "1.5rem",
                                                }}
                                              />
                                            </IconButton>
                                          </Tooltip>

                                          <Dialog
                                            open={isDialogOpen}
                                            onClose={closeNumbersDialog}
                                            maxWidth={false}
                                            sx={{
                                              "& .MuiDialog-container": {
                                                alignItems: "flex-start", // Align to top
                                                justifyContent: "center", // Center horizontally
                                              },
                                              "& .MuiDialog-paper": {
                                                margin: {
                                                  xs: "8px",
                                                  sm: "20px 0",
                                                },
                                                maxHeight: {
                                                  xs: "94vh",
                                                  sm: "calc(100% - 40px)",
                                                },
                                                width: {
                                                  xs: "96%",
                                                  sm: "auto",
                                                },
                                                minWidth: {
                                                  xs: "96%",
                                                  sm: "500px",
                                                },
                                              },
                                            }}
                                          >
                                            <DialogTitle
                                              sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                height: {
                                                  xs: "50px",
                                                  sm: "60px",
                                                },
                                                p: {
                                                  xs: "8px 16px",
                                                  sm: "16px",
                                                },
                                                position: "sticky",
                                                top: 0,
                                                backgroundColor:
                                                  "background.paper",
                                                zIndex: 1,
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  width: {
                                                    xs: "85%",
                                                    sm: "auto",
                                                  },
                                                }}
                                              >
                                                <TextField
                                                  size="small"
                                                  fullWidth
                                                  variant="outlined"
                                                  placeholder="Search campaign numbers..."
                                                  value={searchTerm}
                                                  onChange={handleSearchChange}
                                                  InputProps={{
                                                    startAdornment: (
                                                      <InputAdornment position="start">
                                                        <SearchIcon fontSize="small" />
                                                      </InputAdornment>
                                                    ),
                                                    endAdornment:
                                                      searchTerm && (
                                                        <InputAdornment position="end">
                                                          <IconButton
                                                            edge="end"
                                                            onClick={
                                                              clearSearch
                                                            }
                                                            size="small"
                                                            sx={{ mr: -1 }}
                                                          >
                                                            <ClearIcon fontSize="small" />
                                                          </IconButton>
                                                        </InputAdornment>
                                                      ),
                                                    sx: {
                                                      fontSize: {
                                                        xs: "0.875rem",
                                                        sm: "1rem",
                                                      },
                                                      height: {
                                                        xs: "36px",
                                                        sm: "40px",
                                                      },
                                                    },
                                                  }}
                                                />
                                              </Box>
                                              <IconButton
                                                // edge="end"
                                                size="small"
                                                onClick={closeNumbersDialog}
                                                aria-label="close"
                                                sx={{
                                                  ml: 1,
                                                  color: (theme) =>
                                                    theme.palette.grey[500],
                                                }}
                                              >
                                                <CloseIcon fontSize="small" />
                                              </IconButton>
                                            </DialogTitle>

                                            <DialogContent
                                              dividers={false}
                                              sx={{
                                                p: 0,
                                                overflow: "hidden",
                                                height: {
                                                  xs: "auto",
                                                  sm: "auto",
                                                },
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  width: "100%",
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  maxHeight: {
                                                    xs: "calc(94vh - 60px)",
                                                    sm: tableMaxHeight,
                                                  },
                                                  overflow: "auto",
                                                }}
                                              >
                                                {filteredNumbers.length > 0 ? (
                                                  <Box
                                                    sx={{
                                                      display: "grid",
                                                      gridTemplateColumns: {
                                                        xs: "repeat(3, 1fr)", // Strict 3 columns on mobile
                                                        sm: "repeat(auto-fill, minmax(120px, 1fr))", // Auto-fill on desktop (min 120px per chip)
                                                      },
                                                      gap: {
                                                        xs: "6px",
                                                        sm: "8px",
                                                      },
                                                      p: {
                                                        xs: "8px",
                                                        sm: "12px",
                                                      },
                                                      width: "100%",
                                                    }}
                                                  >
                                                    {filteredNumbers.map(
                                                      (
                                                        campaignNumber,
                                                        index
                                                      ) => (
                                                        <Chip
                                                          key={index}
                                                          label={campaignNumber}
                                                          onClick={() =>
                                                            copyToClipboard(
                                                              campaignNumber
                                                            )
                                                          }
                                                          sx={{
                                                            borderRadius: 1,
                                                            fontSize: {
                                                              xs: 11,
                                                              sm: "calc(0.5rem + 0.3vw)",
                                                            },
                                                            backgroundColor:
                                                              "bg.secondry",
                                                            cursor: "pointer",
                                                            "&:hover": {
                                                              bgcolor:
                                                                "action.hover",
                                                            },
                                                            // Mobile-specific additions
                                                            minWidth: {
                                                              xs: "100px",
                                                              sm: "120px",
                                                            }, // Fixed minimum width
                                                            width: "100%", // Allows content-based width but respects min/max
                                                            maxWidth: "100%",
                                                            height: "32px", // Fixed height for all sizes
                                                            // Centering
                                                            display: "flex",
                                                            justifyContent:
                                                              "center",
                                                            alignItems:
                                                              "center",
                                                            // Equal padding for all chips
                                                            px: 1,
                                                            // Ensures equal size regardless of content
                                                            ".MuiChip-label": {
                                                              whiteSpace:
                                                                "nowrap",
                                                              overflow:
                                                                "hidden",
                                                              textOverflow:
                                                                "ellipsis",
                                                            },
                                                          }}
                                                          clickable
                                                        />
                                                      )
                                                    )}
                                                  </Box>
                                                ) : (
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                      height: "100px",
                                                    }}
                                                  >
                                                    <Typography
                                                      variant="body1"
                                                      sx={{
                                                        p: 2,
                                                        fontSize: {
                                                          xs: "0.875rem",
                                                          sm: "1rem",
                                                        },
                                                        color: "text.secondary",
                                                      }}
                                                    >
                                                      No matching campaign
                                                      numbers found
                                                    </Typography>
                                                  </Box>
                                                )}
                                              </Box>
                                            </DialogContent>
                                          </Dialog>

                                          <Snackbar
                                            open={snackbarOpen}
                                            autoHideDuration={3000}
                                            onClose={handleSnackbarClose}
                                            anchorOrigin={{
                                              vertical: "bottom",
                                              horizontal: "center",
                                            }}
                                          >
                                            <Alert
                                              onClose={handleSnackbarClose}
                                              severity="success"
                                              sx={{ width: "100%" }}
                                            >
                                              Copied: {copiedNumber}
                                            </Alert>
                                          </Snackbar>
                                        </>
                                      )}
                                    </>
                                  </p>
                                </div>

                                {/*------------Condition Based add and delete button show on mobile and desktop view-------------------- */}
                                <div
                                  className={`d-flex ${
                                    isSmallScreen
                                      ? "flex-column"
                                      : "justify-content-between"
                                  }`}
                                  style={{ display: "flex" }}
                                >
                                  <div>
                                    <Button
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
                                        position: isSmallScreen
                                          ? "relative"
                                          : undefined,
                                        right: isSmallScreen
                                          ? "-12px"
                                          : undefined,
                                      }}
                                      className="redirect_all_button_clr"
                                      onClick={handleAddBuyerOpen}
                                    >
                                      Add
                                      <AddOutlinedIcon
                                        sx={{
                                          fontSize: "20px",
                                          position: "relative",
                                          top: "-2px",
                                        }}
                                      />
                                    </Button>
                                  </div>

                                  <div>
                                    <IconButton
                                      className="filter_block_btn"
                                      style={{
                                        position: "relative",
                                        right: "-12px",
                                        marginTop: isSmallScreen
                                          ? "10px"
                                          : undefined,
                                        background: selectedCallerData.length
                                          ? "red"
                                          : "grey",
                                        fontSize: "14px !important",
                                        marginBottom: "1rem",
                                        height: "35px",
                                        width: "90px",
                                        minWidth: "90px",
                                        flexShrink: 0,
                                        display: "inline-flex",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                      }}
                                      disabled={selectedCallerData.length === 0}
                                      onClick={handleMessage}
                                    >
                                      Delete &nbsp;
                                      <DeleteIcon sx={{ fontSize: "20px" }} />
                                    </IconButton>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* ------------All Form------------- */}
                            <Dialog
                              open={open}
                              onClose={handleAddBuyerClose}
                              sx={{ textAlign: "center" }}
                            >
                              <Box>
                                <IconButton
                                  onClick={handleAddBuyerClose}
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
                                Add Buyer
                              </DialogTitle>

                              <DialogContent>
                                <form>
                                  <form
                                    style={{
                                      textAlign: "center",
                                      height: "348px",
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
                                      label="Buyer Name"
                                      variant="outlined"
                                      name="buyerName"
                                      value={buyerData.buyerName}
                                      onChange={(e) => {
                                        setBuyerData((prevData) => ({
                                          ...prevData,
                                          buyerName: e.target.value,
                                        }));
                                      }}
                                      error={!!errors.buyerName}
                                      helperText={errors.buyerName}
                                      InputProps={{
                                        style: {
                                          borderColor: borderColor,
                                        },
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
                                      value={buyerData.forwardNumber}
                                      onChange={(e) => {
                                        const numericValue =
                                          e.target.value.replace(/[^0-9]/g, "");
                                        setBuyerData((prevData) => ({
                                          ...prevData,
                                          forwardNumber: numericValue,
                                        }));
                                      }}
                                      error={!!errors.forwardNumber}
                                      helperText={errors.forwardNumber}
                                      InputProps={{
                                        style: {
                                          borderColor: borderColor,
                                        },
                                        inputMode: "numeric",
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
                                      value={buyerData.cc}
                                      onChange={(e) => {
                                        setBuyerData((prevData) => ({
                                          ...prevData,
                                          cc: e.target.value,
                                        }));
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
                                      value={buyerData.weightage}
                                      onChange={(e) => {
                                        setBuyerData((prevData) => ({
                                          ...prevData,
                                          weightage: e.target.value,
                                        }));
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
                                      value={buyerData.dailyLimit}
                                      onChange={(e) => {
                                        setBuyerData((prevData) => ({
                                          ...prevData,
                                          dailyLimit: e.target.value,
                                        }));
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
                                      value={buyerData.ringTimeout}
                                      onChange={(e) => {
                                        const numericValue =
                                          e.target.value.replace(/[^0-9]/g, "");
                                        setBuyerData((prevData) => ({
                                          ...prevData,
                                          ringTimeout: numericValue,
                                        }));
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
                                        value={buyerData.followWorkTime}
                                        onChange={(e) =>
                                          setBuyerData((prevData) => ({
                                            ...prevData,
                                            followWorkTime: e.target.value,
                                          }))
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
                                            buyerData.fromDate
                                              ? dayjs(
                                                  buyerData.fromDate,
                                                  "HH:mm"
                                                )
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
                                            buyerData.toDate
                                              ? dayjs(buyerData.toDate, "HH:mm")
                                              : null
                                          }
                                          onChange={handleToDateChange}
                                          renderInput={(props) => (
                                            <TextField
                                              {...props}
                                              style={{ width: "100%" }}
                                            />
                                          )}
                                        />
                                      </DemoContainer>
                                    </LocalizationProvider>
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

                            <Dialog
                              open={alertMessage}
                              onClose={handleAlertClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                              sx={{ textAlign: "center" }}
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
                                  Are you sure you want to delete{" "}
                                  {buyerData.buyerName} ?
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
                                Update Buyer
                              </DialogTitle>

                              <DialogContent>
                                <form>
                                  <form
                                    style={{
                                      textAlign: "center",
                                      height: "348px",
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
                                      label="Buyer Name"
                                      variant="outlined"
                                      name="buyerName"
                                      value={buyerData.buyerName}
                                      onChange={handleChange}
                                      error={!!errors.buyerName}
                                      helperText={errors.buyerName}
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
                                      value={buyerData.forwardNumber}
                                      onChange={(e) => {
                                        const numericValue =
                                          e.target.value.replace(/[^0-9]/g, "");
                                        setBuyerData((prevData) => ({
                                          ...prevData,
                                          forwardNumber: numericValue,
                                        }));
                                      }}
                                      error={!!errors.forwardNumber}
                                      helperText={errors.forwardNumber}
                                      inputProps={{
                                        inputMode: "numeric",
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
                                      value={buyerData.cc}
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
                                      value={buyerData.weightage}
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
                                      value={buyerData.dailyLimit}
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
                                      value={buyerData.ringTimeout}
                                      onChange={(e) => {
                                        const numericValue =
                                          e.target.value.replace(/[^0-9]/g, "");
                                        setBuyerData((prevData) => ({
                                          ...prevData,
                                          ringTimeout: numericValue,
                                        }));
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
                                        value={buyerData.status}
                                        label="Status"
                                        onChange={(e) =>
                                          setBuyerData((prevData) => ({
                                            ...prevData,
                                            status: e.target.value,
                                          }))
                                        }
                                      >
                                        <MenuItem value={true}>Active</MenuItem>
                                        <MenuItem value={false}>
                                          Deactive
                                        </MenuItem>
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
                                        value={buyerData.followWorkTime}
                                        onChange={(e) =>
                                          setBuyerData((prevData) => ({
                                            ...prevData,
                                            followWorkTime: e.target.value,
                                          }))
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
                                            buyerData.fromDate
                                              ? dayjs()
                                                  .hour(
                                                    parseInt(
                                                      buyerData.fromDate.split(
                                                        ":"
                                                      )[0],
                                                      10
                                                    )
                                                  )
                                                  .minute(
                                                    parseInt(
                                                      buyerData.fromDate.split(
                                                        ":"
                                                      )[1],
                                                      10
                                                    )
                                                  )
                                                  .second(0)
                                              : null
                                          }
                                          onChange={handleFromDateChange}
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
                                            buyerData.toDate
                                              ? dayjs()
                                                  .hour(
                                                    parseInt(
                                                      buyerData.toDate.split(
                                                        ":"
                                                      )[0],
                                                      10
                                                    )
                                                  )
                                                  .minute(
                                                    parseInt(
                                                      buyerData.toDate.split(
                                                        ":"
                                                      )[1],
                                                      10
                                                    )
                                                  )
                                                  .second(0)
                                              : null
                                          }
                                          onChange={handleToDateChange}
                                          renderInput={(props) => (
                                            <TextField
                                              {...props}
                                              style={{ width: "100%" }}
                                            />
                                          )}
                                        />
                                      </DemoContainer>
                                    </LocalizationProvider>
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

                            {/* -------------CC and Live Calls and Daily Limit component------------ */}
                            <div
                              style={{
                                display: "flex",
                                // display: isSmallScreen ? "flex" : "none",
                                width: "100%",
                                alignItems: "baseline",
                                position: "relative",
                                top: "-10px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  border: "1px solid #e0e0e0",
                                  borderRadius: "4px",
                                  padding: "4px 10px",
                                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                }}
                              >
                                <label
                                  style={{
                                    fontSize: "calc(0.7rem + 0.6vw)",
                                    fontWeight: 500,
                                  }}
                                >
                                  CC Limit:
                                  <span>&nbsp;{cc}</span>
                                </label>
                                <div
                                  style={{
                                    borderLeft: "1px solid #e0e0e0",
                                    height: "auto",
                                  }}
                                ></div>
                                <label
                                  style={{
                                    fontSize: "calc(0.7rem + 0.6vw)",
                                    fontWeight: 500,
                                    color: "",
                                  }}
                                >
                                  Live Calls:
                                  <span>&nbsp;{totalCC}</span>
                                </label>
                                <div
                                  style={{
                                    borderLeft: "1px solid #e0e0e0",
                                    height: "auto",
                                  }}
                                ></div>
                                <label
                                  style={{
                                    fontSize: "calc(0.7rem + 0.6vw)",
                                    fontWeight: 500,
                                    color: "",
                                  }}
                                >
                                  Daily Limit:
                                  <span>&nbsp;{dailyLimt}</span>
                                </label>
                              </div>
                            </div>

                            {/* ------------------Table-------------------- */}
                            {state?.getRedirectBuyer?.loading === true ? (
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
                                    style={{
                                      height: "100%",
                                      width: "100%",
                                      position: "relative",
                                      top: "-10px",
                                    }}
                                  >
                                    <StyledDataGrid
                                      className="custom_header_redirect"
                                      rows={mockDataTeam}
                                      columns={columns}
                                      density="compact"
                                      checkboxSelection
                                      disableRowSelectionOnClick
                                      rowSelectionModel={selectedRows}
                                      onRowSelectionModelChange={
                                        handleSelectionChange
                                      }
                                      components={{ Toolbar: GridToolbar }}
                                      slots={{
                                        toolbar: CustomToolbar,
                                      }}
                                      autoHeight
                                      sx={{
                                        // Menu icon positioning
                                        "& .MuiDataGrid-menuIcon": {
                                          marginLeft: "-10px !important",
                                          position: "relative",
                                          width: "20px !important",
                                          left: "8px", // Adjust as needed
                                          "& svg": {
                                            fontSize: "14px", // Match icon size
                                          },
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

export default BuyerView;

{
  /* <IconButton
  style={{
    padding: "10px",
    fontSize: "15px",
    borderRadius: "5px",
    border: "none",
    color: "#fff",
    marginRight: "30px",
  }}
  className="redirect_all_button_clr"
  onClick={() => {
    dispatch({
      type: GET_REDIRECT_BUYER_SUCCESS,
      payload: [],
    });
    navigate("/redirect_portal/campaigns");
  }}
>
  <ArrowBackIcon style={{ fontSize: "24px" }} />
</IconButton>; */
}
