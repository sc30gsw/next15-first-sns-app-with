import { db } from '@/libs/db/drizzle'
import { posts } from '@/libs/db/schema'
import { sessionMiddleware } from '@/libs/session-middleware'
import { desc, eq } from 'drizzle-orm'
import { Hono } from 'hono'

const app = new Hono()
  .get('/', async (c) => {
    const postList = await db.query.posts.findMany({
      with: {
        author: true,
        likes: true,
      },
      orderBy: [desc(posts.createdAt)],
    })

    return c.json({ posts: postList }, 200)
  })
  .get('/:postId', sessionMiddleware, async (c) => {
    const user = c.get('user')

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const { postId } = c.req.param()

    const post = await db.query.posts.findFirst({
      with: {
        author: true,
        likes: true,
      },
      where: eq(posts.id, postId),
    })

    return c.json({ post }, 200)
  })

export default app
