import { env } from '@/env'
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as schema from '@/libs/db/schema'
import { drizzle } from 'drizzle-orm/neon-http'

if (!env.AUTH_DRIZZLE_URL) {
  throw new Error(`AUTH_DRIZZLE_URL is not defined ${env.AUTH_DRIZZLE_URL}`)
}

export const db = drizzle(env.AUTH_DRIZZLE_URL, { schema })
