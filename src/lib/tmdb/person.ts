import { TPerson, TPersonCombinedCredits, TPersonImages, TPersonSocialMedia } from './_type/person'
import { TMDBFetcher } from './fetcher'

export const getPerson = async (id: string) => await TMDBFetcher<TPerson>(`/person/${id}`)

export const getPersonSocialMedia = async (id: string) => await TMDBFetcher<TPersonSocialMedia>(`/person/${id}/external_ids`)

export const getPersonCombinedCredits = async (id: string) => await TMDBFetcher<TPersonCombinedCredits>(`/person/${id}/combined_credits`)

export const getPersonImages = async (id: string) => await TMDBFetcher<TPersonImages>(`/person/${id}/images`)
