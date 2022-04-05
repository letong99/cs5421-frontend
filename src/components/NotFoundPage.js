import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Image from "../assets/404.png";
import Snackbar from "@mui/material/Snackbar";
import Alert from "./Alert";

export default function NotFoundPage(props) {
  return (
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
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
        >
          {props.errorText}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
