import { TMedia } from '@/lib/schema'
import MediaCard, { MediaCardLoadingFallback } from './card'

function MediaListWrapper({ children }: { children: React.ReactNode }) {
  return <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{children}</ul>
}

export default function MediaList({
  medias,
  sizes = '(min-width: 1040px) calc(20vw - 44px), (min-width: 780px) calc(25vw - 37px), (min-width: 640px) calc(33.33vw - 31px), calc(50vw - 32px)',
}: {
  medias: TMedia[]
  sizes?: string
}) {
  return (
    <MediaListWrapper>
      {medias.map((media, i) => (
        <li key={i}>
          <MediaCard sizes={sizes} media={media} />
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
