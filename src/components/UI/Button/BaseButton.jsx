import React from "react";
import classes from "./BaseButton.module.scss";
import { useState, useEffect } from "react";

import cx from "classnames";

const BaseButton = (props) => {
  const { className, ...restProps } = props || {};

  let [isFocused, setIsFocused] = useState(false);
  let c = document.getElementById("sub-cursor");

  useEffect(() => {
    if (isFocused) {
      c.classList.add("cursor-over-button");
    } else {
      c.classList.remove("cursor-over-button");
    }
  }, [isFocused]);

  return (
    <button
      {...restProps}
      className={cx(classes.baseButton, className)}
      onMouseEnter={(e) => setIsFocused(true)}
      onMouseLeave={(e) => setIsFocused(false)}
    />
  );
};

export default BaseButton;
