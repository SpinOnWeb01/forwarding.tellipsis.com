import { Box, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAdminAuditLogs } from "../../redux/actions/adminPortal_auditLogs";
import { StyledDataGrid } from "../../pages/CustomDataGrid";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Menu,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { flushSync } from "react-dom";

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
    </GridToolbarContainer>
  );
}

function AdminAuditLog({ colorThem }) {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [selectedRole, setSelectedRole] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Define options for each role
  const roleOptions = {
    t: ["Option 1", "Option 2", "Option 3", "Option 4"], // Admin options
    f: ["Campaign", "DID/TFN Number", "Buyer View"], // User options
  };

  useEffect(() => {
    dispatch(getAdminAuditLogs());
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setDropdownValue(""); // Reset dropdown when role changes
  };

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
    // You can perform additional actions here based on the selected value
    console.log(
      `Selected ${selectedRole === "t" ? "Admin" : "User"} option:`,
      event.target.value
    );
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // < 600px
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // 600px - 900px
  const isMd = useMediaQuery(theme.breakpoints.only("md")); // 900px - 1200px
  const isSmallScreen = useMediaQuery(theme.breakpoints.between("sm"));

  // const columns = [
  //   {
  //     field: "log_id",
  //     headerName: "Log ID",
  //     width: isXs ? 50 : 70,
  //     minWidth: 50,
  //     maxWidth: 70,
  //     headerClassName: "custom-header",
  //     headerAlign: "left",
  //     align: "left",
  //     renderHeader: () => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
  //       >
  //         Log ID
  //       </Typography>
  //     ),
  //     renderCell: (params) => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)" }} // Match header size or set your own
  //       >
  //         {params.value}
  //       </Typography>
  //     ),
  //   },
  //   {
  //     field: "username",
  //     headerName: "UserName",
  //     width: isXs ? 70 : 100,
  //     minWidth: 70,
  //     maxWidth: 100,
  //     headerClassName: "custom-header",
  //     headerAlign: "left",
  //     align: "left",
  //     renderHeader: () => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
  //       >
  //         User name
  //       </Typography>
  //     ),
  //     renderCell: (params) => {
  //       return (
  //         <span
  //           style={{
  //             textTransform: "capitalize",
  //             fontSize: "calc(0.6rem + 0.2vw)",
  //           }}
  //         >
  //           {params.row.username}
  //         </span>
  //       );
  //     },
  //   },

  //   {
  //     field: "application_type",
  //     headerName: "Application Type",
  //     width: isXs ? 100 : 130,
  //     minWidth: 100,
  //     maxWidth: 130,
  //     headerClassName: "custom-header",
  //     headerAlign: "left",
  //     align: "left",
  //     renderHeader: () => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
  //       >
  //         {isSmallScreen ? "Applicat. Type" : "Application Type"}
  //       </Typography>
  //     ),
  //     renderCell: (params) => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)" }} // Match header size or set your own
  //       >
  //         {params.value}
  //       </Typography>
  //     ),
  //   },
  //   {
  //     field: "event_date",
  //     headerName: "Event Date",
  //     width: isXs ? 80 : 110,
  //     minWidth: 80,
  //     maxWidth: 110,
  //     headerClassName: "custom-header",
  //     headerAlign: "left",
  //     align: "left",
  //     renderHeader: () => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
  //       >
  //         Event Date
  //       </Typography>
  //     ),
  //     renderCell: (params) => {
  //       return (
  //         <div className="d-flex justify-content-between align-items-center">
  //           <p
  //             style={{
  //               fontWeight: "500",
  //               color: "blue",
  //               margin: "0",
  //               textTransform: "capitalize",
  //               fontSize: "calc(0.6rem + 0.2vw)",
  //             }}
  //           >
  //             {params?.row?.event_date}
  //           </p>
  //         </div>
  //       );
  //     },
  //   },

  //   {
  //     field: "event_time",
  //     headerName: "Event Time",
  //     width: isXs ? 80 : 110,
  //     minWidth: 80,
  //     maxWidth: 110,
  //     headerClassName: "custom-header",
  //     headerAlign: "left",
  //     align: "left",
  //     renderHeader: () => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
  //       >
  //         Event Time
  //       </Typography>
  //     ),
  //     renderCell: (params) => {
  //       return (
  //         <div className="d-flex justify-content-between align-items-center">
  //           <p
  //             style={{
  //               fontWeight: "500",
  //               color: "orange",
  //               margin: "0",
  //               textTransform: "capitalize",
  //               fontSize: "calc(0.6rem + 0.2vw)",
  //             }}
  //           >
  //             {params?.row?.event_time}
  //           </p>
  //         </div>
  //       );
  //     },
  //   },

  //   {
  //     field: "event_details",
  //     headerName: "Event Details",
  //     width: isXs ? 80 : 110,
  //     minWidth: 80,
  //     maxWidth: 110,
  //     headerClassName: "custom-header",
  //     headerAlign: "left",
  //     align: "left",
  //     renderHeader: () => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
  //       >
  //         Event Details
  //       </Typography>
  //     ),
  //     renderCell: (params) => {
  //       return (
  //         <div className="d-flex justify-content-between align-items-center">
  //           {params.row.event_details === "successful" ? (
  //             <>
  //               <div
  //                 style={{
  //                   color: "green",
  //                   // background: "green",
  //                   // padding: "7px",
  //                   // borderRadius: "5px",
  //                   // fontSize: "12px",
  //                   textTransform: "capitalize",
  //                   fontSize: "calc(0.6rem + 0.2vw)",
  //                 }}
  //               >
  //                 Successful
  //               </div>
  //             </>
  //           ) : (
  //             <>
  //               <div
  //                 style={{
  //                   color: "red",
  //                   // background: "red",
  //                   // padding: "7px",
  //                   // borderRadius: "5px",
  //                   // fontSize: "12px",
  //                   textTransform: "capitalize",
  //                   fontSize: "calc(0.6rem + 0.2vw)",
  //                 }}
  //               >
  //                 Blocked
  //               </div>
  //             </>
  //           )}
  //         </div>
  //       );
  //     },
  //   },

  //   {
  //     field: "event_type",
  //     headerName: "Event Type",
  //     width: isXs ? 80 : 110,
  //     minWidth: 80,
  //     maxWidth: 110,
  //     headerClassName: "custom-header",
  //     headerAlign: "left",
  //     align: "left",
  //     renderHeader: () => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
  //       >
  //         Event Type
  //       </Typography>
  //     ),
  //     renderCell: (params) => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)" }} // Match header size or set your own
  //       >
  //         {params.value}
  //       </Typography>
  //     ),
  //   },
  //   {
  //     field: "ip_address",
  //     headerName: "IP Address",
  //     width: isXs ? 90 : 130,
  //     minWidth: 90,
  //     maxWidth: 130,
  //     headerClassName: "custom-header",
  //     headerAlign: "left",
  //     align: "left",
  //     renderHeader: () => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
  //       >
  //         IP Address
  //       </Typography>
  //     ),
  //     renderCell: (params) => {
  //       return (
  //         <div className="d-flex justify-content-between align-items-center">
  //           <p
  //             style={{
  //               fontWeight: "500",
  //               color: "blue",
  //               margin: "0",
  //               textTransform: "capitalize",
  //               fontSize: "calc(0.6rem + 0.2vw)",
  //             }}
  //           >
  //             {params?.row?.ip_address}
  //           </p>
  //         </div>
  //       );
  //     },
  //   },

  //   {
  //     field: "misc",
  //     headerName: "Misc",
  //     width: isXs ? 160 : 180,
  //     minWidth: 160,
  //     maxWidth: 180,
  //     headerClassName: "custom-header",
  //     headerAlign: "left",
  //     align: "left",
  //     renderHeader: () => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
  //       >
  //         Misc
  //       </Typography>
  //     ),
  //     renderCell: (params) => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)" }} // Match header size or set your own
  //       >
  //         {params.value}
  //       </Typography>
  //     ),
  //   },
  //   {
  //     field: "description",
  //     headerName: "Description",
  //     width: isXs ? 70 : 100,
  //     minWidth: 70,
  //     maxWidth: 100,
  //     headerClassName: "custom-header",
  //     headerAlign: "left",
  //     align: "left",
  //     renderHeader: () => (
  //       <Typography
  //         variant="body2"
  //         sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
  //       >
  //         Description
  //       </Typography>
  //     ),
  //     renderCell: (params) => {
  //       return (
  //         <span
  //           style={{
  //             textTransform: "capitalize",
  //             fontSize: "calc(0.6rem + 0.2vw)",
  //           }}
  //         >
  //           {params.row.description}
  //         </span>
  //       );
  //     },
  //   },
  // ];

  const isRowBordered = (params) => {
    // const { row } = params;
    // // Add your condition here, for example, adding border to rows where age is greater than 25
    // return row.status === "Ok";
  };

  // const mockDataTeam = useMemo(() => {
  //   const calculatedRows = [];
  //   state?.getAdminAuditLogs?.auditLogs &&
  //     state?.getAdminAuditLogs?.auditLogs?.forEach((item, index) => {
  //       calculatedRows.push({
  //         id: index + 1,
  //         user_id: item?.user_id,
  //         username: item?.username,
  //         application_type: item?.application_type,
  //         event_date: item?.event_date,
  //         event_details: item?.event_details,
  //         event_time: item?.event_time,
  //         event_type: item?.event_type,
  //         ip_address: item?.ip_address,
  //         log_id: item?.log_id,
  //         misc: item?.misc,
  //       });
  //     });
  //   return calculatedRows;
  // }, [state?.getAdminAuditLogs?.auditLogs]);

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: isXs ? 50 : 70,
      minWidth: 50,
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
          Action
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)" }} // Match header size or set your own
        >
          {params.row.action === "POST" ? "Add" : "Update"}
        </Typography>
      ),
    },
    {
      field: "username",
      headerName: "UserName",
      width: isXs ? 70 : 100,
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
      field: "created_at",
      headerName: "Date",
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
          sx={{
            fontSize: "calc(0.6rem + 0.15vw)",
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
          var hours = date.getUTCHours();
          var minutes = date.getUTCMinutes();
          var seconds = date.getUTCSeconds();

          // Formatting single-digit day/month with leading zero if needed
          day = (day < 10 ? "0" : "") + day;
          month = (month < 10 ? "0" : "") + month;

          // Formatting single-digit hours/minutes/seconds with leading zero if needed
          hours = (hours < 10 ? "0" : "") + hours;
          minutes = (minutes < 10 ? "0" : "") + minutes;
          seconds = (seconds < 10 ? "0" : "") + seconds;
          return (
            <>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{ color: "blue", fontSize: "calc(0.55rem + 0.2vw)" }}
                >
                  {`${day}/${month}/${year}`}
                </span>
              </div>
            </>
          );
        }
      },
    },
    {
      field: "timestamp",
      headerName: "Time",
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
          sx={{
            fontSize: "calc(0.6rem + 0.15vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          Time
        </Typography>
      ),
      renderCell: (params) => {
        if (params.value !== null) {
          const date = new Date(params.value);
          var day = date.getUTCDate();
          var month = date.getUTCMonth() + 1; // Month starts from 0
          var year = date.getUTCFullYear();
          var hours = date.getUTCHours();
          var minutes = date.getUTCMinutes();
          var seconds = date.getUTCSeconds();

          // Formatting single-digit day/month with leading zero if needed
          day = (day < 10 ? "0" : "") + day;
          month = (month < 10 ? "0" : "") + month;

          // Formatting single-digit hours/minutes/seconds with leading zero if needed
          hours = (hours < 10 ? "0" : "") + hours;
          minutes = (minutes < 10 ? "0" : "") + minutes;
          seconds = (seconds < 10 ? "0" : "") + seconds;
          return (
            <>
              <div style={{ display: "flex", flexDirection: "column" }}>
                
                <span
                  style={{ color: "green", fontSize: "calc(0.55rem + 0.2vw)" }}
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
      field: "ip_address",
      headerName: "IP Address",
      width: isXs ? 90 : 130,
      minWidth: 90,
      maxWidth: 130,
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
          IP Address
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "500",
                color: "blue",
                margin: "0",
                textTransform: "capitalize",
                fontSize: "calc(0.6rem + 0.2vw)",
              }}
            >
              {params?.row?.ip_address}
            </p>
          </div>
        );
      },
    },

    {
      field: "url",
      headerName: "URL",
      width: isXs ? 160 : 180,
      minWidth: 160,
      maxWidth: 180,
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
          URL
        </Typography>
      ),
      renderCell: (params) => {
        let value = params.value || "";

        // Remove leading slashes, dots, and any path prefix
        const cleaned = value
          .split("/")
          .filter((part) => part && part !== "." && part !== "..")
          .pop();

        return (
          <Typography variant="body2" sx={{ fontSize: "calc(0.6rem + 0.2vw)" }}>
            {cleaned || "—"}
          </Typography>
        );
      },
    },
    {
      field: "data",
      headerName: "Data",
      width: 1450,
      //flex: 1,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
    },
  ];

  const mockDataTeam = useMemo(() => {
    const calculatedRows = [];
    // Step 2: Build rows from audit logs and map user_id to username
    state?.getAdminAuditLogs?.auditLogs?.forEach((item, index) => {
      const parsedData = JSON.parse(item.data);
      calculatedRows.push({
        id: index + 1,
        user_id: item?.user_id,
        username: item?.user_name,
        application_type: item?.application_type,
        created_at: item?.created_at,
        timestamp: item?.created_at,
        event_details: item?.event_details,
        event_time: item?.event_time,
        carrier_name: parsedData?.carrier_name,
        ip_address: item?.source_ip,
        action: item?.action,
        url: item?.url,
        description: parsedData?.description,
        status: parsedData?.status,
        recording: parsedData?.recording,
        ivr_options: parsedData?.ivr_options,
        didnumber: parsedData?.didnumber,
        is_suspended: parsedData?.is_suspended,
        from_date: parsedData?.from_date,
        to_date: parsedData?.to_date,
        group_name: parsedData?.group_name,
        call_threading: parsedData?.call_threading,
        ring_timeout: parsedData?.ring_timeout,
        buyer_name: parsedData?.buyer_name,
        forward_number: parsedData?.forward_number,
        follow_working_time: parsedData?.follow_working_time,
        working_end_time: parsedData?.working_end_time,
        working_start_time: parsedData?.working_start_time,
        cc: parsedData?.cc,
        daily_limit: parsedData?.daily_limit,
        weightage: parsedData?.weightage,
        data: item?.data,
      });
    });

    return calculatedRows;
  }, [state?.getAdminAuditLogs?.auditLogs, state?.allUsers?.users]);

  return (
    <>
      <div className={`App ${colorThem} `}>
        <div
          className="contant_box"
          style={
            {
              // height:"100vh"
            }
          }
        >
          <Box
            className="right_sidebox mobile_top_pddng"
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
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
                    <div className="cntnt_title">
                      <div className="">
                        <h3
                          style={{
                            margin: "0px",
                            color: "#f5751D",
                            fontWeight: "500",
                            fontSize: "2rem",
                          }}
                        >
                          Audit Logs
                        </h3>
                        {/* <p>
                          Use this to monitor and interact with the active
                          calls.
                        </p> */}
                      </div>
                    </div>

                    {/* <div>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value=""
                        >
                          <FormControlLabel
                            value=""
                            control={
                              <Radio
                                checked={selectedRole === ""}
                                onChange={handleRoleChange}
                              />
                            }
                            label="Login"
                          />
                          <FormControlLabel
                            value="t"
                            control={
                              <Radio
                                checked={selectedRole === "t"}
                                onChange={handleRoleChange}
                              />
                            }
                            label="Admin"
                          />
                          <FormControlLabel
                            value="f"
                            control={
                              <Radio
                                checked={selectedRole === "f"}
                                onChange={handleRoleChange}
                              />
                            }
                            label="User"
                          />

                          {selectedRole && (
                            <Box sx={{ mt: 0.5 }}>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={(event) =>
                                  setAnchorEl(event.currentTarget)
                                }
                                sx={{
                                  minWidth: 120,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {dropdownValue ||
                                  (selectedRole === "t"
                                    ? "Admin Options"
                                    : "User Options")}
                              </Button>
                              <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                PaperProps={{
                                  style: {
                                    maxHeight: 48 * 4.5,
                                    width: "20ch",
                                  },
                                }}
                              >
                                {roleOptions[selectedRole].map(
                                  (option, index) => (
                                    <MenuItem
                                      key={index}
                                      value={option}
                                      onClick={() => {
                                        handleDropdownChange({
                                          target: { value: option },
                                        });
                                        setAnchorEl(null);
                                      }}
                                      sx={{
                                        whiteSpace: "normal",
                                      }}
                                    >
                                      {option}
                                    </MenuItem>
                                  )
                                )}
                              </Menu>
                            </Box>
                          )}
                        </RadioGroup>
                      </FormControl>
                    </div> */}
                    <div className="row">
                      <ThemeProvider theme={theme}>
                        <div style={{ height: "100%", width: "100%" }}>
                          <StyledDataGrid
                            // checkboxSelection
                            density="compact"
                            className="tbl_innr_box"
                            rows={mockDataTeam}
                            columns={columns}
                            // headerClassName="custom-header"
                            components={{ Toolbar: GridToolbar }}
                            slots={{
                              toolbar: CustomToolbar,
                            }}
                            autoHeight
                            // getRowClassName={(params) =>
                            //   isRowBordered(params)
                            //     ? classes.borderedGreen
                            //     : classes.borderedRed
                            // }
                          />
                        </div>
                      </ThemeProvider>
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

export default AdminAuditLog;
