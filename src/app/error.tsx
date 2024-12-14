'use client'

import { Button } from '@/components/ui'
import { useEffect } from 'react'

const RootError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    // biome-ignore lint/suspicious/noConsole: This is a error component
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-5xl font-bold">Something went wrong!</h2>
      <Button onPress={() => reset()}>Try again</Button>
    </div>
  )
}

export default RootError
