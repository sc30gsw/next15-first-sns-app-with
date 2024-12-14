import { z } from 'zod'

export const likeFormSchema = z.object({
  // biome-ignore lint/style/useNamingConvention: This needs a snake_case name
  postId: z.string({ required_error: 'Post Id is required' }),
})

export type LikeFormSchemaType = z.infer<typeof likeFormSchema>
