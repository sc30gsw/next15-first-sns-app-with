'use server'

import { getSession } from '@/libs/auth/session'
import { db } from '@/libs/db/drizzle'
import { posts } from '@/libs/db/schema'
import { eq } from 'drizzle-orm'

export const deletePost = async (postId: string) => {
  const session = await getSession()

  if (!session?.user) {
    return { isSuccess: false, error: { message: 'Unauthorized' } }
  }

  try {
    await db.delete(posts).where(eq(posts.id, postId))

    return { isSuccess: true }
  } catch (err) {
    return { isSuccess: false, error: { message: 'Failed to delete post' } }
  }
}
