'use server'

import {
  type SignUpSchema,
  signUpSchema,
} from '@/features/auth/types/schemas/sign-up-schema'
import { db } from '@/libs/db/drizzle'
import { users } from '@/libs/db/schema'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'

export const signUp = async (data: SignUpSchema) => {
  const submission = signUpSchema.safeParse(data)

  if (!submission.success) {
    return {
      isSuccess: false,
      error: { message: submission.error.message },
    }
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, submission.data.email),
  })

  if (existingUser) {
    return {
      isSuccess: false,
      error: { message: 'User already exists' },
    }
  }

  const hashedPassword = await bcrypt.hash(submission.data.password, 12)

  const [newUser] = await db
    .insert(users)
    .values({
      name: submission.data.name,
      email: submission.data.email,
      hashedPassword,
      image: '',
    })
    .returning()

  return {
    isSuccess: true,
    data: { email: newUser.email, password: submission.data.password },
  }
}
