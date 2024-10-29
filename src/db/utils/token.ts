import { eq } from 'drizzle-orm'
import { db } from '..'
import { tokenTable } from '../schema/token'

export const createTokenDb = async ({ ...values }: typeof tokenTable.$inferInsert) => await db.insert(tokenTable).values(values)

export const getTokenDb = async (id: string) => await db.query.tokenTable.findFirst({ where: eq(tokenTable.id, id) })

export const renewTokenDb = async (id: string, code: string) =>
  await db.update(tokenTable).set({ code, updatedAt: new Date() }).where(eq(tokenTable.id, id))

export const upgradeTokenPurposeDb = async (id: string, purpose: 'create-password' | 'change-password') =>
  db.update(tokenTable).set({ purpose, updatedAt: new Date() }).where(eq(tokenTable.id, id))

export const deleteTokenDb = async (id: string) => await db.delete(tokenTable).where(eq(tokenTable.id, id))

export const deleteTokenByPayloadDb = async (email: string) => await db.delete(tokenTable).where(eq(tokenTable.emailPayload, email))
