import { useAtom } from "jotai";
import MovieCard from "./MovieCard";
import { moviesAtom, nextPageAtom } from "@/shared/lib/stores/movie-store.js";
import IconButton from "@/shared/UI/IconButton/IconButton";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { searchAtom } from "@/shared/lib/stores/search-store.js";

import classes from "./MovieRoll.module.scss";
import compareStrings from "@/shared/lib/utils/compareStrings";

//const MOVIES = require('./movies.json');

const MovieRoll = () => {
  const [movies] = useAtom(moviesAtom);
  const [, nextPage] = useAtom(nextPageAtom); // only using the setter
  const [searchValue] = useAtom(searchAtom);

  //const movies = MOVIES["ru"];

  const filteredMovies = searchValue
    ? movies.filter((mEl) => compareStrings(mEl?.ru_title, searchValue))
    : movies;

  return (
    <div className={classes.scrollContainer}>
      <div className={classes.movieRoll}>
        <div className={classes.startTile}></div>
        <div className={classes.middleTiles}></div>

        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className={classes.nextPage}>
        <IconButton onClick={nextPage}>
          <KeyboardDoubleArrowDownIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MovieRoll;
