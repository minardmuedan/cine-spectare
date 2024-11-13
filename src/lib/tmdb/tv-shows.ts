import { cache } from 'react'
import { TCredits, TMovieImages, TMovieVideos, TReviews } from './_movie-type'
import { TFullTv, TTvKeywords, TTvShows } from './_tv-type'
import { TMDBFetcher } from './fetcher'

// tv shows

export const getPopularTvShows = async (page: number) => await TMDBFetcher<TTvShows>(`https://api.themoviedb.org/3/tv/popular?page=${page}`)

export const getAiringTodayTvShows = async (page: number) => await TMDBFetcher<TTvShows>(`https://api.themoviedb.org/3/tv/airing_today?page=${page}`)

export const getOnTheAirTvShows = async (page: number) => await TMDBFetcher<TTvShows>(`https://api.themoviedb.org/3/tv/on_the_air?page=${page}`)

export const getTopRatedTvShows = async (page: number) => await TMDBFetcher<TTvShows>(`https://api.themoviedb.org/3/tv/top_rated?page=${page}`)

// tv

export const getTvDetails = cache(async (id: string) => await TMDBFetcher<TFullTv>(`https://api.themoviedb.org/3/tv/${id}`))

export const getTvCredits = async (id: string) => await TMDBFetcher<TCredits>(`https://api.themoviedb.org/3/tv/${id}/credits`)

export const getTvReviews = async (id: string, page = '1') =>
  await TMDBFetcher<TReviews>(`https://api.themoviedb.org/3/tv/${id}/reviews?page=${page}`)

export const getTvKeywords = async (id: string) => await TMDBFetcher<TTvKeywords>(`https://api.themoviedb.org/3/tv/${id}/keywords`)

export const getTvImages = async (id: string) => await TMDBFetcher<TMovieImages>(`https://api.themoviedb.org/3/tv/${id}/images`)

export const getTvVideos = async (id: string) => await TMDBFetcher<TMovieVideos>(`https://api.themoviedb.org/3/tv/${id}/videos`)

export const getTvSimilar = async (id: string) => await TMDBFetcher<TTvShows>(`https://api.themoviedb.org/3/tv/${id}/similar`)

export const getTvRecommendations = async (id: string) => await TMDBFetcher<TTvShows>(`https://api.themoviedb.org/3/tv/${id}/recommendations`)
