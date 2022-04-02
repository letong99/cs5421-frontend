import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeEditor from "@uiw/react-textarea-code-editor";
import TextField from "@mui/material/TextField";
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export default function ChallengeInfoEditable() {
  const [expanded, setExpanded] = React.useState(false);
  let [codeStr, setCodeStr] = useState("");
  let [queriesStr, setQueiresStr] = useState("");
  const [dataStart,setDataStart] = React.useState(null);
  const [dataEnd,setDataEnd] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [myValue, setValue] = React.useState('')
  console.log(myValue);


  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            General Description
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
          id = 'description'
          label = 'Description'
            value = {myValue}
            onChange={(e)=>setValue(e.target.value)}
          multiline/>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Attempt Periods</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Attempt Periods
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/*<DesktopDatePicker*/}
          {/*  label="Date desktop"*/}
          {/*  inputFormat="MM/dd/yyyy"*/}
          {/*  value={value}*/}
          {/*  onChange={handleChange}*/}
          {/*  renderInput={(params) => <TextField {...params} />}*/}
          {/*/>*/}
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
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Datasets
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
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
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Test Cases</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/*<TextField*/}
          {/*  fullWidth*/}
          {/*  id = 'test cases'*/}
          {/*  label = 'test cases'*/}
          {/*  multiline/>*/}
          <CodeEditor
            value={codeStr}
            language="sql"
            placeholder="Please enter your code here"
            onChange={(evn) => setCodeStr(evn.target.value)}
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
    </div>
  );
}
