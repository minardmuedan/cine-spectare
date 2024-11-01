import { z } from 'zod'

export const mediaSchema = z.object({
  id: z.number().min(1, 'Media id is Required'),
  posterPath: z.string(),
  releaseDate: z.string(),
  title: z.string(),
  voteAverage: z.number(),
  type: z.enum(['movie', 'tv']),
})

export type TMedia = z.infer<typeof mediaSchema>
