import { db } from '@/db'
import { watchLaterTable } from '@/db/schema/media'
import { and, eq, sql } from 'drizzle-orm'

export const createWatchlaterDb = async ({ ...values }: typeof watchLaterTable.$inferInsert) => await db.insert(watchLaterTable).values(values)

export const getUserWatchLaterDb = async (userId: string) =>
  await db.select({ id: watchLaterTable.id, media: watchLaterTable.media }).from(watchLaterTable).where(eq(watchLaterTable.addedBy, userId))

export const getUserWatchLaterByMediaIdDb = async (userId: string, mediaId: number) =>
  await db.query.watchLaterTable.findFirst({
    where: and(eq(watchLaterTable.addedBy, userId), sql`${watchLaterTable.media} ->> 'id' = ${mediaId}`),
  })

export const getUserWatchLaterIdDb = async (userId: string) =>
  await db
    .select({
      id: watchLaterTable.id,
      type: sql<'movie' | 'tv'>`${watchLaterTable.media} ->> 'type'`,
      mediaId: sql<number>`${watchLaterTable.media} ->> 'id'`,
    })
    .from(watchLaterTable)
    .where(eq(watchLaterTable.addedBy, userId))

export const deleteWatchLaterDb = async (id: string) => await db.delete(watchLaterTable).where(eq(watchLaterTable.id, id))
