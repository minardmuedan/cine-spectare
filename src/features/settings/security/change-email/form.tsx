import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useServerActionMutation } from '@/hooks/server-action'
import { createChangeEmailTokenAction } from './action'
import { useCountdown } from '@/hooks/countdown'
import FormError from '@/components/ui/form-error'
import { useAuthToken } from '@/hooks/auth-token'

export default function ChangeEmailForm() {
  const { setToken } = useAuthToken()
  const { timeLeft, setTimeLeft } = useCountdown()
  const { mutate, isPending, error } = useServerActionMutation(createChangeEmailTokenAction, {
    onSuccess: data => (data.isExceed ? setTimeLeft(data.remainingSeconds) : setToken({ id: data.id, type: 'change-email', ui: 'verification' })),
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const password = e.currentTarget?.['passwordInput'].value as string
        const email = e.currentTarget?.['emailInput'].value as string
        mutate({ password, email })
      }}
    >
      <FormError error={error?.fieldErrors?.email?.[0] || error?.fieldErrors?.password?.[0] || error?.message} />

      <Label htmlFor="passwordInput">Password</Label>
      <Input id="passwordInput" name="passwordInput" type="password" required placeholder="********" className="mb-6 mt-2" />

      <Label htmlFor="emailInput">New Email Address</Label>
      <Input id="emailInput" name="emailInput" type="email" required placeholder="minard@gmail.com" className="mb-6 mt-2" />

      <Button type="submit" disabled={isPending || timeLeft > 0} className="w-full">
        {timeLeft > 0 ? `Too many requests! wait for ${timeLeft} seconds` : 'Continue'}
      </Button>
    </form>
  )
}
