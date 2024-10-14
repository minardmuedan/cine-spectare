import { DialogContent, DialogHeader } from '@/components/ui/dialog'
import { useAuthToken } from '@/hooks/auth-token'
import ForgotPassword from './forgot-password'
import ForgotPasswordVerification from './verification'
import ForgotPasswordCreatePassword from './create-password'

export default function ForgotPasswordDialogContent({ closeModal }: { closeModal: () => void }) {
  const { token } = useAuthToken()

  const header =
    !token || token.type !== 'forgot-password'
      ? { title: 'Forgot Password?', description: 'Enter your email to receive a verification code' }
      : token.purpose == 'verification'
        ? { title: 'Enter Code', description: 'Check email for verification code' }
        : { title: 'Update Your Password', description: 'Set a stronger password for your account' }

  const Content = () => {
    if (token && token.type == 'forgot-password') {
      if (token.purpose == 'verification') return <ForgotPasswordVerification />
      if (token.purpose == 'create-password') return <ForgotPasswordCreatePassword closeModal={closeModal} />
    }
    return <ForgotPassword />
  }

  return (
    <DialogContent>
      <DialogHeader {...header} className="justify-center *:text-center" />

      <Content />
    </DialogContent>
  )
}
