import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { StyledDataGrid } from "../../pages/CustomDataGrid";
import { GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/userAction";
import {
  createAdminPromotion,
  getAdminPromotion,
} from "../../redux/actions/adminPortal/adminPortal_promotionAction";
import { Delete, Edit } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 240;
function AdminPromotional({ colorThem }) {
  const theme = useTheme();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectfile, setSelectfile] = useState("");
  const [userId, setUserId] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");

  const handleReset = () => {
    setUserId([]);
    setTitle("");
    setContent("");
    setSelectfile("");
  };

  const handleSlctFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectfile(file);
    }
  };

  useEffect(() => {
    dispatch(getAllUsers(""));
    dispatch(getAdminPromotion());
  }, [dispatch, response]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("title", title);
    formData.append("content", content);
    if (selectfile) {
      formData.append("files", selectfile);
    }
    dispatch(createAdminPromotion(formData, handleReset, setResponse));
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // < 600px
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // 600px - 900px
  const isMd = useMediaQuery(theme.breakpoints.only("md")); // 900px - 1200px
  const isSmallScreen = useMediaQuery(theme.breakpoints.between("sm"));

  const columns = [
    {
      field: "view_buyer",
      headerName: "Action",
      sortable: false,
      headerAlign: "start",
      align: "start",
      width: isXs ? 80 : 90,
      minWidth: 80,
      maxWidth: 90,
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color:"white !important"
          }}
        >
          Action
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <Tooltip title="Edit" disableInteractive interactive>
              <IconButton>
                <Edit
                  index={params.row.id}
                  style={{
                    cursor: "pointer",
                    color: "#42765f",
                    fontSize: isMobile ? "14px" : "16px",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" disableInteractive interactive>
              <IconButton>
                <Delete
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: isMobile ? "14px" : "16px",
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
      headerName: "User Name",
      cellClassName: "super-app-theme--cell",
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
      field: "title",
      headerName: "Title",
      cellClassName: "super-app-theme--cell",
      width: isXs ? 200 : 240,
      minWidth: 200,
      maxWidth: 240,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
        >
          Title
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
      field: "content",
      headerName: "Content",
      cellClassName: "super-app-theme--cell",
      width: isXs ?180 : 200,
      minWidth: 180,
      maxWidth: 200,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
        >
          Content
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
      field: "file_name",
      headerName: "Image",
      width: isXs ?100 : 140,
      minWidth: 100,
      maxWidth: 140,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important"}}
        >
          Image
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
      field: "file_data",
      headerName: "Image",
      width: isXs?80 : 120,
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
          Image
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <img
            src={params.value}
            alt="promotion"
            style={{ width:isMobile?"50px":"100px", height:isMobile?"50px":"100px", }}
          />
        );
      },
    },
    {
      field: "is_active",
      headerName: "Status",
      width: isXs?80 : 120,
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
          Status
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.is_active === 0 ? (
              <>
                <div
                  style={{
                    color: "white",
                    background: "green",
                    padding: "7px 0 0 0",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                    height: "30px",
                    width: "62px",
                    textAlign: "center",
                  }}
                >
                  Active
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "white",
                    background: "red",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
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
    state?.getAdminPromotion?.promotions &&
      state?.getAdminPromotion?.promotions?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          content: item.content,
          file_data: item.file_data,
          user_id: item.user_id,
          promoId: item.id,
          file_name: item.file_name,
          title: item.title,
          is_active: item.is_active,
          username: item.username,
        });
      });
    return calculatedRows;
  }, [state?.getAdminPromotion?.promotions]);

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
          <h3
            style={{
              margin: "0px",
              color: "#f5751D",
              fontWeight: "500",
              fontSize: "2rem",
            }}
          >
            Promotions
          </h3>
          <Grid container style={{ padding: "5px 0" }}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <FormControl fullWidth style={{ margin: "5px 0 5px 0" }}>
                <InputLabel id="demo-simple-select-label">UserName</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="UserName"
                  style={{ textAlign: "left" }}
                  multiple
                  value={userId || []}
                  onChange={(e) => {
                    setUserId(e.target.value);
                  }}
                  renderValue={
                    (selected) =>
                      state?.allUsers?.users
                        ?.filter((user) => selected.includes(user.id)) // Find selected users
                        .map((user) => user.username) // Get usernames
                        .join(", ") // Join usernames with commas
                  }
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
                        <MenuItem key={index} value={item.id}>
                          <Checkbox checked={userId.includes(item.id)} />{" "}
                          {/* Add Checkbox */}
                          {item.username}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              <TextField
                style={{ width: "100%", margin: "4px 0" }}
                type="text"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                style={{ width: "100%", margin: "4px 0" }}
                id="outlined-multiline-flexible"
                label="Content"
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <label htmlFor="image-upload">
                <Button variant="contained" color="primary" component="span">
                  Select Image
                </Button>
              </label>
            </Grid>

            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Box className="promotion_image">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image-upload"
                  type="file"
                  onChange={handleSlctFile}
                />
                {selectfile && (
                  <Box
                    component="img"
                    src={URL.createObjectURL(selectfile)}
                    sx={{
                      maxWidth: {
                        xs: "19rem",
                        sm: "19rem",
                        md: "18rem",
                        lg: "20rem",
                        xl: "25rem",
                      },
                      minWidth: "6rem",
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Button
              variant="contained"
              color="success"
              component="span"
              onClick={handleSubmit}
              className="align-items-center mt-2"
            >
              Submit
            </Button>
          </Grid>
          <div style={{ height: "100%", width: "100%" }}>
            <StyledDataGrid
              rows={rows}
              columns={columns}
              density="compact"
              components={{ Toolbar: GridToolbar }}
              autoHeight
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
        </Box>
      </div>
    </div>
  );
}

export default AdminPromotional;
