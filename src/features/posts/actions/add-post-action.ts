'use server'

import { postFormSchema } from '@/features/posts/types/schema/post-form-schema'
import { db } from '@/libs/db/drizzle'
import { posts } from '@/libs/db/schema'
import { parseWithZod } from '@conform-to/zod'
import { getSession } from 'next-auth/react'
import { revalidateTag } from 'next/cache'

// https://conform.guide/integration/nextjs
export const addPost = async (_: unknown, formData: FormData) => {
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

  await db.insert(posts).values({
    authorId: session.user.id,
    content: submission.value.content,
  })

  revalidateTag('posts')
}
