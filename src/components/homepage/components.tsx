import { CarouselContent, CarouselItem } from '@/components/ui/carousel'
import MediaCard from '@/features/media/components/card'
import { TMedia } from '@/lib/schema'

export const HomepageMediaHeader = ({ children }: { children: React.ReactNode }) => (
  <header className="mb-2 flex items-center justify-between">{children}</header>
)

export const HomepageMediaTitle = ({ title }: { title: string }) => <h2 className="text-xl text-muted-foreground">{title}</h2>

export function HomepageMediaCarouselContent({ medias }: { medias: TMedia[] }) {
  return (
    <CarouselContent className="-ml-3">
      {medias.map((media, i) => (
        <CarouselItem key={i} className="basis-[41.5%] pl-3 sm:basis-[39.9%] md:basis-[29.1%] lg:basis-[18.4%]">
          <MediaCard
            key={media.id}
            media={{
              id: media.id,
              title: media.title,
              posterPath: media.posterPath,
              backdropPath: media.backdropPath,
              voteAverage: media.voteAverage,
              releaseDate: media.releaseDate,
              type: media.type,
            }}
          />
        </CarouselItem>
      ))}
    </CarouselContent>
  )
}

export const mediaConverter = (media: {
  poster_path: string
  backdrop_path: string
  id: number
  title: string
  vote_average: number
  release_date: string
  type: 'movie' | 'tv'
}): TMedia => ({
  id: media.id,
  title: media.title,
  posterPath: media.poster_path,
  backdropPath: media.backdrop_path,
  voteAverage: media.vote_average,
  releaseDate: media.release_date,
  type: media.type,
})
