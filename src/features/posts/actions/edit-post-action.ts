'use server'

import { postFormSchema } from '@/features/posts/types/schema/post-form-schema'
import { getSession } from '@/libs/auth/session'
import { db } from '@/libs/db/drizzle'
import { posts } from '@/libs/db/schema'
import { parseWithZod } from '@conform-to/zod'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'

// https://conform.guide/integration/nextjs
export const editPost = async (_: unknown, formData: FormData) => {
  // https://conform.guide/api/zod/parseWithZod
  // formDataをzodのスキーマと照合
  const submission = parseWithZod(formData, { schema: postFormSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const session = await getSession()

  if (!session?.user?.id) {
    return submission.reply()
  }

  await db
    .update(posts)
    .set({
      content: submission.value.content,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, formData.get('postId') as string))

  revalidateTag('posts')

  return submission.reply()
}
