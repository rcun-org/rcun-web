import React, { useContext, useEffect, useState } from "react"
import styles from "../UI/RoomCard/RoomCard.module.scss"

import { Skeleton } from "@mui/material"

const API_URL = process.env["REACT_APP_API_SERVER"]

const MovieList = props => {
  const [loading, setLoading] = useState(false)

  async function fetchRooms() {
    setLoading(true)
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const cardHeightRem = styles.cardHeight
  const cardWidthRem = `calc(${cardHeightRem} * 1.75)`
  console.log("Card h calculated:", cardHeightRem)

  return (
    <div {...props}>
      <Skeleton
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
    </div>
  )
}

export default MovieList
