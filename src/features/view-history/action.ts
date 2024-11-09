'use server'

import { createViewHistoryDb, deleteAllUserViewHistoryDb, deleteViewHistoryDb, getViewHistoryByMediaIdDb } from '@/db/utils/media/view-history'
import { authedProcedure } from '@/lib/helpers/authed-procedure'
import { generateId } from '@/lib/helpers/generate'
import { TViewHistoryMedia, viewHistorySchema } from '@/lib/schema'
import { validateSession } from '@/lib/session/validate'
import { revalidatePath } from 'next/cache'
import { viewHistoryIdSchema } from './schema'

export const addViewHistoryAction = async ({ ...media }: TViewHistoryMedia) => {
  try {
    viewHistorySchema.parse(media)

    const { session } = await validateSession()
    if (!session) return

    const id = generateId(25)

    const existingHistory = await getViewHistoryByMediaIdDb(media.id, session.userId)
    if (existingHistory) {
      await Promise.all([deleteViewHistoryDb(existingHistory.id), createViewHistoryDb({ id, addedBy: session.userId, media })])
      return
    }

    await createViewHistoryDb({ id, addedBy: session.userId, media })
  } catch {}
}

export const deleteViewHistoryAction = authedProcedure.input(viewHistoryIdSchema).handler(async ({ input: { id } }) => {
  await deleteViewHistoryDb(id)
  revalidatePath('/settings/history')
})

export const deleteAllViewHistoryAction = authedProcedure.handler(async ({ ctx: { userId } }) => {
  await deleteAllUserViewHistoryDb(userId)
  revalidatePath('/settings/history')
})
