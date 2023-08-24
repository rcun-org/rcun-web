import React, { useContext, useEffect, useState } from "react"
import classes from "./MovieCard.module.scss"

export default ({ movie }) => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardOuter}>
        <img className={classes.poster} src={movie.kp.posterUrl} />
      </div>
    </div>
  )
}
