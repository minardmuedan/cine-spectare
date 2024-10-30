'use client'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCountdown } from '@/hooks/countdown'
import { useServerActionMutation } from '@/hooks/server-action'
import { useQueryClient } from '@tanstack/react-query'
import { EyeIcon, EyeOffIcon, LogInIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import AuthButton from '../components/auth-button'
import FormError from '../components/form-error'
import { ForgotPasswordDialogContent, ForgotPasswordDialogTrigger } from '../forgot-password'
import { loginAction } from './action'

export default function LoginForm() {
  const queryClient = useQueryClient()
  const { timeLeft, setTimeLeft } = useCountdown()
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false)

  const { mutate, error } = useServerActionMutation(loginAction, {
    mutationKey: ['auth', 'login'],
    onSuccess: data => data?.isExceed && setTimeLeft(data.remainingSeconds),
    onSettled: (data, error) => {
      if (!error?.data && !data?.isExceed) {
        queryClient.clear()
        toast.success('You’re back! Let’s pick up right where we left off.')
      }
    },
  })
  return (
    <Dialog open={isForgotPasswordModalOpen} onOpenChange={setIsForgotPasswordModalOpen}>
      <form
        onSubmit={e => {
          e.preventDefault()
          const email = e.currentTarget?.['emailInput'].value as string
          const password = e.currentTarget?.['passwordInput'].value as string

          mutate({ email, password })
        }}
      >
        <FormError error={error?.fieldErrors?.email?.[0] || error?.fieldErrors?.password?.[0] || error?.message} />

        <Label htmlFor="emailInput">Email Address</Label>
        <Input id="emailInput" name="emailInput" type="email" required autoFocus placeholder="minard@gmail.com" className="mb-6 mt-2" />

        <div className="flex items-center justify-between">
          <Label htmlFor="passwordInput">Password</Label>
          <ForgotPasswordDialogTrigger />
        </div>
        <PasswordInput />

        <AuthButton disabled={timeLeft > 0} type="submit" className="w-full">
          {timeLeft > 0 ? (
            `Too many requests! wait for ${timeLeft} seconds`
          ) : (
            <>
              Login
              <LogInIcon />
            </>
          )}
        </AuthButton>
      </form>
      <ForgotPasswordDialogContent closeModal={() => setIsForgotPasswordModalOpen(false)} />
    </Dialog>
  )
}

export function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="relative">
      <Input
        id="passwordInput"
        name="passwordInput"
        type={showPassword ? 'text' : 'password'}
        required
        placeholder="********"
        className="mb-6 mt-2 pr-12"
      />
      <Button
        tabIndex={-1}
        variant="ghost"
        type="button"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2"
        onClick={() => setShowPassword(prev => !prev)}
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  )
}
