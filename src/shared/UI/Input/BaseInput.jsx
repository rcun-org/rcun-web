import React from "react";
import classes from "./BaseInput.module.scss";

import cx from "classnames";
import useCursorFocused from "@/shared/lib/hooks/useCursorFocused.js";

const BaseInput = (props) => {
  const { className, isFancy, ...restProps } = props || {};

  const { handleFocusCursor, handleUnfocusCursor } =
    useCursorFocused("cursor-over-input");

  return (
    <input
      className={cx(classes.baseInput, isFancy && classes.fancy, className)}
      autoComplete="off"
      onMouseEnter={handleFocusCursor}
      onMouseLeave={handleUnfocusCursor}
      {...restProps}
    />
  );
};

export default BaseInput;
