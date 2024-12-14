import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

// Load environment variables from .env files
config({ path: '.env.local' })

export default defineConfig({
  schema: './src/libs/db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
  strict: true,
  verbose: true,
})
