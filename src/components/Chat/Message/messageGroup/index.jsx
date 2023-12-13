import React from "react";
import classes from "./styles.module.scss";
import cx from "classnames";
import useCursorFocused from "@/shared/lib/hooks/useCursorFocused";

const MessageGroup = ({ messages, selfUsername, ...wrapperProps }) => {
  const { handleUnfocusCursor, handleFocusCursor } = useCursorFocused(false);

  const { className: wrapperClassName, ...restWrapperProps } =
    wrapperProps || {};

  return (
    <div
      className={cx(classes.groupWrapper, wrapperClassName)}
      {...restWrapperProps}
    >
      {messages.map(({ username, text }, index) => {
        const isSelf = username === selfUsername;

        const isFirstMessage = index === 0;
        const isLastMessage = index === messages.length - 1;

        return (
          <div
            className={cx(classes.messageEntry, isSelf && classes.selfEntry)}
          >
            <div
              className={cx(
                classes.text,
                isSelf && classes.selfText,
                isFirstMessage && classes.firstMsg,
                isLastMessage &&
                  (isSelf ? classes.lastMsgSelf : classes.lastMsg)
              )}
              onMouseEnter={handleFocusCursor}
              onMouseLeave={handleUnfocusCursor}
            >
              {text}
            </div>
            {isLastMessage && (
              <div className={cx(classes.username)}>{username}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageGroup;
