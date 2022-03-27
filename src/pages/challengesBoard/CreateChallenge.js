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
import Alert from "../../components/Alert";
import ChallengeInfoEditable from "../../components/ChallengeInfoEditable";

const theme = createTheme();

export default function CreateChallenge(props) {
  let [challengeName, setChallengeName] = useState(props.challengeName);
  let [codeStr, setCodeStr] = useState("");
  let [comments, setComments] = useState("");
  let [displayError, setDisplayError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (codeStr === "") {
      setDisplayError(true);
    } else {
      const data = {
        codeStr: codeStr,
        comments: comments,
        user: props.user,
        timeStamp: new Date(),
        challengeName: challengeName,
      };
      console.log(data);
      props.handleClose();
    }
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
            Create New Challenge
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
                <ChallengeInfoEditable />
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
          Code is required. Please enter your code.
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
