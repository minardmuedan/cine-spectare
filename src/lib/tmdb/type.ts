type SharedType = {
  adult: boolean
  poster_path: string
  backdrop_path: string
  id: number
  title: string
  original_title: string
  overview: string
  original_language: string
  popularity: number
  video: boolean
  vote_average: number
  vote_count: number
  release_date: string
}

export type TFullMovie = SharedType & {
  runtime: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  tagline: string
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  budget: number
  revenue: number
}

export type TMovie = SharedType & {
  genre_ids: number[]
}

export type TMovies = {
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: TMovie[]
  total_pages: number
  total_results: number
}

export type TCast = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string // change this
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export type TCredits = {
  id: number
  cast: TCast[]
}
