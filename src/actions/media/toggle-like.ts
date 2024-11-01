'use server'

import { createLikeDb, deleteLikeDb, getUserLikeByMediaId } from '@/db/utils/media/likes'
import { authedProcedure } from '@/lib/helpers/authed-procedure'
import { generateId } from '@/lib/helpers/generate'
import { mediaSchema } from '@/lib/schema'

export const toggleLikeAction = authedProcedure.input(mediaSchema).handler(async ({ input: media, ctx: { userId } }) => {
  await new Promise(res => setTimeout(res, 5000))
  if (Math.random() > 0.5) throw 'Something is not right!'

  const isAlreadyLiked = await getUserLikeByMediaId(userId, media.id)
  if (isAlreadyLiked) await deleteLikeDb(isAlreadyLiked.id)
  else {
    const newId = generateId(20)
    await createLikeDb({ id: newId, addedBy: userId, media })
  }
})
