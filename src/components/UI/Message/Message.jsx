import React from "react";
import classes from "./Message.module.scss";
import cx from "classnames";
import useCursorFocused from "@/hooks/useCursorFocused";

const Message = ({ text, username, isSelf, ...wrapperProps }) => {
  const { setIsFocused } = useCursorFocused(false);

  const { className: wrapperClassName, ...restWrapperProps } =
    wrapperProps || {};

  const usernameElem = <span className={cx(classes.username)}>{username}</span>;

  const textElem = (
    <div
      className={cx(classes.text, isSelf && classes.selfText)}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
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
