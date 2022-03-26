import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { useHistory } from "react-router";
import Leaderboard from "./components/LeaderBoard";
import FloatButton from "../../components/FloatButton";
import Divider from "@mui/material/Divider";
import NewAttempt from "./components/NewAttempt";
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import Alert from "../../components/Alert";
import ChallengeInfo from "../../components/ChallengeInfo";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

export default function ChallengeDetail(props) {
  const history = useHistory();

  let [challengeName, setChallengName] = useState("To Be fetched");
  let [records, setRecords] = useState();
  let [creator, setCreator] = useState("Remmy");
  let [createdDate, setCreatedDate] = useState("2022-10-01");
  let [displayNewAttemptDialogue, setDisplayNewAttemptDialogue] = useState(
    false
  );
  let [displaySuccess, setDisplaySuccess] = useState(false);
  let [displayError, setDisplayError] = useState(false);

  const handleCloseNewAttempt = () => {
    // TODO: API post
    let result = "dffsd";
    if (result === "SUCCESS") {
      setDisplaySuccess(true);
    } else if (result === "ERROR") {
      setDisplayError(true);
    }
    setDisplayNewAttemptDialogue(false);
  };

  const handleClickNewAttempt = () => {
    console.log("click");
    setDisplayNewAttemptDialogue(true);
  };

  useEffect(() => {
    // fetch from APIs
  });

  return (
    <div
      id="detail-content"
      style={{
        position: "relative",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignContent: "flex-start",
      }}
      maxWidth="md"
      component="main"
    >
      <h1>{challengeName}</h1>
      <Divider>
        Created by {creator} at {createdDate}
      </Divider>
      <Container disableGutters component="main" sx={{ pt: 8, pb: 6 }}>
        <Leaderboard />
      </Container>
      {/* End hero unit */}
      <Container disableGutters component="main" sx={{ pt: 8, pb: 6 }}>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item>
            <Typography variant="h6" color="text.primary">
              <b>Challenge descriptions</b>
            </Typography>
          </Grid>
          <Grid item>
            <ChallengeInfo />
          </Grid>
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Dialog
        container={() => document.getElementById("detail-content")}
        onClose={handleCloseNewAttempt}
        open={displayNewAttemptDialogue}
        style={{
          position: "flex",
        }}
        PaperProps={{ sx: { width: "70%" } }}
      >
        <NewAttempt
          handleClose={handleCloseNewAttempt}
          challengeName={challengeName}
        />
      </Dialog>
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
          Attempt submitted successfully. Please wait check your results later.
        </Alert>
      </Snackbar>
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
          Error. Please try again later.
        </Alert>
      </Snackbar>
      <FloatButton handleClick={handleClickNewAttempt} />
    </div>
  );
}
