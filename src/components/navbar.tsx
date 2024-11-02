'use client'

import { useSession } from '@/hooks/session'
import Link from 'next/link'
import Devtools from './__devtiools'
import { buttonVariants } from './ui/button'
import { Skeleton } from './ui/skeleton'
import UserSideNav from './user/side-navigation'

export default function Navbar() {
  const { data: session, isPending: gettingSession } = useSession()

  return (
    <header className="h-14 border-b px-20">
      <div className="flex h-full items-center justify-between">
        <Link href="/">Home</Link>

        <div className="flex gap-10">
          <Link href="/movies">Movies</Link>
          <Link href="/mema">Mema</Link>
        </div>

        <div className="flex items-center gap-10">
          {gettingSession ? (
            <Skeleton className="size-10 rounded-full" />
          ) : session ? (
            <UserSideNav />
          ) : (
            <Link href="/login" className={buttonVariants()}>
              Login
            </Link>
          )}
          <Devtools />
        </div>
      </div>
    </header>
  )
}
