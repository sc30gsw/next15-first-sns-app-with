import { Card } from '@/components/ui'
import { SignUpForm } from '@/features/auth/components/sign-up-form'

const SignUpPage = () => {
  return (
    <Card className="max-w-md w-full mx-auto">
      <Card.Header>
        <Card.Title>Sign Up</Card.Title>
        <Card.Description>
          Let's get you started by creating a new account.
        </Card.Description>
      </Card.Header>
      <SignUpForm />
    </Card>
  )
}

export default SignUpPage
