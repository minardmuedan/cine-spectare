import sanitizeHtml from 'sanitize-html'
import { TMDBFetcher } from './fetcher'
import { TMovieCredits, TFullMovie, TMovieKeywords, TMovieImages, TMovies, TMovieVideos, TReviews } from './_type/movie'

// movies

export const getPopularMovies = async (page: number) => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/popular?page=${page}`)

export const getNowPlayingMovies = async (page: number) => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/now_playing?page=${page}`)

export const getTopRatedMovies = async (page: number) => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/top_rated?page=${page}`)

export const getUpcomingMovies = async (page: number) => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/upcoming?page=${page}`)

// movie

export const getMovieDetails = async (id: string) => await TMDBFetcher<TFullMovie>(`https://api.themoviedb.org/3/movie/${id}`)

export const getMovieCredits = async (id: string) => await TMDBFetcher<TMovieCredits>(`https://api.themoviedb.org/3/movie/${id}/credits`)

export const getMovieReviews = async (id: string, page = '1') => {
  const [error, reviews] = await TMDBFetcher<TReviews>(`https://api.themoviedb.org/3/movie/${id}/reviews?page=${page}`)
  if (error) return [error] as [Error]

  const sanitizedReviews = { ...reviews, results: reviews.results.map(review => ({ ...review, content: sanitizeHtml(review.content) })) }
  return [undefined, sanitizedReviews] as [undefined, TReviews]
}

export const getMovieKeywords = async (id: string) => await TMDBFetcher<TMovieKeywords>(`https://api.themoviedb.org/3/movie/${id}/keywords`)

export const getMovieImages = async (id: string) => await TMDBFetcher<TMovieImages>(`https://api.themoviedb.org/3/movie/${id}/images`)

export const getMovieVideos = async (id: string) => await TMDBFetcher<TMovieVideos>(`https://api.themoviedb.org/3/movie/${id}/videos`)

export const getMovieSimilar = async (id: string) => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/${id}/similar`)

export const getMovieRecommendations = async (id: string) => await TMDBFetcher<TMovies>(`https://api.themoviedb.org/3/movie/${id}/recommendations`)
