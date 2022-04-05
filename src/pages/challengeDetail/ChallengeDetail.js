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
import { useHistory, useParams } from "react-router";
import Leaderboard from "./components/LeaderBoard";
import FloatButton from "../../components/FloatButton";
import Divider from "@mui/material/Divider";
import NewAttempt from "./components/NewAttempt";
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import Alert from "../../components/Alert";
import ChallengeInfo from "../../components/ChallengeInfo";
import { useCurrentUser } from "../../components/CurrentUserContext";
import axios from "axios";
import Image from "../../assets/404.png";

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
  const id = useParams();
  const { currentUser, currentUserRole } = useCurrentUser();

  let [challengeName, setChallengName] = useState("");
  let [testCases, setTestCases] = useState([]);
  let [description, setDescription] = useState("");
  let [solution, setSolution] = useState("");
  let [schema, setSchema] = useState("");
  let [records, setRecords] = useState();
  let [expirationDate, setExpirationDate] = useState("");
  let [creator, setCreator] = useState("");
  let [createdDate, setCreatedDate] = useState("");
  let [displayNewAttemptDialogue, setDisplayNewAttemptDialogue] = useState(
    false
  );
  let [topAttempts, setTopAttempts] = useState([]);
  let [challengeType, setChallengeType] = useState('');
  let [displaySuccess, setDisplaySuccess] = useState(false);
  let [displayError, setDisplayError] = useState(false);
  let [notFound, setNotFound] = useState(false);

  const handleCloseNewAttempt = () => {
    setDisplayNewAttemptDialogue(false);
  };

  const handleClickNewAttempt = () => {
    setDisplayNewAttemptDialogue(true);
  };

  useEffect(() => {
    // fetch from APIs
    console.log(currentUser, currentUserRole, id);
    axios
      .get(`${process.env.REACT_APP_API_URL}/challenges/${id.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setChallengName(res.data.data.name);
        setTestCases(res.data.data.test_cases);
        setDescription(res.data.data.description);
        setSolution(res.data.data.solution);
        setCreatedDate(res.data.data.created_at);
        setSchema(res.data.data.init);
        setTopAttempts(res.data.data.top_attempts);
        setExpirationDate(res.data.data.expires_at);
        setChallengeType(res.data.data.type);
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/users/${res.response.data.created_user_id}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setCreator(res.response.data.full_name);
          })
          .catch((res) => {
            console.log(res);
            // setNotFound(true);
          });
      })
      .catch((res) => {
        console.log(res);
        // setNotFound(true);
      });
  }, []);

  return notFound ? (
    <Grid
      container
      component="error_page"
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f9fafb",
      }}
      justifyContent="space-around"
      alignItems="center"
    >
      <Grid
        item
        xs={false}
        md={8}
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#ffffff",
          width: "100vw",
          height: "100vh",
        }}
      />
    </Grid>
  ) : (
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
        Created at {createdDate}
      </Divider>
      <Container disableGutters component="main" sx={{ pt: 8, pb: 6 }}>
        <Leaderboard rows={topAttempts} />
      </Container>
      {/* End hero unit */}
      <Container disableGutters component="main" sx={{ pt: 8, pb: 6 }}>
        {/* <Grid container spacing={5} > */}
        <Grid item sx={{ pt: 2, pb: 2 }}>
          <Typography variant="h6" color="text.primary">
            <b>Challenge descriptions</b>
          </Typography>
        </Grid>
        <Grid item sx={{ pt: 2, pb: 2 }}>
          <ChallengeInfo
            testCases={testCases}
            schema={schema}
            expirationDate={expirationDate}
            description={description}
            type={challengeType}
          />
        </Grid>
        {/* </Grid> */}
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
          challengeId={id.id}
          user={currentUser}
          handleSuccess={() => setDisplaySuccess(true)}
          testCases={testCases}
          schema={schema}
          expirationDate={expirationDate}
          description={description}
          type={challengeType}
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
          Attempt submitted successfully. Please check your results later.
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
      {currentUserRole === "STUD" && (
        <FloatButton handleClick={handleClickNewAttempt} />
      )}
    </div>
  );
}
