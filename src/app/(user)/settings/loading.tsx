'use client'

import { Loader2Icon } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function SettingsLoading() {
  const pathname = usePathname()

  return (
    <div className={`min-h-full flex-1 items-center justify-center p-5 ${pathname === '/settings' ? 'hidden md:flex' : 'flex'}`}>
      <Loader2Icon className="animate-spin stroke-muted-foreground" />
    </div>
  )
}
