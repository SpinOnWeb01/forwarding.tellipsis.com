import React, { useEffect, useRef, useState } from "react";
import "../../../src/style.css";
import { useTheme } from "@mui/material/styles";
import BlockIcon from "@mui/icons-material/Block";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Popover,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Datetime from "react-datetime";
import { makeStyles } from "@mui/styles";
import {
  createUserBlockReport,
  getRedirectReport,
} from "../../redux/actions/redirectPortal/redirectPortal_reportAction";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { StyledDataGrid } from "../../pages/CustomDataGrid";
import { callStatusMessages } from "../../pages/Tooltips";
import moment from "moment";
import { createBlockReport } from "../../redux/actions/reportAction";

dayjs.extend(utc);
dayjs.extend(timezone);

const useStyles = makeStyles({
  root: {
    "& .super-app-theme--header": {
      position: "sticky",
      left: 0,
      backgroundColor: "#0c367a",
      color: "#fff",
      zIndex: 1,
    },
    "& .super-app-theme--cell": {
      position: "sticky",
      left: 0,
      backgroundColor: "#fff",
      zIndex: 1,
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
      "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
        {
          padding: "11.5px 14px",
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
        border: "1px solid #fff",
      },
    },
  },
});

const CustomToolbar = () => (
  <GridToolbarContainer>
    {/* <GridToolbarColumnsButton/> */}
    <GridToolbarDensitySelector />
    {/* <GridToolbarFilterButton/> */}
  </GridToolbarContainer>
);

function XmlCdr({ userThem }) {
  const classes = useStyles();
  const [currentAudio, setCurrentAudio] = useState(null);
  const [filters, setFilters] = useState({
    callDirection: "",
    didNumber: "",
    destination: "",
    callerId: "",
    status: "",
  });
  const audioRefs = useRef({});
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);

  // Get today's date with time set to 00:00
    const getTodayWithMidnight = () => dayjs().startOf("day").toDate();
  // Get today's date with 23:59 time
    const getTodayWithEndOfDay = () => dayjs().endOf("day").toDate();

  // Use this in your state
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  //  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Disable past dates for `toDate`
  // const disablePastDates = (current) => {
  //   return current.isSameOrAfter(dayjs().startOf("day"));
  // };

  // Disable future dates for `fromDate`
  // const disableFutureDates = (current) => {
  //   return current.isSameOrBefore(dayjs().endOf("day"));
  // };

  const handleFromDateChange = (date) => {
    if (!moment.isMoment(date)) {
      setFromDate(null); // for when cleared manually
      return;
    }

    const previous = fromDate;

    if (!previous || !moment.isMoment(previous)) {
      const now = moment();
      const updated = date
        .hour(now.hour())
        .minute(now.minute())
        .second(now.second());
      setFromDate(updated);
      return;
    }

    const isDateChanged = !date.isSame(previous, "day");
    const isTimeSame =
      date.hour() === previous.hour() && date.minute() === previous.minute();

    if (isDateChanged && isTimeSame) {
      const now = moment();
      const updated = date
        .hour(now.hour())
        .minute(now.minute())
        .second(now.second());
      setFromDate(updated);
    } else {
      setFromDate(date);
    }
  };

  const handleToDateChange = (date) => {
    if (!date || !moment.isMoment(date)) {
      setToDate(null);
      return;
    }

    if (!toDate || !moment.isMoment(toDate)) {
      const now = moment();
      setToDate(
        date.clone().hour(now.hour()).minute(now.minute()).second(now.second())
      );
      return;
    }

    const isDateChanged = !date.isSame(toDate, "day");
    const isTimeSame =
      date.hour() === toDate.hour() && date.minute() === toDate.minute();

    if (isDateChanged && isTimeSame) {
      const now = moment();
      const updated = date
        .hour(now.hour())
        .minute(now.minute())
        .second(now.second());
      setToDate(updated);
    } else {
      setToDate(date);
    }
  };

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  useEffect(() => {
    let data = JSON.stringify({
      from_date: dayjs(getTodayWithMidnight()).isValid()
        ? dayjs(getTodayWithMidnight()).format("YYYY-MM-DD HH:mm")
        : "",
      to_date: dayjs(getTodayWithEndOfDay()).isValid()
        ? dayjs(getTodayWithEndOfDay()).format("YYYY-MM-DD HH:mm")
        : "",
    });
    dispatch(getRedirectReport(data));
  }, [dispatch]);

  const handleSearch = () => {
    let data = JSON.stringify({
      from_date: dayjs(fromDate).isValid()
        ? dayjs(fromDate).format("YYYY-MM-DD HH:mm")
        : "",
      to_date: dayjs(toDate).isValid()
        ? dayjs(toDate).format("YYYY-MM-DD HH:mm")
        : "",
      call_direction: filters.callDirection,
      did_number: filters.didNumber,
      forward_number: filters.destination,
      caller_id: filters.callerId,
      hangup_reason: filters.status,
    });
    dispatch(getRedirectReport(data));
  };

  const handleReset = () => {
    setFilters({
      fromDate: null,
      toDate: null,
      callDirection: "",
      didNumber: "",
      destination: "",
      callerId: "",
      status: "",
    });
    setFromDate(null);
    setToDate(null);
  };

  const handleAudioClick = (audioSrc) => {
    const audio = audioRefs.current[audioSrc];
    if (currentAudio === audio) {
      if (audio.pause) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      if (currentAudio) {
        currentAudio.pause();
      }
      setCurrentAudio(audio);
      audio.play();
    }
  };

  const handleAudioPause = () => {
    //  setCurrentAudio(null);
  };

  const handleDownload = (recordingPath) => {
    const link = document.createElement("a");
    link.href = recordingPath;
    link.download = recordingPath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusMessage = (key) => {
    const status = callStatusMessages.find((item) => item.key === key);
    return status ? status.value : "Unknown Status";
  };

  const CallStatusTooltip = ({ statusKey, sx }) => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      if (isMobile) {
        setAnchorEl(event.currentTarget);
      }
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const baseStyles = {
      color: "#1976d2",
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: isMobile ? "120px" : "200px",
      fontSize: "inherit", // This allows parent styles to control font size
      ...sx, // Merge with passed sx prop
    };
    return (
      <>
        {isMobile ? (
          <>
            <span onClick={handleClick} style={baseStyles}>
              {statusKey}
            </span>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography sx={{ p: 2, maxWidth: "200px" }}>
                {getStatusMessage(statusKey)}
              </Typography>
            </Popover>
          </>
        ) : (
          <Tooltip title={getStatusMessage(statusKey)} arrow>
            <span style={baseStyles}>{statusKey}</span>
          </Tooltip>
        )}
      </>
    );
  };

  // --------------Columns Data Condition For Mobile View and Desktop View---------------------
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // < 600px
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // 600px - 900px
  const isMd = useMediaQuery(theme.breakpoints.only("md")); // 900px - 1200px
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // ------------All Columns Data------------------------------
  const allColumns = [
    {
      field: "caller_id_number",
      headerName: "Caller ID",
      headerClassName: "custom-header",
      width: isXs ? 90 : 100,
      minWidth: 90,
      maxWidth: 100,
      headerAlign: "left",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      cellClassName: "super-app-theme--cell",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Caller ID
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
      field: "did_tfn",
      headerName: "DID Number",
      headerClassName: "custom-header",
      width: isXs ? 90 : 100,
      minWidth: 90,
      maxWidth: 100,
      headerAlign: "left",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          DID Number
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
      field: "forwarded_number",
      headerName: "Forwarded",
      headerClassName: "custom-header",
      width: isXs ? 80 : 100,
      minWidth: 80,
      maxWidth: 100,
      headerAlign: "left",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Forwarded
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
      field: "hangup_reason",
      headerName: "Status",
      headerClassName: "custom-header",
      width: isXs ? 80 : 130,
      minWidth: 80,
      maxWidth: 130,
      headerAlign: "left",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Status
        </Typography>
      ),
      renderCell: (params) => (
        <CallStatusTooltip
          statusKey={params.value}
          sx={{ fontSize: "calc(0.5rem + 0.2vw)" }}
        />
      ),
    },
    {
      field: "call_status",
      headerName: "Call Status",
      headerClassName: "custom-header",
      width: isXs ? 80 : 90,
      minWidth: 80,
      maxWidth: 90,
      headerAlign: "left",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Call Status
        </Typography>
      ),
      renderCell: (params) => (
        <span
          style={{
            color: params.row.call_status === "ANSWERED" ? "green" : "red",
            fontSize: "calc(0.5rem + 0.2vw)",
          }}
        >
          {params.row.call_status}
        </span>
      ),
    },
    {
      field: "buyer_name",
      headerName: "Buyer Name",
      headerClassName: "custom-header",
      width: isXs ? 80 : 90,
      minWidth: 80,
      maxWidth: 90,
      headerAlign: "left",
      disableColumnMenu: true,
      sortable: false,
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          {isSmallScreen ? "Buy. Name" : "Buyer Name"}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.5rem + 0.2vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "campaign_name",
      headerName: "Campaign Name",
      headerClassName: "custom-header",
      width: isXs ? 80 : 80,
      minWidth: 80,
      maxWidth: 80,
      headerAlign: "left",
      disableColumnMenu: true,
      sortable: false,
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Cmp. Name
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.5rem + 0.2vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "duration",
      headerName: "Duration",
      headerClassName: "custom-header",
      width: isXs ? 45 : 50,
      minWidth: 45,
      maxWidth: 50,
      headerAlign: "left",
      disableColumnMenu: true,
      sortable: false,
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Durt.
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.5rem + 0.2vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "recording_path",
      headerName: "Recording",
      headerClassName: "custom-header",
      width: isXs ? 220 : 220,
      minWidth: 220,
      maxWidth: 220,
      headerAlign: "left",
      disableColumnMenu: true,
      sortable: false,
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Recording
        </Typography>
      ),

      renderCell: (params) => {
        if (params.row.billsec >= 0) {
          return (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <audio
                  ref={(audio) =>
                    (audioRefs.current[params.row.recording_path] = audio)
                  }
                  id={params.row.recording_path}
                  src={params.row.recording_path}
                  controls
                  controlsList="download"
                  onPlay={() => handleAudioClick(params.row.recording_path)}
                  onPause={handleAudioPause}
                  style={{ paddingRight: "4px", width: "210px" }}
                />

                {/* <IconButton
                  onClick={() => handleDownload(params.row.recording_path)}
                >
                  <GetAppIcon />
                </IconButton> */}
              </div>
            </>
          );
        } else {
          return <></>;
        }
      },
    },
    {
      field: "answer_at",
      headerName: "Call Answer Time",
      headerClassName: "custom-header",
      width: isXs ? 80 : 90,
      minWidth: 80,
      maxWidth: 90,
      headerAlign: "left",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Call Answer
        </Typography>
      ),
      renderCell: (params) => {
        if (params.value !== null) {
          const date = new Date(params.value);
          const day = (date.getUTCDate() < 10 ? "0" : "") + date.getUTCDate();
          const month =
            (date.getUTCMonth() + 1 < 10 ? "0" : "") + (date.getUTCMonth() + 1);
          const year = date.getUTCFullYear();
          const hours =
            (date.getUTCHours() < 10 ? "0" : "") + date.getUTCHours();
          const minutes =
            (date.getUTCMinutes() < 10 ? "0" : "") + date.getUTCMinutes();
          const seconds =
            (date.getUTCSeconds() < 10 ? "0" : "") + date.getUTCSeconds();
          return (
            <>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{ color: "blue", fontSize: "calc(0.5rem + 0.2vw)" }}
                >
                  {`${day}/${month}/${year}`}
                </span>
                <span
                  style={{ color: "green", fontSize: "calc(0.5rem + 0.2vw)" }}
                >
                  {`${hours}:${minutes}:${seconds}`}
                </span>
              </div>
            </>
          );
        }
      },
    },
    {
      field: "start_at",
      headerName: "Call Start Time",
      headerClassName: "custom-header",
      width: isXs ? 80 : 80,
      minWidth: 80,
      maxWidth: 80,
      headerAlign: "left",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Call Start
        </Typography>
      ),
      renderCell: (params) => {
        if (params.value !== null) {
          const date = new Date(params.value);
          const day = (date.getUTCDate() < 10 ? "0" : "") + date.getUTCDate();
          const month =
            (date.getUTCMonth() + 1 < 10 ? "0" : "") + (date.getUTCMonth() + 1);
          const year = date.getUTCFullYear();
          const hours =
            (date.getUTCHours() < 10 ? "0" : "") + date.getUTCHours();
          const minutes =
            (date.getUTCMinutes() < 10 ? "0" : "") + date.getUTCMinutes();
          const seconds =
            (date.getUTCSeconds() < 10 ? "0" : "") + date.getUTCSeconds();
          return (
            <>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{ color: "blue", fontSize: "calc(0.5rem + 0.2vw)" }}
                >
                  {`${day}/${month}/${year}`}
                </span>
                <span
                  style={{ color: "green", fontSize: "calc(0.5rem + 0.2vw)" }}
                >
                  {`${hours}:${minutes}:${seconds}`}
                </span>
              </div>
            </>
          );
        }
      },
    },
    {
      field: "end_at",
      headerName: "Call End Time",
      headerClassName: "custom-header",
      width: isXs ? 80 : 80,
      minWidth: 80,
      maxWidth: 80,
      headerAlign: "left",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Call End
        </Typography>
      ),
      renderCell: (params) => {
        if (params.value !== null) {
          const date = new Date(params.value);
          const day = (date.getUTCDate() < 10 ? "0" : "") + date.getUTCDate();
          const month =
            (date.getUTCMonth() + 1 < 10 ? "0" : "") + (date.getUTCMonth() + 1);
          const year = date.getUTCFullYear();
          const hours =
            (date.getUTCHours() < 10 ? "0" : "") + date.getUTCHours();
          const minutes =
            (date.getUTCMinutes() < 10 ? "0" : "") + date.getUTCMinutes();
          const seconds =
            (date.getUTCSeconds() < 10 ? "0" : "") + date.getUTCSeconds();
          return (
            <>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{ color: "blue", fontSize: "calc(0.5rem + 0.2vw)" }}
                >
                  {`${day}/${month}/${year}`}
                </span>
                <span
                  style={{ color: "green", fontSize: "calc(0.5rem + 0.2vw)" }}
                >
                  {`${hours}:${minutes}:${seconds}`}
                </span>
              </div>
            </>
          );
        }
      },
    },
    {
      field: "hangupby",
      headerName: "Hangup By",
      width: isXs ? 80 : 80,
      minWidth: 80,
      maxWidth: 80,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Hangup By
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.5rem + 0.2vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "uniqueid",
      headerName: "Unique Id",
      headerClassName: "custom-header",
      width: isXs ? 110 : 120,
      minWidth: 100,
      maxWidth: 120,
      headerAlign: "left",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Unique Id
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.5rem + 0.2vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
  ];

  // --------------Only Mobile View Columns Data---------------------
  const mobileColumns = allColumns.filter((col) =>
    [
      "caller_id_number",
      "did_tfn",
      "forwarded_number",
      "call_status",
      "buyer_name",
      "campaign_name",
      "duration",
      "recording_path",
      "answer_at",
      "hangupby",
      "uniqueid",
    ].includes(col.field)
  );

  // --------------Table Options---------------------
  const columns = isMobile ? mobileColumns : allColumns;

  //Create CSV file Function
  const handleCSVExport = (rows, columns) => {
    const filteredRows = rows.map((row) => {
      const clonedRow = { ...row };

      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
          return "";
        }
        const day = (date.getUTCDate() < 10 ? "0" : "") + date.getUTCDate();
        const month =
          (date.getUTCMonth() + 1 < 10 ? "0" : "") + (date.getUTCMonth() + 1);
        const year = date.getUTCFullYear();
        const hours = (date.getUTCHours() < 10 ? "0" : "") + date.getUTCHours();
        const minutes =
          (date.getUTCMinutes() < 10 ? "0" : "") + date.getUTCMinutes();
        const seconds =
          (date.getUTCSeconds() < 10 ? "0" : "") + date.getUTCSeconds();

        // Prevent Excel from changing format
        return `="\t${day}/${month}/${year} ${hours}:${minutes}:${seconds}"`;
      };

      if (clonedRow.start_at) {
        clonedRow.start_at = formatDate(clonedRow.start_at);
      }
      if (clonedRow.end_at) {
        clonedRow.end_at = formatDate(clonedRow.end_at);
      }

      const { recording_path, answer_at, uniqueid, ...filteredRow } = clonedRow;
      return { id: clonedRow.id, ...filteredRow };
    });

    const filteredColumns = columns.filter(
      (col) => !["recording_path", "answer_at", "uniqueid"].includes(col.field)
    );

    const csvData = filteredRows.map((row) => {
      return filteredColumns.map((col) => row[col.field] || "");
    });

    const header =
      filteredColumns.map((col) => col.headerName).join(",") + "\n";
    const rowsCsv = csvData.map((row) => row.join(",")).join("\n");

    const csvWithBOM = "\uFEFF" + header + rowsCsv; // Add UTF-8 BOM
    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tellipsis_cdr_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Define rows here
  const rows = [];
  state?.getRedirectReport?.RedirectReport?.data &&
    state?.getRedirectReport?.RedirectReport?.data?.forEach((item, index) => {
      rows.push({
        id: index + 1,
        did_tfn: item.did_number,
        buyer_name: item.buyer_name,
        uniqueid: item.uniqueid,
        caller_id_number: item.src,
        user_uuid: item?.user_uuid,
        call_direction: item?.call_direction,
        disposition: item?.disposition,
        duration: item?.duration,
        billsec: item?.billsec,
        answer_at: item.answer_at,
        time: item.answer_at,
        end_at: item.end_at,
        start_at: item.start_at,
        start_time: item.start_at,
        recording_path: item.recording_path,
        hangup_reason: item.status,
        call_status: item.call_status,
        campaign_name: item.campaign_name,
        destination: item.destination,
        username: item.username,
        answered_by: item.answered_by,
        transfered_to: item.transfered_to,
        forwarded_number: item.forwarded_number,
        hangupby: item.hangupby,
      });
    });

  const selectedCallerDataMap = new Map();

  selectedRows.forEach((id) => {
    const selectedRow = rows.find((row) => row.id === id);
    if (selectedRow) {
      const userId = selectedRow.user_uuid;
      if (!selectedCallerDataMap.has(userId)) {
        selectedCallerDataMap.set(userId, {
          type: "CallerID",
          details: [],
          description: "Report",
          user_id: JSON.stringify(userId),
          is_active: true,
        });
      }
      const data = selectedCallerDataMap.get(userId);
      if (!data.details.includes(selectedRow.caller_id_number)) {
        data.details.push(selectedRow.caller_id_number);
      }
    }
  });

  const selectedCallerData = Array.from(selectedCallerDataMap.values());

  const handleBlockCallerIds = () => {
    dispatch(createUserBlockReport(JSON.stringify(selectedCallerData)));
  };

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
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                        >
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
                                  Report
                                </h3>
                              </div>
                            </div>

                            {/* ------------Form Grid------- */}

                            <Grid
                              container
                              className="cdr_filter_row"
                              style={{ padding: "0px 0 10px" }}
                            >
                              <Grid
                                xl={4}
                                lg={4}
                                md={4}
                                sm={12}
                                xs={12}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <TextField
                                  className={`${classes.formControl} textfield_select`}
                                  style={{
                                    width: "98%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  InputLabelProps={{
                                    style: { fontSize: "14px" },
                                  }}
                                  size="small"
                                  type="text"
                                  label="Caller ID"
                                  variant="outlined"
                                  value={filters.callerId}
                                  onChange={(e) =>
                                    setFilters((prev) => ({
                                      ...prev,
                                      callerId: e.target.value,
                                    }))
                                  }
                                />
                              </Grid>
                              <Grid
                                xl={4}
                                lg={4}
                                md={4}
                                sm={12}
                                xs={12}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <TextField
                                  className={`${classes.formControl} textfield_select`}
                                  style={{
                                    width: "98%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  InputLabelProps={{
                                    style: { fontSize: "14px" },
                                  }}
                                  size="small"
                                  type="text"
                                  label="DID Number"
                                  variant="outlined"
                                  value={filters.didNumber}
                                  onChange={(e) =>
                                    setFilters((prev) => ({
                                      ...prev,
                                      didNumber: e.target.value,
                                    }))
                                  }
                                />
                              </Grid>

                              <Grid
                                xl={4}
                                lg={4}
                                md={4}
                                sm={12}
                                xs={12}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <TextField
                                  className={`${classes.formControl} textfield_select`}
                                  style={{
                                    width: "98%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  InputLabelProps={{
                                    style: { fontSize: "14px" },
                                  }}
                                  size="small"
                                  type="text"
                                  label="Forward Number"
                                  variant="outlined"
                                  value={filters.destination}
                                  onChange={(e) =>
                                    setFilters((prev) => ({
                                      ...prev,
                                      destination: e.target.value,
                                    }))
                                  }
                                />
                              </Grid>

                              <Grid
                                xl={4}
                                lg={4}
                                md={4}
                                sm={6}
                                xs={6}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                                className="mt-xxl-0 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-1 mt-xs-1 mt-1"
                              >
                                <label
                                  style={{
                                    fontSize: "14px",
                                    paddingRight: "10px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {isSmallScreen ? (
                                    "From"
                                  ) : (
                                    <>
                                      From <br />
                                      Date:
                                    </>
                                  )}
                                </label>
                                <Datetime
                                  inputProps={{
                                    style: {
                                      height: "32px", // Smaller height
                                      padding: "6px 10px", // Reduced padding
                                      fontSize: "14px", // Smaller font
                                    },
                                    plplaceholder: "Select from date",
                                  }}
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                    border: "none !important",
                                    background: "transparent !important",
                                    marginRight: "7px",
                                  }}
                                  className="datefield_select new_input"
                                  value={fromDate}
                                  label="From Date"
                                  onChange={handleFromDateChange}
                                  closeOnSelect={true}
                                  dateFormat="DD/MM/YYYY" // Date format
                                  timeFormat="HH:mm" // 24-hour time format (Railway Time)
                                  //isValidDate={disableFutureDates}
                                />
                              </Grid>

                              <Grid
                                xl={4}
                                lg={4}
                                md={4}
                                sm={6}
                                xs={6}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                                className="mt-xxl-0 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-1 mt-xs-1 mt-1"
                              >
                                <label
                                  style={{
                                    fontSize: "14px",
                                    paddingRight: "10px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {isSmallScreen ? (
                                    "To"
                                  ) : (
                                    <>
                                      To <br />
                                      Date:
                                    </>
                                  )}
                                </label>
                                <Datetime
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                    border: "none !important",
                                    background: "transparent !important",
                                    marginRight: "7px",
                                  }}
                                  inputProps={{
                                    style: {
                                      height: "32px", // Smaller height
                                      padding: "6px 10px", // Reduced padding
                                      fontSize: "14px", // Smaller font
                                    },
                                  }}
                                  className="datefield_select new_input"
                                  value={toDate}
                                  label="To Date"
                                  onChange={handleToDateChange}
                                  closeOnSelect={true}
                                  dateFormat="DD/MM/YYYY" // Date format
                                  timeFormat="HH:mm" // 24-hour time format (Railway Time)
                                  //isValidDate={disablePastDates} // Disables past dates
                                />
                              </Grid>

                              <Grid
                                xl={4}
                                lg={4}
                                md={4}
                                sm={12}
                                xs={12}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  padding: " 10px 0",
                                  width: "100%",
                                  marginLeft: "auto",
                                  px: 0.5,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: isMobile ? "" : "flex",
                                    textAlign: "center",
                                  }}
                                >
                                  <IconButton
                                    className="filter_search_btn"
                                    style={{
                                      marginLeft: "0 !important",
                                      background: "green !important",
                                      height: "43px",
                                      m: isMobile ? 1 : 0,
                                    }}
                                    onClick={handleSearch}
                                  >
                                    Search &nbsp;
                                    <SearchIcon />
                                  </IconButton>
                                  <IconButton
                                    className="filter_reset_btn"
                                    style={{
                                      marginLeft: "0 !important",
                                      backgroundColor: "grey !important",
                                      height: "43px",
                                      m: isMobile ? 1 : 0,
                                    }}
                                    onClick={handleReset}
                                  >
                                    Reset &nbsp;
                                    <RestartAltIcon />
                                  </IconButton>
                                  <Button
                                    onClick={() =>
                                      handleCSVExport(rows, columns)
                                    }
                                    className="filter_search_btn me-0"
                                    startIcon={<FileDownloadIcon />}
                                    size="small"
                                    sx={{
                                      backgroundColor: "#1976d2 !important",
                                      color: "#fff",
                                      fontSize: "14px !important", // Smaller font size
                                      height: "43px",
                                      textTransform: "capitalize",
                                      m: isMobile ? 1 : 0,
                                      padding: isMobile
                                        ? "0 10px !important"
                                        : "0 20px !important", // Smaller padding
                                    }}
                                  >
                                    Download
                                  </Button>
                                  <IconButton
                                    className="filter_block_btn"
                                    style={{
                                      marginLeft: "0 !important",
                                      background: selectedCallerData.length
                                        ? "red"
                                        : "grey",
                                      height: "43px",
                                      m: isMobile ? 1 : 0,
                                    }}
                                    disabled={selectedCallerData.length === 0}
                                    onClick={handleBlockCallerIds}
                                  >
                                    Block &nbsp;
                                    <BlockIcon />
                                  </IconButton>
                                </Box>
                              </Grid>
                            </Grid>

                            {state?.getRedirectReport?.loading === true ? (
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
                                  <div>
                                    <StyledDataGrid
                                      className="custom_header_redirect"
                                      rows={rows}
                                      density="compact"
                                      columns={columns}
                                      components={{ Toolbar: CustomToolbar }}
                                      autoHeight
                                      disableColumnResize={false}
                                      checkboxSelection
                                      disableRowSelectionOnClick
                                      rowSelectionModel={selectedRows} // Bind selection model
                                      onRowSelectionModelChange={
                                        handleSelectionChange
                                      }
                                      //hideFooterPagination={window.innerWidth < 600}
                                      sx={{
                                        "& .MuiDataGrid-cell": {
                                          fontSize: {
                                            xs: "12px",
                                            sm: "14px",
                                            md: "13px",
                                          },
                                          wordBreak: "break-word !important",
                                          whiteSpace: "break-spaces !important",
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

export default XmlCdr;
