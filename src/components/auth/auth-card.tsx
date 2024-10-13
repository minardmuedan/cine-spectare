import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import Oauth from './oauth'
import { ArrowRightIcon } from 'lucide-react'

type Props = { children: React.ReactNode; title: string; description: string; type: 'signin' | 'signup' }

export default function AuthCard({ children, title, description, type }: Props) {
  return (
    <Card>
      <div className="flex justify-end pr-3 pt-3">
        <Link href={type == 'signup' ? '/signin' : 'signup'} className={buttonVariants({ variant: 'link' })}>
          {type == 'signup' ? 'Sign In' : 'Sign Up'}
          <ArrowRightIcon size={16} />
        </Link>
      </div>
      <CardHeader title={title} description={description} />

      <CardContent>{children}</CardContent>

      <CardFooter className="flex-col gap-6">
        <div className="relative flex w-full justify-center">
          <p className="relative z-10 w-fit bg-background px-2 text-sm text-muted-foreground">
            or <span className="hidden sm:inline-block">continue with</span>
          </p>
          <div className="absolute top-1/2 w-full -translate-y-1/2 border-b"></div>
        </div>
        <Oauth />
      </CardFooter>
    </Card>
  )
}
