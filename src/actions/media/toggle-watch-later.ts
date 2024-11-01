'use server'

import { mediaSchema } from '@/lib/schema'
import { createServerAction } from 'zsa'

export const toggleWatchLaterAction = createServerAction()
  .input(mediaSchema)
  .handler(async ({ input }) => {
    console.log('watch later', input)
  })
