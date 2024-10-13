import { signUpAction } from '@/actions/auth/signup'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useServerActionMutation } from '@/lib/utils/server-mutation'
import { FormEvent } from 'react'
import AuthButton from '../auth-button'
import FormError from '../error'
import AuthCard from '../auth-card'
import { useAuthToken } from '@/hooks/auth-token'

export default function SignUp() {
  const { setToken } = useAuthToken()
  const { mutate, isError, error } = useServerActionMutation(signUpAction, {
    mutationKey: ['auth', 'signup'],
    onSuccess: ({ id }) => setToken({ type: 'signup', id, purpose: 'verification' }),
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget['emailInput'].value as string
    mutate({ email })
  }

  return (
    <AuthCard title="Create An Account" description="Start your journey with us" type="signup">
      <form onSubmit={handleSubmit}>
        {isError && <FormError message={error.fieldErrors?.email?.[0] || error.message} />}

        <Label htmlFor="emailInput">Email Address</Label>
        <Input type="email" id="emailInput" placeholder="minard@gmail.com" required className="mt-2" />

        <AuthButton type="submit" className="mt-6 gap-3">
          <p>Continue </p>
        </AuthButton>
      </form>
    </AuthCard>
  )
}
