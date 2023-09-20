import React, { useContext, useEffect, useState } from "react"
import classes from "./MovieCard.module.scss"
import MovieCardDescription from "../MovieCardDescription/MovieCardDescription"

// TODO: Доработать ховер на cardContainer - увеличивать только при наведении мышки на картинку
export default ({ movie }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => {
    setShowDescription(true);
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
  };

  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardOuter}>
        <img
          className={classes.poster}
          src={movie.kp.posterUrl}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      {showDescription && <MovieCardDescription movie={movie} />}
    </div>
  )
}
