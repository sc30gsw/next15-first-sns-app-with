import { env } from '@/env'
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as schema from '@/libs/db/schema'
import { drizzle } from 'drizzle-orm/neon-http'

if (!env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined', env.DATABASE_URL)
  throw new Error(`DATABASE_URL is not defined ${env.DATABASE_URL}`)
}

export const db = drizzle(env.DATABASE_URL, { schema })
