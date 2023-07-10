import React from "react"
import classes from "./Message.module.scss"
import { useState, useEffect } from "react"

const Message = props => {
  let [isFocused, setIsFocused] = useState(false)
  let c = document.getElementById("sub-cursor")

  useEffect(() => {
    if (isFocused) {
      c.classList.add("cursor-over-input")
    } else {
      c.classList.remove("cursor-over-input")
    }
  }, [isFocused])

  let usernameBlock = (
    <span
      className={`${classes.username} ${
        props.isSelf ? classes.selfMessageElement : ""
      }`}
    >
      {props.username}
    </span>
  )
  let textBlock = (
    <span
      {...props}
      className={`${classes.text} ${
        props.isSelf ? classes.selfMessageElement : ""
      }`}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      {props.text}
    </span>
  )

  if (props.isSelf) {
    return (
      <div className={`${classes.messageEntry} ${classes.selfMessage}`}>
        {textBlock}
        {usernameBlock}
      </div>
    )
  } else {
    return (
      <div className={`${classes.messageEntry}`}>
        {usernameBlock}
        {textBlock}
      </div>
    )
  }
}

export default Message
