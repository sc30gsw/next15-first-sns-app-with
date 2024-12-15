import { PostsCardArea } from '@/features/posts/components/posts-card-area'
import { TrendingCard } from '@/features/posts/components/trending-card'

export const dynamic = 'force-dynamic'

const Home = () => {
  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-10 md:col-span-10 lg:col-span-6">
        <PostsCardArea />
      </div>
      <div className="col-span-10 lg:col-span-4 hidden sm:block">
        <TrendingCard />
      </div>
    </div>
  )
}

export default Home
