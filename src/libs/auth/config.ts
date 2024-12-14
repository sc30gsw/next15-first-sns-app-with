import { env } from '@/env'
import { db } from '@/libs/db/drizzle'
import { accounts, sessions, users } from '@/libs/db/schema'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'

export const config = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'github') {
        return true
      }

      if (account?.provider !== 'credentials') {
        return false
      }

      if (!user.id) {
        return false
      }

      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, user.id),
      })

      if (!existingUser) {
        return false
      }

      return true
    },

    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) {
        return token
      }

      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, token.sub),
      })

      if (!existingUser) {
        return token
      }

      token.name = existingUser.name
      token.email = existingUser.email
      token.image = existingUser.image

      return token
    },
  },
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (
          !(
            typeof credentials?.email === 'string' &&
            typeof credentials?.password === 'string'
          )
        ) {
          throw new Error('Invalid credentials.')
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        })

        if (!user?.hashedPassword) {
          throw new Error('User has no password')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        )

        if (!isCorrectPassword) {
          throw new Error('Incorrect password')
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  debug: process.env.NODE_ENV === 'development',
  session: { strategy: 'jwt' },
  secret: env.AUTH_SECRET,
} as const satisfies NextAuthConfig
