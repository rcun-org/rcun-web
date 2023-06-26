import React from "react"
import classes from "./BaseButton.module.scss"
import { useState, useEffect } from "react"

const BaseButton = props => {
  let [isFocused, setIsFocused] = useState(false)
  let c = document.getElementById("sub-cursor")

  useEffect(() => {
    if (isFocused) {
      c.classList.add("cursor-over-button")
    } else {
      c.classList.remove("cursor-over-button")
    }
  }, [isFocused])

  return (
    <button
      {...props}
      className={classes.baseButton}
      onMouseEnter={e => setIsFocused(true)}
      onMouseLeave={e => setIsFocused(false)}
    />
  )
}

export default BaseButton
