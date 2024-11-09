'use client'

import Link from 'next/link'
import Devtools from './__devtiools'
import UserSideNav from './user/side-navigation'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-14 w-full border-b bg-background/60 px-20 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between">
        <Link href="/">Home</Link>

        <Link href="/movies">Movies</Link>

        <div className="flex items-center gap-10">
          <UserSideNav />

          <Devtools />
        </div>
      </div>
    </header>
  )
}
