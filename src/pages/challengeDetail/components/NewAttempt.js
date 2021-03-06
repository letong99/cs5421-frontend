import { React, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "../../../components/Alert";
import ChallengeInfo from "../../../components/ChallengeInfo";
import axios from "axios";

const theme = createTheme();

export default function NewAttempt(props) {
  const { description, testCases, expirationDate, schema, type } = props;

  let [challengeName, setChallengeName] = useState(props.challengeName);
  let [codeStr, setCodeStr] = useState("");
  let [displayError, setDisplayError] = useState(false);
  let [errorMsg, setErrorMsg] = useState([]);

  const handleError = (error) => {
    console.log(error.response.data.message);
    setErrorMsg(error.response.data.message);
    setDisplayError(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/attempts`,
        {
          query: codeStr,
          user_id: props.user,
          challenge_id: props.challengeId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        props.handleSuccess();
        props.handleClose();
        props.handleRefresh();
      })
      .catch((res) => {
        handleError(res);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Typography component="h3" variant="h5">
            Submit New Attempt to: {challengeName}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h5">Challenge descriptions: </Typography>
              </Grid>
              <Grid item xs={12}>
                <ChallengeInfo
                  testCases={testCases}
                  schema={schema}
                  expirationDate={expirationDate}
                  description={description}
                  type={type}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography component="h5">Enter Your Code Below:</Typography>
              </Grid>
              <Grid item xs={12}>
                <CodeEditor
                  value={codeStr}
                  language="sql"
                  placeholder="Please enter your code here"
                  onChange={(evn) => setCodeStr(evn.target.value)}
                  padding={15}
                  style={{
                    fontSize: 12,
                    backgroundColor: "#f5f5f5",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={displayError}
        autoHideDuration={2000}
        onClose={() => setDisplayError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setDisplayError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error. {errorMsg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
