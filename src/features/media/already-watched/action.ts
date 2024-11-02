'use server'

import { createAlreadyWatchedDb, deleteAlreadyWatchedDb, getUserAlreadyWatchedByMediaIdDb } from '@/db/utils/media/already-watched'
import { authedProcedure } from '../helpers/authed-procedure'
import { generateId } from '@/lib/helpers/generate'
import { mediaSchema } from '@/lib/schema'

export const toggleAlreadyWatchedAction = authedProcedure.input(mediaSchema).handler(async ({ input: media, ctx: { userId } }) => {
  const existingWatchLater = await getUserAlreadyWatchedByMediaIdDb(userId, media.id)
  if (existingWatchLater && existingWatchLater.media.type === media.type) await deleteAlreadyWatchedDb(existingWatchLater.id)
  else {
    const newId = generateId(20)
    await createAlreadyWatchedDb({ id: newId, addedBy: userId, media })
  }
})
