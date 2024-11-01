import 'server-only'

import { drizzle } from 'drizzle-orm/node-postgres'

import { tokenTable } from './schema/token'
import { userTable } from './schema/user'
import { sessionTable } from './schema/session'
import { alreadyWatchTable, likesTable, watchLaterTable } from './schema/media'

export const db = drizzle({
  connection: { connectionString: process.env.DATABASE_URL! },
  schema: { userTable, tokenTable, sessionTable, likesTable, watchLaterTable, alreadyWatchTable },
})
