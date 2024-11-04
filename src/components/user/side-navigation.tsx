import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import LogoutButton from '@/features/authentication/logout/logout-btn'
import { useSession } from '@/hooks/session'
import { EyeIcon, HistoryIcon, SettingsIcon, StarIcon } from 'lucide-react'
import Link from 'next/link'
import { UserAvatar } from '../ui/avatar'
import { buttonVariants } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

export default function UserSideNav() {
  const { data: userSession, isPending: gettingUser } = useSession()

  if (gettingUser) return <Skeleton className="size-10 rounded-full" />

  if (!userSession)
    return (
      <Link href="/login" className={buttonVariants()}>
        Login
      </Link>
    )

  const navlinks = [
    { icon: <SettingsIcon />, title: 'Settings', href: '/settings' },
    { icon: <HistoryIcon />, title: 'History', href: '/settings/history' },
    { icon: <StarIcon />, title: 'Your Likes', href: '/media/likes' },
    { icon: <EyeIcon />, title: 'Your Watchlist', href: '/media/watchlist' },
    { icon: <HistoryIcon />, title: 'Your Watched History', href: '/media/watched-history' },
  ]

  return (
    <Sheet>
      <SheetTrigger>
        <UserAvatar {...userSession} />
        <span className="sr-only">open users menu</span>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="mb-3 flex-row items-center gap-3 border-b pb-3">
          <SheetTitle className="hidden">User Account</SheetTitle>
          <SheetDescription className="hidden">Browse menu for user account navigation</SheetDescription>
          <UserAvatar {...userSession} />
          <div>
            <p className="font-medium">{userSession.email}</p>
            {userSession.name && <p className="text-sm text-muted-foreground">{userSession.name}</p>}
          </div>
        </SheetHeader>

        <ul className="*:flex *:flex-col *:*:justify-start *:*:gap-3">
          <li className="mb-3 border-b pb-3">
            {navlinks.slice(0, 2).map(({ icon, title, href }, i) => (
              <SheetClose key={i} asChild>
                <Link href={href} className={buttonVariants({ variant: 'ghost' })}>
                  {icon}
                  {title}
                </Link>
              </SheetClose>
            ))}
            <LogoutButton />
          </li>
          <li>
            {navlinks.slice(2).map(({ icon, title, href }, i) => (
              <SheetClose key={i} asChild>
                <Link href={href} className={buttonVariants({ variant: 'ghost' })}>
                  {icon}
                  {title}
                </Link>
              </SheetClose>
            ))}
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  )
}
