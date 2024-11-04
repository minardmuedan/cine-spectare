import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUpAction } from './action'
import { useServerActionMutation } from '@/hooks/server-action'
import AuthButton from '../components/auth-button'
import { useAuthToken } from '@/hooks/auth-token'
import FormError from '@/components/ui/form-error'
import { useCountdown } from '@/hooks/countdown'

export default function SignUpForm() {
  const { timeLeft, setTimeLeft } = useCountdown()
  const { setToken } = useAuthToken()

  const { mutate, error } = useServerActionMutation(signUpAction, {
    mutationKey: ['auth', 'signup'],
    onSuccess: data => (data?.isExceed ? setTimeLeft(data.remainingSeconds) : setToken({ id: data.id, ui: 'verification', type: 'signup' })),
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
      <Input id="emailInput" name="emailInput" type="email" required autoFocus placeholder="minard@gmail.com" className="mb-6 mt-2" />

      <AuthButton disabled={timeLeft > 0} type="submit" className="w-full">
        {timeLeft > 0 ? `Too many requests! wait for ${timeLeft} seconds` : 'Sign Up'}
      </AuthButton>
    </form>
  )
}
