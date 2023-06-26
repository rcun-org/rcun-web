import React from "react"
import classes from "./BaseInput.module.scss"
import { useState, useEffect } from "react"

const BaseInput = props => {
  let [isFocused, setIsFocused] = useState(false)
  let c = document.getElementById("sub-cursor")

  useEffect(() => {
    if (isFocused) {
      c.classList.add("cursor-over-input")
    } else {
      c.classList.remove("cursor-over-input")
    }
  }, [isFocused])

  return (
    <input
      {...props}
      className={`${classes.baseInput} ${props.isFancy && classes.fancy}`}
      autoComplete="off"
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    />
  )
}

export default BaseInput
