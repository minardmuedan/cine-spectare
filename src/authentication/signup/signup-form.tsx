import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUpAction } from './action'
import { useServerActionMutation } from '@/hooks/server-action'
import AuthButton from '../components/auth-button'
import { toast } from 'sonner'
import { useAuthToken } from '@/hooks/auth-token'
import FormError from '../components/form-error'

export default function SignUpForm() {
  const { setToken } = useAuthToken()
  const { mutate, data, error } = useServerActionMutation(signUpAction, {
    mutationKey: ['auth', 'signup'],
    onSuccess: ({ id }) => setToken({ id, ui: 'verification', type: 'signup' }),
  })

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        const email = e.currentTarget['emailInput'].value as string
        mutate({ email })
      }}
    >
      <FormError error={error?.fieldErrors?.email?.[0] || error?.message} />

      <Label htmlFor="emailInput">Email Address</Label>
      <Input id="emailInput" name="emailInput" placeholder="minard@gmail.com" className="mb-6 mt-2" />

      <AuthButton type="submit" className="w-full">
        Sign Up
      </AuthButton>
    </form>
  )
}
