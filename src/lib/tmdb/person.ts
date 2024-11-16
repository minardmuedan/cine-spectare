import { TPerson, TPersonMovieCredits } from './_type/person'
import { TMDBFetcher } from './fetcher'

export const getPerson = async (id: string) => await TMDBFetcher<TPerson>(`https://api.themoviedb.org/3/person/${id}`)

export const getPersonMovieCredits = async (id: string) =>
  await TMDBFetcher<TPersonMovieCredits>(`https://api.themoviedb.org/3/person/${id}/movie_credits`)
