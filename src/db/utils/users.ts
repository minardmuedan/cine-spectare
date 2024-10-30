import { and, eq } from 'drizzle-orm'
import { db } from '..'
import { userTable } from '../schema/user'

export const createUserDb = async ({ ...values }: typeof userTable.$inferInsert) => await db.insert(userTable).values(values)

export const getCredentialsUserByEmailDb = async (email: string) =>
  await db.query.userTable.findFirst({ where: and(eq(userTable.email, email), eq(userTable.provider, 'credentials')) })

export const getUserByOauthIdDb = async (oauthId: string) => await db.query.userTable.findFirst({ where: eq(userTable.oauthId, oauthId) })

export const updateUserPasswordByEmailDb = async (email: string, hashedPassword: string) =>
  db.update(userTable).set({ hashedPassword }).where(eq(userTable.email, email))
