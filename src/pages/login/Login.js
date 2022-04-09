import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignUp from "./components/SignUp";
import Dialog from "@mui/material/Dialog";
import Image from "../../assets/db.gif";
import Snackbar from "@mui/material/Snackbar";
import Alert from "../../components/Alert";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../../components/CurrentUserContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        CS5421
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  let history = useHistory();
  const { pushCurrentUser } = useCurrentUser();

  const [showSignupDialog, setShowSignupDialog] = React.useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [validation, setValidation] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          email: data.get("email"),
          unsafe_password: data.get("password"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("return:", res.data.data.id, res.data.data.role)
        pushCurrentUser(res.data.data.id, res.data.data.role);
        history.push(`/challenges`);
      })
      .catch((res) => {
        handleError(res);
      });
  };

  const onClickSignUp = () => {
    setShowSignupDialog(true);
  };

  const handleClose = () => {
    setShowSignupDialog(false);
  };

  const handleError = (error) => {
    console.log(error.response);
    setErrorMsg(error.response.data.message);
    setValidation(error.response.data.validation ? error.response.data.validation : [])
    setDisplayError(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2" onClick={onClickSignUp}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={displaySuccess}
        autoHideDuration={2000}
        onClose={() => setDisplaySuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setDisplaySuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Account created. Please sign in below.
        </Alert>
      </Snackbar>
      <Snackbar
        open={displayError}
        autoHideDuration={6000}
        onClose={() => setDisplayError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setDisplayError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error. {errorMsg}
          {Object.keys(validation).map((keyName, msgs) => (
            <Box key={keyName}>
              {validation[keyName].map((msg) => (
                <Box>
                  {keyName}: {msg}
                </Box>
              ))}
            </Box>
          ))}
        </Alert>
      </Snackbar>
      <Dialog onClose={handleClose} open={showSignupDialog}>
        <SignUp
          handleClose={handleClose}
          handleSuccess={setDisplaySuccess}
          handleError={handleError}
        />
      </Dialog>
    </ThemeProvider>
  );
}
