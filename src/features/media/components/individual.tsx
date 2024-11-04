import { TMedia } from '@/lib/schema'
import MediaMutationsDropdown from './dropdown'

export default function IndividualMedia(media: TMedia) {
  return (
    <div className="rounded border bg-accent/30 p-2">
      <div className="aspect-[1/1.5] bg-accent">
        <img src={`https://image.tmdb.org/t/p/w500${media.posterPath}`} className="object-fill" />
      </div>

      <div className="mt-1 flex items-center justify-between">
        <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm">{media.title}</p>

        <MediaMutationsDropdown media={media} />
      </div>
    </div>
  )
}
