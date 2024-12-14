import { z } from 'zod'

export const postFormSchema = z.object({
  content: z
    // biome-ignore lint/style/useNamingConvention: This needs a snake_case name
    .string({ required_error: 'Content is required' })
    .min(1)
    .max(300),
})

export type PostFormSchemaType = z.infer<typeof postFormSchema>
