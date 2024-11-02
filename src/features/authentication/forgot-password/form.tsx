import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthToken } from '@/hooks/auth-token'
import AuthButton from '../components/auth-button'
import { useServerActionMutation } from '@/hooks/server-action'
import { forgotPasswordAction } from './action'
import FormError from '../components/form-error'
import { useCountdown } from '@/hooks/countdown'

export function ForgotPasswordForm() {
  const { setToken } = useAuthToken()
  const { timeLeft, setTimeLeft } = useCountdown()

  const { mutate, error } = useServerActionMutation(forgotPasswordAction, {
    mutationKey: ['auth', 'forgot-password'],
    onSuccess: data => (data.isExceed ? setTimeLeft(data.remainingSeconds) : setToken({ id: data.id, ui: 'verification', type: 'forgot-password' })),
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const email = e.currentTarget?.['emailInputFP'].value as string
        mutate({ email })
      }}
    >
      <FormError error={error?.fieldErrors?.email?.[0] || error?.message} className="max-w-[calc(32rem-3rem)]" />

      <Label htmlFor="emailInputFP">Email Address</Label>
      <Input type="email" id="emailInputFP" autoComplete="email" autoFocus placeholder="minard@gmail.com" required className="mb-6 mt-2" />

      <AuthButton disabled={timeLeft > 0} type="submit" className="w-full">
        {timeLeft > 0 ? `Too many requests! wait for ${timeLeft} seconds` : 'Continue'}
      </AuthButton>
    </form>
  )
}
