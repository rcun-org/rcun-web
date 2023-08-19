import React, { useContext, useEffect, useState } from "react"
import styles from "../../components/UI/RoomCard/RoomCard.module.scss"

import { Skeleton } from "@mui/material"
import MovieCard from "../../components/UI/MovieCard/MovieCard"

const API_URL = process.env["REACT_APP_API_SERVER"]

const MovieList = props => {
  const [loading, setLoading] = useState(false)

  async function fetchMoviesMeta() {
    setLoading(true)
  }

  useEffect(() => {
    // fetchMoviesMeta()
  }, [])

  const cardHeightRem = styles.cardHeight
  const cardWidthRem = `calc(${cardHeightRem} * 1.6)`
  console.log("Card h calculated:", cardHeightRem)

  return (
    <div {...props}>
      {loading ? (
        <Skeleton
          sx={{
            bgcolor: "#404040",
            width: cardHeightRem,
            height: cardWidthRem,
            zIndex: -100,
            borderRadius: "16px",
          }}
          animation="wave"
          variant="rounded"
        />
      ) : (
        <MovieCard />
      )}
    </div>
  )
}

export default MovieList
