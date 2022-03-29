import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import TrophyIcon from "@mui/icons-material/EmojiEvents";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Button } from "@mui/material";
import { AlignHorizontalCenter } from "@mui/icons-material";
import { textAlign } from "@mui/system";

const categories = [
  {
    id: "CS5421",
    children: [
      {
        id: "My Profile",
        icon: <PeopleIcon />,
        active: true,
        path: "/profile",
      },
      { id: "Challenges", icon: <TrophyIcon />, path: "/challenges" },
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

export default function Navigator(props) {
  const { ...other } = props;

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleLogout = () => {};

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
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
              <NavLink
                to={path}
                style={{ textDecoration: "none" }}
                key={childId}
              >
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
    </Box>
  );

  const anchor = "left";

  return (
    // <Drawer variant="permanent" {...other}>
    //   {list(anchor)}
    // </Drawer>
    <div>
      <React.Fragment>
        <Button size="large" onClick={toggleDrawer(anchor, true)}>
          {" "}
          <MenuIcon style={{ fontSize: 40 }} />{" "}
        </Button>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
