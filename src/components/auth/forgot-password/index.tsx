import { DialogContent } from '@/components/ui/dialog'
import { useAuthToken } from '@/hooks/auth-token'
import ForgotPassword from './forgot-password'
import ForgotPasswordVerification from './verification'

export default function ForgotPasswordDialogContent() {
  const { token } = useAuthToken()

  const Content = () => {
    if (token && token.type == 'forgot-password') {
      if (token.purpose == 'verification') return <ForgotPasswordVerification />
      if (token.purpose == 'create-password') return <p>create password</p>
    }
    return <ForgotPassword />
  }

  return (
    <DialogContent>
      <Content />
    </DialogContent>
  )
}
