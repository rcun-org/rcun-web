import React from "react";
import classes from "./BaseButton.module.scss";
import cx from "classnames";
import useCursorFocused from "@/hooks/useCursorFocused";

const BaseButton = (props) => {
  const { className, ...restProps } = props || {};

  const { handleFocusCursor, handleUnfocusCursor } = useCursorFocused(
    false,
    "cursor-over-button"
  );

  return (
    <button
      className={cx(classes.baseButton, className)}
      onMouseEnter={handleFocusCursor}
      onMouseLeave={handleUnfocusCursor}
      {...restProps}
    />
  );
};

export default BaseButton;
