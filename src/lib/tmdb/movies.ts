import { TMDBFetcher } from './fetcher'
import { TCredits, TFullMovie, TKeywords, TMovieImages, TMovies, TMovieVideos, TReviews } from './_movie-type'

// movies

export const getPopularMovies = async (page: number) => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/popular?page=${page}`)

export const getNowPlayingMovies = async (page: number) => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/now_playing?page=${page}`)

export const getTopRatedMovies = async (page: number) => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/top_rated?page=${page}`)

export const getUpcomingMovies = async (page: number) => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/upcoming?page=${page}`)

// movie

export const getMovieDetails = async (id: string) => await TMDBFetcher<TFullMovie>(`https://api.themoviedb.org/3/movie/${id}`)

export const getMovieCredits = async (id: string) => await TMDBFetcher<TCredits>(`https://api.themoviedb.org/3/movie/${id}/credits`)

export const getMovieReviews = async (id: string) => await TMDBFetcher<TReviews>(`https://api.themoviedb.org/3/movie/${id}/reviews`)

export const getMovieKeywords = async (id: string) => await TMDBFetcher<TKeywords>(`https://api.themoviedb.org/3/movie/${id}/keywords`)

export const getMovieImages = async (id: string) => await TMDBFetcher<TMovieImages>(`https://api.themoviedb.org/3/movie/${id}/images`)

export const getMovieVideos = async (id: string) => await TMDBFetcher<TMovieVideos>(`https://api.themoviedb.org/3/movie/${id}/videos`)

export const getMovieSimilar = async (id: string) => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/${id}/similar`)

export const getMovieRecommendations = async (id: string) => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/${id}/recommendations`)
