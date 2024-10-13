import AuthCard from '@/components/auth/auth-card'
import SignInForm from '@/components/auth/signin'

export default function SignInPage() {
  return (
    <AuthCard title="Welcome Back" description="Enter your login credentials" type="signin">
      <SignInForm />
    </AuthCard>
  )
}
