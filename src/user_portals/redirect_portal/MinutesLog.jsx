import React, { useEffect } from "react";
import "../../../src/style.css";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getRedirectBillingHistory } from "../../redux/actions/redirectPortal/redirectPortal_billingHistoryAction";
import { StyledDataGrid } from "../../pages/CustomDataGrid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";

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
        exportButton: true,
      },
    },
  },
});
function MinutesLog({ userThem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRedirectBillingHistory());
  }, []);

  // --------------Columns Data Condition For Mobile View and Desktop View---------------------
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // < 600px
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // 600px - 900px
  const isMd = useMediaQuery(theme.breakpoints.only("md")); // 900px - 1200px

  const columns = [
    // {
    //   field: "username",
    //   headerName: "User Name",
    //   headerClassName: "custom-header",
    //   flex: 1,
    //   width: isXs ? 80 : "100%",
    //   minWidth: 80,
    //   maxWidth: "100%",
    //   headerAlign: "left",
    //   disableColumnMenu: true, // Prevents menu on hover
    //   sortable: false, // Allows sorting on click but not on hover
    //   align: "left",
    //   renderHeader: () => (
    //     <Typography
    //       variant="body2"
    //       sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold" }}
    //     >
    //       User Name
    //     </Typography>
    //   ),
    //   renderCell: (params) => (
    //     <Typography
    //       variant="body2"
    //       sx={{ fontSize: "calc(0.7rem + 0.3vw)" }} // Match header size or set your own
    //     >
    //       {params.value}
    //     </Typography>
    //   ),
    // },
    {
      field: "added_by",
      headerName: "Added By",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 40 : "100%",
      minWidth: 40,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold" }}
        >
          Added By
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.7rem + 0.3vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "topup",
      headerName: "TopUp Minutes",
      headerClassName: "custom-header",
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
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold" }}
        >
          TopUp Minutes
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.7rem + 0.3vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "added_date",
      headerName: "Date/Time",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 150 : "100%",
      minWidth: 150,
      maxWidth: "100%",
      headerAlign: "left",
      disableColumnMenu: true, // Prevents menu on hover
      sortable: false, // Allows sorting on click but not on hover
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold" }}
        >
          Date/Time
        </Typography>
      ),
      //valueFormatter
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
              <span style={{ color: "blue", fontSize: "calc(0.7rem + 0.3vw)" }}>
                {`${day}/${month}/${year}`}
              </span>
              &nbsp;
              <span
                style={{ color: "green", fontSize: "calc(0.7rem + 0.3vw)" }}
              >
                {`${hours}:${minutes}:${seconds}`}
              </span>
            </>
          );
        }
      },
    },
  ];

  const mockDataTeam = [];
  state?.getRedirectBillingHistory?.RedirectBillingHistory?.data &&
    state?.getRedirectBillingHistory?.RedirectBillingHistory?.data?.forEach(
      (item, index) => {
        mockDataTeam.push({
          id: index + 1,
          added_by: item.added_by,
          added_date: item.added_date,
          topup: item.topup,
          user_id: item.user_id,
          username: item.username,
          billingId: item.id,
        });
      }
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
                            <div className="cntnt_title">
                              <h3
                                style={{
                                  margin: "0px",
                                  color: "#f5751D",
                                  fontWeight: "500",
                                  fontSize: "2rem",
                                }}
                              >
                                Minute Logs
                              </h3>
                              {/* <p>
                            Assign Minutes Details (AMDs) are detailed
                            information on the calls. Use the fields to filter
                            the information for the specific assign Minutes that
                            are desired. Records in the minutes list can be
                            saved locally using the Export button.
                          </p> */}
                            </div>
                            {state?.getRedirectBillingHistory?.loading ===
                            true ? (
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
                                    style={{ height: "100%", width: "100%" }}
                                  >
                                    <StyledDataGrid
                                      className="custom_header_redirect"
                                      rows={mockDataTeam}
                                      columns={columns}
                                      density="compact"
                                      components={{ Toolbar: GridToolbar }}
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

export default MinutesLog;
