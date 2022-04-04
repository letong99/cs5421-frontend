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

export default function ChallengeInfoEditable(props) {
  let [expanded, setExpanded] = useState(false);
  let [codeStr, setCodeStr] = useState("");
  let [queriesStr, setQueiresStr] = useState("");
  let [dataStart, setDataStart] = useState(null);
  let [dataEnd, setDataEnd] = useState(null);
  let [displayError, setDisplayError] = useState(false);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [solution, setSolution] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [myValue, setValue] = useState("");
  console.log(myValue);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (codeStr === "") {
      setDisplayError(true);
    } else {
      const data1 = {
        user_id: props.user,
        name: name,
        description: description,
        expires_at: dataEnd,
        solution: solution,
        test_cases: codeStr,
      };
      // "description": "Some description", //Optional
      // "type": "FE", //or 'SE' representing fastest/slowest execution types
      // "init": "<CREATE DATABASE...>",
      // "expires_at": "2022-06-01T12:00",
      // "solution": "<SELECT ...>",
      // "times_to_run": 10,

      console.log(data1);
      props.handleClose();
    }
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
              label="start of the challenge"
              value={dataStart}
              onChange={(newData) => {
                setDataStart(newData);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
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
          <CodeEditor
            value={codeStr}
            language="sql"
            placeholder="Please enter your code here"
            onChange={(evn) => setCodeStr([evn.target.value])}
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
          <TextField
            fullWidth
            id="solution"
            label="Sample Solution"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            multiline
          />
        </AccordionDetails>
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
