'use server'

import { getSession } from '@/libs/auth/session'
import { db } from '@/libs/db/drizzle'
import { posts } from '@/libs/db/schema'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'

export const deletePost = async (postId: string) => {
  const session = await getSession()

  if (!session?.user) {
    return { isSuccess: false, error: { message: 'Unauthorized' } }
  }

  try {
    await db.delete(posts).where(eq(posts.id, postId))

    revalidateTag('posts')
    return { isSuccess: true }
  } catch (err) {
    return { isSuccess: false, error: { message: 'Failed to delete post' } }
  }
}
