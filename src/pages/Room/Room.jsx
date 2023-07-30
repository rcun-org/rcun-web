import React, { useEffect, useState, useRef, useContext } from "react"
import VideoPlayer from "../VideoPlayer"
import { useParams } from "react-router-dom"
import Chat from "../../components/Chat"
import { getRoomById, loadParts } from "../../services/room.services"
// import PlayerController from "../../components/PlayerController"
import { AuthContext } from "../../context"

import classes from "./room.module.scss"
import { io } from "socket.io-client"
import CursorController from "../../components/CursorController/CursorController"

const WS_URL = process.env["REACT_APP_WS_SERVER"]
const ALLOWED_DELAY = 3

const Room = () => {
  const { id } = useParams()
  const [roomData, setRoomData] = useState(null)
  let {
    userData: { username },
  } = useContext(AuthContext)
  let userNameRef = useRef(username)

  // ws connection
  let socketRef = useRef(0)

  // get room from api
  useEffect(() => {
    const fetchRoomData = async () => {
      let rd = await getRoomById(id)
      setRoomData(rd)
    }
    fetchRoomData().catch()
  }, [])

  // ws
  const [_hasRun, _setHasRun] = useState(false)
  useEffect(() => {
    if (!!roomData && !_hasRun) {
      _setHasRun(true)

      socketRef.current = new io(WS_URL, {
        transports: ["websocket", "polling"],
      })

      socketRef.current.on("connect", function () {
        console.log("on connect success")
        console.log("room data", roomData)
        socketRef.current.emit("room:join", roomData["_id"])
      })
      socketRef.current.on("close", function () {
        console.log("close")
      })
      socketRef.current.on("connect_error", e => {
        console.error("socketIO ERROR connecting!", e)
        socketRef.current.io.opts.transports = ["polling", "websocket"]
      })

      socketRef.current.on("room:stateUpdate", function (e) {
        console.log("received room update", e, typeof e)
        let roomEventChange = e
        let newState = roomData
        for (let k in roomEventChange) {
          if (k !== "sender") {
            newState[k] = roomEventChange[k]
          }
          if (k === "video") {
            newState["backupVideo"] = roomEventChange.video.link
          }
        }
        console.log("setting new roomstate:", newState)
        setRoomData({ ...newState })
        // fetchRoomData()
      })

      // on receive event
      socketRef.current.on("player:event", function (e) {
        console.log("received socket msg", JSON.parse(e))
        let playerEventChange = JSON.parse(e)
        let newState = playerState
        for (let k in playerEventChange) {
          if (k !== "sender") {
            newState[k] = playerEventChange[k]
          }
        }
        const registeredDelay = Math.abs(
          playerRef.current.getCurrentTime() - newState.playerTimecode
        )
        if (registeredDelay > ALLOWED_DELAY) {
          playerRef.current.seekTo(newState.playerTimecode)
        }
        setPlayerState({ ...newState })
      })
    }

    console.log("Room data changed:", roomData)
  }, [roomData])

  // player state
  let [playerState, setPlayerState] = useState({
    isPaused: true,
    playerTimecode: 0,
  })

  const backupVideoRef = useRef(null)
  useEffect(() => {
    if (roomData) {
      backupVideoRef.current = roomData.backupVideo
    }
  }, [roomData])

  // same for roomData.backupPlayerState.mode
  const playerModeRef = useRef(null)
  useEffect(() => {
    if (roomData) {
      playerModeRef.current = roomData.backupPlayerState.mode
    }
  }, [roomData])

  useEffect(() => {
    const partsToLoad = 5
    let isPartFirst = true
    const intervalId = setInterval(() => {
      if (!backupVideoRef.current) return
      console.log("player mode:", playerModeRef.current)
      if (!playerRef.current) return
      if (playerModeRef.current === "youtube") {
        clearInterval(intervalId)
      }
      const maxt = playerRef.current.getDuration()
      const t = playerRef.current.getCurrentTime()
      const pos = Math.round(t / 6)
      if (pos !== 0 || isPartFirst) {
        isPartFirst = false
        const l = Math.max(pos - partsToLoad, 0)
        const r = Math.min(pos + partsToLoad, maxt)
        console.log("t:", t, "req parts from", l, "to", r)
        loadParts(backupVideoRef.current, l, r)
      }
    }, 1000) // выполняет каждую секунду
    return () => clearInterval(intervalId)
  }, [])

  // send function
  function broadcastChange(change) {
    change.sender = userNameRef.current
    let msg = JSON.stringify(change)
    console.log("SENT socket msg", JSON.parse(msg))
    socketRef.current.emit("player:event", msg)
  }

  // button handlers
  function handleBackArrowPush(event) {
    let currentTime = playerRef.current.getCurrentTime()
    let change = {
      playerTimecode: currentTime - 5,
    }
    let newState = {
      ...playerState,
      ...change,
    }
    setPlayerState(newState)
    broadcastChange(change)
    playerRef.current.seekTo(currentTime - 5) // perform action
  }

  function handleForwardArrowPush(event) {
    let currentTime = playerRef.current.getCurrentTime()
    let change = {
      playerTimecode: currentTime + 5,
    }
    let newState = {
      ...playerState,
      ...change,
    }
    setPlayerState(newState)
    broadcastChange(change)
    playerRef.current.seekTo(currentTime + 5)
  }

  function handlePlayPausePush(event) {
    let change = {
      isPaused: !playerState.isPaused,
      playerTimecode: playerRef.current.getCurrentTime(),
    }
    let newState = {
      ...playerState,
      ...change,
    }
    setPlayerState(newState)
    broadcastChange(change)
  }

  let playerRef = useRef()

  // ui
  return (
    <div className={classes.container}>
      {!roomData ? (
        <h3 style={{ color: "white" }}></h3>
      ) : (
        <div style={{ height: "100%" }}>
          <div className={classes.video_player_container}>
            <CursorController
              handleBackArrowPush={handleBackArrowPush}
              handlePlayPausePush={handlePlayPausePush}
              handleForwardArrowPush={handleForwardArrowPush}
              isPaused={playerState.isPaused}
            />

            <VideoPlayer
              className={classes.video_player}
              videoId={roomData.backupVideo}
              isPlaying={!playerState.isPaused}
              forwardedRef={playerRef}
            />
          </div>

          <Chat />
        </div>
      )}
    </div>
  )
}

export default Room
