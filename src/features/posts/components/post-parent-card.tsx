import { Card } from '@/components/ui'
import { PostCardContents } from '@/features/posts/components/post-card-contents'
import { fetcher } from '@/libs/fetcher'
import { client } from '@/libs/rpc'
import type { InferResponseType } from 'hono'

const url = client.api.posts.$url()
type ResType = InferResponseType<typeof client.api.posts.$get>

export const PostParentCard = async () => {
  const res = await fetcher<ResType>(url, {
    next: { tags: ['posts'] },
  })

  return (
    <Card className="h-[calc(100vh-2rem)] flex flex-col">
      <PostCardContents posts={res.posts} />
    </Card>
  )
}
