import React from "react"
import classes from "./ActionBar.module.scss"

import CreateRoom from "./CreateRoom"
import JoinRoom from "./JoinRoom"
import MyRooms from "./MyRooms"
import SearchRoom from "./SearchRoom"
import SearchMovie from "./SearchMovie"
import Logout from "../Logout/Logout"

const ActionBar = ({ mask = [1, 1, 1, 1, 0, 1] }) => {
  return (
    <div className={classes.actionBar}>
      <div className={classes.separator} />
      {mask[0] ? <CreateRoom /> : ""}
      {mask[1] ? <JoinRoom /> : ""}
      {mask[2] ? <MyRooms /> : ""}
      {mask[3] ? <SearchRoom /> : ""}
      {mask[4] ? <SearchMovie /> : ""}
      <div className={classes.spacer} />
      {mask[5] ? <Logout /> : ""}
    </div>
  )
}

export default ActionBar
