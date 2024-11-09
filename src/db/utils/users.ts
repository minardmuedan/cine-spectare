import { and, eq } from 'drizzle-orm'
import { db } from '..'
import { userTable } from '../schema/user'

export const createUserDb = async ({ ...values }: typeof userTable.$inferInsert) => await db.insert(userTable).values(values)

export const getCredentialsUserDb = async (userId: string) =>
  await db.query.userTable.findFirst({ where: and(eq(userTable.id, userId), eq(userTable.provider, 'credentials')) })

export const getCredentialsUserByEmailDb = async (email: string) =>
  await db.query.userTable.findFirst({ where: and(eq(userTable.email, email), eq(userTable.provider, 'credentials')) })

export const getUserByOauthIdDb = async (oauthId: string) => await db.query.userTable.findFirst({ where: eq(userTable.oauthId, oauthId) })

export const updateUserEmailDb = async (userId: string, email: string) =>
  db.update(userTable).set({ email, updatedAt: new Date() }).where(eq(userTable.id, userId))

export const updateUserPasswordDb = async (userId: string, hashedPassword: string) =>
  db.update(userTable).set({ hashedPassword, updatedAt: new Date() }).where(eq(userTable.id, userId))

export const updateUserProfileDb = async ({ userId, name, avatarUrl }: { userId: string; name: string | null; avatarUrl?: string }) =>
  await db.update(userTable).set({ name, avatarUrl, updatedAt: new Date() }).where(eq(userTable.id, userId))
