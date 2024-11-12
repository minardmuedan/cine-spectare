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

export type TReviews = {
  id: number
  page: number
  results: {
    author: string
    author_details: {
      name: string
      username: string
      avatar_path: string
      rating: string
    }
    content: string
    created_at: string
    id: string
    updated_at: string
    url: string
  }[]
  total_pages: number
  total_results: number
}

export type TKeywords = {
  id: number
  keywords: {
    id: number
    name: string
  }[]
}

export type Image = {
  aspect_ratio: number
  height: number
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export type TMovieImages = {
  id: 558449
  backdrops: Image[]
  logos: Image[]
  posters: Image[]
}

export type TMovieVideos = {
  id: 558449
  results: {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: 1080
    type: 'Trailer' | 'Teaser' | 'Clip' | 'Behind the Scenes' | 'Bloopers' | 'Featurette'
    official: boolean
    published_at: string
    id: string
  }[]
}
