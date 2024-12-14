import { Card, Skeleton } from '@/components/ui'

const PostIdLoading = () => {
  return (
    <Card className="p-4">
      <div className="flex gap-2">
        <Skeleton shape="circle" className="size-10" />
        <div className="flex items-center">
          <Skeleton className="h-5 w-56" />
        </div>
      </div>
      <div className="my-4">
        <Skeleton className="h-8 w-1/2" />
      </div>
      <div>
        <Skeleton className="h-6 w-56" />
      </div>
    </Card>
  )
}

export default PostIdLoading
