import { hc } from 'hono/client'

import type { AppType } from '@/app/api/[[...route]]/route'
import { env } from '@/env'

if (!env.NEXT_PUBLIC_APP_URL) {
  throw new Error('NEXT_PUBLIC_APP_URL is not set')
}

export const client = hc<AppType>(env.NEXT_PUBLIC_APP_URL)
