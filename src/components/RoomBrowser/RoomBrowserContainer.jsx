import React, { useEffect, useContext, useMemo, useState } from "react"
import classes from "./RoomBrowser.module.scss"
import RoomsList from "./RoomsList"
import RoomBar from "./RoomBar/RoomBar"

import { RoomsContext, AuthContext } from "../../context"

const RoomBrowserContainer = () => {
  const [rooms, setRooms] = useState([])
  const [roomSearch, setRoomSearch] = useState("")
  const [roomFilter, setRoomFilter] = useState("")
  const [performanceSwitch, setPerformanceSwitch] = useState(false)

  const { userData } = useContext(AuthContext)

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
    let searchedResult = []
    if (roomFilter === "my-rooms") {
      for (var i in rooms) {
        let r = rooms[i]
        if (r.owner._id === userData.id) {
          searchedResult.push(r)
        }
      }
      return searchedResult
    }

    if (!roomSearch) {
      return rooms
    }
    searchedResult = rooms.filter(room =>
      room.title.toLowerCase().includes(roomSearch.toLowerCase())
    )
    return searchedResult
  }, [roomSearch, rooms, roomFilter])

  return (
    <div className={classes.container}>
      <RoomsContext.Provider
        value={{
          rooms,
          setRooms,
          searchedVideos,
          setRoomSearch,
          setRoomFilter,
          performanceSwitch,
        }}
      >
        <div className={classes.header}>
          <div className={classes.headerEl}>RCUN</div>
          <div className={classes.divider} />
          <div className={classes.headerEl}>Browse rooms</div>
          {/* <div className={classes.divider} /> */}
          <RoomBar className={classes.roomBar} />
        </div>

        {/* <br /> */}

        <RoomsList className={classes.roomsList} />
      </RoomsContext.Provider>
    </div>
  )
}

export default RoomBrowserContainer
