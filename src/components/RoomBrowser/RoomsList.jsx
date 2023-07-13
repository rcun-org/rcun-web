import React, { useContext, useEffect, useState } from "react"
import RoomCard from "../UI/RoomCard/RoomCard"

import { AuthContext, RoomsContext } from "../../context"
import { getRooms, getRoomsDetails } from "../../services/room.services"
import { Skeleton } from "@mui/material"

const API_URL = process.env["REACT_APP_API_SERVER"]

const RoomsList = props => {
  const { rooms, setRooms, searchedVideos } = useContext(RoomsContext)
  const [loading, setLoading] = useState(false)

  async function fetchRooms() {
    setLoading(true)
    let roomsData = await getRooms()
    setRooms(roomsData)
    console.log("roomdata len", roomsData.length)
    roomsData = await getRoomsDetails(roomsData)
    setRooms(roomsData)
    setLoading(false)
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  console.log("rooms:", rooms)

  return (
    <div {...props}>
      {searchedVideos.map((room, index) => {
        return loading ? (
          <Skeleton
            sx={{
              bgcolor: "#484848",
              width: "calc(30% - 1.2rem)",
              zIndex: -100,
            }}
            animation="wave"
            variant="rounded"
            height={160}
          />
        ) : (
          <RoomCard key={index} index={index} room={room} />
        )
      })}

      {/*{*/}
      {/*    loading ? <h3 style={{color: 'white'}}></h3>*/}
      {/*        : searchedVideos.map((room, index) => {*/}
      {/*            return <RoomCard*/}
      {/*                key={index}*/}
      {/*                index={index}*/}
      {/*                room={room}/>*/}
      {/*        })*/}
      {/*}*/}
    </div>
  )
}

export default RoomsList
