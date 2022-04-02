import * as React from "react";
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

export default function UserTableRow(props) {
  const { row, displayCode } = props;
  const [open, setOpen] = React.useState(false);

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
          {row.submissionTs}
        </TableCell>
        <TableCell align="left">{row.challengeName}</TableCell>
        <TableCell align="right">{row.avgTime}</TableCell>
        <TableCell align="left">{row.status}</TableCell>
        <TableCell align="right">{row.rank}</TableCell>
      </TableRow>
      {displayCode ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Query Submitted
                </Typography>
                <CopyBlock
                  text={`SELECT * FROM db;`}
                  language={"sql"}
                  //   showLineNumbers={showLineNumbers}
                  //   startingLineNumber={startingLineNumber}
                  theme={dracula}
                />
              </Box>
              <Box>
                <Button>Delete</Button>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
}
