import React, { useContext, useEffect, useState } from "react"
import RoomCard from "../UI/RoomCard/RoomCard"
import styles from "../UI/RoomCard/RoomCard.module.scss"

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

  const cardHeightRem = styles.cardHeight
  const cardWidthRem = `calc(${cardHeightRem} * 1.75)`
  console.log("Card h calculated:", cardHeightRem)

  return (
    <div {...props}>
      {searchedVideos.map((room, index) => {
        return loading ? (
          <Skeleton
            // width={cardWidth * 1.05}
            // height={cardWidth / 1.75}
            sx={{
              bgcolor: "#404040",
              width: cardWidthRem,
              height: cardHeightRem,
              zIndex: -100,
              borderRadius: "16px",
            }}
            animation="wave"
            variant="rounded"
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
