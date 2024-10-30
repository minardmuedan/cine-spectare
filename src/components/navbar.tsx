'use client'

import Link from 'next/link'
import { buttonVariants } from './ui/button'
import Devtools from './__devtiools'
import { useSession } from '@/hooks/session'
import { UserAvatar } from './ui/avatar'
import LogoutButton from '@/authentication/logout/logout-btn'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="h-14 border-b px-20">
      <div className="flex h-full items-center justify-between">
        <Link href="/">Home</Link>
        <div className="flex items-center gap-10">
          {session ? (
            <div className="flex items-center gap-5">
              <UserAvatar {...session} />
              <LogoutButton />
            </div>
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
