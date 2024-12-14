'use server'

import { likeFormSchema } from '@/features/likes/types/schema/like-form-schema'
import { getSession } from '@/libs/auth/session'
import { db } from '@/libs/db/drizzle'
import { likes } from '@/libs/db/schema'
import { parseWithZod } from '@conform-to/zod'
import { and, eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'

export const likeAction = async (_: unknown, formData: FormData) => {
  const session = await getSession()

  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const submission = parseWithZod(formData, {
    schema: likeFormSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const userId = session.user.id

  const existedLike = await db.query.likes.findFirst({
    where: and(
      eq(likes.postId, submission.value.postId),
      eq(likes.userId, userId),
    ),
  })

  if (existedLike) {
    await db
      .delete(likes)
      .where(
        and(
          eq(likes.postId, existedLike.postId),
          eq(likes.userId, existedLike.userId),
        ),
      )
  } else {
    await db.insert(likes).values({
      postId: submission.value.postId,
      userId,
    })
  }

  revalidateTag(`likes/${submission.value.postId}`)
}
