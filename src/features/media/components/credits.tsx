import { TCast } from '@/lib/tmdb/type'
import TmdbImage from '@/components/tmdb-image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'

export default function MediaCredits({ casts }: { casts: TCast[] }) {
  return (
    <Carousel opts={{ slidesToScroll: 'auto' }}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-xl font-medium text-muted-foreground">
          Credits <span className="text-sm">{casts.length}</span>
        </h3>

        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>

      <CarouselContent>
        {casts.map((cast, i) => (
          <CarouselItem key={i} className="basis-28">
            <TmdbImage
              title={cast.name}
              src={cast.profile_path}
              alt={`${cast.name} profile`}
              className="aspect-square w-full rounded-full object-cover"
            />

            <div className="w-full overflow-hidden text-center *:overflow-hidden *:text-ellipsis *:whitespace-nowrap">
              <p title={cast.name} className="text-sm">
                {cast.name}
              </p>
              <p title={cast.character} className="text-xs text-muted-foreground">
                {cast.character}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export function MediaCreditsLoadingFallback() {
  return (
    <ul className="flex gap-4">
      {[...Array(10)].map((_, i) => (
        <li key={i} className="flex flex-col items-center">
          <Skeleton className="size-24 rounded-full" />
          <Skeleton className="my-1 h-5 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </li>
      ))}
    </ul>
  )
}
