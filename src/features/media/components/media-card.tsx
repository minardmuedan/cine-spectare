import ViewHistoryWrapper from '@/features/view-history/wrapper'
import { TMedia } from '@/lib/schema'
import { StarIcon } from 'lucide-react'
import MediaMutationsDropdown from './dropdown'
import Link from 'next/link'

export default function MediaCard({ media }: { media: TMedia }) {
  return (
    <div className="rounded border bg-accent-muted">
      <ViewHistoryWrapper className="px-2 pt-2" media={media}>
        <Link href={`/${media.type}/${media.id}`}>
          <div className="aspect-[1/1.5] overflow-hidden rounded bg-accent">
            <img src={`https://image.tmdb.org/t/p/w500${media.posterPath}`} className="object-fill" />
          </div>

          <p title={media.title} className="mb-2 mt-1 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {media.title}
          </p>
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
