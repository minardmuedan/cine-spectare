import { and, eq, InferInsertModel } from 'drizzle-orm'
import { db } from '..'
import { userTable } from '../schema'

export const createUserDb = async ({ ...values }: InferInsertModel<typeof userTable>) => await db.insert(userTable).values(values)

export const getUserByOauthIdDb = async (oauthId: string) => await db.query.userTable.findFirst({ where: eq(userTable.oauthId, oauthId) })

export const getUserByEmailDb = async (email: string) =>
  await db.query.userTable.findFirst({ where: and(eq(userTable.email, email), eq(userTable.provider, 'credentials')) })

export const updateUserPasswordByEmailDb = async (email: string, hashedPassword: string) =>
  db.update(userTable).set({ hashedPassword }).where(eq(userTable.email, email))
