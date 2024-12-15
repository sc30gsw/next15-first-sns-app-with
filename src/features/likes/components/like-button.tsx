'use client'

import { Form, TextField } from '@/components/ui'
import { likeAction } from '@/features/likes/actions/like-action'
import { likeFormSchema } from '@/features/likes/types/schema/like-form-schema'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { IconHeart, IconHeartFill } from 'justd-icons'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useActionState, useOptimistic } from 'react'

type LikeButtonProps = {
  postId: string
  initialLikes: string[]
}

export const LikeButton = ({ postId, initialLikes }: LikeButtonProps) => {
  const { data: session } = useSession()
  const router = useRouter()

  const [optimisticLike, setOptimisticLike] = useOptimistic<
    { likeCount: number; isLiked: boolean },
    void
  >(
    {
      likeCount: initialLikes.length || 0,
      isLiked: session?.user?.id
        ? initialLikes?.includes(session.user.id)
        : false,
    },
    (currentState) => ({
      likeCount: currentState.isLiked
        ? currentState.likeCount - 1
        : currentState.likeCount + 1,
      isLiked: !currentState.isLiked,
    }),
  )

  const [lastResult, action] = useActionState(likeAction, null)

  const [form, fields] = useForm({
    constraint: getZodConstraint(likeFormSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: likeFormSchema })
    },
    onSubmit() {
      if (!session) {
        router.push('/sign-in')
        return
      }

      setOptimisticLike()
    },
    defaultValue: {
      postId,
    },
  })

  return (
    <Form
      {...getFormProps(form)}
      action={action}
      className="flex items-center gap-1"
    >
      <TextField {...getInputProps(fields.postId, { type: 'hidden' })} />
      <button type="submit" className="flex items-center gap-2">
        {optimisticLike.isLiked ? (
          <IconHeartFill className="size-5 text-red-500" />
        ) : (
          <IconHeart className="size-5" />
        )}
      </button>
      <span className={optimisticLike.isLiked ? 'text-red-500' : ''}>
        {optimisticLike.likeCount}
      </span>
    </Form>
  )
}
