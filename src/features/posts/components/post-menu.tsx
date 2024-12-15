'use client'

import { Menu } from '@/components/ui'
import { deletePost } from '@/features/posts/actions/delete-post-action'
import { PostEditModal } from '@/features/posts/components/post-edit-modal'
import type { client } from '@/libs/rpc'
import type { InferResponseType } from 'hono'
import {
  IconDotsHorizontal,
  IconPencilBox,
  IconResizeOutIn,
  IconTrashEmpty,
} from 'justd-icons'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

type ResType = InferResponseType<(typeof client.api.posts)[':postId']['$get']>

type PostMenuProps = {
  post: ResType['post']
}

export const PostMenu = ({ post }: PostMenuProps) => {
  const { data: session } = useSession()

  const [isPending, startTransition] = useTransition()

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deletePost(post?.id)

      if (result.isSuccess) {
        toast.success('Post deleted successfully')
      } else {
        toast.error('Failed to delete post')
      }
    })
  }

  return (
    <>
      <Menu>
        <Menu.Trigger>
          <IconDotsHorizontal />
        </Menu.Trigger>
        <Menu.Content className="min-w-48" placement="bottom">
          <Menu.Item isDisabled={isPending}>
            <Link
              href={`/posts/${post?.id}`}
              className="flex items-center gap-1"
            >
              <IconResizeOutIn />
              View
            </Link>
          </Menu.Item>
          {post?.authorId === session?.user?.id && (
            <>
              <Menu.Item
                isDisabled={isPending}
                onAction={() => setIsOpen(true)}
              >
                <IconPencilBox />
                Edit
              </Menu.Item>

              <Menu.Separator />
              <Menu.Item
                isDanger={true}
                onAction={handleDelete}
                isDisabled={isPending}
              >
                <IconTrashEmpty />
                Delete
              </Menu.Item>
            </>
          )}
        </Menu.Content>
      </Menu>
      <PostEditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        postId={post?.id}
        content={post?.content}
      />
    </>
  )
}
