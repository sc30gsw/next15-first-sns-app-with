'use client'

import '@/utils/zod-error-map-utils'
import { Button, Card, Form, Loader, TextField } from '@/components/ui'
import { FieldError, Input, Label } from '@/components/ui/field'
import {
  type SignInSchema,
  signInSchema,
} from '@/features/auth/types/schemas/sing-in-schema'
import { useSafeForm } from '@/hooks/use-safe-form'
import {} from '@conform-to/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandGithub } from 'justd-icons'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useTransition } from 'react'
import { Controller } from 'react-hook-form'

export const SignInForm = () => {
  const { control, handleSubmit } = useSafeForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (data: SignInSchema) => {
    startTransition(async () => {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/',
      })
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Card.Content className="space-y-6">
        <Controller
          name="email"
          control={control}
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <TextField
              label="Email"
              type="email"
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              isRequired={true}
              validationBehavior="aria"
              isInvalid={invalid}
              errorMessage={error?.message}
            >
              <Label>Email</Label>
              <Input ref={ref} />
              <FieldError>{error?.message}</FieldError>
            </TextField>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <TextField
              label="Password"
              type="password"
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              isRequired={true}
              validationBehavior="aria"
              isInvalid={invalid}
              isRevealable={true}
              errorMessage={error?.message}
            >
              <Label>Password</Label>
              <Input ref={ref} />
              <FieldError>{error?.message}</FieldError>
            </TextField>
          )}
        />

        <div className="flex items-center gap-1">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </Card.Content>
      <Card.Footer className="flex flex-col gap-2">
        <Button type="submit" className="w-full" isDisabled={isPending}>
          {isPending && <Loader />}
          Sign Up
        </Button>
        <Button
          type="button"
          intent="secondary"
          className="w-full"
          isDisabled={isPending}
          onPress={() => {
            startTransition(async () => {
              await signIn('github', { callbackUrl: '/' })
            })
          }}
        >
          <IconBrandGithub />
          GitHub
        </Button>
      </Card.Footer>
    </Form>
  )
}
