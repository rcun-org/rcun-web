import React, { useContext, useState } from "react"
import BaseInput from "../UI/Input/BaseInput"
import BaseButton from "../UI/Button/BaseButton"
import { createRoom, getRooms } from "../../services/room.services"
import classes from "../Login/Login.module.scss"
import { RoomsContext } from "../../context"
import { useAtom } from "jotai"
import { roomsAtom } from "../../stores/room-store"

const CreateRoomFromMovieForm = ({ roomCreated, videoSource }) => {
  // const { rooms, setRooms } = useContext(RoomsContext)

  // TODO all atoms

  const [rooms, setRooms] = useAtom(roomsAtom)

  const [roomData, setRoomData] = useState({
    title: "",
    videoSource: videoSource,
    player_mode: "m3u8", // videocdn, youtube
  })

  const handleCreate = async () => {
    console.log("Creating room with videosource of", videoSource)
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
        placeholder="Title"
      />
      <div className="spacer" />
      <BaseButton onClick={handleCreate}>Create room</BaseButton>
    </div>
  )
}

export default CreateRoomFromMovieForm
