import { cache } from 'react'
import sanitizeHtml from 'sanitize-html'
import { TMovieImages, TMovieVideos, TReviews } from './_type/movie'
import { TFullTv, TTvAggregatedCredits, TTvFullSeason, TTvKeywords, TTvShows } from './_type/tv'
import { TMDBFetcher } from './fetcher'

// tv shows

export const getPopularTvShows = async (page: number) => await TMDBFetcher<TTvShows>(`/tv/popular?page=${page}`)

export const getAiringTodayTvShows = async (page: number) => await TMDBFetcher<TTvShows>(`/tv/airing_today?page=${page}`)

export const getOnTheAirTvShows = async (page: number) => await TMDBFetcher<TTvShows>(`/tv/on_the_air?page=${page}`)

export const getTopRatedTvShows = async (page: number) => await TMDBFetcher<TTvShows>(`/tv/top_rated?page=${page}`)

// tv

export const getTvDetails = cache(async (id: string) => await TMDBFetcher<TFullTv>(`/tv/${id}`))

export const getTvAggregatedCredits = async (id: string) => await TMDBFetcher<TTvAggregatedCredits>(`/tv/${id}/aggregate_credits`)

export const getTvReviews = async (id: string, page = '1') => {
  const [error, reviews] = await TMDBFetcher<TReviews>(`/tv/${id}/reviews?page=${page}`)
  if (error) return [error] as [Error]

  const sanitizedReviews = { ...reviews, results: reviews.results.map(review => ({ ...review, content: sanitizeHtml(review.content) })) }
  return [undefined, sanitizedReviews] as [undefined, TReviews]
}

export const getTvKeywords = async (id: string) => await TMDBFetcher<TTvKeywords>(`/tv/${id}/keywords`)

export const getTvImages = async (id: string) => await TMDBFetcher<TMovieImages>(`/tv/${id}/images`)

export const getTvVideos = async (id: string) => await TMDBFetcher<TMovieVideos>(`/tv/${id}/videos`)

export const getTvSimilar = async (id: string) => await TMDBFetcher<TTvShows>(`/tv/${id}/similar`)

export const getTvRecommendations = async (id: string) => await TMDBFetcher<TTvShows>(`/tv/${id}/recommendations`)

// tv season

export const getTvSeason = async (id: string, seasonNumber: string) => await TMDBFetcher<TTvFullSeason>(`/tv/${id}/season/${seasonNumber}`)

export const getTvSeasonPosters = async (id: string, seasonNumber: string) =>
  await TMDBFetcher<Omit<TMovieImages, 'backdrops'>>(`/tv/${id}/season/${seasonNumber}/images`)

export const getTvSeasonVideos = async (id: string, seasonNumber: string) =>
  await TMDBFetcher<TMovieVideos>(`/tv/${id}/season/${seasonNumber}/videos`)
