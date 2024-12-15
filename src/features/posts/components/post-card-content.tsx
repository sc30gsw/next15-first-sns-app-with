import { PostCard } from '@/features/posts/components/post-card'
import { fetcher } from '@/libs/fetcher'
import { client } from '@/libs/rpc'
import type { InferResponseType } from 'hono'

const url = client.api.posts.$url()
type ResType = InferResponseType<typeof client.api.posts.$get>

export const PostsCardContent = async () => {
  const res = await fetcher<ResType>(url, {
    next: { tags: ['posts'] },
  })

  return res.posts.map((post) => <PostCard post={post} key={post.id} />)
}
