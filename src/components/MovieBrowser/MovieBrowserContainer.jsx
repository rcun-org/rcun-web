import React, { useEffect, useContext, useMemo, useState } from "react"
import classes from "./MovieBrowser.module.scss"

import { RoomsContext, AuthContext } from "../../context"
import MovieList from "./MovieList"

const MovieBrowserContainer = () => {
  useEffect(() => {
    const subCursor = document.querySelector("#sub-cursor")
    subCursor.classList = []
  }, [])

  return (
    <div className={classes.container}>
      <MovieList className={classes.roomsList} />
    </div>
  )
}

export default MovieBrowserContainer
