import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import BaseModal from "../../UI/Modal/BaseModal"
import classes from "./MyRooms.module.scss"

import IconButton from "../../UI/IconButton/IconButton"
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined"
import BaseButton from "../../UI/Button/BaseButton"
import SearchRoom from "./SearchRoom"

const MyRooms = () => {
  const history = useHistory()
  const [modalActive, setModalActive] = useState(false)
  const [roomCreatedId, setRoomCreatedId] = useState(null)

  useEffect(() => {
    setRoomCreatedId(null)
  }, [modalActive])

  return (
    <>
      <IconButton onClick={() => setModalActive(true)}>
        <WindowOutlinedIcon />
      </IconButton>
      <BaseModal active={modalActive} setActive={setModalActive}>
        <div className={classes.column}>
          {/* <SearchRoom /> */}
          <BaseButton>My rooms</BaseButton>
          <BaseButton>Friends' rooms</BaseButton>
          <BaseButton>Public rooms</BaseButton>
        </div>
      </BaseModal>
    </>
  )
}

export default MyRooms
