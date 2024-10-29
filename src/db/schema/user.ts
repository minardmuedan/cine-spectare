import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const providerEnum = pgEnum('provider', ['credentials', 'google', 'github'])

export const userTable = pgTable('users', {
  id: text().primaryKey(),
  oauthId: text(),
  provider: providerEnum().notNull(),
  name: text(),
  email: text().notNull(),
  hashedPassword: text(),
  avatarUrl: text(),
  createdAt: timestamp({ mode: 'date', withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: 'date', withTimezone: true }).defaultNow().notNull(),
})
