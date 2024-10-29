'use client'

import OauthFooter from '@/authentication/components/oauth-footer'
import { BackButton, buttonVariants } from '@/components/ui/button'
import { CardContent, CardHeader } from '@/components/ui/card'
import { useAuthToken } from '@/hooks/auth-token'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import VerificationForm from '../verification/form'
import ResendTokenFooter from '../verification/resend-token-footer'
import SignUpForm from './signup-form'
import CreatePasswordForm from './create-password-form'

export default function SignUpProcedure() {
  const { token, setToken } = useAuthToken()
  if (token?.type == 'signup') {
    if (token.ui == 'verification')
      return (
        <>
          <BackButton onClick={() => setToken(null)} className="ml-2 mt-2" />
          <CardHeader title="Enter Code" description="Check email for verification code" />
          <CardContent className="flex flex-col items-center justify-center">
            <VerificationForm />
          </CardContent>
          <ResendTokenFooter />
        </>
      )

    if (token.ui == 'creatingPassword')
      return (
        <>
          <BackButton onClick={() => setToken(null)} className="ml-2 mt-2" />
          <CardHeader title="Create A Password" description="Finish setting up your account" />
          <CardContent>
            <CreatePasswordForm />
          </CardContent>
        </>
      )
  }

  return (
    <>
      <div className="flex justify-end pr-2 pt-2">
        <Link href="/login" className={buttonVariants({ variant: 'link' })}>
          <ArrowLeftIcon /> Login
        </Link>
      </div>
      <CardHeader title="Create An Account" description="Start your journey with us" />
      <CardContent>
        <SignUpForm />
      </CardContent>
      <OauthFooter />
    </>
  )
}
