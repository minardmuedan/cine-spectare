import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config({ path: '.env.local' })

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema/',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
})
