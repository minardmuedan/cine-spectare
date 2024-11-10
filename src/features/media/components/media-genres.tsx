import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type Genre = { id: number; name: string }

export function MediaGenres({ genres, className }: { genres: Genre[]; className?: string }) {
  if (!genres.length) return null

  return (
    <ul className={cn('flex w-full flex-wrap gap-1', className)}>
      {genres.map(({ name }, i) => (
        <li key={i}>
          <Button size="sm" variant="secondary">
            {name}
          </Button>
        </li>
      ))}
    </ul>
  )
}

export function MediaGenresLoadingFallback() {
  return (
    <ul className="flex flex-wrap gap-1">
      {[...Array(3)].map((_, i) => (
        <li key={i}>
          <Skeleton className="h-9 w-28" />
        </li>
      ))}
    </ul>
  )
}
