import { and, eq } from 'drizzle-orm'
import { db } from '..'
import { userTable } from '../schema/user'

export const getCredentialsUserByEmailDb = async (email: string) =>
  await db.query.userTable.findFirst({ where: and(eq(userTable.email, email), eq(userTable.provider, 'credentials')) })

export const createUserDb = async ({ ...values }: typeof userTable.$inferInsert) => await db.insert(userTable).values(values)
