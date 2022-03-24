import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from '../../components/Navigator.js';
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
//import Content from './Content';

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

const columnsPerRow = 4;

const tiers = [
  {
    title: 'Challenge 1',
    subtitle: 'Subtitle challenge 1',
    description: [
      'This challenge is about ',
      'Some text with description',
      'And i guess text about amount of participants',
      'And also how many days left till the end of the challenge ',
    ],
    buttonText: 'Participate',
    buttonVariant: 'outlined',
  },
  {
    title: 'Challenge 2',
    subtitle: 'Subtitle challenge',
    description: [
      'This challenge is about ',
      'Some text with description',
      'And i guess text about amount of participants',
      'And also how many days left till the end of the challenge ',
    ],
    buttonText: 'Participate',
    // buttonVariant: 'contained',
    buttonVariant: 'outlined',
  },
  {
    title: 'Challenge 3',
    subtitle: 'Subtitle challenge',
    description: [
      'This challenge is about ',
      'Some text with description',
      'And i guess text about amount of participants',
      'And also how many days left till the end of the challenge ',
    ],
    buttonText: 'Participate',
    buttonVariant: 'outlined',
  },
  {
    title: 'Challenge 3',
    subtitle: 'Subtitle challenge',
    description: [
      'This challenge is about ',
      'Some text with description',
      'And i guess text about amount of participants',
      'And also how many days left till the end of the challenge ',
    ],
    buttonText: 'Participate',
    buttonVariant: 'outlined',
  },
  {
    title: 'Challenge 3',
    subtitle: 'Subtitle challenge',
    description: [
      'This challenge is about ',
      'Some text with description',
      'And i guess text about amount of participants',
      'And also how many days left till the end of the challenge ',
    ],
    buttonText: 'Participate',
    buttonVariant: 'outlined',
  },
  {
    title: 'Challenge 3',
    subtitle: 'Subtitle challenge',
    description: [
      'This challenge is about ',
      'Some text with description',
      'And i guess text about amount of participants',
      'And also how many days left till the end of the challenge ',
    ],
    buttonText: 'Participate',
    buttonVariant: 'outlined',
  },
  {
    title: 'Challenge 3',
    subtitle: 'Subtitle challenge',
    description: [
      'This challenge is about ',
      'Some text with description',
      'And i guess text about amount of participants',
      'And also how many days left till the end of the challenge ',
    ],
    buttonText: 'Participate',
    buttonVariant: 'outlined',
  },
  {
    title: 'Challenge 3',
    subtitle: 'Subtitle challenge',
    description: [
      'This challenge is about ',
      'Some text with description',
      'And i guess text about amount of participants',
      'And also how many days left till the end of the challenge ',
    ],
    buttonText: 'Participate',
    buttonVariant: 'outlined',
  },
];

export default function UserProfile() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}

          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
            {/* you can put your content within this box */}
            <h1>Challenge Board</h1> {/* placeholder can delete this line after designing */}
            <Container maxWidth="md" component="main">
              <Grid container spacing={10} alignItems="flex-end">
                {tiers.map((tier) => (
                  // Enterprise card is full width at sm breakpoint
                  <Grid
                    item
                    key={tier.title}
                    xs={12}
                    md={6}
                  >
                    <Card>
                      <CardHeader
                        title={tier.title}
                        subheader={tier.subheader}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{
                          align: 'center',
                        }}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? theme.palette.grey[200]
                              : theme.palette.grey[700],
                        }}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            mb: 2,
                          }}
                        >
                          <Typography component="h4" variant="h5" color="text.primary" align="center">
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
          </Box>



        </Box>






      </Box>

    </ThemeProvider>
  );
}