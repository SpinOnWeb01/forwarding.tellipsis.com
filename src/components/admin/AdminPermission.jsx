import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../Switcher.scss";
import { usersGroupRolesList } from "../../mockData";
import {
  getPermissions,
  putPermission,
} from "../../redux/actions/adminPortal_permissionAction";
import { getAdminRoles } from "../../redux/actions/adminPortal/adminPortal_rolesAction";

const drawerWidth = 240;

function AdminPermission({ colorThem }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [usersData, setusersData] = React.useState(null);
  const role = JSON.parse(localStorage.getItem("admin"));

  const [selectedValue, setSelectedValue] = React.useState("1");
  const [autoCompleteValue, setAutoCompleteValue] = React.useState(null);
  const [autoCompleteInputValue, setAutoCompleteInputValue] =
    React.useState("Admin");
  const [autoCompleteRoleValue, setAutoCompleteRoleValue] =
    React.useState(null);
  const [autoCompleteRoleInputValue, setAutoCompleteRoleInputValue] =
    React.useState("");
  const [selectedCheck, setSelectedCheck] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState(null);
  const [createList, setCreateList] = React.useState([]);
  const [updateList, setUpdateList] = React.useState([]);
  const [deleteList, setDeleteList] = React.useState([]);
  const [othersList, setOthersList] = React.useState([]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setAutoCompleteValue(null);
    setAutoCompleteRoleValue(null);
    setAutoCompleteInputValue("");
    setAutoCompleteRoleInputValue("");
  };

  function update(arr, id, updatedData) {
    return arr.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
  }

  useEffect(() => {
    dispatch(getAdminRoles());
  }, [dispatch]);

  useEffect(() => {
    if (!state.allPermissions.loading) {
      let permissions = state?.allPermissions?.permissions;
      const createList = permissions.filter((permission) =>
        permission.name.includes("create")
      );
      const updateList = permissions.filter((permission) =>
        permission.name.includes("update")
      );
      const deleteList = permissions.filter((permission) =>
        permission.name.includes("delete")
      );
      const othersList = permissions.filter(
        (permission) =>
          !permission.name.includes("delete") &&
          !permission.name.includes("update") &&
          !permission.name.includes("create")
      );
      setCreateList(createList);
      setUpdateList(updateList);
      setDeleteList(deleteList);
      setOthersList(othersList);
    }
  }, [state.allPermissions]);

  useEffect(() => {
    if (state.updatePermission && state.updatePermission.updatedResponse) {
      if (selectedType && selectedType === "create") {
        const updatedData = { enabled: selectedCheck.data.enable_flag };
        const updatedArrayList = update(
          [...createList],
          selectedCheck.data.perm_id,
          updatedData
        );
        setCreateList(updatedArrayList);
      }

      if (selectedType && selectedType === "update") {
        const updatedData = { enabled: selectedCheck.data.enable_flag };
        const updatedArrayList = update(
          [...updateList],
          selectedCheck.data.perm_id,
          updatedData
        );
        setUpdateList(updatedArrayList);
      }

      if (selectedType && selectedType === "delete") {
        const updatedData = { enabled: selectedCheck.data.enable_flag };
        const updatedArrayList = update(
          [...deleteList],
          selectedCheck.data.perm_id,
          updatedData
        );
        setDeleteList(updatedArrayList);
      }

      if (selectedType && selectedType === "othersList") {
        const updatedData = { enabled: selectedCheck.data.enable_flag };
        const updatedArrayList = update(
          [...othersList],
          selectedCheck.data.perm_id,
          updatedData
        );
        setOthersList(updatedArrayList);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.updatePermission.updating]);

  const handleRadioChange = (e, role, selectedData) => {
    let payloadData = {
      data: {
        name: selectedData.name,
        description: selectedData.description,
        grp_role_id: autoCompleteValue?.id,
        perm_id: selectedData.id,
        enable_flag: e.target.checked,
      },
    };
    setSelectedCheck(payloadData);
    setSelectedType(role);
    dispatch(putPermission(selectedData.id, payloadData));
  };

  const userGroupChange = async (newValue) => {
    setAutoCompleteValue(newValue);
    dispatch(getPermissions(newValue.id));
  };

  // ========================>
  const userRoleChange = (newValue) => {};

  const activeRoles = useMemo(() => {
  return (state?.getAdminRoles?.roles || []).filter(
    (role) => role.is_active === true
  );
}, [state?.getAdminRoles?.roles]);

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
           
           <div style={{ marginTop: "15px" }}>
              <Grid container spacing={1}>
                {/* {selectedValue === "mal2e" && ( */}
                <Grid item md={12}>
                  <Grid item xs={4} md={4}>
                    <Autocomplete
                      disablePortal
                      id="user-dropdown"
                      value={autoCompleteValue} // Make sure autoCompleteValue matches an option object
                      onChange={(event, newValue) => {
                        userGroupChange(newValue);
                      }}
                      inputValue={autoCompleteInputValue}
                      onInputChange={(event, newInputValue) => {
                        setAutoCompleteInputValue(newInputValue);
                      }}
                      options={activeRoles}
                      getOptionLabel={(option) => option.name}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Group" />
                      )}
                    />
                  </Grid>
                  {autoCompleteValue && (
                    <Grid
                      container
                      className="mt-15"
                      style={{ padding: "20px 0px" }}
                      spacing={2}
                    >
                     
                      <Grid item lg={3} sm={12} xs={12}>
                        <Box className="selectgroup_box">
                          <FormControlLabel
                            className="select_title"
                            control={<Checkbox defaultChecked />}
                            label="Create"
                          />
                          <FormGroup className="selectgroup_row">
                            {createList.map((create) => {
                              return (
                                <FormControlLabel
                                  key={create.id}
                                  control={
                                    <Checkbox
                                      onChange={(e) =>
                                        handleRadioChange(e, "create", create)
                                      }
                                      checked={create.enabled}
                                      disabled={role.user_role !== "Superadmin"}
                                    />
                                  }
                                  label={create.description}
                                />
                              );
                            })}
                          </FormGroup>
                        </Box>
                      </Grid>
                      <Grid item lg={3} sm={12} xs={12}>
                        <Box className="selectgroup_box">
                          <FormControlLabel
                            className="select_title"
                            control={<Checkbox defaultChecked />}
                            label="Update"
                          />
                          <FormGroup className="selectgroup_row">
                            {updateList.map((update) => {
                              return (
                                <FormControlLabel
                                  key={update.id}
                                  control={
                                    <Checkbox
                                      onChange={(e) =>
                                        handleRadioChange(e, "update", update)
                                      }
                                      checked={update.enabled}
                                      disabled={role.user_role !== "Superadmin"} // Disable if not Superadmin
                                    />
                                  }
                                  label={update.description}
                                />
                              );
                            })}
                          </FormGroup>
                        </Box>
                      </Grid>
                      <Grid item lg={3} sm={12} xs={12}>
                        <Box className="selectgroup_box">
                          <FormControlLabel
                            className="select_title"
                            control={<Checkbox defaultChecked />}
                            label="Delete"
                          />
                          <FormGroup className="selectgroup_row">
                            {deleteList.map((del) => {
                              return (
                                <FormControlLabel
                                  key={del.id}
                                  control={
                                    <Checkbox
                                      onChange={(e) =>
                                        handleRadioChange(e, "delete", del)
                                      }
                                      checked={del.enabled}
                                      disabled={role.user_role !== "Superadmin"} // Disable if not Superadmin
                                    />
                                  }
                                  label={del.description}
                                />
                              );
                            })}
                          </FormGroup>
                        </Box>
                      </Grid>
                      <Grid item lg={3} sm={12} xs={12}>
                        <Box className="selectgroup_box">
                          <FormControlLabel
                            className="select_title"
                            control={<Checkbox defaultChecked />}
                            label="Others"
                          />
                          <FormGroup className="selectgroup_row">
                            {othersList.map((other) => {
                              return (
                                <FormControlLabel
                                  key={other.id}
                                  control={
                                    <Checkbox
                                      onChange={(e) =>
                                        handleRadioChange(
                                          e,
                                          "othersList",
                                          other
                                        )
                                      }
                                      checked={other.enabled}
                                      disabled={role.user_role !== "Superadmin"} // Disable if not Superadmin
                                    />
                                  }
                                  label={other.description}
                                />
                              );
                            })}
                          </FormGroup>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                {/* )} */}
              </Grid>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default AdminPermission;
