import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import './profile.css';
import { useState, useEffect } from 'react';
import ChallengeTable from "./components/UserChallengeTable" ;
import Container from "@mui/material/Container";
import { useCurrentUser } from "../../components/CurrentUserContext";
import Grid from "@mui/material/Grid";
import axios from "axios"
import Image from "../../assets/404.png";

export default function ProfileContent() {

  const { currentUser, currentUserRole } = useCurrentUser();

  let [userEmail, setUserEmail] = useState("User's e-mail not found");
  let [userFullName, setUserFullName] = useState("User not found");
  let [allAttempts, setAllAttempts] = useState([]);
  let [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // fetch from APIs
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${currentUser}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("here")
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
            console.log("trying to get all attempts from user")
            console.log("user id is")
            console.log(currentUser)
            console.log("message received is")
            console.log(res);
            setAllAttempts(res.data.data);
          })
          .catch((res) => {
            console.log("went here instead")
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
        <img src={require("../../assets/panda.png")} width="80px" margin-bottom ="10px"/>
        <div className ='user-prop'>
            <Typography variant= "subtitle2" color = 'textSecondary'>NAME</Typography>
            <p>{userFullName}</p>
        </div>
        <div className="user-prop">
            <Typography variant= "subtitle2" color = 'textSecondary'>E-MAIL</Typography>
            <p>{userEmail}</p>
        </div>
        <div className="challenge-prop">
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h8"
            color = 'textSecondary'
            id="tableTitle"
            component="div"
          >
            CHALLENGE ATTEMPTS
          </Typography>
        </div>
        <Container disableGutters component="main" sx={{ pt: 3, pb: 6 }}>
            <ChallengeTable rows={allAttempts}/>
        </Container>
    </div>
  );
}