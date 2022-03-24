
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "../components/Navigator";
import { theme, drawerWidth } from "./themes";

export default function NavigatorBar(props) {
    const { component, ...other } = props;
  
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <CssBaseline />
          <Box
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
          </Box>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Box
              component="main"
              sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
            >
              {component}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>

    );
  }