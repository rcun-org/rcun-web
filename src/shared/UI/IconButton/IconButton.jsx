import React from "react";
import classes from "./IconButton.module.scss";
import useCursorFocused from "@/shared/lib/hooks/useCursorFocused.js";

import cx from "classnames";

const IconButton = (props) => {
  const { className, ...restProps } = props || {};

  const { handleFocusCursor, handleUnfocusCursor } = useCursorFocused(
    "cursor-over-icon-button"
  );

  return (
    <button
      className={cx(classes.iconButton, className)}
      onMouseEnter={handleFocusCursor}
      onMouseLeave={handleUnfocusCursor}
      {...restProps}
    />
  );
};

export default IconButton;
