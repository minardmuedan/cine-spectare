import { TMovies } from './_type/movie'
import { TSearchPerson } from './_type/search'
import { TTvShows } from './_type/tv'
import { TMDBFetcher } from './fetcher'

export const getSearchMovies = async (query: string, page = 1) => await TMDBFetcher<TMovies>(`/search/movie?query=${query}&page=${page}`)

export const getSearchTv = async (query: string, page = 1) => await TMDBFetcher<TTvShows>(`/search/tv?query=${query}&page=${page}`)

export const getSearchPerson = async (query: string, page = 1) => await TMDBFetcher<TSearchPerson>(`/search/person?query=${query}&page=${page}`)

export const getSearchKeywords = async (query: string, page = 1) =>
  await TMDBFetcher<Omit<TMovies, 'results'> & { results: { id: number; name: string }[] }>(`/search/keyword?query=${query}&page=${page}`)
