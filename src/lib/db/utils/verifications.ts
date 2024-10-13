import { eq } from 'drizzle-orm'
import { db } from '..'
import { tokenTable } from '../schema'

export const getVerificationDb = async (id: string) => await db.query.tokenTable.findFirst({ where: eq(tokenTable.id, id) })

export const getVerificationByPayloadDb = async (email: string) => await db.query.tokenTable.findFirst({ where: eq(tokenTable.emailPayload, email) })

export const createVerificationDb = async ({ ...values }: typeof tokenTable.$inferInsert) => await db.insert(tokenTable).values(values)

export const renewVerificationDb = async (id: string, newCode: string) =>
  await db.update(tokenTable).set({ code: newCode, updatedAt: new Date() }).where(eq(tokenTable.id, id))

export const upgradeVerificationPurposeDb = async (id: string, purpose: Exclude<typeof tokenTable.$inferInsert.purpose, 'email-verification'>) =>
  await db.update(tokenTable).set({ purpose }).where(eq(tokenTable.id, id))

export const deleteVerificationByPayloadDb = async (email: string) => await db.delete(tokenTable).where(eq(tokenTable.emailPayload, email))

export const deleteVerificationDb = async (id: string) => await db.delete(tokenTable).where(eq(tokenTable.id, id))
