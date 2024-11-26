import { CarouselContent, CarouselItem } from '@/components/ui/carousel'
import MediaCard, { MediaCardLoadingFallback } from '@/features/media/components/card'
import { TMedia } from '@/lib/schema'

export const HomepageMediaHeader = ({ children }: { children: React.ReactNode }) => (
  <header className="mb-2 flex items-center justify-between">{children}</header>
)

export const HomepageMediaTitle = ({ title }: { title: string }) => <h2 className="text-base text-muted-foreground md:text-xl">{title}</h2>

export function HomepageMediaCarouselContent({ medias }: { medias: TMedia[] }) {
  return (
    <CarouselContent className="-ml-3">
      {medias.map((media, i) => (
        <CarouselItem key={i} className="basis-[41.5%] pl-3 sm:basis-[29%] md:basis-[22.5%] lg:basis-[18.4%]">
          <MediaCard
            key={media.id}
            media={media}
            sizes="(min-width: 1040px) calc(18.37vw - 42px), (min-width: 780px) calc(22.5vw - 37px), (min-width: 640px) calc(29.17vw - 33px), calc(41.56vw - 32px)"
          />
        </CarouselItem>
      ))}
    </CarouselContent>
  )
}

export const HomepageMediaLoadingFallback = () => (
  <ul className="flex gap-3">
    {[...Array(5)].map((_, i) => (
      <li key={i} className={`w-full ${i > 3 ? 'hidden lg:block' : i > 2 ? 'hidden md:block' : i > 1 && 'hidden sm:block'} `}>
        <MediaCardLoadingFallback />
      </li>
    ))}

    <li className="w-1/2">
      <MediaCardLoadingFallback className="rounded-r-none pr-0" />
    </li>
  </ul>
)
