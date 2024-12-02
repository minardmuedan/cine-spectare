import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Genre = { id: number; name: string }
type Keyword = { id: number; name: string }

export function MediaGenres({ genres, type }: { genres: Genre[]; type: 'movies' | 'tv' }) {
  if (!genres.length) return null

  return (
    <Wrapper>
      {genres.map(({ id, name }, i) => (
        <Individual key={i} href={`/genre/${type}?g=${id}`} name={name} />
      ))}
    </Wrapper>
  )
}

export function MediaKeywords({ keywords, type }: { keywords: Keyword[]; type: 'movies' | 'tv' }) {
  if (!keywords.length) return null

  return (
    <Wrapper>
      {keywords.map(({ id, name }, i) => (
        <Individual key={i} href={`/keyword/${type}?k=${id}`} name={name} />
      ))}
    </Wrapper>
  )
}

const Wrapper = ({ children }: { children: React.ReactNode }) => <ul className={cn('flex w-full flex-wrap gap-1')}>{children}</ul>
const Individual = ({ href, name }: { href: string; name: string }) => (
  <li>
    <Link prefetch={false} href={href} className={buttonVariants({ size: 'sm', variant: 'accentMuted' })}>
      {name}
    </Link>
  </li>
)

export function MediaGenresKeywordsLoadingFallback({ count = 5 }: { count?: number }) {
  const widths = ['w-16', 'w-20', 'w-24', 'w-28', 'w-32', 'w-36', 'w-40']

  const getRandomWidth = () => {
    const index = Math.floor(Math.random() * widths.length)
    return widths.splice(index, 1)[0]
  }

  return (
    <Wrapper>
      {[...Array(count)].map((_, i) => (
        <li key={i}>
          <Skeleton className={`h-9 ${getRandomWidth()}`} />
        </li>
      ))}
    </Wrapper>
  )
}
