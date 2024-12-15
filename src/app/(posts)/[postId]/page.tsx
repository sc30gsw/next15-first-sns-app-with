import { PostCard } from '@/features/posts/components/post-card'

import { fetcher } from '@/libs/fetcher'
import { client } from '@/libs/rpc'
import type { InferResponseType } from 'hono'
import { notFound } from 'next/navigation'

const fetchPost = async (postId: string) => {
  type ResType = InferResponseType<(typeof client.api.posts)[':postId']['$get']>

  const url = client.api.posts[':postId'].$url({
    param: { postId },
  })

  const res = await fetcher<ResType>(url, {
    next: { tags: [`posts/${postId}`] },
  })

  if (!res.post) {
    // https://nextjs.org/docs/app/api-reference/functions/unauthorized
    // TODO: Unauthorized が安定リリースされたら変更
    notFound()
  }

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
