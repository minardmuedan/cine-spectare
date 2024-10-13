'use client'

import { useAuthToken } from '@/hooks/auth-token'
import CreatePassword from '../create-password'
import SignUp from './signup'
import SignUpVerification from './verification'

export default function StepByStepSignUp() {
  const { token } = useAuthToken()

  if (token && token.type == 'signup') {
    if (token.purpose == 'verification') return <SignUpVerification />
    if (token.purpose == 'create-password') return <CreatePassword />
  }

  return <SignUp />
}
