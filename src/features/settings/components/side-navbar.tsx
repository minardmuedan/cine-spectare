'use client'

import { buttonVariants } from '@/components/ui/button'
import LogoutButton from '@/features/authentication/logout/logout-btn'
import { ChevronRightIcon, HistoryIcon, Settings2Icon, ShieldIcon, User2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SettingsSideNav() {
  const pathname = usePathname() as '/settings' | (typeof navlinks)[number]['href']

  const navlinks = [
    { icon: <User2Icon />, title: 'Profile', href: '/settings/profile' },
    { icon: <ShieldIcon />, title: 'Privacy & Security', href: '/settings/privacy-security' },
    { icon: <Settings2Icon />, title: 'Preferences', href: '/settings/preferences' },
    { icon: <HistoryIcon />, title: 'History', href: '/settings/history' },
  ] as const

  const chevronIcon = (
    <div className="flex flex-1 justify-end">
      <ChevronRightIcon className="stroke-muted-foreground md:hidden" />
    </div>
  )

  return (
    <aside className={`sticky top-2 h-fit w-full rounded border p-4 md:w-80 ${pathname !== '/settings' && 'hidden md:block'}`}>
      <h1 className="mb-4 text-center text-xl font-medium text-muted-foreground md:text-start">Settings</h1>
      <nav className="flex flex-col gap-1 *:justify-start">
        <Link
          href="/settings"
          className={buttonVariants({
            variant: pathname === '/settings' || pathname === '/settings/profile' ? 'secondary' : 'ghost',
            className: 'hidden md:flex',
          })}
        >
          {navlinks[0].icon}
          {navlinks[0].title}
        </Link>

        <Link href={navlinks[0].href} className={buttonVariants({ variant: 'ghost', className: 'md:hidden' })}>
          {navlinks[0].icon}
          {navlinks[0].title}
          {chevronIcon}
        </Link>

        {navlinks.slice(1).map(({ icon, title, href }, i) => (
          <Link key={i} href={href} className={buttonVariants({ variant: pathname === href ? 'secondary' : 'ghost' })}>
            {icon}
            {title}
            {chevronIcon}
          </Link>
        ))}

        <LogoutButton />
      </nav>
    </aside>
  )
}
