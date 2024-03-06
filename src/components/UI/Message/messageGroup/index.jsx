import React from "react";
import classes from "./styles.module.scss";
import cx from "classnames";
import useCursorFocused from "@/hooks/useCursorFocused";

import totemBug from "@/assets/imgs/totems/bug.png";
import totemBull from "@/assets/imgs/totems/bull.png";
import totemButterfly from "@/assets/imgs/totems/butterfly.png";
import totemCat from "@/assets/imgs/totems/cat.png";
import totemChicken from "@/assets/imgs/totems/chicken.png";
import totemCrab from "@/assets/imgs/totems/crab.png";
import totemPelican from "@/assets/imgs/totems/pelican.png";
import totemPig from "@/assets/imgs/totems/pig.png";
import totemPeacock from "@/assets/imgs/totems/peacock.png";
import totemHummingbird from "@/assets/imgs/totems/hummingbird.png";
import totemBirb from "@/assets/imgs/totems/birb.png";
import totemSeagull from "@/assets/imgs/totems/seagull.png";

const totems = [
  // totemBug,
  // totemBull,
  // totemButterfly,
  // totemCat,
  // totemChicken,
  // totemCrab,
  // totemPelican,
  // totemPig,
  totemPeacock,
  totemHummingbird,
  totemBirb,
  totemSeagull
];

function getTotemByUsername(username) {
  // use username as random seed
  const seed = username
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return totems[seed % totems.length];
}

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
              <div className={cx(classes.username)}>
                <img
                  className={cx(classes.usertotem)}
                  src={getTotemByUsername(username)}
                  alt="totem"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageGroup;
