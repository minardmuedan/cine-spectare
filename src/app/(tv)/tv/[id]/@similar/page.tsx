import { H3 } from '@/components/typography'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaCard from '@/features/media/components/card'
import { serializeMedia } from '@/features/media/helpers/transform'
import { getTvSimilar } from '@/lib/tmdb/tv-shows'

export default async function TvSimilarPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, tvShows] = await getTvSimilar(id)

  if (error)
    return (
      <>
        <H3>More like this</H3>
        <ErrorResult error={error} className="h-72" />
      </>
    )

  if (!tvShows.results.length)
    return (
      <>
        <H3>More like this</H3>
        <NoResult className="h-72" />
      </>
    )

  return (
    <Carousel opts={{ slidesToScroll: 'auto' }}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <H3>More like this</H3>

        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>

      <CarouselContent>
        {tvShows.results.map((tv, i) => (
          <CarouselItem key={i} className="basis-[41.5%] pl-3 sm:basis-[29%] lg:basis-[22.5%]">
            <MediaCard
              media={serializeMedia({ ...tv, type: 'tv' })}
              sizes="(min-width: 1860px) 318px, (min-width: 1040px) calc(20.5vw - 59px), (min-width: 780px) calc(29.17vw - 97px), (min-width: 640px) calc(29.17vw - 33px), calc(41.56vw - 32px)"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
