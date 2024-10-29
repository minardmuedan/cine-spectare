import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default async function Home() {
  return (
    <div>
      <Link href="/signup" className={buttonVariants()}>
        Sign Up
      </Link>
    </div>
  )
}
