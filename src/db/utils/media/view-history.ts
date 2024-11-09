import { db } from '@/db'
import { viewHistoryTable } from '@/db/schema/media'
import { and, eq, sql } from 'drizzle-orm'

export const createViewHistoryDb = async ({ ...values }: typeof viewHistoryTable.$inferInsert) => await db.insert(viewHistoryTable).values(values)

export const getUserViewHistoryDb = async (userId: string) =>
  await db.select({ id: viewHistoryTable.id, media: viewHistoryTable.media }).from(viewHistoryTable).where(eq(viewHistoryTable.addedBy, userId))

export const getViewHistoryByMediaIdDb = async (mediaId: number, userId: string) =>
  await db.query.viewHistoryTable.findFirst({
    where: and(eq(viewHistoryTable.addedBy, userId), sql`${viewHistoryTable.media} ->> 'id' = ${mediaId}`),
  })

export const deleteViewHistoryDb = async (id: string) => await db.delete(viewHistoryTable).where(eq(viewHistoryTable.id, id))

export const deleteAllUserViewHistoryDb = async (userId: string) => await db.delete(viewHistoryTable).where(eq(viewHistoryTable.addedBy, userId))
