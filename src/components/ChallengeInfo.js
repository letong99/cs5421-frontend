import { React, useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CopyBlock, dracula } from "react-code-blocks";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

export default function ChallengeInfo(props) {
  const { description, testCases, expirationDate, schema, type } = props;
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ width: "100%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            General Description
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>Descriptions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{description}</Typography>
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
            Attempt Expiration Date
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {expirationDate}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {expirationDate &&
              `The Challenge will end by ${expirationDate}. Please submit your
            attempt before the deadline.`}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{ width: "100%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Challenge Type
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Challenge for fastest or slowest attempt
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {type === "FE" ? (
            <Typography>
              Submit your query with the shortest running time.
            </Typography>
          ) : (
            <Typography>Submit your query with the longest running time.</Typography>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Database Schema
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Queries for setting up the challenge database
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CopyBlock
            text={schema}
            language={"sql"}
            //   showLineNumbers={showLineNumbers}
            //   startingLineNumber={startingLineNumber}
            theme={dracula}
          />
          {/* <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography> */}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
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
          <Container
            component="testcases"
            sx={{ width: "100%" }}
            sx={{ pt: 4, pb: 3 }}
          >
            <Grid container spacing={3} flexDirection="column">
              {testCases && testCases.length > 0 ? (
                testCases.map((item) => {
                  return item.is_visible ? (
                    <Grid
                      key={item.id}
                      container
                      spacing={3}
                      flexDirection="column"
                    >
                      <Grid item sx={{ pt: 2, pb: 2 }}>
                        <Typography>Test Case {item.id}</Typography>
                        <CopyBlock
                          align="left"
                          text={item.data}
                          language={"sql"}
                          showLineNumbers={true}
                          startingLineNumber={true}
                          theme={dracula}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <div></div>
                  );
                })
              ) : (
                <Typography>No available test case.</Typography>
              )}
            </Grid>
          </Container>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
