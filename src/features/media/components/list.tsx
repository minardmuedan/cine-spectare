import { TMedia } from '@/lib/schema'
import MediaCard, { MediaCardLoadingFallback } from './card'

function MediaListWrapper({ children }: { children: React.ReactNode }) {
  return <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{children}</ul>
}

export default function MediaList({ medias }: { medias: TMedia[] }) {
  return (
    <MediaListWrapper>
      {medias.map((media, i) => (
        <li key={i}>
          <MediaCard media={media} />
        </li>
      ))}
    </MediaListWrapper>
  )
}

export function MediaListLoadingFallback({ count = 20 }: { count?: number }) {
  return (
    <MediaListWrapper>
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <MediaCardLoadingFallback />
        </li>
      ))}
    </MediaListWrapper>
  )
}
