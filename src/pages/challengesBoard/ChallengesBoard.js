import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const columnsPerRow = 4;

const tiers = [
  {
    title: "Challenge 1",
    subtitle: "Subtitle challenge 1",
    description: [
      "This challenge is about ",
      "Some text with description",
      "And i guess text about amount of participants",
      "And also how many days left till the end of the challenge ",
    ],
    buttonText: "Participate",
    buttonVariant: "outlined",
  },
  {
    title: "Challenge 2",
    subtitle: "Subtitle challenge",
    description: [
      "This challenge is about ",
      "Some text with description",
      "And i guess text about amount of participants",
      "And also how many days left till the end of the challenge ",
    ],
    buttonText: "Participate",
    // buttonVariant: 'contained',
    buttonVariant: "outlined",
  },
  {
    title: "Challenge 3",
    subtitle: "Subtitle challenge",
    description: [
      "This challenge is about ",
      "Some text with description",
      "And i guess text about amount of participants",
      "And also how many days left till the end of the challenge ",
    ],
    buttonText: "Participate",
    buttonVariant: "outlined",
  },
  {
    title: "Challenge 3",
    subtitle: "Subtitle challenge",
    description: [
      "This challenge is about ",
      "Some text with description",
      "And i guess text about amount of participants",
      "And also how many days left till the end of the challenge ",
    ],
    buttonText: "Participate",
    buttonVariant: "outlined",
  },
  {
    title: "Challenge 3",
    subtitle: "Subtitle challenge",
    description: [
      "This challenge is about ",
      "Some text with description",
      "And i guess text about amount of participants",
      "And also how many days left till the end of the challenge ",
    ],
    buttonText: "Participate",
    buttonVariant: "outlined",
  },
  {
    title: "Challenge 3",
    subtitle: "Subtitle challenge",
    description: [
      "This challenge is about ",
      "Some text with description",
      "And i guess text about amount of participants",
      "And also how many days left till the end of the challenge ",
    ],
    buttonText: "Participate",
    buttonVariant: "outlined",
  },
  {
    title: "Challenge 3",
    subtitle: "Subtitle challenge",
    description: [
      "This challenge is about ",
      "Some text with description",
      "And i guess text about amount of participants",
      "And also how many days left till the end of the challenge ",
    ],
    buttonText: "Participate",
    buttonVariant: "outlined",
  },
  {
    title: "Challenge 3",
    subtitle: "Subtitle challenge",
    description: [
      "This challenge is about ",
      "Some text with description",
      "And i guess text about amount of participants",
      "And also how many days left till the end of the challenge ",
    ],
    buttonText: "Participate",
    buttonVariant: "outlined",
  },
];

export default function UserProfile() {

  return (
    <React.Fragment>
      <h1>Challenge Board</h1>{" "}
      {/* placeholder can delete this line after designing */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={10} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} md={6}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h4"
                      variant="h5"
                      color="text.primary"
                      align="center"
                    >
                      {tier.subtitle}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        // component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
