import { TMedia } from '@/lib/schema'

type RawMedia = { poster_path: string; backdrop_path: string; id: number; vote_average: number }

export const serializeMedia = (
  media: RawMedia & ({ title: string; type: 'movie'; release_date: string } | { name: string; type: 'tv'; first_air_date: string }),
): TMedia => ({
  id: media.id,
  title: media.type === 'movie' ? media.title : media.name,
  posterPath: media.poster_path,
  backdropPath: media.backdrop_path,
  voteAverage: media.vote_average,
  releaseDate: media.type === 'movie' ? media.release_date : media.first_air_date,
  type: media.type,
})
