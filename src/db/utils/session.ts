import { eq } from 'drizzle-orm'
import { db } from '..'
import { sessionTable } from '../schema/session'
import { userTable } from '../schema/user'

export const createSessionDb = async ({ ...values }: typeof sessionTable.$inferInsert) => await db.insert(sessionTable).values(values)

export const getSessionAndUserDb = async (sessionId: string) =>
  await db
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .where(eq(sessionTable.id, sessionId))
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))

export const renewSessionDb = async (sessionId: string, expiresAt: Date) =>
  await db.update(sessionTable).set({ expiresAt }).where(eq(sessionTable.id, sessionId))

export const deleteSessionDb = async (sessionId: string) => await db.delete(sessionTable).where(eq(sessionTable.id, sessionId))
