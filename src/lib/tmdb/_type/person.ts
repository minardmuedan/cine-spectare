export type TPerson = {
  adult: false
  also_known_as: string[]
  biography: string
  birthday: string
  deathday?: string
  gender: number
  homepage?: string
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string
}

export type TPersonSocialMedia = {
  id: number
  facebook_id?: string
  instagram_id?: string
  tiktok_id?: string
  twitter_id?: string
  youtube_id?: string
}

export type TPersonCombinedCredit = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: false
  vote_average: number
  vote_count: number
  credit_id: string
  media_type: 'movie' | 'tv'
}

export type TPersonCombinedCreditsCast = TPersonCombinedCredit & {
  character: string
  order: number
}

export type TPersonCombinedCreditsCrew = TPersonCombinedCredit & {
  department: string
  job: string
}

export type TPersonCombinedCredits = {
  id: number
  cast: TPersonCombinedCreditsCast[]
  crew: TPersonCombinedCreditsCrew[]
}

export type TPersonImages = {
  id: number
  profiles: {
    aspect_ratio: number
    height: number
    iso_639_1: null
    file_path: string
    vote_average: number
    vote_count: number
    width: number
  }[]
}
