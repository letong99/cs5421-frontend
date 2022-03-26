import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const style = {
    margin: 0,
    top: 'auto',
    right: 60,
    bottom: 40,
    left: 'auto',
    position: 'fixed',
};

export default function FloatButton(props) {
  const { handleClick, ...others } = props;

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab onClick={handleClick} style={style} color="primary" aria-label="New Attempt">
        <AddIcon />
      </Fab>
    </Box>
  );
}
