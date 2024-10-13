import { DialogHeader } from '@/components/ui/dialog'
import { useAuthToken } from '@/hooks/auth-token'
import OtpVerification from '../verification/verification'

export default function ForgotPasswordVerification() {
  const { token, setToken } = useAuthToken()

  return (
    <>
      <DialogHeader title="Enter Code" description="Check email for verification code" className="justify-center *:text-center" />

      <OtpVerification
        tokenId={token!.id}
        deleteToken={() => setToken(null)}
        onSuccessFn={() => setToken({ type: 'forgot-password', id: token!.id, purpose: 'create-password' })}
      />
    </>
  )
}
