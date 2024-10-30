import OauthFooter from '@/authentication/oauth/oauth-footer'
import LoginForm from '@/authentication/login/form'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <Card>
      <div className="flex justify-end pr-2 pt-2">
        <Link href="/signup" className={buttonVariants({ variant: 'link' })}>
          Sign Up <ArrowRightIcon />
        </Link>
      </div>

      <CardHeader title="Welcome Back" description="Enter your login credentials" />
      <CardContent>
        <LoginForm />
      </CardContent>

      <OauthFooter />
    </Card>
  )
}
