import { z } from 'zod'

export const profileSchema = z.object({
  username: z.string().nullable(),
  avatar: z.custom<File>(data => data instanceof File, { message: 'Expected a File object' }).optional(),
})
