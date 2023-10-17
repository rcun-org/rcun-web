import React from "react";
import classes from "./IconButton.module.scss";
import { useState, useEffect } from "react";
import { Fade, Zoom } from "@mui/material";

const IconButton = ({ label = "", ...props }) => {
  let [isFocused, setIsFocused] = useState(false);
  let c = document.getElementById("sub-cursor");

  useEffect(() => {
    if (isFocused) {
      c.classList.add("cursor-over-icon-button");
    } else {
      c.classList.remove("cursor-over-icon-button");
    }
  }, [isFocused]);

  return (
    <div
      className={classes.tooltipContainer}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <button {...props} className={classes.iconButton} />
      <Fade in={isFocused && !!label}>
        <div className={classes.tooltip}>{label}</div>
      </Fade>
    </div>
  );
};

export default IconButton;
