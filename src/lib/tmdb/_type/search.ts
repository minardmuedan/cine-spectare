import { TMovie } from './movie'
import { TTv } from './tv'

export type TSearchPerson = {
  page: number
  results: [
    {
      adult: boolean
      gender: number
      id: number
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path: string
      known_for: ((TMovie & { media_type: 'movie' }) | (TTv & { media_type: 'tv' }))[]
    },
  ]
  total_pages: number
  total_results: number
}
