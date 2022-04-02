import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { CopyBlock, dracula } from "react-code-blocks";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import { useCurrentUser } from "../../../components/CurrentUserContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "../../../components/Alert";
import axios from "axios";

export default function LeaderBoardRow(props) {
  const { currentUser, currentUserRole } = useCurrentUser();

  const { row } = props;
  const [open, setOpen] = useState(false);
  const [displayCode, setDisplayCode] = useState(false);
  const [displayInvalidate, setDisplayInvalidate] = useState(false);
  const [confirm, setConfirm] = useState(false);
  let [displayError, setDisplayError] = useState(false);
  let [displaySuccess, setDisplaySuccess] = useState(false);


  useEffect(() => {
    if (currentUserRole === "ta" || currentUserRole === "professor") {
      setDisplayCode(true);
      setDisplayInvalidate(true);
    } else if (currentUserRole === row.userName) {
      setDisplayCode(true);
    }
  }, []);

  const handleInvalidate = () => {
    console.log("invalidate");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/attempts/${props.attempt_id}/invalidate`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setDisplaySuccess(true)
        setConfirm(false);
        
      })
      .catch((res) => {
        setDisplayError(true)
        // handleError(res);
      });
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {displayCode ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            <div></div>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.rank}
        </TableCell>
        <TableCell align="right">{row.userName}</TableCell>
        <TableCell align="right">{row.avgTime}</TableCell>
        <TableCell align="right">{row.submissionTs}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
      </TableRow>
      {displayCode ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Box sx={{ flexGrow: 1 }} >
                  <Grid container spacing={2} direction="row" alignItems="center">
                    <Grid item xs={10}>
                      <Typography variant="h6" gutterBottom component="div">
                        Query Submitted
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {displayInvalidate && (
                        <Box sx={{ margin: 1 }}>
                          <Button
                            variant="outlined"
                            onClick={() => setConfirm(true)}
                          >
                            Invalidate
                          </Button>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Box>
                <CopyBlock
                  text={`SELECT * FROM db;`}
                  language={"sql"}
                  //   showLineNumbers={showLineNumbers}
                  //   startingLineNumber={startingLineNumber}
                  theme={dracula}
                />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : (
        <div></div>
      )}
      <Dialog
        open={confirm}
        onClose={() => {
          setConfirm(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation required"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to invalidate this attempt?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInvalidate}>Yes</Button>
          <Button onClick={() => setConfirm(false)} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
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
          Invalidate successfully.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
