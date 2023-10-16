import axios from "axios"
import { atom } from "jotai"
import {languageAtom} from "./language-store";

const API_URL = process.env["REACT_APP_API_SERVER"]
const KP_API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2"
const KP_TOKEN = process.env["KP_TOKEN"]

async function fetchMoviesVCDN({ page, locale } = { page: 1,  locale: 'ar' }) {
  let movies = await axios.get(`${API_URL}movies`, {
    params: {
      page,
      locale
    },
  })
  // if (locale === 'ar' || locale === 'en') {
  //   return movies.data
  // } else if (locale==='ru'){
  //   return movies.data.data
  // }
  return movies.data.data
  // console.log("locale", locale, "MOVIES:", movies)
}

// SOON should become deprecated SOON
// we will just use fetchMovieMeta instead (and backend will choose source based on locale)
async function fetchMovieMetaKP({ id }) {
  let meta = await axios.get(`${KP_API_URL}/films/${id}`, {
    headers: {
      "X-API-KEY": KP_TOKEN,
    },
  })
  return meta.data
}

async function fetchMovieMeta({title, locale}) {
  // API_URL/api/movieMeta?title=minions&locale=en
  let meta = await axios.get(`${API_URL}movieMeta`, {
    params: {
      title,
      locale
    },
  })
  return meta.data
}

async function fetchMovies({ page, locale } = { page: 1, locale: 'ar' }) {
  let movies = await fetchMoviesVCDN({ page, locale })
  console.log("Got movies from VCDN:", movies)

  const CHUNK_SIZE = 5 // Adjust based on what the API can handle
  const numChunks = Math.ceil(movies.length / CHUNK_SIZE)

  for (let c = 0; c < numChunks; c++) {
    const start = c * CHUNK_SIZE
    const end = start + CHUNK_SIZE
    const movieChunk = movies.slice(start, end)

    const promises = movieChunk.map(movie => {
      /// SOON deprecated
      if (locale === 'ar' || locale === 'en') {
        console.log("Movie original title:", movie.orig_title)
        return fetchMovieMeta({ title: movie.orig_title, locale })
      } else {
        return fetchMovieMetaKP({ id: movie.kinopoisk_id })
      }
      /// SOON deprecated
    })
    const metaResults = await Promise.all(promises)

    for (let i = 0; i < movieChunk.length; i++) {
      movieChunk[i].kp = metaResults[i]
    }
  }

  console.log("Movies with metadata:", movies)
  return { movies }
}

let allMovies = []

/// atoms
export const pageAtom = atom(1) // Starting from page 1

export const moviesAtom = atom(async get => {
  const currentPage = get(pageAtom)
  const currentLocale = get(languageAtom)
  // set(isLoadingAtom, true)
  const moviesWithMeta = await fetchMovies({ page: currentPage, locale: currentLocale })
  allMovies = [...allMovies, ...moviesWithMeta.movies]
  return allMovies
})

export const nextPageAtom = atom(
  null, // no getter
  (get, set) => {
    const currentPage = get(pageAtom)
    set(pageAtom, currentPage + 1)
  }
)

export const isLoadingAtom = atom(false)
