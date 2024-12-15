import { PostCard } from '@/features/posts/components/post-card'

import { fetcher } from '@/libs/fetcher'
import { client } from '@/libs/rpc'
import type { InferResponseType } from 'hono'

type ResType = InferResponseType<(typeof client.api.posts)[':postId']['$get']>

const fetchPost = async (postId: string) => {
  const url = client.api.posts[':postId'].$url({
    param: { postId },
  })

  const res = await fetcher<ResType>(url, {
    next: { tags: [`posts/${postId}`] },
  })

  return res.post
}

type PostIdPageParams = {
  params: Promise<{
    postId: string
  }>
}

const PostIdPage = async ({ params }: PostIdPageParams) => {
  const postId = (await params).postId

  const post = await fetchPost(postId)

  return <PostCard post={post} />
}

export default PostIdPage
