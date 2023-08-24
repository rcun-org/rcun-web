import React, { useContext, useEffect, useState } from "react"
import styles from "../RoomCard/RoomCard.module.scss"

import { Button, Skeleton } from "@mui/material"
import MovieCard from "../MovieCard/MovieCard"
import MovieRoll from "../MovieRoll/MovieRoll"
import {
  isLoadingAtom,
  moviesAtom,
  nextPageAtom,
} from "../../../stores/movie-store"
import { useAtom } from "jotai"

const MovieList = props => {
  const [loading, setLoading] = useAtom(isLoadingAtom)

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
        <MovieRoll />
      )}
    </div>
  )
}

export default MovieList
