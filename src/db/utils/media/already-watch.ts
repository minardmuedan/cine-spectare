import { db } from '@/db'
import { alreadyWatchTable } from '@/db/schema/media'
import { and, eq, sql } from 'drizzle-orm'

export const createAlreadyWatchedDb = async ({ ...values }: typeof alreadyWatchTable.$inferInsert) =>
  await db.insert(alreadyWatchTable).values(values)

export const getUserAlreadyWatchedByMediaIdDb = async (userId: string, mediaId: number) =>
  await db.query.alreadyWatchTable.findFirst({
    where: and(eq(alreadyWatchTable.addedBy, userId), sql`${alreadyWatchTable.media} ->> 'id' = ${mediaId}`),
  })

export const getUserAlreadyWatchedMediaIdDb = async (userId: string) =>
  await db
    .select({
      id: alreadyWatchTable.id,
      type: sql<'movie' | 'tv'>`${alreadyWatchTable.media} ->> 'type'`,
      mediaId: sql<number>`${alreadyWatchTable.media} ->> 'id'`,
    })
    .from(alreadyWatchTable)
    .where(eq(alreadyWatchTable.addedBy, userId))

export const deleteAlreadyWatchedDb = async (id: string) => await db.delete(alreadyWatchTable).where(eq(alreadyWatchTable.id, id))
