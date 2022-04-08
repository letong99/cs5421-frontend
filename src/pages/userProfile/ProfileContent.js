import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import "./profile.css";
import { useState, useEffect } from "react";
import ChallengeTable from "./components/UserChallengeTable";
import Container from "@mui/material/Container";
import { useCurrentUser } from "../../components/CurrentUserContext";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Image from "../../assets/404.png";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function ProfileContent() {
  const { currentUser, currentUserRole } = useCurrentUser();
  let history = useHistory();

  let [userEmail, setUserEmail] = useState("User's e-mail not found");
  let [userFullName, setUserFullName] = useState("User not found");
  let [allAttempts, setAllAttempts] = useState([]);
  let [notFound, setNotFound] = useState(false);
  let [challenges, setChallenges] = useState([]);

  const handleClick = (id) => {
    console.log(id);
    history.push(`/details/${id}`);
  };

  useEffect(() => {
    // fetch from APIs
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${currentUser}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("here");
        console.log(res);
        setUserEmail(res.data.data.email);
        setUserFullName(res.data.data.full_name);
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/users/${currentUser}/attempts`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log("trying to get all attempts from user");
            console.log("user id is");
            console.log(currentUser);
            console.log("message received is");
            console.log(res);
            setAllAttempts(res.data.data);
          })
          .catch((res) => {
            console.log("went here instead");
            console.log(res);
            setNotFound(true);
          });
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/challenges-by-user/${currentUser}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log("trying to get all attempts from user");
            console.log("user id is");
            console.log(currentUser);
            console.log("message received is");
            console.log(res);
            setChallenges(res.data.data);
          })
          .catch((res) => {
            console.log("went here instead");
            console.log(res);
            setNotFound(true);
          });
      })
      .catch((res) => {
        console.log(res);
        setNotFound(true);
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
      id="user-content"
      style={{
        position: "relative",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignContent: "flex-start",
      }}
      //maxWidth="md"
      component="main"
    >
      <h1>User Profile</h1>
      <img
        src={require("../../assets/panda.png")}
        width="80px"
        margin-bottom="10px"
      />
      <div className="user-prop">
        <Typography variant="subtitle2" color="textSecondary">
          NAME
        </Typography>
        <p>{userFullName}</p>
      </div>
      <div className="user-prop">
        <Typography variant="subtitle2" color="textSecondary">
          E-MAIL
        </Typography>
        <p>{userEmail}</p>
      </div>
      {currentUserRole === "PROF" ? (
        <div>
          <div className="challenge-prop">
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h8"
              color="textSecondary"
              id="tableTitle"
              component="div"
            >
              ALL CHALLENGE CREATED
            </Typography>
          </div>
          <Container maxWidth="md" component="main">
            <Grid container spacing={3} alignItems="flex-end">
              {challenges.map((tier) => (
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
          </Container>
        </div>
      ) : (
        <div>
          <div className="challenge-prop">
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h8"
              color="textSecondary"
              id="tableTitle"
              component="div"
            >
              ALL CHALLENGE ATTEMPTS
            </Typography>
          </div>
          <Container disableGutters component="main" sx={{ pt: 3, pb: 6 }}>
            <ChallengeTable rows={allAttempts} />
          </Container>
        </div>
      )}
    </div>
  );
}
