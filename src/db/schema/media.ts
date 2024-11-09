import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { userTable } from './user'
import { TMedia, TViewHistoryMedia } from '@/lib/schema'

export const likesTable = pgTable('media-likes', {
  id: text().primaryKey(),
  addedBy: text()
    .references(() => userTable.id)
    .notNull(),
  media: jsonb().$type<TMedia>().notNull(),
  addedAt: timestamp({ mode: 'date', withTimezone: true }).defaultNow().notNull(),
})

export const watchLaterTable = pgTable('media-watch-later', {
  id: text().primaryKey(),
  addedBy: text()
    .references(() => userTable.id)
    .notNull(),
  media: jsonb().$type<TMedia>().notNull(),
  addedAt: timestamp({ mode: 'date', withTimezone: true }).defaultNow().notNull(),
})

export const alreadyWatchTable = pgTable('media-already-watch', {
  id: text().primaryKey(),
  addedBy: text()
    .references(() => userTable.id)
    .notNull(),
  media: jsonb().$type<TMedia>().notNull(),
  addedAt: timestamp({ mode: 'date', withTimezone: true }).defaultNow().notNull(),
})

export const viewHistoryTable = pgTable('view-history', {
  id: text().primaryKey(),
  addedBy: text()
    .references(() => userTable.id)
    .notNull(),
  media: jsonb().$type<TViewHistoryMedia>().notNull(),
  addedAt: timestamp({ mode: 'date', withTimezone: true }).defaultNow().notNull(),
})
