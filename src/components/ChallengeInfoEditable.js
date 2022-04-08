import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodeEditor from "@uiw/react-textarea-code-editor";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "./Alert";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { useCurrentUser } from "./CurrentUserContext";

export default function ChallengeInfoEditable(props) {
  const { currentUser, currentUserRole } = useCurrentUser();

  let [expanded, setExpanded] = useState(false);
  let [testCases, setTestCases] = useState([{ data: "", is_visible: true }]);
  let [queriesStr, setQueiresStr] = useState("");
  let [dataStart, setDataStart] = useState(null);
  let [dataEnd, setDataEnd] = useState(null);
  let [displayError, setDisplayError] = useState(false);
  let [displaySuccess, setDisplaySuccess] = useState(false);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [solution, setSolution] = useState("");
  let [type, setType] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleInputChange = (e, index, type) => {
    const { value } = e.target;
    const list = [...testCases];

    if (type === "data") {
      list[index].data = value;
    } else if (type === "is_visible") {
      list[index].is_visible = !list[index].is_visible;
    }
    setTestCases(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...testCases];
    list.splice(index, 1);
    setTestCases(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setTestCases([...testCases, { data: "", is_visible: true }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data1 = {
      // user_id: props.user,
      user_id: currentUser,
      name: name,
      description: description,
      init: queriesStr,
      expires_at: dataEnd,
      solution: solution,
      test_cases: testCases,
      times_to_run: 10,
      type: type,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/challenges`, data1, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setDisplaySuccess(true);
        props.handleSuccess();
        props.handleClose();
      })
      .catch((res) => {
        props.handleClose();
        // handleError(res);
      });

    // if (testCases === [] || solution === "" || queriesStr === "") {
    //   setDisplayError(true);
    // } else {
    //   setDisplaySuccess(true);

      // const data1 = {
      //   user_id: currentUser,
      //   name: name,
      //   description: description,
      //   init: queriesStr,
      //   expires_at: dataEnd,
      //   solution: solution,
      //   test_cases: testCases,
      //   times_to_run: 10,
      //   type: type,
      // };

      // console.log(data1);
      // props.handleSuccess();
      // props.handleClose();
    // }
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel0"}
        onChange={handleChange("panel0")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Challenge Name
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>name</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            id="name"
            label="Challenge Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            multiline
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            General Description
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            id="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Attempt Periods
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Attempt Periods
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="end of the challenge"
              value={dataEnd}
              onChange={(newData) => {
                setDataEnd(newData);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Datasets</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            queries for setting up the challenge
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CodeEditor
            value={queriesStr}
            language="sql"
            placeholder="Please enter your code here"
            onChange={(evn) => setQueiresStr(evn.target.value)}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Test Cases
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/*<CodeEditor*/}
          {/*  value={testCases}*/}
          {/*  language="sql"*/}
          {/*  placeholder="Please enter your code here"*/}
          {/*  onChange={(evn) => setTestCases([evn.target.value])}*/}
          {/*  padding={15}*/}
          {/*  style={{*/}
          {/*    fontSize: 12,*/}
          {/*    backgroundColor: "#f5f5f5",*/}
          {/*    fontFamily:*/}
          {/*      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",*/}
          {/*  }}*/}
          {/*/>*/}
          {testCases.map((x, i) => {
            return (
              <div className="box">
                {/*<input*/}
                {/*  name="Data"*/}
                {/*  value={x.data}*/}
                {/*  onChange={e => handleInputChange(e, i)}*/}
                {/*/>*/}
                <CodeEditor
                  value={x.data}
                  language="sql"
                  placeholder="Please enter your code here"
                  onChange={(e) => handleInputChange(e, i, "data")}
                  padding={15}
                  style={{
                    fontSize: 12,
                    backgroundColor: "#f5f5f5",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                />
                {/*<Checkbox*/}
                {/*  checked = {x.is_visible}*/}
                {/*  onChange={e => handleInputChange(e, i)}*/}
                {/*  inputProps={{ 'aria-label': 'controlled'}}*/}
                {/*  />*/}
                <FormGroup
                  checked={x.is_visible}
                  onChange={(e) => handleInputChange(e, i, "is_visible")}
                >
                  <FormControlLabel
                    control={<Checkbox defaultChecked value={x.is_visible} />}
                    label="Visible for Students"
                  />
                </FormGroup>
                <div className="btn-box">
                  {testCases.length !== 1 && (
                    <Button
                      variant="outlined"
                      className="mr10"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove
                    </Button>
                  )}
                  {testCases.length - 1 === i && (
                    <Button variant="outlined" onClick={handleAddClick}>
                      Add
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Sample Solution
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>solution</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CodeEditor
            value={solution}
            language="sql"
            placeholder="Please enter sample sulotion here"
            onChange={(evn) => setSolution(evn.target.value)}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Type</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Fastest or slowest execution type
          </Typography>
        </AccordionSummary>
        <AccordionSummary>
          <FormControl>
            <RadioGroup
              row
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <FormControlLabel
                value="FE"
                control={<Radio />}
                label="Fastest First"
              />
              <FormControlLabel
                value="SE"
                control={<Radio />}
                label="Slowest First"
              />
            </RadioGroup>
          </FormControl>
        </AccordionSummary>
      </Accordion>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
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
          Submission is successful. The result will be available shortly.
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
          Code is required. Please enter your code.
        </Alert>
      </Snackbar>
    </div>
  );
}
