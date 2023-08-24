import { useAtom } from "jotai"
import MovieCard from "../MovieCard/MovieCard"
import classes from "./MovieRoll.module.scss"
import { moviesAtom, nextPageAtom } from "../../../stores/movie-store"
import { Button } from "@mui/material"
import BaseButton from "../Button/BaseButton"
import IconButton from "../IconButton/IconButton"
import { AddBoxOutlined } from "@mui/icons-material"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"

export default () => {
  const [movies] = useAtom(moviesAtom)
  const [, nextPage] = useAtom(nextPageAtom) // only using the setter

  // const movies = [
  //   {
  //     id: 1,
  //     kp: {
  //       posterUrl: "favicon.ico",
  //     },
  //   },
  //   {
  //     id: 2,
  //     kp: {
  //       posterUrl: "favicon.ico",
  //     },
  //   },
  //   {
  //     id: 3,
  //     kp: {
  //       posterUrl: "favicon.ico",
  //     },
  //   },
  //   {
  //     id: 4,
  //     kp: {
  //       posterUrl: "favicon.ico",
  //     },
  //   },
  // ]

  return (
    <div className={classes.scrollContainer}>
      <div className={classes.movieRoll}>
        <div className={classes.startTile}></div>
        <div className={classes.middleTiles}></div>

        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className={classes.nextPage}>
        <IconButton onClick={nextPage}>
          <KeyboardDoubleArrowDownIcon />
        </IconButton>
      </div>
    </div>
  )
}
