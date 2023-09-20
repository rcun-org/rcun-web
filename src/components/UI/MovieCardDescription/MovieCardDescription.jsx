import React, { useContext, useEffect, useState } from "react"
import classes from "./MovieCardDescription.module.scss"

// TODO: подумать над проверками наличия свойств у объекта movie
// TODO: поменять иконку звездочки
export default ({ movie }) => {
  return (
    <>
      <div className={classes.descriptionHeader}>
        <div className={classes.movieRating}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 100 100">
            <polygon
              class={classes.movieRatingIcon}
              points="50,10 61.8,37.6 90,42.4 69.1,65.5 79.2,92 50,77 20.8,92 30.9,65.5 10,42.4 38.2,37.6"
            />
          </svg>
          {movie?.kp?.ratingKinopoisk}
        </div>
        <div className={classes.movieTitle}>
          {movie?.ru_title}
        </div>
      </div>
      <div className={classes.descriptionBody}>
        <div className={classes.movieDescription}>
          {movie?.kp?.description}
        </div>
        <div className={classes.movieAdditionalInformation}>
          <div>Год производства</div><div>{movie.kp.year}</div>
          <div>Страна</div><div>{movie?.kp?.countries.map(el => el.country).join(", ")}</div>
          <div>Жанр</div><div>{movie?.kp?.genres.map(el => el.genre).join(", ")}</div>
          {/*<div>Режиссер</div><div>{movie.year}</div>
          <div>Сценарий</div><div>{movie.year}</div>
          <div>Продюсер</div><div>{movie.year}</div>
          <div>Время</div><div>{movie.year}</div>*/}
        </div>
      </div>
    </>
  )
}
