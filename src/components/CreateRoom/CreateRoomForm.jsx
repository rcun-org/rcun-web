import React, { useContext, useState } from "react"
import BaseInput from "../UI/Input/BaseInput"
import BaseButton from "../UI/Button/BaseButton"
import { createRoom, getRooms } from "../../services/room.services"
import classes from "../Login/Login.module.scss"
import { RoomsContext } from "../../context"
import { useAtom } from "jotai"
import { roomsAtom } from "../../stores/room-store"

const CreateRoomForm = ({ roomCreated }) => {
  // const { rooms, setRooms } = useContext(RoomsContext)

  // TODO all atoms

  const [rooms, setRooms] = useAtom(roomsAtom)

  const [roomData, setRoomData] = useState({
    title: "",
    videoSource: "", // videocdn, youtube, mycima
    playerMode: "youtube", // mp4, m3u8, youtube
  })

  const handleCreate = async () => {
    const newRoom = await createRoom(roomData)
    const newRoomsList = await getRooms()
    setRooms(newRoomsList)
    roomCreated(newRoom._id)
  }

  return (
    <div className={classes.formContainerInputList}>
      <div className="spacer" />
      <BaseInput
        value={roomData.username}
        onChange={event =>
          setRoomData({ ...roomData, title: event.target.value })
        }
        type="text"
        placeholder="Room title"
      />
      <BaseInput
        value={roomData.password}
        onChange={event =>
          setRoomData({ ...roomData, videoSource: event.target.value })
        }
        type="text"
        placeholder="Youtube video link"
      />
      <div className="spacer" />
      <BaseButton onClick={handleCreate}>Create room</BaseButton>
    </div>
  )
}

export default CreateRoomForm
