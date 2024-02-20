import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import BaseModal from "../UI/Modal/BaseModal"
import CreateRoomForm from "../CreateRoom/CreateRoomForm"
import classes from "../Login/Login.module.scss"
import RedirectToRoomConfirm from "../CreateRoom/RedirectToRoomConfirm"

import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined"
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import TheatersRoundedIcon from '@mui/icons-material/TheatersRounded';

import IconButton from "../UI/IconButton/IconButton"
import { AddBoxOutlined, OndemandVideoOutlined, PersonalVideoOutlined, } from "@mui/icons-material"
import MovieBrowser from "../../pages/MovieBrowser/MovieBrowser"

const CreateRoom = () => {
  const history = useHistory()
  const [modalActive, setModalActive] = useState(false)
  const [roomCreatedId, setRoomCreatedId] = useState(null)
  const [videoModel, setVideoModel] = useState("youtube")
  const [actionsUnfolded, setActionsUnfolded] = useState(false)

  const redirectToVideo = () => {
    history.push(`/room/${roomCreatedId}`)
  }

  useEffect(() => {
    setRoomCreatedId(null)
  }, [modalActive])

  const handleYoutube = () => {
    setVideoModel("youtube")
    setModalActive(true)
  }

  const handleLibrary = () => {
    // start transformation size 1000% ???
    history.push("/library")
    // setVideoModel("library")
  }

  return (
    <>
      {
      !actionsUnfolded ? (
        <IconButton onClick={() => setActionsUnfolded(true)}>
          <AddBoxOutlined />
        </IconButton>
      ) : (
        <>
        <IconButton>
          <OndemandVideoOutlined onClick={handleYoutube} />
        </IconButton>

        <IconButton>
          <PersonalVideoOutlined onClick={handleLibrary} />
        </IconButton>
        </>
      )
      }

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
              <MovieBrowser />
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
