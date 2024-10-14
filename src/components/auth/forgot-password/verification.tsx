import { useAuthToken } from '@/hooks/auth-token'
import OtpVerification from '../verification/verification'

export default function ForgotPasswordVerification() {
  const { token, setToken } = useAuthToken()

  return (
    <OtpVerification
      tokenId={token!.id}
      deleteToken={() => setToken(null)}
      onSuccessFn={() => setToken({ type: 'forgot-password', id: token!.id, purpose: 'create-password' })}
    />
  )
}
