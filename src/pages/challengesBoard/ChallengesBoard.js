import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import FloatButton from "../../components/FloatButton"; // version 5.2.0
import CreateChallenge from "./CreateChallenge";
import { useCurrentUser } from "../../components/CurrentUserContext";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { useParams } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import Alert from "../../components/Alert";

export default function ChallengesBoard() {
  let history = useHistory();
  const { currentUser, currentUserRole } = useCurrentUser();

  const handleClick = (id) => {
    console.log(id);
    history.push(`/details/${id}`);
  };
  const routeChange = () => {
    let path = `/create`;
    history.push(path);
  };
  const id = useParams();
  let [challengeName, setChallengName] = useState("");
  let [records, setRecords] = useState();
  let [testCases, setTestCases] = useState([]);
  let [description, setDescription] = useState([""]);
  let [solution, setSolution] = useState("");
  let [schema, setSchema] = useState("");
  let [expirationDate, setExpirationDate] = useState("");
  let [notFound, setNotFound] = useState(false);
  let [createdDate, setCreatedDate] = useState("2022-10-01");
  let [creator, setCreator] = useState("Remmy");
  let [allRecords, setAllRecords] = useState();
  let [data, setData] = useState([]);
  let [refresh, setRefresh] = useState(false);
  let [displayNewChallengeDialogue, setDisplayNewChallengeDialogue] = useState(
    false
  );
  let [displaySuccess, setDisplaySuccess] = useState(false);

  useEffect(() => {
    // fetch from APIs
    axios
      .get(`${process.env.REACT_APP_API_URL}/challenges`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        setData(res.data.data);
        // console.log(data);
      })
      .catch((res) => {
        // console.log(res);
        setNotFound(true);
      });
  }, []);

  useEffect(() => {
    // fetch from APIs
    axios
      .get(`${process.env.REACT_APP_API_URL}/challenges`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        // const data = res.response.data;
        setData(res.data.data);
        // console.log(data);
      })
      .catch((res) => {
        // console.log(res);
        setNotFound(true);
      });
  }, [refresh]);

  const handleCloseNewChallenge = () => {
    setDisplayNewChallengeDialogue(false);
  };
  const handleCloseAndRefresh = () => {
    setDisplaySuccess(true);
    setDisplayNewChallengeDialogue(false);
    setRefresh(!refresh);
  };
  const handleClickNewChallenge = () => {
    console.log("click");
    setDisplayNewChallengeDialogue(true);
  };

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
    <React.Fragment>
      <h1>Challenges Board</h1>{" "}
      {/* placeholder can delete this line after designing */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
      <Container maxWidth="md" component="main">
        <Grid container spacing={3} alignItems="flex-end">
          {data.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.id} xs={12} md={4}>
              <Card>
                <CardHeader
                  title={tier.name}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h4"
                      variant="h6"
                      color="text.primary"
                      align="center"
                    >
                      Expires at {tier.expires_at}
                    </Typography>
                  </Box>
                  <ul>
                    <Typography
                      component="h5"
                      variant="h7"
                      color="text.primary"
                      align="left"
                      style={{ wordWrap: "break-word" }}
                    >
                      {tier.description}
                    </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleClick(tier.id)}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog
          container={() => document.getElementById("detail-content")}
          onClose={handleCloseNewChallenge}
          open={displayNewChallengeDialogue}
          style={{
            position: "flex",
          }}
          PaperProps={{ sx: { width: "70%" } }}
        >
          <CreateChallenge
            handleClose={handleCloseAndRefresh}
            challengeName={challengeName}
          />
        </Dialog>
        {currentUserRole === "PROF" && (
          <FloatButton handleClick={handleClickNewChallenge} />
        )}
      </Container>
      <Snackbar
        open={displaySuccess}
        autoHideDuration={1000}
        onClose={() => setDisplaySuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setDisplaySuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          New Challenge is created successfully.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
