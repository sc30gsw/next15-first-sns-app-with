'use server'

import { getSession } from '@/libs/auth/session'
import { createMiddleware } from 'hono/factory'

type AdditionalContext = Record<
  'Variables',
  {
    user: Partial<{
      id: string | null
      name: string | null
      email: string | null
      image: string | null
    }>
  }
>

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const session = await getSession()

    if (!session) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const user = session.user

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    c.set('user', user)

    await next()
  },
)
