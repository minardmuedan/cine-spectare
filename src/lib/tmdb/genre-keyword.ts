import { cache } from 'react'
import { TMovies } from './_type/movie'
import { TTvShows } from './_type/tv'
import { TMDBFetcher } from './fetcher'

export const getGenreMovies = async (genreId: string, page: number) =>
  await TMDBFetcher<TMovies>(`/discover/movie?with_genres=${genreId}&page=${page}&sort_by=popularity.desc`)

export const getKeywordMovie = async (keyword: string, page: number) =>
  await TMDBFetcher<TMovies>(`/discover/movie?with_keywords=${keyword}&page=${page}&sort_by=popularity.desc`)

export const getGenreTvShows = async (genreId: string, page: number) =>
  await TMDBFetcher<TTvShows>(`/discover/tv?with_genres=${genreId}&page=${page}&sort_by=popularity.desc`)

export const getKeywordTvShows = async (keyword: string, page: number) =>
  await TMDBFetcher<TTvShows>(`/discover/tv?with_keywords=${keyword}&page=${page}&sort_by=popularity.desc`)

export const getKeyword = cache(async (keywordId: string) => await TMDBFetcher<{ id: number; name: string }>(`/keyword/${keywordId}`))
