import { z } from 'zod'

export const signUpSchema = z.object({
  // biome-ignore lint/style/useNamingConvention: This is a zod schema
  name: z.string({ required_error: 'Name is required' }).min(1).max(50),
  email: z
    // biome-ignore lint/style/useNamingConvention: This is a zod schema
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email must be valid' })
    .min(1)
    .max(50),
  password: z
    // biome-ignore lint/style/useNamingConvention: This is a zod schema
    .string({ required_error: 'Password is required' })
    .min(8)
    .max(256)
    .refine(
      // biome-ignore lint/performance/useTopLevelRegex: This is a regex
      (password: string) => /[A-Za-z]/.test(password) && /[0-9]/.test(password),
      'password must contain both letters and numbers',
    ),
})

export type SignUpSchema = z.infer<typeof signUpSchema>
