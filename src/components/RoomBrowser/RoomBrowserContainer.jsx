import React, { useEffect, useMemo, useState } from "react"
import classes from "./RoomBrowser.module.scss"
import RoomsList from "./RoomsList"
import RoomBar from "./RoomBar/RoomBar"

import { RoomsContext } from "../../context"

const RoomBrowserContainer = () => {
  const [rooms, setRooms] = useState([])
  const [roomSearch, setRoomSearch] = useState("")
  const [performanceSwitch, setPerformanceSwitch] = useState(false)

  useEffect(() => {
    let cachePS = localStorage.getItem("performanceSwitch")
    if (!!cachePS) {
      setPerformanceSwitch(cachePS)
    }

    const subCursor = document.querySelector("#sub-cursor")
    subCursor.classList = []
  }, [])

  const handlePerformanceSwitch = (e, v) => {
    setPerformanceSwitch(v)
    localStorage.setItem("performanceSwitch", v)
  }

  const searchedVideos = useMemo(() => {
    if (!roomSearch) {
      return rooms
    }
    return rooms.filter(room =>
      room.title.toLowerCase().includes(roomSearch.toLowerCase())
    )
  }, [roomSearch, rooms])

  return (
    <div className={classes.container}>
      <RoomsContext.Provider
        value={{
          rooms,
          setRooms,
          searchedVideos,
          setRoomSearch,
          performanceSwitch,
        }}
      >
        <div className={classes.header}>
          RCUN
          <div className={classes.divider} />
          Browse rooms
          <div className={classes.divider} />
          <RoomBar className={classes.roomBar} />
        </div>

        {/* <br /> */}

        <RoomsList className={classes.roomsList} />
      </RoomsContext.Provider>
    </div>
  )
}

export default RoomBrowserContainer
