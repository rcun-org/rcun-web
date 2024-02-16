import React, { useContext, useEffect, useState } from "react"
import classes from "./MovieCardDescription.module.scss"

// TODO: подумать над проверками наличия свойств у объекта movie
// TODO: поменять иконку звездочки
export default ({ movie }) => {
  const truncateText = (text, maxLength) => {
    if (!text) return ""
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
          {movie?.details?.rating}
        </div>
        <div className={classes.movieTitle}>
          {truncateText(movie?.details?.title, 30)}
        </div>
      </div>
      <div className={classes.descriptionBody}>
        <div className={classes.movieDescription}>
          {movie?.details?.plot}
        </div>
        <div className={classes.movieAdditionalInformation}>
          <div>Год производства</div><div>{movie.details.year}</div>
          <div>Страна</div><div>{movie?.details?.countries.join(", ")}</div>
          <div>Жанр</div><div>{movie?.details?.genres.join(", ")}</div>
          {/*<div>Режиссер</div><div>{movie.year}</div>
          <div>Сценарий</div><div>{movie.year}</div>
          <div>Продюсер</div><div>{movie.year}</div>
          <div>Время</div><div>{movie.year}</div>*/}
        </div>
      </div>
    </div>
  )
}

/*
IMDb meta fetched: {
  year: 2015,
  releaseDate: '20151106',
  directors: [ { id: 'nm0005222', name: 'Sam Mendes' } ],
  writers: [
    { id: 'nm0517589', name: 'John Logan' },
    { id: 'nm0701031', name: 'Neal Purvis' },
    { id: 'nm0905498', name: 'Robert Wade' }
  ],
  runtime: 148,
  countries: [ 'United Kingdom', 'United States' ],
  languages: [ 'English', 'German', 'Italian', 'Spanish', 'French', 'Ukrainian' ],
  genres: [ 'Action', 'Adventure', 'Thriller' ],
  simplePlot: "A cryptic message from James Bond's past sends him on a trail to uncover the existence of a sinister organisation named SPECTRE. With a new threat dawning, Bond learns the terrible truth about the author of all his pain in his most recent missions.",
  rating: 6.8,
  metascore: 60,
  rated: 'PG-13',
  votes: 463127,
  type: 'MOVIE',
  idIMDB: 'tt2379713',
  title: 'Spectre',
  urlIMDB: 'https://www.imdb.com/title/tt2379713/',
  urlPoster: 'https://m.media-amazon.com/images/M/MV5BOWQ1MDE1NzgtNTQ4OC00ZjliLTllZDAtN2IyOTVmMTc5YjUxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg'
}

Kinopoisk meta fetched: {
  kinopoiskId: 794249,
  kinopoiskHDId: '4b767dc9891f77f9a54dfe459c07f1aa',
  imdbId: 'tt3152624',
  nameRu: 'Девушка без комплексов',
  nameEn: null,
  nameOriginal: 'Trainwreck',
  posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/794249.jpg',
  posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/794249.jpg',
  coverUrl: 'https://avatars.mds.yandex.net/get-ott/224348/2a0000017c0810b3d7794fb02185f84d22f1/orig',
  logoUrl: 'https://avatars.mds.yandex.net/get-ott/2439731/2a00000172bc67b3ce312b46e352e22d4c6b/orig',
  reviewsCount: 45,
  ratingGoodReview: 51,
  ratingGoodReviewVoteCount: 16,
  ratingKinopoisk: 5.7,
  ratingKinopoiskVoteCount: 38488,
  ratingImdb: 6.2,
  ratingImdbVoteCount: 141756,
  ratingFilmCritics: 7.3,
  ratingFilmCriticsVoteCount: 291,
  ratingAwait: 90,
  ratingAwaitCount: 3852,
  ratingRfCritics: 67,
  ratingRfCriticsVoteCount: 12,
  webUrl: 'https://www.kinopoisk.ru/film/794249/',
  year: 2015,
  filmLength: 124,
  slogan: 'Ни в чём себе не отказывай',
  description: 'У симпатичной девушки Эми никогда не было серьезных отношений. Она придерживается свободных взглядов и обычно не ходит дважды с одним парнем на свидание. Будучи сотрудницей крупного мужского издания, она получает задание от шефа написать статью о спортивном враче Ароне. Эми и не рассчитывала, что деловая встреча с доктором изменит ее жизнь.',
  shortDescription: 'Любовь нечаянно нагрянула к журналистке, не верившей в моногамию. Джадд Апатоу дарит жанру ромкома новую жизнь',
  editorAnnotation: null,
  isTicketsAvailable: false,
  productionStatus: null,
  type: 'FILM',
  ratingMpaa: 'r',
  ratingAgeLimits: 'age18',
  countries: [ { country: 'США' } ],
  genres: [ { genre: 'драма' }, { genre: 'мелодрама' }, { genre: 'комедия' } ],
  startYear: null,
  endYear: null,
  serial: false,
  shortFilm: false,
  completed: false,
  hasImax: false,
  has3D: false,
  lastSync: '2024-01-24T06:54:32.032649'
}
 */