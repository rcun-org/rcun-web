import React from "react";
import classes from "./BaseInput.module.scss";

import cx from "classnames";
import useCursorFocused from "@/hooks/useCursorFocused";

const BaseInput = (props) => {
  const { className, ...restProps } = props || {};

  const { handleFocusCursor, handleUnfocusCursor } = useCursorFocused(
    false,
    "cursor-over-input"
  );

  return (
    <input
      className={cx(
        classes.baseInput,
        props.isFancy && classes.fancy,
        className
      )}
      autoComplete="off"
      onMouseEnter={handleFocusCursor}
      onMouseLeave={handleUnfocusCursor}
      {...restProps}
    />
  );
};

export default BaseInput;
