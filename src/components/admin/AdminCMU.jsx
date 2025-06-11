import React, { useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";
import {
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { getAdminCallActive } from "../../redux/actions/adminPortal_callActiveAction";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddMinuteHistory,
  getHistory,
  postAddMinuteHistory,
} from "../../redux/actions/adminPortal_historyAction";
import { getAllUsers } from "../../redux/actions/userAction";
import {
  getAdminResellersList,
  getAdminUsersList,
} from "../../redux/actions/adminPortal_listAction";
import { StyledDataGrid } from "../../pages/CustomDataGrid";
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
      height: "48px",
      minWidth: "120px",
      justifyContent: "center",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px",
    },
    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
      top: "-4px !important",
    },
    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "11.5px 14px",
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
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
        exportButton: true,
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

function AdminCMU({ colorThem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [resellerId, setResellerId] = useState("");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [tMinutes, setTMinutes] = useState("");
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [resellers, setResellers] = useState([]);

  useEffect(() => {
    dispatch(getAdminCallActive());
    dispatch(getAllUsers(""));
    dispatch(getHistory({}));
    dispatch(getAddMinuteHistory());
    dispatch(postAddMinuteHistory({}));
    dispatch(getAdminUsersList());
    dispatch(getAdminResellersList());
  }, []); // Empty dependency array ensures this effect runs once on mount

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
    if (state?.getAdminResellersList?.resellerList) {
      const resellerArray = Object.keys(
        state?.getAdminResellersList?.resellerList
      )?.map((key) => ({
        reseller_id: key,
        username: state?.getAdminResellersList?.resellerList[key],
      }));
      setResellers(resellerArray);
    }
  }, [
    state?.getAdminUsersList?.userList,
    state?.getAdminResellersList?.resellerList,
  ]);

  // --------------Columns Data Condition For Mobile View and Desktop View---------------------
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
  const columns = [
    {
      field: "username",
      headerName: "User Name",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 100 : "100%",
      minWidth: 100,
      maxWidth: "100%",
      headerAlign: "start",
      align: "start",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => (
        <span
          style={{
            textTransform: "capitalize",
            fontSize: "calc(0.6rem + 0.3vw)",
          }}
        >
          {params.row.username}
        </span>
      ),
    },
    {
      field: "added_by",
      headerName: "Number of TFN",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 90 : "100%",
      minWidth: 90,
      maxWidth: "100%",
      headerAlign: "start",
      align: "start",
      cellClassName: "super-app-theme--cell",
      renderHeader: () => (
        <Typography
        variant="body2"
        sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold","&.MuiTypography-root": { color: "#fff !important" }, }}
        >
          {isSmallScreen ? "TFN" : "Number of TFN"}
        </Typography>
      ),
      renderCell: (params) => (
        <span
          style={{
            textTransform: "capitalize",
            fontSize: "calc(0.6rem + 0.3vw)",
          }}
        >
          {params.row.added_by}
        </span>
      ),
    },
    {
      field: "topup",
      headerName: "Plan",
      flex: 1,
      width: isXs ? 60 : "100%",
      minWidth: 60,
      maxWidth: "100%",
      headerClassName: "custom-header",
      headerAlign: "start",
      align: "start",
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
      field: "reseller_name",
      headerName: "Courrent Month Used",
      flex: 1,
      width: isXs ? 70 : "100%",
      minWidth: 70,
      maxWidth: "100%",
      headerClassName: "custom-header",
      headerAlign: "start",
      align: "start",
      renderHeader: () => (
        <Typography
        variant="body2"
        sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold","&.MuiTypography-root": { color: "#fff !important" }, }}
        >
          {isSmallScreen ? "CMU" : "Courrent Month Used"}
        </Typography>
      ),
      renderCell: (params) => (
        <span
          style={{
            textTransform: "capitalize",
            fontSize: "calc(0.6rem + 0.3vw)",
          }}
        >
          {params.row.reseller_name}
        </span>
      ),
    },
  ];

  const classes = useStyles();

  const rows = [];
  state?.getAdminHistory?.getHistory &&
    state?.getAdminHistory?.getHistory?.forEach((item, index) => {
      rows.push({
        id: index + 1,
        added_by: item.added_by,
        topup: item.topup,
        username: item.username,
        user_id: item.user_id,
        reseller_name: item.reseller_name,
      });
    });

  const rows1 = [];
  state?.postAdminAddMinute?.addMinute &&
    state?.postAdminAddMinute?.addMinute?.forEach((item, index) => {
      rows1.push({
        id: index + 1,
        total_add_minutes: item.total_add_minutes,
        user: item.username,
        user_id: item.user_id,
      });
    });

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
                          <h3
                            style={{
                              margin: "0px",
                              color: "#f5751D",
                              fontWeight: "500",
                              fontSize: "2rem",
                            }}
                          >
                            Current Month Used
                          </h3>
                        </div>
                        <ThemeProvider theme={theme}>
                          <div
                            style={{
                              height: "100%",
                              width: "100%",
                              marginTop: "15px",
                            }}
                          >
                            <StyledDataGrid
                              rows={rows}
                              columns={columns}
                              headerClassName="custom-header"
                              density="compact"
                              components={{ Toolbar: GridToolbar }}
                              slots={{
                                toolbar: CustomToolbar,
                              }}
                              autoHeight
                              sx={{
                                "& .MuiDataGrid-toolbarContainer": {
                                  gap: "1px",     // Spacing between buttons
                                },
                                "& .MuiButton-root": { // Targets all buttons (filter, export, density)
                                  fontSize: "calc(0.6rem + 0.4vw)", // Button text size
                                  minWidth: "unset",   // Remove minimum width constraint
                                },
                                "& .MuiSvgIcon-root": { // Icons inside buttons
                                  fontSize: "calc(0.6rem + 0.4vw)",     // Adjust icon size
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
          </Box>
        </div>
      </div>
    </>
  );
}

export default AdminCMU;
