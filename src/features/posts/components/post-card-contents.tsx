'use client'

import { Avatar, Card } from '@/components/ui'
import { PostCard } from '@/features/posts/components/post-card'
import { PostForm } from '@/features/posts/components/post-form'
import type { OptimisticPost } from '@/features/posts/types/optimistic-post'
import type { client } from '@/libs/rpc'
import type { InferResponseType } from 'hono'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useOptimistic } from 'react'

type ResType = InferResponseType<typeof client.api.posts.$get>

type PostCardContentsProps = {
  posts: ResType['posts']
}

export const PostCardContents = ({ posts }: PostCardContentsProps) => {
  const { data: session } = useSession()

  const initialOptimisticPosts = posts.map((post) => ({
    id: post.id,
    content: post.content,
    createdAt: post.createdAt,
    authorId: post.author.id,
    author: {
      id: post.author.id,
      name: post.author.name,
      image: post.author.image,
    },
    likes: post.likes,
  }))

  const [optimisticPosts, addOptimisticPosts] = useOptimistic(
    initialOptimisticPosts,
    (currentState, newState: OptimisticPost) => {
      const postId = crypto.randomUUID()
      return [
        {
          id: postId,
          content: newState.content,
          createdAt: new Date().toISOString(),
          authorId: session?.user?.id ?? '',
          author: {
            id: session?.user?.id ?? '',
            name: session?.user?.name ?? '',
            image: session?.user?.image ?? '',
          },
          likes: [
            {
              postId,
              userId: session?.user?.id ?? '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        },
        ...currentState,
      ]
    },
  )

  return (
    <>
      <Card.Header className="border-b">
        <div className="flex w-full gap-4">
          <Link href={'#'}>
            <Avatar
              src={
                session?.user?.image ? session.user.image : 'placeholder.png'
              }
              alt="avatar"
              initials="A"
            />
          </Link>
          <PostForm addOptimisticPost={addOptimisticPosts} />
        </div>
      </Card.Header>
      <Card.Content className="flex-1 overflow-y-auto mt-4">
        <div className="space-y-4">
          {optimisticPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </Card.Content>
    </>
  )
}
