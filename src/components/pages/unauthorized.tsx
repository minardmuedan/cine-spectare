import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { HomeIcon, LogInIcon, ShieldAlertIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function UnauthorizedUi({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'flex min-h-[calc(100dvh-3.5rem)] w-full flex-1 flex-col items-center justify-center rounded-xl border border-destructive px-3 py-10 text-center',
        className,
      )}
    >
      <ShieldAlertIcon className="mb-3 size-20 stroke-primary" />

      <h1 className="text-3xl font-semibold text-primary">Unauthorized Access!</h1>
      <p className="mb-8 text-sm text-muted-foreground">{'You don’t have permission to view this page. Please log in '}</p>
      <div className="flex gap-5">
        <Link href="/" className={buttonVariants({ variant: 'secondary' })}>
          Home <HomeIcon />
        </Link>

        <span className="h-9 border-r border-accent" />

        <Link href="/login" className={buttonVariants()}>
          Login <LogInIcon />
        </Link>
      </div>
    </section>
  )
}
