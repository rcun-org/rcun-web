import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import BaseButton from "../../UI/Button/BaseButton"
import BaseModal from "../../UI/Modal/BaseModal"
import CreateRoomForm from "../../CreateRoom/CreateRoomForm"
import classes from "../../Login/Login.module.scss"
import RedirectToRoomConfirm from "../../CreateRoom/RedirectToRoomConfirm"

import IconButton from "../../UI/IconButton/IconButton"
import { AddBoxOutlined } from "@mui/icons-material"

const CreateRoom = () => {
  const history = useHistory()
  const [modalActive, setModalActive] = useState(false)
  const [roomCreatedId, setRoomCreatedId] = useState(null)
  const redirectToVideo = () => {
    history.push(`/room/${roomCreatedId}`)
  }
  useEffect(() => {
    setRoomCreatedId(null)
  }, [modalActive])
  return (
    <>
      <IconButton onClick={() => setModalActive(true)}>
        <AddBoxOutlined />
      </IconButton>
      <BaseModal active={modalActive} setActive={setModalActive}>
        {!roomCreatedId ? (
          <div>
            <div className={classes.loginContainerHead}>Create a new room</div>
            <CreateRoomForm roomCreated={roomId => setRoomCreatedId(roomId)} />
          </div>
        ) : (
          <RedirectToRoomConfirm
            confirmed={() => {
              redirectToVideo()
            }}
          />
        )}
      </BaseModal>
    </>
  )
}

export default CreateRoom
