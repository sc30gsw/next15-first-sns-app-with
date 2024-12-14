import Link from 'next/link'

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-6xl font-bold">Not Found</h2>
      <p className="text-xl">Could not find requested resource</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return Home
      </Link>
    </div>
  )
}

export default NotFound
