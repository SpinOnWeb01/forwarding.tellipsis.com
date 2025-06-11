import React, { useEffect, useRef, useState } from "react";
import "../../style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../redux/actions/userAction";
import axios from "axios";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { api } from "../../mockData";
import { IconButton, InputAdornment } from "@mui/material";

const CssTextField = withStyles({
  root: {
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
  input: {
    color: "white", // Set default text color to white
    backgroundColor: "rgb(232, 241, 250)", // Set default background color
  },
})(TextField);

function Login() {
  const current_user = localStorage.getItem("current_user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const location = useLocation();
  const redirect = location?.state?.data;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = JSON.stringify({ username: email, password: password });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const values = response?.data;
        if (values?.status === 200) {
          if (values.user_role === "Superadmin") {
            // localStorage.setItem("current_superadmin", values.user_name);
            // localStorage.setItem(`superadmin_${values.user_name}`, JSON.stringify(values));
            localStorage.setItem("admin", JSON.stringify(values));
            navigate("/admin_portal", { state: { data: data } });
          } else if (values.user_role === "Admin") {
            localStorage.setItem("admin", JSON.stringify(values));
            navigate("/admin_portal");
          } else if (values.user_role === "Reseller") {
            localStorage.setItem("admin", JSON.stringify(values));
            localStorage.setItem("reseller", JSON.stringify(values));
            navigate("/reseller_portal");
          } else if (values.user_role === "User") {
            localStorage.setItem("current_user", values.user_name);
            localStorage.setItem(
              `user_${values.user_name}`,
              JSON.stringify(values)
            );
            navigate("/redirect_portal");
          } else if (values.user_role === "Client") {
            localStorage.setItem(
              `user_${values.user_name}`,
              JSON.stringify(values)
            );
            navigate("/redirect_portal");
          }
          // navigate("/dashboard");
          // Clear the form fields
          setEmail("");
          setPassword("");

          dispatch(login(values));
        }
        if (values.status === 200) {
          toast.success(values.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          //   navigate("/"})
        } else {
          toast.error(values.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
        });
      });
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  };

  return (
    <section className="login-sec">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-cente m-auto">
          <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center align-items-center">
            <div className="login-logo">
              <Card className="login-box" sx={{}}>
                <CardContent>
                  <Typography>
                    <img
                      src={`../img/logo_white11.png`}
                      className="img-fluid d-block mx-auto"
                      alt={"login logo"}
                      style={{ paddingBottom: "20px" }}
                    />
                  </Typography>

                  <form className="login_form" onKeyDown={handleKeyPress}>
                    {/* <CssTextField
                        id="outlined-password-input"
                        value={email}
                        variant="outlined"
                        style={{ width: "100%", margin: "0px" }}
                        required
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        label="Username"
                        className="email"
                        name="email"
                        type="email"
                        autoComplete="current-password"
                        margin="normal"
                        inputProps={{ style: { color: "white" } }}
                        onFocus={handleFocus}
                      />

                      <CssTextField
                        id="outlined-password-input"
                        value={password}
                        variant="outlined"
                        style={{ width: "100%", margin: "30px 0" }}
                        required
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        label="Password"
                        className="password"
                        name="password"
                        type="text"
                        autoComplete="current-password"
                        margin="normal"
                        inputProps={{
                          style: { color: "white", WebkitTextSecurity: "disc" },
                        }}
                        onFocus={handleFocus}
                      /> */}
                    {/* Username Field */}
                    <label
                      htmlFor="username-input"
                      style={{
                        color: "#fff",
                        textAlign: "left",
                        display: "block",
                        paddingBottom: "3px",
                      }}
                    >
                      Username
                    </label>
                    <TextField
                      id="username-input"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Username"
                      variant="outlined"
                      autoComplete="email" // Enable autofill for email/username
                      type="text"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white", // Default border color
                          },
                          "&:hover fieldset": {
                            borderColor: "white", // Border color on hover
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white", // Border color when focused
                          },
                          "& input::placeholder": {
                            color: "white !important", // Set placeholder color to white
                          },
                        },
                        input: { color: "white" }, // Input text color
                      }}
                    />

                    {/* Password Field */}
                    <label
                      htmlFor="password-input"
                      style={{
                        color: "#fff",
                        textAlign: "left",
                        display: "block",
                        paddingBottom: "3px",
                      }}
                    >
                      Password
                    </label>
                    <TextField
                      id="password-input"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      variant="outlined"
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                              style={{ color: "#fff" }}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white", // Default border color
                          },
                          "&:hover fieldset": {
                            borderColor: "white", // Border color on hover
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white", // Border color when focused
                          },
                          "& input::placeholder": {
                            color: "white", // Set placeholder color to white
                          },
                        },
                        input: { color: "white" }, // Input text color
                      }}
                    />

                    <Typography
                      variant="body2"
                      className="text-end login-inpt-txt"
                    >
                      <p
                        style={{ cursor: "pointer", color: "#fff" }}
                        onClick={() => {
                          navigate("/send_email");
                        }}
                      >
                        Forgot you password?
                      </p>
                    </Typography>
                  </form>
                </CardContent>
                <CardActions
                  className="d-flex justify-content-center"
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    margin: "0px",
                  }}
                >
                  <Button
                    type="submit"
                    // className="info-btn login-submit"
                    className="login_button"
                    onClick={handleSubmit}
                    ref={buttonRef}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "0px",
                    }}
                    sx={{ margin: "0px !important" }}
                  >
                    Submit
                  </Button>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
