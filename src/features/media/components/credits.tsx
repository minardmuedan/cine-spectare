import { TCast } from '@/lib/tmdb/_movie-type'
import TmdbImage from '@/components/tmdb-image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { H3 } from '@/components/typography'
import Link from 'next/link'

export default function MediaCredits({ casts }: { casts: TCast[] }) {
  return (
    <Carousel opts={{ slidesToScroll: 'auto' }}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <H3>
          Credits <span className="text-sm">{casts.length}</span>
        </H3>

        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>

      <CarouselContent>
        {casts.map((cast, i) => (
          <CarouselItem key={i} className="basis-28">
            <Link href={`/person/${cast.id}`}>
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
            </Link>
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
