type SharedType = {
  id: number
  adult: boolean
  poster_path: string
  backdrop_path: string
  vote_average: number
  vote_count: number
  overview: string
  original_language: string
  original_name: string
  popularity: number
  first_air_date: string
  name: string
  origin_country: string[]
}

export type TTv = SharedType & {
  genre_ids: number[]
}

export type TTvShows = SharedType & {
  page: number
  results: TTv[]
  total_pages: number
  total_results: number
}

export type TTvSeasonSharedType = {
  air_date: string
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: number
}

export type TTvSeason = TTvSeasonSharedType & {
  episode_count: number
}

export type TFullTv = SharedType & {
  created_by: {
    id: number
    credit_id: string
    name: string
    original_name: string
    gender: number
    profile_path: string
  }[]
  episode_run_time: number[]
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  in_production: false
  languages: string[]
  last_air_date: string
  last_episode_to_air: {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    episode_type: string
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
  }
  next_episode_to_air: null
  networks: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  number_of_episodes: number
  number_of_seasons: number
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  seasons: TTvSeason[]
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  type: string
}

export type TTvKeywords = {
  id: number
  results: {
    id: number
    name: string
  }[]
}

export type TTvEpisode = {
  air_date: string
  episode_number: number
  episode_type: string
  id: number
  name: string
  overview: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
  vote_average: number
  vote_count: number
  crew: {
    job: string
    department: string
    credit_id: string
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
  }[]
  guest_stars: {
    character: string
    credit_id: string
    order: number
    adult: false
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
  }[]
}

export type TTvFullSeason = TTvSeasonSharedType & {
  _id: string
  episodes: TTvEpisode[]
}
