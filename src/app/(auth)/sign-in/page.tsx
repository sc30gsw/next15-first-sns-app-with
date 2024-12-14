import { Card } from '@/components/ui'
import { SignInForm } from '@/features/auth/components/sign-in-form'

const SignInPage = () => {
  return (
    <Card className="max-w-md w-full mx-auto">
      <Card.Header>
        <Card.Title>Log In</Card.Title>
        <Card.Description>
          Enter your email and password to log in.
        </Card.Description>
      </Card.Header>
      <SignInForm />
    </Card>
  )
}

export default SignInPage
