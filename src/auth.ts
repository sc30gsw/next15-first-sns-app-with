import { config } from '@/libs/auth/config'
import NextAuth from 'next-auth'

export const { handlers, auth, signIn, signOut } = NextAuth(config)
