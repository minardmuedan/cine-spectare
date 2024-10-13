import { and, eq, InferInsertModel } from 'drizzle-orm'
import { db } from '..'
import { userTable } from '../schema'

export const createUserDb = async ({ ...values }: InferInsertModel<typeof userTable>) => await db.insert(userTable).values(values)

export const getUserByEmailDb = async (email: string) =>
  await db.query.userTable.findFirst({ where: and(eq(userTable.email, email), eq(userTable.provider, 'credentials')) })
