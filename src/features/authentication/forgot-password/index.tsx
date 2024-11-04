import { DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { useAuthToken } from '@/hooks/auth-token'
import VerificationForm from '@/components/authentications/verification-form'
import ChangePasswordForm from './change-password-form'
import { ForgotPasswordForm } from './form'
import { verifyTokenAction } from '@/actions/verification'

export function ForgotPasswordDialogTrigger() {
  return (
    <DialogTrigger type="button" tabIndex={-1} variant="link" className="size-fit p-0">
      forgot password
    </DialogTrigger>
  )
}

export function ForgotPasswordDialogContent({ closeModal }: { closeModal: () => void }) {
  const { token, setToken } = useAuthToken()

  const header =
    !token || token.type !== 'forgot-password'
      ? { title: 'Forgot Password?', description: 'Enter your email to receive a verification code' }
      : token.ui == 'verification'
        ? { title: 'Enter Code', description: 'Check email for verification code' }
        : { title: 'Update Your Password', description: 'Set a stronger password for your account' }

  const Content = () => {
    if (token && token.type == 'forgot-password') {
      if (token.ui == 'verification')
        return <VerificationForm action={verifyTokenAction} onSuccessFn={() => setToken({ ...token, ui: 'creating-password' })} />
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
