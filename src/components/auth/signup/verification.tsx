import { BackButton } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useAuthToken } from '@/hooks/auth-token'
import { toast } from 'sonner'
import OtpVerification from '../verification/verification'

export default function SignUpVerification() {
  const { token, setToken } = useAuthToken()

  return (
    <Card>
      <BackButton onClick={() => setToken(null)} className="ml-1 mt-1" />

      <CardHeader title="Enter Code" description="Check email for verification code" />

      <CardContent>
        <OtpVerification
          tokenId={token!.id}
          deleteToken={() => setToken(null)}
          onSuccessFn={() => {
            setToken({ type: 'signup', id: token!.id, purpose: 'create-password' })
            toast.success('Email verified successfully')
          }}
        />
      </CardContent>
    </Card>
  )
}
