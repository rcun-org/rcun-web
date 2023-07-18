import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import BaseModal from "../../UI/Modal/BaseModal"
import classes from "../../Login/Login.module.scss"

import IconButton from "../../UI/IconButton/IconButton"
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined"

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
        Hello
      </BaseModal>
    </>
  )
}

export default MyRooms
