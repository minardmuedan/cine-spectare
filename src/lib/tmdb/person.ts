import { TPerson, TPersonCombinedCredits, TPersonImages, TPersonSocialMedia } from './_type/person'
import { TMDBFetcher } from './fetcher'

export const getPerson = async (id: string) => await TMDBFetcher<TPerson>(`https://api.themoviedb.org/3/person/${id}`)

export const getPersonSocialMedia = async (id: string) =>
  await TMDBFetcher<TPersonSocialMedia>(`https://api.themoviedb.org/3/person/${id}/external_ids`)

export const getPersonCombinedCredits = async (id: string) =>
  await TMDBFetcher<TPersonCombinedCredits>(`https://api.themoviedb.org/3/person/${id}/combined_credits`)

export const getPersonImages = async (id: string) => await TMDBFetcher<TPersonImages>(`https://api.themoviedb.org/3/person/${id}/images`)
