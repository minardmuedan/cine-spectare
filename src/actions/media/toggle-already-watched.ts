'use server'

import { mediaSchema } from '@/lib/schema'
import { createServerAction } from 'zsa'

export const toggleAlreadyWatchedAction = createServerAction()
  .input(mediaSchema)
  .handler(async ({ input }) => {
    console.log('already watched', input)
  })
