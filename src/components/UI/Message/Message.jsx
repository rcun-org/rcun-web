import React from "react";
import classes from "./Message.module.scss";
import cx from "classnames";
import useCursorFocused from "@/hooks/useCursorFocused";

const Message = ({ text, username, isSelf, ...wrapperProps }) => {
  const { handleFocusCursor, handleUnfocusCursor } = useCursorFocused(false);

  const { className: wrapperClassName, ...restWrapperProps } =
    wrapperProps || {};

  const usernameElem = <span className={cx(classes.username)}>{username}</span>;

  const textElem = (
    <div
      className={cx(classes.text, isSelf && classes.selfText)}
      onMouseEnter={handleFocusCursor}
      onMouseLeave={handleUnfocusCursor}
    >
      {text}
    </div>
  );

  return (
    <div
      {...restWrapperProps}
      className={cx(classes.messageEntry, wrapperClassName)}
    >
      {isSelf ? (
        <>
          {textElem}
          {usernameElem}
        </>
      ) : (
        <>
          {usernameElem}
          {textElem}
        </>
      )}
    </div>
  );
};

export default Message;
