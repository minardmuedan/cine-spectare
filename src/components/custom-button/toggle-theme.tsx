'use client'

import { useTheme } from 'next-themes'
import { Button } from '../ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'

export default function ToggleThemeButton() {
  const { theme, setTheme } = useTheme()

  return (
    <Button title="toggle theme" size="icon" variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <div className="relative">
        <SunIcon className="size-[1.2rem] scale-0 dark:scale-100" />
        <MoonIcon size={16} className="absolute top-1/2 size-[1.2rem] -translate-y-1/2 dark:scale-0" />
      </div>
      <span className="sr-only">toggle theme</span>
    </Button>
  )
}
