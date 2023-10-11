import React from "react";
import classes from "./Message.module.scss";
import cx from "classnames";
import { useState, useEffect } from "react";

const Message = ({ text, username, isSelf, ...wrapperProps }) => {
  let [isFocused, setIsFocused] = useState(false);

  const { className: wrapperClassName, ...restWrapperProps } =
    wrapperProps || {};

  useEffect(() => {
    let c = document.getElementById("sub-cursor");

    if (isFocused) {
      c.classList.add("cursor-over-input");
    } else {
      c.classList.remove("cursor-over-input");
    }
  }, [isFocused]);

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
