import React, { useEffect } from "react";

import MovieList from "@/pages/MovieBrowser/MovieList";
import Header from "@/components/Header/Header";

import classes from "./MovieBrowser.module.scss";
import {
  CREATE_ROOM,
  getSections,
  JOIN_ROOM
} from "@/shared/constants/headSection";

const MovieBrowser = () => {
  useEffect(() => {
    const subCursor = document.querySelector("#sub-cursor");
    subCursor.classList = [];
  }, []);

  const sections = getSections({
    [CREATE_ROOM]: false,
    [JOIN_ROOM]: false
  });

  return (
    <div className={classes.container}>
      <Header pageTitle={"Movie library"} sections={sections} />
      <MovieList />
    </div>
  );
};

export default MovieBrowser;
