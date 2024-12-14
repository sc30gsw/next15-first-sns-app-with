import { Avatar, Card } from '@/components/ui'
import { LikeButton } from '@/features/likes/components/like-button'
import { PostMenu } from '@/features/posts/components/post-menu'

import type { client } from '@/libs/rpc'
import { formatTimeAgo } from '@/utils/format-time'
import type { InferResponseType } from 'hono'
import { IconClock, IconForward, IconMessage } from 'justd-icons'
import Link from 'next/link'
import type { ReactNode } from 'react'

type Post = InferResponseType<typeof client.api.posts.$get>['posts'][number]

type PostCardProps = {
  post: Post
  children?: ReactNode
}

export const PostCard = ({ post, children }: PostCardProps) => {
  return (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center">
          <div className="flex w-full gap-4 items-center">
            <Link href={`/profile/${post.author?.id}`}>
              <Avatar
                src={post.author?.image ? post.author.image : 'placeholder.png'}
                alt="post avatar"
                initials="PA"
              />
            </Link>
            <div className="flex gap-0 sm:gap-2 flex-col sm:flex-row">
              <h5 className="text-base font-semibold">
                {post.author?.name ?? 'John Doe'}
              </h5>
              <p className="text-neutral-400">
                @{post.author?.id.substring(0, 12)}
              </p>
            </div>
          </div>
          <PostMenu post={post} />
        </div>
      </Card.Header>
      <Card.Content className="space-y-4">
        <Link href={`/posts/${post.id}`}>
          <p className="break-words text-lg">{post.content}</p>
        </Link>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-6">
            <LikeButton
              postId={post.id}
              initialLikes={post.likes.map((like) => like.userId)}
            />
            <button type="button" className="flex items-center gap-2">
              <IconMessage className="size-5" />
              <span>{Math.floor(Math.random() * 100)}</span>
            </button>
            <button type="button">
              <IconForward className="size-5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <IconClock className="size-4" />
            <span className="text-sm text-neutral-400">
              {formatTimeAgo(new Date(post.createdAt))} ago
            </span>
          </div>
        </div>
      </Card.Content>
      {children}
    </Card>
  )
}
