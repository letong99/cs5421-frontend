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
import axios from "axios"

export default function ProfileContent() {

  const { currentUser, currentUserRole } = useCurrentUser();

  let [userEmail, setUserEmail] = useState("dexter@gmail.com");
  let [userFullName, setUserFullName] = useState("Dexter");

  useEffect(() => {
    // fetch from APIs
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${currentUser}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setUserEmail(res.response.data.email);
        setUserFullName(res.response.data.full_name);
        // axios
        //   .get(
        //     `${process.env.REACT_APP_API_URL}/users/${res.response.data.created_user_id}`,
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     setCreator(res.response.data.full_name);
        //   })
        //   .catch((res) => {
        //     console.log(res);
        //     // setNotFound(true);
        //   });
      })
      .catch((res) => {
        console.log(res);
        // setNotFound(true);
      });
  }, []);

  return (
    <div
      id="user-content"
      style={{
        position: "relative",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignContent: "flex-start",
      }}
      maxWidth="md"
      component="main"
    >
        <h1>User Profile</h1>
        <img src={require("../../assets/panda.png")} width="80px" margin-bottom ="10px"/>
        <div className ='user-prop'>
            <Typography variant= "subtitle2" color = 'textSecondary'>USER NAME</Typography>
            <p>{userFullName}</p>
        </div>
        <div className="user-prop">
            <Typography variant= "subtitle2" color = 'textSecondary'>E-MAIL</Typography>
            <p>{userEmail}</p>
        </div>
        <Container disableGutters component="main" sx={{ pt: 3, pb: 6 }}>
            <ChallengeTable />
        </Container>
    </div>
  );
}