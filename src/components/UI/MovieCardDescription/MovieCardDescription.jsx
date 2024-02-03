import React, { useContext, useEffect, useState } from "react"
import classes from "./MovieCardDescription.module.scss"

// TODO: подумать над проверками наличия свойств у объекта movie
// TODO: поменять иконку звездочки
export default ({ movie }) => {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className={classes.description}>
      <div className={classes.descriptionHeader}>
        <div className={classes.movieRating}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" fill="none">
            <path
              className={classes.movieRatingIcon}
              d="M6.65 2.377a1 1 0 0 1 1.7 0l1.438 2.328a1 1 0 0 0 .614.446l2.658.648a1 1 0 0 1 .526 1.618l-1.77 2.087a1 1 0 0 0-.234.721l.205 2.728a1 1 0 0 1-1.376 1l-2.532-1.037a1 1 0 0 0-.758 0l-2.532 1.037a1 1 0 0 1-1.376-1l.205-2.728a1 1 0 0 0-.235-.721L1.414 7.417A1 1 0 0 1 1.94 5.8l2.658-.648a1 1 0 0 0 .614-.446l1.437-2.328Z"
            />
          </svg>
          {movie?.kp?.ratingKinopoisk}
        </div>
        <div className={classes.movieTitle}>
          {truncateText(movie?.ru_title, 30)}
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
    </div>
  )
}
