import React, { useState } from "react"
import BaseButton from "../../UI/Button/BaseButton"
import Chat from "../../Chat"
import { useHistory } from "react-router-dom"
import JoinRoom from "./JoinRoom"
import CreateRoom from "./CreateRoom"
import Logout from "../../Logout/Logout"
import SearchRoom from "./SearchRoom"
import MyRooms from "./MyRooms"
import classes from "./RoomBar.module.scss"

const RoomBar = props => {
  return (
    <div {...props}>
      <div className={classes.separator} />
      <CreateRoom />
      <JoinRoom />
      <MyRooms />
      <SearchRoom />
      <div className={classes.spacer} />
      <Logout />
    </div>
  )
}

export default RoomBar
