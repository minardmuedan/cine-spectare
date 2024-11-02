import { db } from '@/db'
import { likesTable } from '@/db/schema/media'
import { and, eq, sql } from 'drizzle-orm'

export const createLikeDb = async ({ ...values }: typeof likesTable.$inferInsert) => await db.insert(likesTable).values(values)

export const getUserLikesDb = async (userId: string) =>
  await db.select({ id: likesTable.id, media: likesTable.media }).from(likesTable).where(eq(likesTable.addedBy, userId))

export const getUserLikeByMediaId = async (userId: string, mediaId: number) =>
  await db.query.likesTable.findFirst({
    where: and(eq(likesTable.addedBy, userId), sql`${likesTable.media} ->> 'id' = ${mediaId}`),
  })

export const getUserLikesIdDb = async (userId: string) =>
  await db
    .select({
      id: likesTable.id,
      type: sql<'movie' | 'tv'>`${likesTable.media} ->> 'type'`,
      mediaId: sql<number>`${likesTable.media} ->> 'id'`,
    })
    .from(likesTable)
    .where(eq(likesTable.addedBy, userId))

export const deleteLikeDb = async (id: string) => await db.delete(likesTable).where(eq(likesTable.id, id))
