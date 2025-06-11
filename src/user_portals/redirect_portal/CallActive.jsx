import React, { useEffect, useMemo, useState } from "react";
import "../../../src/style.css";
import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { getAdminCallActive } from "../../redux/actions/adminPortal_callActiveAction";
import { useDispatch, useSelector } from "react-redux";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import { IconBase } from "react-icons/lib";
import { api } from "../../mockData";
import axios from "axios";
import { toast } from "react-toastify";
import { StyledDataGrid } from "../../pages/CustomDataGrid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import dayjs from "dayjs";
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
export function CustomFooterStatusComponent(props) {
  return (
    <></>
    // <Box sx={{ p: 1, display: 'flex' }}>
    //   <FiberManualRecordIcon
    //     fontSize="small"
    //     sx={{
    //       mr: 1,
    //       color: props.status === 'connected' ? '#4caf50' : '#d9182e',
    //     }}
    //   />
    //   Status {props.status}
    // </Box>
  );
}
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function CallActive({ userThem }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [timeStamp, setTimeStamp] = useState([]);
  const [timeDifference, setTimeDifference] = useState([]);

  const current_user = localStorage.getItem("current_user");
  const user = JSON.parse(localStorage.getItem(`user_${current_user}`));

  const parseTimestamp = () => {
    return timeStamp?.map((item) => {
      const date = new Date(item.TimeStamp);
      return date; // Keep Date objects for time difference calculation
    });
  };

  const timestampDate = parseTimestamp();

  // Function to calculate time differences for each timestamp
  const calculateTimeDifferences = () => {
    const currentTime = new Date();
    const differences = timestampDate?.map((timestamp) => {
      const diffInMs = currentTime - timestamp;
      const diffInSeconds = Math.floor(diffInMs / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      // Format with leading zeros
      const formattedHours = String(diffInHours).padStart(2, "0");
      const formattedMinutes = String(diffInMinutes % 60).padStart(2, "0");
      const formattedSeconds = String(diffInSeconds % 60).padStart(2, "0");

      return {
        days: diffInDays,
        hours: formattedHours,
        minutes: formattedMinutes,
        seconds: formattedSeconds,
      };
    });

    setTimeDifference(differences);
  };

  // Calculate time differences initially and update every 5 seconds
  useEffect(() => {
    calculateTimeDifferences(); // Initial calculation

    const interval = setInterval(() => {
      calculateTimeDifferences(); // Recalculate every 5 seconds
    }, 5000);

    return () => clearInterval(interval);
  }, [timeStamp]);
  useEffect(() => {
    dispatch(getAdminCallActive());
  }, [dispatch]); // Empty dependency array ensures this effect runs once on mount

  const handleHangup = async (data) => {
    const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    let values = JSON.stringify({
      CallReference: data.CallReference,
    });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.post(
        `${api.dev}/api/callhangup`,
        values,
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
    }
  };

  // --------------Columns Data Condition For Mobile View and Desktop View---------------------
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // < 600px
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // 600px - 900px
  const isMd = useMediaQuery(theme.breakpoints.only("md")); // 900px - 1200px
  const isSmallScreen = useMediaQuery(theme.breakpoints.between("sm"));

  // ------------All Columns Data------------------------------
  const allColumns = [
    {
      field: "id",
      headerName: "S No",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 60 : 60,
      minWidth: 60,
      maxWidth:60,
      headerAlign: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      align: "left",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "500",
                margin: "0",
              }}
            >
               {params.api.getAllRowIds().indexOf(params.id) + 1}
            </p>
          </div>
        );
      },
    },
    {
      field: "DIDNumber",
      headerName: "Did Number",
      headerClassName: "custom-header",
      flex: 1,
      minWidth: 140,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      align: "left",
    },
    {
      field: "CallerID",
      headerName: "Caller Id",
      headerClassName: "custom-header",
      flex: 1,
      minWidth: 140,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      align: "left",
    },
    {
          field: "CompaignName",
          headerName: "Campaign Name",
          width: isXs ? 100 : 120,
          minWidth: 100,
          maxWidth: 120,
          headerClassName: "custom-header",
          headerAlign: "left",
          align: "center",
          renderHeader: () => (
            <Typography
              variant="body2"
              sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
            >
              {isSmallScreen ? "Camp. Name" : "Campaign Name"}
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
      field: "BuyerName",
      headerName: "Buyer Name",
      headerClassName: "custom-header",
      flex: 1,
      minWidth: 90,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      align: "left",
    },
    {
      field: "ForwardedTo",
      headerName: "Forwarded To",
      headerClassName: "custom-header",
      flex: 1,
      minWidth: 120,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      align: "left",
    },
    {
      field: "Status",
      headerName: "Status",
      headerClassName: "custom-header",
      flex: 1,
      minWidth: 200,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      align: "left",
      // renderCell: (params) => {
      //   return (
      //     <div className="d-flex justify-content-between align-items-center">
      //       <p
      //         style={{
      //           fontWeight: "500",
      //           margin: "0",
      //         }}
      //       >
      //         {params?.row?.Status === "ANSWER" ? (
      //           <>
      //             {" "}
      //             <p
      //               style={{
      //                 fontWeight: "500",
      //                 margin: "0",
      //                 color: "green",
      //               }}
      //             >
      //               {params?.row?.Status}
      //             </p>
      //           </>
      //         ) : (
      //           <></>
      //         )}
      //         {params?.row?.Status === "DIALING" ? (
      //           <>
      //             {" "}
      //             <p
      //               style={{
      //                 fontWeight: "500",
      //                 margin: "0",
      //                 color: "violet",
      //               }}
      //             >
      //               {params?.row?.Status}
      //             </p>
      //           </>
      //         ) : (
      //           <></>
      //         )}
      //         {params?.row?.Status === "RINGING" ? (
      //           <>
      //             {" "}
      //             <p
      //               style={{
      //                 fontWeight: "500",
      //                 margin: "0",
      //                 color: "skyblue",
      //               }}
      //             >
      //               {params?.row?.Status}
      //             </p>
      //           </>
      //         ) : (
      //           <></>
      //         )}
      //       </p>
      //     </div>
      //   );
      // },
    },
    {
      field: "CallDuration",
      headerName: "Call Duration",
      headerClassName: "custom-header",
      flex: 1,
      minWidth: 100,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      align: "left",
      renderCell: (params) => {
        if (params.value !== null) {
          const index = mockDataTeam.findIndex(
            (item) => item.id === params.row.id
          );
          const duration = timeDifference && timeDifference[index];

          return (
            <>
              {params?.row?.Status === "DIALING" ? (
                <>
                  <span style={{ color: "grey" }}>
                    {duration ? `00:00:00` : ""}
                  </span>
                </>
              ) : (
                <>
                  {" "}
                  <span style={{ color: "green" }}>
                    {duration
                      ? `${duration.hours}:${duration.minutes}:${duration.seconds}`
                      : ""}
                  </span>
                </>
              )}
            </>
          );
        }
        return null;
      },
    },
    {
      field: "TimeStamp",
      headerName: "Date Time",
      headerClassName: "custom-header",
      flex: 1,
      minWidth: 170,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      align: "left",
      renderCell: (params) => {
        if (params.value !== null) {
          const date = new Date(params.value);
          var day = date.getUTCDate();
          var month = date.getUTCMonth() + 1; // Month starts from 0
          var year = date.getUTCFullYear();
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var seconds = date.getSeconds();

          // Formatting single-digit day/month with leading zero if needed
          day = (day < 10 ? "0" : "") + day;
          month = (month < 10 ? "0" : "") + month;

          // Formatting single-digit hours/minutes/seconds with leading zero if needed
          hours = (hours < 10 ? "0" : "") + hours;
          minutes = (minutes < 10 ? "0" : "") + minutes;
          seconds = (seconds < 10 ? "0" : "") + seconds;

          return (
            <>
              <span style={{ color: "blue" }}>
                {day}/{month}/{year}
              </span>
              &nbsp;
              <span style={{ color: "green" }}>
                {hours}:{minutes}:{seconds}
              </span>
            </>
          );
        }
      },
    },

    // {
    //   field: "Info",
    //   headerName: "Information",
    //   width: 150,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    // },

    // {
    //   field: "Extensions",
    //   headerName: "Extensions",
    //   width: 200,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => (
    //     <div>
    //       {Object.entries(params.row.Extensions || {}).map(([key, value]) => (
    //         <div key={key}>
    //           <strong>{key}: </strong>
    //           {value}
    //         </div>
    //       ))}
    //     </div>
    //   ),
    // },
    // {
    //   field: "AnsweredBy",
    //   headerName: "Answered By",
    //   width: 150,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    // },
    
    {
      field: "hangup",
      headerName: "Hangup",
      headerClassName: "custom-header",
      flex: 1,
      minWidth: 70,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      align: "left",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.Status === "BUYER_ANSWERED" && (
              <Button
                // variant="outlined"
                sx={{
                  ":hover": {
                    bgcolor: "error.main",
                    color: "white",
                  },
                  padding: "2px",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  color: "error.main",
                  borderColor: "error.main",
                  border: "1px solid #d32f2f",
                }}
                onClick={(e) => {
                  handleHangup(params.row);
                }}
              >
                <IconBase>
                  <PhoneDisabledIcon />
                </IconBase>
              </Button>
            )}
          </div>
        );
      },
    },
   
  ];

  // --------------Only Mobile View Columns Data---------------------
  const mobileColumns = allColumns.filter((col) =>
    [
      "DIDNumber",
      "CallerID",
      "ForwardedTo",
      "Status",
      "CallDuration",
      "hangup",
    ].includes(col.field)
  );

  // --------------Table Options---------------------
  const columns = isMobile ? mobileColumns : allColumns;

  // const mockDataTeam = useMemo(() => {

  //   if (state?.getAdminCallActive?.callactive !== undefined) {
  //     return Object.keys(state?.getAdminCallActive?.callactive)
  //       .map((key) => ({
  //         id: key,
  //         ...state?.getAdminCallActive?.callactive[key],
  //       }))
  //       .filter((item) => item.UserId === user.uid);
  //   }else {
  //     return [];
  //   }
  // }, [state?.getAdminCallActive?.callactive]);

  const mockDataTeam = useMemo(() => {
    if (state?.getAdminCallActive?.callactive !== undefined) {
      // Parse the object and map keys to desired structure
      const parsedData = Object.keys(state?.getAdminCallActive?.callactive)
        .map((key) => {
          try {
            const parsedValue = JSON.parse(
              state?.getAdminCallActive?.callactive[key]
            ); // Parse JSON string
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
      // Sort data by TimeStamp in descending order
      return parsedData.sort((a, b) => {
        const dateA = dayjs(a.TimeStamp);
        const dateB = dayjs(b.TimeStamp);
        return dateB - dateA; // Descending order
      });
    }
    return [];
  }, [state?.getAdminCallActive?.callactive, user.uid]);

  useEffect(() => {
    // Prepare timeStamp array from mockDataTeam
    const formattedTimeStamps = mockDataTeam?.map((item) => ({
      id: item.id,
      TimeStamp: item.TimeStamp, // Assuming TimeStamp is a property of each item
    }));

    setTimeStamp(formattedTimeStamps);
  }, [mockDataTeam]);

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
                            <div
                              className="cntnt_title"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
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
                                  Active Calls
                                </h3>
                                {/* <p>Use this to monitor and interact with the active calls.</p> */}
                              </div>
                            </div>
                            <div className="row">
                                  <ThemeProvider theme={theme}>
                                    <div
                                      style={{ height: "100%", width: "100%" }}
                                    >
                                      <StyledDataGrid
                                                                  // checkboxSelection
                                                                  rows={mockDataTeam}
                                                                  columns={columns}
                                                                  density="compact"
                                                                  headerClassName="custom-header"
                                                                  // getRowClassName={(params) =>
                                                                  //   isRowBordered(params)
                                                                  //     ? classes.borderedGreen
                                                                  //     : classes.borderedRed
                                                                  // }
                                                                  components={{ Toolbar: GridToolbar }}
                                                                  slots={{
                                                                    toolbar: CustomToolbar,
                                                                    footer: CustomFooterStatusComponent,
                                                                  }}
                                                                  autoHeight
                                                                />
                                    </div>
                                  </ThemeProvider>
                            </div>
                          </div>
                        </div>

                        {/* <!----> */}
                        {/* 
            <!----> */}
                      </div>
                      {/* <!----> */}
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

export default CallActive;
