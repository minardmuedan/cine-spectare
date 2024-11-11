import ViewHistoryWrapper from '@/features/view-history/wrapper'
import { TMedia } from '@/lib/schema'
import { StarIcon } from 'lucide-react'
import MediaMutationsDropdown from './dropdown'
import Link from 'next/link'
import TmdbImage from '@/components/tmdb-image'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export default function MediaCard({ media }: { media: TMedia }) {
  return (
    <div className="rounded border bg-accent-muted">
      <ViewHistoryWrapper media={media}>
        <Link href={`/${media.type}/${media.id}`}>
          <div className="p-2">
            <div className="aspect-[1/1.5] overflow-hidden rounded bg-accent">
              <TmdbImage src={media.posterPath} alt={`${media.title} poster`} className="object-fill" />
            </div>

            <p title={media.title} className="mt-1 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
              {media.title}
            </p>
          </div>
        </Link>
      </ViewHistoryWrapper>

      <div className="flex items-center justify-between gap-2 p-2 pt-0">
        <p className="flex-1 text-xs text-muted-foreground">{media.releaseDate?.split('-')[0]}</p>
        <div title={`${media.voteAverage}`} className="flex items-center gap-1 text-xs text-yellow-500">
          <StarIcon size={14} />
          <p>{media.voteAverage.toFixed(1)}</p>
        </div>

        <MediaMutationsDropdown media={media} />
      </div>
    </div>
  )
}

export function MediaCardLoadingFallback({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-full flex-col gap-2 rounded border bg-accent-muted p-2', className)}>
      <Skeleton className="aspect-[1/1.5] h-full rounded" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3.5 w-1/3" />
    </div>
  )
}
