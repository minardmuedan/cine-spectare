'use client'

import Link from 'next/link'
import Devtools from './__devtiools'
import UserSideNav from './user/side-navigation'

export default function Navbar() {
  return (
    <header className="h-14 border-b px-20">
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
