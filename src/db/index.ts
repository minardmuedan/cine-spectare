import 'server-only'

import { userTable } from './schema/user'
import { tokenTable } from './schema/token'

import { drizzle } from 'drizzle-orm/node-postgres'
import { sessionTable } from './schema/session'
export const db = drizzle({ connection: { connectionString: process.env.DATABASE_URL! }, schema: { userTable, tokenTable, sessionTable } })
