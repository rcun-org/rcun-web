import React, { useContext, useEffect, useState } from "react";

import { Button, Skeleton } from "@mui/material";
import MovieCard from "./MovieRoll/MovieCard";
import MovieRoll from "./MovieRoll";
import {
  isLoadingAtom,
  moviesAtom,
  nextPageAtom
} from "@/shared/lib/stores/movie-store";
import { useAtom } from "jotai";

import roomCardStyles from "@/pages/Room/RoomCard/RoomCard.module.scss";

const MovieList = (props) => {
  const [loading, setLoading] = useAtom(isLoadingAtom);

  const cardHeightRem = roomCardStyles.cardHeight;
  const cardWidthRem = `calc(${cardHeightRem} * 1.6)`;
  console.log("Card h calculated:", cardHeightRem);

  return (
    <div {...props}>
      {loading ? (
        <Skeleton
          sx={{
            bgcolor: "#404040",
            width: cardHeightRem,
            height: cardWidthRem,
            zIndex: -100,
            borderRadius: "16px"
          }}
          animation="wave"
          variant="rounded"
        />
      ) : (
        <MovieRoll />
      )}
    </div>
  );
};

export default MovieList;
