import Link from 'next/link'
import { buttonVariants } from './ui/button'
import ToggleThemeButton from './custom-button/toggle-theme'
import Devtools from './__devtiools'

export default function Navbar() {
  return (
    <header className="flex h-14 items-center justify-between gap-20 border-b px-10">
      <Link href="/">Minard</Link>

      <nav className="hidden items-center gap-10 text-muted-foreground sm:flex">
        <Link href="/">Home</Link>
        <Link href="/movies">Movies</Link>
        <Link href="/tv">Tv Shows</Link>
      </nav>

      <div className="hidden items-center gap-5 md:flex">
        <ToggleThemeButton />
        <Link href="/signin" className={buttonVariants()}>
          Sign In
        </Link>
        <Devtools />
      </div>
    </header>
  )
}
