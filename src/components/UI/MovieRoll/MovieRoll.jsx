import { useAtom } from "jotai"
import MovieCard from "../MovieCard/MovieCard"
import classes from "./MovieRoll.module.scss"
import { moviesAtom, nextPageAtom } from "../../../stores/movie-store"
import { Button } from "@mui/material"
import BaseButton from "../Button/BaseButton"
import IconButton from "../IconButton/IconButton"
import { AddBoxOutlined } from "@mui/icons-material"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"

//const MOVIES = require('./movies.json');

export default () => {
  const [movies] = useAtom(moviesAtom)
  const [, nextPage] = useAtom(nextPageAtom) // only using the setter

  //const movies = MOVIES["ru"];

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
