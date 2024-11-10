import tryCatchWrapper from '../helpers/try-catch'
import { TMDBFetcher } from './fetcher'
import { TCredits, TFullMovie, TKeywords, TMovies, TReviews } from './type'

export const getPopularMovies = (page: number) =>
  tryCatchWrapper(async () => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/popular?page=${page}`))

export const getNowPlayingMovies = (page: number) =>
  tryCatchWrapper(async () => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/now_playing?page=${page}`))

export const getTopRatedMovies = (page: number) =>
  tryCatchWrapper(async () => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/top_rated?page=${page}`))

export const getUpcomingMovies = (page: number) =>
  tryCatchWrapper(async () => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/upcoming?page=${page}`))

//

// movie

export const getMovieDetails = (id: string) => tryCatchWrapper(async () => await TMDBFetcher<TFullMovie>(`https://api.themoviedb.org/3/movie/${id}`))

export const getMovieCredits = (id: string) =>
  tryCatchWrapper(async () => await TMDBFetcher<TCredits>(`https://api.themoviedb.org/3/movie/${id}/credits`))

export const getMovieReviews = (id: string) =>
  tryCatchWrapper(async () => await TMDBFetcher<TReviews>(`https://api.themoviedb.org/3/movie/${id}/reviews`))

export const getMovieKeywords = (id: string) =>
  tryCatchWrapper(async () => await TMDBFetcher<TKeywords>(`https://api.themoviedb.org/3/movie/${id}/keywords`))
