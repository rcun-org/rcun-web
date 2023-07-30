import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import BaseButton from "../../UI/Button/BaseButton"
import BaseModal from "../../UI/Modal/BaseModal"
import CreateRoomForm from "../../CreateRoom/CreateRoomForm"
import classes from "../../Login/Login.module.scss"
import RedirectToRoomConfirm from "../../CreateRoom/RedirectToRoomConfirm"

import LocalMoviesIcon from "@mui/icons-material/LocalMovies"
import MovieIconOulined from "@mui/icons-material/MovieOutlined"
import YouTubeIcon from "@mui/icons-material/YouTube"
import CameraRollIcon from "@mui/icons-material/CameraRoll"
import SlideshowIcon from "@mui/icons-material/Slideshow"
import LiveTvIcon from "@mui/icons-material/LiveTv"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined"

import IconButton from "../../UI/IconButton/IconButton"
import { AddBoxOutlined } from "@mui/icons-material"
import MovieBrowserContainer from "../../MovieBrowser/MovieBrowserContainer"

const CreateRoom = () => {
  const history = useHistory()
  const [modalActive, setModalActive] = useState(false)
  const [roomCreatedId, setRoomCreatedId] = useState(null)
  const [videoModel, setVideoModel] = useState("library")

  const redirectToVideo = () => {
    history.push(`/room/${roomCreatedId}`)
  }

  useEffect(() => {
    setRoomCreatedId(null)
  }, [modalActive])

  const handleYoutube = () => {
    setVideoModel("youtube")
  }

  const handleLibrary = () => {
    setVideoModel("library")
  }

  return (
    <>
      <IconButton onClick={() => setModalActive(true)}>
        <AddBoxOutlined />
      </IconButton>
      <BaseModal active={modalActive} setActive={setModalActive}>
        {!roomCreatedId ? (
          <div>
            <div className={classes.loginContainerHead}>
              <span>Create a new room</span>
              <span className={classes.row}>
                <IconButton>
                  <SmartDisplayOutlinedIcon onClick={handleYoutube} />
                </IconButton>
                <IconButton>
                  <FolderOpenIcon onClick={handleLibrary} />
                </IconButton>
              </span>
            </div>
            {videoModel === "youtube" ? (
              <CreateRoomForm
                roomCreated={roomId => setRoomCreatedId(roomId)}
              />
            ) : (
              // library is multistep: select movie ; room form ; redirect confirmation
              <MovieBrowserContainer />
            )}
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
