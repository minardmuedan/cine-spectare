import { defineConfig } from 'drizzle-kit'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/lib/db/schema.ts',
  dbCredentials: { url: process.env.DATABASE_URL! },
  out: './src/lib/db/migrations',
})
