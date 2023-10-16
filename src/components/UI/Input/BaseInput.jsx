import React from "react";
import classes from "./BaseInput.module.scss";
import { useState, useEffect } from "react";

import cx from "classnames";

const BaseInput = (props) => {
  const { className, ...restProps } = props || {};

  let [isFocused, setIsFocused] = useState(false);
  let c = document.getElementById("sub-cursor");

  useEffect(() => {
    if (isFocused) {
      c.classList.add("cursor-over-input");
    } else {
      c.classList.remove("cursor-over-input");
    }
  }, [isFocused]);

  return (
    <input
      {...restProps}
      className={cx(
        classes.baseInput,
        props.isFancy && classes.fancy,
        className
      )}
      autoComplete="off"
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    />
  );
};

export default BaseInput;
