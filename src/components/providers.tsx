'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { Toast } from '@/components/ui'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { RouterProvider } from 'react-aria-components'

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <RouterProvider navigate={router.push}>
      <ThemeProvider enableSystem={true} attribute="class">
        <SessionProvider>
          <Toast />
          {children}
        </SessionProvider>
      </ThemeProvider>
    </RouterProvider>
  )
}
