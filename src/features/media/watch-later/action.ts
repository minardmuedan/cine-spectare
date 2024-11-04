'use server'

import { createWatchlaterDb, deleteWatchLaterDb, getUserWatchLaterByMediaIdDb } from '@/db/utils/media/watch-later'
import { authedProcedure } from '@/lib/helpers/authed-procedure'
import { generateId } from '@/lib/helpers/generate'
import { mediaSchema } from '@/lib/schema'

export const toggleWatchLaterAction = authedProcedure.input(mediaSchema).handler(async ({ input: media, ctx: { userId } }) => {
  const existingWatchLater = await getUserWatchLaterByMediaIdDb(userId, media.id)
  if (existingWatchLater && existingWatchLater.media.type === media.type) await deleteWatchLaterDb(existingWatchLater.id)
  else {
    const newId = generateId(20)
    await createWatchlaterDb({ id: newId, addedBy: userId, media })
  }
})
