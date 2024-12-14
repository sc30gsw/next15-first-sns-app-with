import type { ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="flex items-center justify-center">{children}</div>
}

export default AuthLayout
