import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import LogoutButton from '@/features/authentication/logout/logout-btn'
import { useSession } from '@/hooks/session'
import { CheckCheckIcon, ClockIcon, StarIcon } from 'lucide-react'
import Link from 'next/link'
import { UserAvatar } from '../ui/avatar'
import { buttonVariants } from '../ui/button'

export default function UserSideNav() {
  const { data } = useSession()
  const userSession = data!

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

        <div className="flex flex-col *:justify-start *:gap-3">
          <Link href="/user/media/likes" className={buttonVariants({ variant: 'ghost' })}>
            <StarIcon className="fill-yellow-500 stroke-yellow-500" /> Your Likes
          </Link>

          <Link href="/user/media/watch-later" className={buttonVariants({ variant: 'ghost' })}>
            <ClockIcon className="stroke-blue-500" /> Your Watch Later
          </Link>

          <Link href="/user/media/already-watched" className={buttonVariants({ variant: 'ghost' })}>
            <CheckCheckIcon className="stroke-green-500" /> Your Already Watched
          </Link>
        </div>

        <SheetFooter>
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
