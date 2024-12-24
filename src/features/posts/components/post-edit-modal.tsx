import { Button, Form, Loader, Modal, TextField } from '@/components/ui'
import { editPost } from '@/features/posts/actions/edit-post-action'
import { postFormSchema } from '@/features/posts/types/schema/post-form-schema'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { IconSend } from 'justd-icons'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
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
  const router = useRouter()
  // https://zenn.dev/daijinload/articles/7fbe73e040c0a2
  // https://zenn.dev/tsuboi/articles/0fc94356667284#%E3%81%8A%E3%81%BE%E3%81%91%EF%BC%9A%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%81%AE%E7%B5%90%E6%9E%9C%E3%82%92%E3%83%88%E3%83%BC%E3%82%B9%E3%83%88%E3%81%A7%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B
  const [lastResult, action, isPending] = useActionState<
    Awaited<ReturnType<typeof editPost>> | null | undefined,
    FormData
  >(async (prev, formData) => {
    if (!postId) {
      return
    }

    formData.append('postId', postId)

    const result = await editPost(prev, formData)

    if (result.status === 'success') {
      toast('Successfully updated on your post!', {
        action: {
          label: 'View',
          onClick: () => {
            router.push(`/${postId}`)
          },
        },
      })

      return result
    }

    toast.error('Failed to update post')
    return result
  }, null)

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

  return (
    <Modal isOpen={isOpen} onOpenChange={isPending ? undefined : onClose}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Form {...getFormProps(form)} action={action}>
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
