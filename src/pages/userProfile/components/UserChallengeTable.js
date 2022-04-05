import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import UserTableRow from "./UserTableRow";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { makeStyles } from '@mui/styles';
// import MUIDataTable from "mui-datatables";

function createData(
  submissionTs,
  challengeName,
  avgTime,
  status,
  rank
) {
  return {
    submissionTs,
    challengeName,
    avgTime,
    status,
    rank,
    // history: [
    //   {
    //     date: "2020-01-05",
    //     customerId: "11091700",
    //     amount: 3,
    //   },
    //   {
    //     date: "2020-01-02",
    //     customerId: "Anonymous",
    //     amount: 1,
    //   },
    // ],
  };
}

// const rows = [
//   createData("2022-03-17T08:03:28.411594Z", "Challenge 1", 31, "Success", 1),
//   createData("2022-02-16T08:01:28.411594Z", "Challenge 5", 100, "Pending", ""),
//   createData("2022-01-18T08:02:28.411594Z", "Challenge 2", 21, "Success", 3),
//   createData("2022-01-17T08:02:28.411594Z", "Challenge 3", 11, "Success", 4),
//   createData("2022-02-17T08:02:28.411594Z", "Challenge 1", 1, "Success", 5),
//   createData("2021-03-17T08:02:28.411594Z", "Challenge 3", 2, "Success", 1),
//   createData("2021-06-17T08:02:28.411594Z", "Challenge 4", 131, "Success", 21),
//   createData("2021-08-20T07:02:28.411594Z", "Challenge 2", 431, "Success", 18),
//   createData("2022-03-21T08:02:28.411594Z", "Challenge 1", 2331, "Success", 20),
//   createData("2022-03-01T06:02:28.411594Z", "Challenge 7", 131, "Success", 21),
//   createData("2021-03-06T08:02:28.411594Z", "Challenge 6", 32, "Success", 23),
//   createData("2022-02-08T08:02:28.411594Z", "Challenge 1", 68, "Success", 15),
// ];

const rows = [{
  "id":23,
  "user_id":3,
  "challenge_id":1,
  "challenge_name": "Test Challenge",
  "created_at": "2022-2",
  "test_cases":[
    {
      "id":17,
      "attempt_id":23,
      "test_case_id":1,
      "execution_ms": null,
      "created_at": "2022-03",
      "status":"PENDING"
    },
    {
     "id":16,
     "attempt_id":23,
     "test_case_id":2,
     "execution_ms": 0,
     "created_at": "2022-02",
     "status":"SUCCESS"
   }
  ]
},{
 "id":10,
 "user_id":3,
 "challenge_id":2,
 "challenge_name": "Fabian Pascal",
 "created_at": "2021-2",
 "test_cases":[
   {
     "id":15,
     "attempt_id":10,
     "test_case_id":1,
     "execution_ms": 3,
     "created_at": "2021-03",
     "status":"PENDING"
   },
   {
    "id":14,
    "attempt_id":10,
    "test_case_id":2,
    "execution_ms": 20,
    "created_at": "2021-02",
    "status":"SUCCESS"
  }
 ]
},{
 "id":2,
 "user_id":3,
 "challenge_id":3,
 "challenge_name": "SQL Test Challenge",
 "created_at": "2020-2",
 "test_cases":[
   {
     "id":15,
     "attempt_id":2,
     "test_case_id":1,
     "execution_ms": 3,
     "created_at": "2021-03",
     "status":"PENDING"
   },
   {
    "id":14,
    "attempt_id":2,
    "test_case_id":2,
    "execution_ms": 20,
    "created_at": "2021-02",
    "status":"SUCCESS"
  }
 ]
},];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "submissionTs",
    numeric: false,
    disablePadding: false,
    label: "Date and Time Stamp",
  },
  {
    id: "test_case_id",
    numeric: false,
    disablePadding: false,
    label: "Test Case ID",
  },
  {
    id: "avgTime",
    numeric: true,
    disablePadding: false,
    label: "Average Running Time (ms)",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx = {{fontWeight: 'bold'}}
          >
            <TableSortLabel 
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Challenge Attempts
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function UserChallengeTable(props) {
  const { rows } = props; //####### uncomment this to use real data
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("submissionTs");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    console.log(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {rows !== null && rows.length !== 0 ? (
          <Table>
            {rows.map((row) => (
              <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Challenge {row.challenge_id}: {row.challenge_name} (Attempt {row.id})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                  {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={"small"}
                    >
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                          rows.slice().sort(getComparator(order, orderBy)) */}
                        {stableSort(row.test_cases, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((subrow, index) => {
                            const isItemSelected = isSelected(subrow.name);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <UserTableRow
                                hover
                                onClick={(event) => handleClick(event, subrow.name)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={subrow.name}
                                selected={isItemSelected}
                                row={subrow}
                              >
                              </UserTableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={row.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />{" "} */}
                  </div>
                </AccordionDetails>
            </Accordion>
            ))}
          </Table>
        ) : ( 
          <Grid container spacing={2} direction="column" sx={{ margin: 2 }}>
            {/* <Grid item sx={{ margin: 1 }}>
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="subtitle"
                id="tableTitle"
                component="div"
              >
                Attempts:{" "}
              </Typography>
            </Grid> */}
            <Grid item sx={{ margin: 2 }}>
              <Typography>No records available at current stage.</Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}