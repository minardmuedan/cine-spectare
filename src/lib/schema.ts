import { z } from 'zod'

export const codeSchema = z.object({ code: z.string().min(1, 'Verification code is required').max(6) })

export const tokenIdSchema = z.object({ tokenId: z.string().min(1, 'tokenId is required') })

export const mediaSchema = z.object({
  id: z.number().min(1, 'Media id is Required'),
  posterPath: z.string(),
  backdropPath: z.string(),
  releaseDate: z.string(),
  title: z.string(),
  voteAverage: z.number(),
  type: z.enum(['movie', 'tv']),
})

export type TMedia = z.infer<typeof mediaSchema>
