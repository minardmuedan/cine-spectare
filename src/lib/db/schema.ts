import { pgTable, text, pgEnum, timestamp } from 'drizzle-orm/pg-core'

export const tokenPurpose = pgEnum('purpose', ['email-verification', 'create-password', 'change-password-verification', 'change-password'])

export const tokenTable = pgTable('verification_token', {
  id: text('id').primaryKey(),
  emailPayload: text('email').notNull(),
  code: text('code').notNull(),
  purpose: tokenPurpose('purpose').notNull(),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
})

export const providerEnum = pgEnum('provider', ['credentials', 'google', 'github'])

export const userTable = pgTable('users', {
  id: text('id').primaryKey(),
  oauthId: text('oauth_id'),
  provider: providerEnum('provider').notNull(),
  name: text('name'),
  email: text('email').notNull(),
  hashedPassword: text('hashed-password'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
})

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .references(() => userTable.id)
    .notNull(),
  ip: text('ip'),
  expiresAt: timestamp('expires_at', { mode: 'date', withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
})
