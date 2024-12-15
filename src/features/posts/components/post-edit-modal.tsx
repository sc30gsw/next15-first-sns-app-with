import { Button, Form, Loader, Modal, TextField } from '@/components/ui'
import { editPost } from '@/features/posts/actions/edit-post-action'
import { postFormSchema } from '@/features/posts/types/schema/post-form-schema'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { IconSend } from 'justd-icons'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

type PostEditModalProps = {
  postId?: string
  content?: string
  isOpen: boolean
  onClose: () => void
}

export const PostEditModal = ({
  postId,
  content,
  isOpen,
  onClose,
}: PostEditModalProps) => {
  const [lastResult, action, isPending] = useActionState(editPost, null)

  const [form, fields] = useForm({
    constraint: getZodConstraint(postFormSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postFormSchema })
    },

    defaultValue: {
      content,
    },
  })

  const router = useRouter()

  useEffect(() => {
    if (lastResult?.status === 'success') {
      toast('Successfully updated on your post!', {
        action: {
          label: 'View',
          onClick: () => {
            router.push(`/posts/${postId}`)
          },
        },
      })
    }
  }, [lastResult, postId, router])

  return (
    <Modal isOpen={isOpen} onOpenChange={isPending ? undefined : onClose}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Form
          {...getFormProps(form)}
          action={(formData) => {
            if (!postId) {
              return
            }

            formData.append('postId', postId)
            action(formData)
          }}
        >
          <TextField
            {...getInputProps(fields.content, { type: 'text' })}
            placeholder="What's on your mind?"
            isDisabled={isPending}
            defaultValue={
              lastResult?.initialValue?.content.toString() ?? content
            }
            className="w-full"
            errorMessage={''}
          />
          <span
            id={fields.content.errorId}
            className="mt-1 text-sm text-red-500"
          >
            {fields.content.errors}
          </span>
          <Modal.Footer>
            <Modal.Close isDisabled={isPending}>Cancel</Modal.Close>
            <Button
              type="submit"
              size="square-petite"
              appearance="outline"
              className={'h-10'}
              isDisabled={isPending || fields.content.value === undefined}
            >
              {isPending ? <Loader /> : <IconSend />}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
