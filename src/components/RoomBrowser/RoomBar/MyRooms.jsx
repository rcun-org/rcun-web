import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import BaseModal from "../../UI/Modal/BaseModal"
import classes from "./MyRooms.module.scss"
import IconButton from "../../UI/IconButton/IconButton"
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined"
import BaseButton from "../../UI/Button/BaseButton"
import { RoomsContext } from "../../../context"

const MyRooms = () => {
  const history = useHistory()

  const [modalActive, setModalActive] = useState(false)
  const [roomCreatedId, setRoomCreatedId] = useState(null)

  const { setRoomFilter } = useContext(RoomsContext)

  useEffect(() => {
    setRoomCreatedId(null)
  }, [modalActive])

  const handleMyRooms = () => {
    setRoomFilter("my-rooms")
    setModalActive(false)
  }

  const handlePublicRooms = () => {
    setRoomFilter("public-rooms")
    setModalActive(false)
  }

  return (
    <>
      <IconButton onClick={() => setModalActive(true)}>
        <WindowOutlinedIcon />
      </IconButton>
      <BaseModal active={modalActive} setActive={setModalActive}>
        <div className={classes.column}>
          {/* <SearchRoom /> */}
          <BaseButton onClick={handleMyRooms}>My rooms</BaseButton>
          <BaseButton onClick={handlePublicRooms}>Public rooms</BaseButton>
        </div>
      </BaseModal>
    </>
  )
}

export default MyRooms
