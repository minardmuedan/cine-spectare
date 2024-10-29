import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const purposeEnum = pgEnum('purpose', ['email-verification', 'create-password', 'change-password-verification', 'change-password'])

export const tokenTable = pgTable('token', {
  id: text().primaryKey(),
  emailPayload: text().notNull(),
  code: text().notNull(),
  purpose: purposeEnum().notNull(),
  createdAt: timestamp({ mode: 'date', withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: 'date', withTimezone: true }).defaultNow().notNull(),
})
