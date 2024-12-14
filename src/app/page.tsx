import { getSession } from '@/libs/auth/session'

const Home = async () => {
  const session = await getSession()
  return <div>hello {session?.user?.id}</div>
}

export default Home
