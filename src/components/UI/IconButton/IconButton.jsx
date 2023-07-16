import React from "react"
import classes from "./IconButton.module.scss"
import { useState, useEffect } from "react"

const IconButton = props => {
  let [isFocused, setIsFocused] = useState(false)
  let c = document.getElementById("sub-cursor")

  useEffect(() => {
    if (isFocused) {
      c.classList.add("cursor-over-icon-button")
    } else {
      c.classList.remove("cursor-over-icon-button")
    }
  }, [isFocused])

  return (
    <button
      {...props}
      className={classes.iconButton}
      onMouseEnter={e => setIsFocused(true)}
      onMouseLeave={e => setIsFocused(false)}
    />
  )
}

export default IconButton
