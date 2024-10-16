'use client'

import { signInAction } from '@/actions/auth/signin'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCountDown } from '@/hooks/countdown'
import { useServerActionMutation } from '@/lib/utils/server-mutation'
import { LogInIcon } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import AuthButton from '../auth-button'
import FormError from '../form-error'
import ForgotPasswordDialogContent from '../forgot-password'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import SignInPasswordInput from './password-input'

export default function SignInForm() {
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false)

  const { timeLeft, setTimeLeft } = useCountDown()
  const { mutate, error } = useServerActionMutation(signInAction, {
    mutationKey: ['auth', 'signin'],
    onSuccess: limit => {
      if (limit) return setTimeLeft(limit.remainingSeconds)
      toast.success('You’re back! Let’s pick up right where we left off.')
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget['emailInput'].value as string
    const password = e.currentTarget['passwordInput'].value as string
    mutate({ email, password })
  }

  return (
    <Dialog open={forgotPasswordModal} onOpenChange={setForgotPasswordModal}>
      <form onSubmit={handleSubmit}>
        <FormError error={error?.fieldErrors?.email?.[0] || error?.fieldErrors?.password?.[0] || error?.message} />

        <Label htmlFor="emailInput">Email Address</Label>
        <Input type="email" id="emailInput" placeholder="minard@gmail.com" required className="mb-6 mt-2" />

        <div className="flex items-center justify-between">
          <Label htmlFor="passwordInput">Password</Label>

          <DialogTrigger type="button" variant="link" tabIndex={-1} className="size-fit p-0">
            forgot password?
          </DialogTrigger>
        </div>
        <SignInPasswordInput />

        <AuthButton disabled={timeLeft > 0} type="submit" className="mt-6 gap-3">
          {timeLeft > 0 ? (
            `Too many requests! wait for ${timeLeft} seconds`
          ) : (
            <>
              <p>Sign In</p>
              <LogInIcon size={16} />
            </>
          )}
        </AuthButton>
      </form>
      <ForgotPasswordDialogContent closeModal={() => setForgotPasswordModal(false)} />
    </Dialog>
  )
}
