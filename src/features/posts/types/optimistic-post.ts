export type OptimisticPost = {
  id: string
  content: string
  createdAt: string
  authorId: string
  author: {
    id: string
    name: string | null
    image: string | null
  }
  likes: {
    postId: string
    userId: string
    createdAt: string
    updatedAt: string
  }[]
}
