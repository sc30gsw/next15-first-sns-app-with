import { Avatar, Card } from '@/components/ui'
import { PostCardContent } from '@/features/posts/components/post-card-content'
import { PostForm } from '@/features/posts/components/post-form'
import { TrendingCard } from '@/features/posts/components/trending-card'
import { getSession } from '@/libs/auth/session'
import Link from 'next/link'

const Home = async () => {
  const session = await getSession()

  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-10 md:col-span-10 lg:col-span-6">
        <Card className="h-[calc(100vh-2rem)] flex flex-col">
          <Card.Header className="border-b">
            <div className="flex w-full gap-4">
              <Link href={'#'}>
                <Avatar
                  src={
                    session?.user?.image
                      ? session.user.image
                      : 'placeholder.png'
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
              <PostCardContent />
            </div>
          </Card.Content>
        </Card>
      </div>
      <div className="col-span-10 lg:col-span-4 hidden sm:block">
        <TrendingCard />
      </div>
    </div>
  )
}

export default Home
