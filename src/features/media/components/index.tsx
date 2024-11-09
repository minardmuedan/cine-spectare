import { Button } from '@/components/ui/button'
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
