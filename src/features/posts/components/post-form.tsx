import '@/utils/zod-error-map-utils'
import { Button, Form, Loader, TextField } from '@/components/ui'
import { addPost } from '@/features/posts/actions/add-post-action'
import type { OptimisticPost } from '@/features/posts/types/optimistic-post'
import { postFormSchema } from '@/features/posts/types/schema/post-form-schema'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { IconSend } from 'justd-icons'
import { useSession } from 'next-auth/react'
import { useActionState } from 'react'

type PostFormProps = {
  addOptimisticPost: (action: OptimisticPost) => void
}

export const PostForm = ({ addOptimisticPost }: PostFormProps) => {
  const { data: session } = useSession()

  const [lastResult, action, isPending] = useActionState(addPost, null)

  const [form, fields] = useForm({
    constraint: getZodConstraint(postFormSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postFormSchema })
    },
    onSubmit(_, { formData }) {
      addOptimisticPost({
        id: crypto.randomUUID(),
        content: formData.get('content') as string,
        authorId: session?.user?.id ?? '',
        createdAt: new Date().toISOString(),
        author: {
          id: session?.user?.id ?? '',
          name: session?.user?.name ?? '',
          image: session?.user?.image ?? '',
        },
        likes: [],
      })
    },
    defaultValue: {
      content: '',
    },
  })

  return (
    <Form
      {...getFormProps(form)}
      action={action}
      className="w-full flex justify-between gap-4"
    >
      <div className="w-full flex flex-col gap-1">
        <TextField
          {...getInputProps(fields.content, { type: 'text' })}
          placeholder="What's on your mind?"
          isDisabled={isPending}
          className="w-full"
          errorMessage={''}
        />
        <span id={fields.content.errorId} className="mt-1 text-sm text-red-500">
          {fields.content.errors}
        </span>
      </div>
      <Button
        type="submit"
        size="square-petite"
        appearance="outline"
        className={'h-10'}
        isDisabled={isPending || fields.content.value === undefined}
      >
        {isPending ? <Loader /> : <IconSend />}
      </Button>
    </Form>
  )
}
