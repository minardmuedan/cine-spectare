import { DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { useAuthToken } from '@/hooks/auth-token'
import { ForgotPasswordForm } from './form'
import VerificationForm from '../verification/form'
import ResendToken from '../verification/resend-token'
import ChangePasswordForm from './change-password-form'

export function ForgotPasswordDialogTrigger() {
  return (
    <DialogTrigger type="button" tabIndex={-1} variant="link" className="size-fit p-0">
      forgot password
    </DialogTrigger>
  )
}

export function ForgotPasswordDialogContent({ closeModal }: { closeModal: () => void }) {
  const { token } = useAuthToken()

  const header =
    !token || token.type !== 'forgot-password'
      ? { title: 'Forgot Password?', description: 'Enter your email to receive a verification code' }
      : token.ui == 'verification'
        ? { title: 'Enter Code', description: 'Check email for verification code' }
        : { title: 'Update Your Password', description: 'Set a stronger password for your account' }

  const Content = () => {
    if (token && token.type == 'forgot-password') {
      if (token.ui == 'verification')
        return (
          <div className="flex flex-col items-center">
            <VerificationForm />
            <div className="mt-6">
              <ResendToken />
            </div>
          </div>
        )
      if (token.ui == 'creating-password') return <ChangePasswordForm closeModal={closeModal} />
    }
    return <ForgotPasswordForm />
  }

  return (
    <DialogContent>
      <DialogHeader {...header} className="justify-center *:text-center" />
      <Content />
    </DialogContent>
  )
}
