
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "../components/Navigator";
import { theme, drawerWidth } from "./themes";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import TrophyIcon from "@mui/icons-material/EmojiEvents";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink, withRouter } from "react-router-dom";
import {Button} from "@mui/material"
import { useCurrentUser } from "./CurrentUserContext";
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const categories = [
  {
    id: "CS5421",
    children: [
      {
        id: "My Profile",
        icon: <PeopleIcon />,
        path: "/profile",
        active: false
      },
      { id: "Challenges", icon: <TrophyIcon />, path: "/challenges", active: false},
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export default function NavigatorBar(props) {
    const { component, ...other } = props;
    const { popCurrentUser } = useCurrentUser();

  
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
  
        <List disablePadding>
          <ListItem
            sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
          >
            SQL Challenge
          </ListItem>
          {categories.map(({ id, children }) => (
            <Box sx={{ bgcolor: "#101F33" }} key={id}>
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, active, path }) => (
                <NavLink to={path} style={{ textDecoration: "none" }} key={childId}>
                  <ListItem disablePadding key={childId}>
                    <ListItemButton selected={active} sx={item}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              ))}
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </List>
        <List style={{marginTop:'auto', textAlign:'center', paddingBottom:"30px"}}>
          <Button variant = "contained" component = {Link} to="/login" onClick={()=>{
            console.log("logout")
            popCurrentUser();
          }}>
              Logout
          </Button>
        </List>
      </Box>
    );
    
    const anchor = 'left'

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <AppBar position = "fixed">
            <Toolbar sx={{ flex: 1, px: 4, bgcolor: "#18202c" }}>
              <Button size = "large" onClick={toggleDrawer(anchor, true)}> <MenuIcon style={{fontSize: 35, color: 'white', marginLeft: 0, paddingLeft: 0}} /> </Button>
              <Typography variant="h6" noWrap component="div">
                CS5421 SQL Challenge
              </Typography>
            </Toolbar>
          </AppBar>
          <CssBaseline />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
          {/* <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            {isSmUp ? null : (
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={true}
              />
            )}

            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              sx={{ display: { sm: "block", xs: "none" } }}
            />
          </Box> */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Box
              component="main"
              sx={{ flex: 1, py: 6, px: 6, bgcolor: "#eaeff1" }}
            >
              {component}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>

    );
  }