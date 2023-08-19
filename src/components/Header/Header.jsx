import React from "react"
// import ActionBar from "../../components/ActionBar/ActionBar"
import classes from "./Header.module.scss"
import ActionBar from "../../components/ActionBar/ActionBar"

const Header = ({ pageTitle, mask }) => {
  return (
    <div className={classes.header}>
      <div className={classes.headerEl}>RCUN</div>
      <div className={classes.divider} />
      <div className={classes.headerEl}>{pageTitle}</div>
      <ActionBar mask={mask} />
    </div>
  )
}

export default Header
