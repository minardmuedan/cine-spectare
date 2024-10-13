import { forgotPasswordAction } from '@/actions/auth/forgot-password'
import { Button } from '@/components/ui/button'
import { DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthToken } from '@/hooks/auth-token'
import { useCountDown } from '@/hooks/countdown'
import { useServerActionMutation } from '@/lib/utils/server-mutation'
import { FormEvent } from 'react'
import FormError from '../error'

export default function ForgotPassword() {
  const { setToken } = useAuthToken()
  const { timeLeft, setTimeLeft } = useCountDown()

  const { mutate, isPending, isError, error } = useServerActionMutation(forgotPasswordAction, {
    mutationKey: ['forgot-password'],
    onSuccess: (data) => {
      if ('isExceed' in data && data.isExceed) setTimeLeft(data.remainingSeconds)
      if ('id' in data) setToken({ type: 'forgot-password', id: data.id, purpose: 'verification' })
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget['emailInputFP'].value as string
    mutate({ email })
  }

  return (
    <>
      <DialogHeader title="Forgot Password?" description="Enter your email to receive a verification code" className="justify-center *:text-center" />
      <form onSubmit={handleSubmit}>
        {isError && <FormError message={error.fieldErrors?.email?.[0] || error.message} className="max-w-[calc(32rem-3rem)]" />}

        <Label htmlFor="emailInputFP">Email Address</Label>
        <Input type="email" id="emailInputFP" placeholder="minard@gmail.com" required className="mb-6 mt-2" />

        <Button disabled={timeLeft > 0 || isPending} type="submit" className="w-full">
          {timeLeft > 0 ? `Too many requests! wait for ${timeLeft} seconds` : 'Continue'}
        </Button>
      </form>
    </>
  )
}
