import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import classes from "./MovieCard.module.scss"
import MovieCardDescription from "../MovieCardDescription/MovieCardDescription"

import BaseModal from "../Modal/BaseModal"

import IconButton from "../../UI/IconButton/IconButton"
import { AddBoxOutlined, SmartDisplayOutlinedIcon } from "@mui/icons-material"
import CreateRoomForm from "../../CreateRoom/CreateRoomForm"
import CreateRoomFromMovieForm from "../../CreateRoom/CreateRoomFromMovieForm"
import RedirectToRoomConfirm from "../../CreateRoom/RedirectToRoomConfirm"

import loginClasses from "../../Login/Login.module.scss"
import { useAtom } from "jotai"
import { languageAtom } from "../../../stores/language-store"

// TODO: Доработать ховер на cardContainer - увеличивать только при наведении мышки на картинку
export default ({ movie }) => {
  const history = useHistory()
  const [showDescription, setShowDescription] = useState(false)
  const [roomCreatedId, setRoomCreatedId] = useState(null)
  const [modalActive, setModalActive] = useState(false)
  // get language atom
  //  useAtom(languageAtom)
  const [language] = useAtom(languageAtom)

  // we're for sure not youtube because we're in movie library
  const videoSource = language === "ru" ? "videocdn" : "mycima"

  const redirectToVideo = () => {
    history.push(`/room/${roomCreatedId}`)
  }

  useEffect(() => {
    setRoomCreatedId(null)
  }, [modalActive])

  const handleMouseEnter = () => {
    setShowDescription(true)
  }

  const handleMouseLeave = () => {
    setShowDescription(false)
  }

  const handleMouseClick = () => {
    // open modal
    setModalActive(true)
  }

  // roomCreated={roomId => setRoomCreatedId(roomId)}

  return (
    <>
      <div className={classes.cardContainer}>
        <div className={classes.cardOuter}>
          <img
            className={classes.poster}
            src={movie.kp.posterUrl}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseClick}
          />
        </div>
        {showDescription && <MovieCardDescription movie={movie} />}
      </div>

      <BaseModal active={modalActive} setActive={setModalActive}>
        {!roomCreatedId ? (
          <>
            <div className={loginClasses.loginContainerHead}>
              <span>Create a new room</span>
            </div>
            <CreateRoomFromMovieForm
              videoUrl={movie.media[0].qualities[0].url}
              videoSource={videoSource}
              roomCreated={roomId => setRoomCreatedId(roomId)}
            />
          </>
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
