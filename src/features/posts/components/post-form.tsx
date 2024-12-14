'use client'

import { Button, Form, Loader, TextField } from '@/components/ui'
import { addPost } from '@/features/posts/actions/add-post-action'
import { postFormSchema } from '@/features/posts/types/schema/post-form-schema'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { IconSend } from 'justd-icons'
import { useActionState } from 'react'

export const PostForm = () => {
  const [lastResult, action, isPending] = useActionState(addPost, null)

  const [form, fields] = useForm({
    constraint: getZodConstraint(postFormSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postFormSchema })
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
