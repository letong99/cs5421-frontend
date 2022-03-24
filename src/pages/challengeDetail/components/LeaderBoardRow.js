import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { CodeBlock, dracula } from "react-code-blocks";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";

export default function LeaderBoardRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.challengeName}
        </TableCell>
        <TableCell align="right">{row.userId}</TableCell>
        <TableCell align="right">{row.avgTime}</TableCell>
        <TableCell align="right">{row.submissionTs}</TableCell>
        <TableCell align="right">{row.totalAttempts}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Query Submitted
              </Typography>
              <CodeBlock
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
    </React.Fragment>
  );
}

//   LeaderBoardRow.propTypes = {
//     row: PropTypes.shape({
//         challengeName: PropTypes.number.isRequired,
//         userId: PropTypes.number.isRequired,
//         avgTime: PropTypes.number.isRequired,
//       history: PropTypes.arrayOf(
//         PropTypes.shape({
//           amount: PropTypes.number.isRequired,
//           customerId: PropTypes.string.isRequired,
//           date: PropTypes.string.isRequired,
//         }),
//       ).isRequired,
//       submissionTs: PropTypes.string.isRequired,
//       totalAttemps: PropTypes.number.isRequired,
//       protein: PropTypes.number.isRequired,
//     }).isRequired,
//   };
