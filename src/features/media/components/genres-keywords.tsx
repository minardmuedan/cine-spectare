import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type Genre = { id: number; name: string }
type Keyword = { id: number; name: string }

export function MediaGenres({ genres }: { genres: Genre[] }) {
  if (!genres.length) return null

  return (
    <Wrapper>
      {genres.map(({ name }, i) => (
        <Individual key={i} name={name} />
      ))}
    </Wrapper>
  )
}

export function MediaKeywords({ keywords }: { keywords: Keyword[] }) {
  if (!keywords.length) return null

  return (
    <Wrapper>
      {keywords.map(({ name }, i) => (
        <Individual key={i} name={name} />
      ))}
    </Wrapper>
  )
}

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

const Wrapper = ({ children }: { children: React.ReactNode }) => <ul className={cn('flex w-full flex-wrap gap-1')}>{children}</ul>
const Individual = ({ name }: { name: string }) => <li className={buttonVariants({ size: 'sm', variant: 'accentMuted' })}>{name}</li>
