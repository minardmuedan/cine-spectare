import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { userTable } from './user'

export const sessionTable = pgTable('session', {
  id: text().primaryKey(),
  userId: text()
    .references(() => userTable.id)
    .notNull(),
  ipAddress: text(),
  expiresAt: timestamp({ mode: 'date', withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp({ mode: 'date', withTimezone: true }).defaultNow().notNull(),
})
