import TmdbImage from '@/components/tmdb-image'
import { Skeleton } from '@/components/ui/skeleton'
import ViewHistoryWrapper from '@/features/view-history/wrapper'
import { TMedia } from '@/lib/schema'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import MediaMutationsDropdown from './dropdown'
import VoteAverage from './vote-average'

export default function MediaCard({ media, sizes }: { media: TMedia; sizes: string }) {
  return (
    <div className="rounded border bg-accent-muted transition-colors ease-in hover:bg-accent">
      <ViewHistoryWrapper media={media}>
        <Link href={`/${media.type}/${media.id}`}>
          <div className="p-2">
            <div className="relative aspect-[1/1.5] overflow-hidden rounded bg-accent">
              <TmdbImage src={media.posterPath} alt={`${media.title} poster`} sizes={sizes} fill className="object-cover" />
            </div>

            <p title={media.title} className="mt-1 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
              {media.title}
            </p>
          </div>
        </Link>
      </ViewHistoryWrapper>

      <div className="flex items-center justify-between gap-2 p-2 pt-0">
        <p className="flex-1 text-xs text-muted-foreground">{media.releaseDate?.split('-')[0]}</p>
        <VoteAverage voteAverage={media.voteAverage} />

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
