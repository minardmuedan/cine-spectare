import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function GenresKeywordsNavbar() {
  return (
    <nav>
      <ul>
        {['Movies', 'Tv Shows'].map((title, i) => (
          <li key={i}>
            <Button asChild className="w-full">
              <Link href={title}>{title}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
