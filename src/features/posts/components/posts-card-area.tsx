import { Avatar, Card } from '@/components/ui'
import { PostsCardContent } from '@/features/posts/components/post-card-content'
import { PostForm } from '@/features/posts/components/post-form'
import { getSession } from '@/libs/auth/session'
import Link from 'next/link'

export const PostsCardArea = async () => {
  const session = await getSession()

  return (
    <Card className="h-[calc(100vh-2rem)] flex flex-col">
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
          <PostForm />
        </div>
      </Card.Header>
      <Card.Content className="flex-1 overflow-y-auto mt-4">
        <div className="space-y-4">
          <PostsCardContent />
        </div>
      </Card.Content>
    </Card>
  )
}
