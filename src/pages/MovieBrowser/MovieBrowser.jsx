import React, { useEffect, useContext, useMemo, useState } from "react"
import classes from "../RoomBrowser/RoomBrowser.module.scss"

import MovieList from "./MovieList"
import Header from "../../components/Header/Header"

const MovieBrowser = () => {
  useEffect(() => {
    const subCursor = document.querySelector("#sub-cursor")
    subCursor.classList = []
  }, [])

  return (
    <div className={classes.container}>
      <Header pageTitle={"Movie library"} mask={[0, 0, 1, 0, 1, 1]} />
      <MovieList className={classes.roomsList} />
    </div>
  )
}

export default MovieBrowser
