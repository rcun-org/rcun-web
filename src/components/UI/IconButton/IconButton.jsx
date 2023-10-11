import React from "react";
import classes from "./IconButton.module.scss";
import { useState, useEffect } from "react";

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
      {isFocused && !!label && <div className={classes.tooltip}>{label}</div>}
    </div>
  );
};

export default IconButton;
