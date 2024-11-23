import { H3 } from '@/components/typography'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaCard from '@/features/media/components/card'
import { serializeMedia } from '@/features/media/helpers/transform'
import { getMovieSimilar } from '@/lib/tmdb/movies'

export default async function MovieSimilarPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, movies] = await getMovieSimilar(id)

  if (error)
    return (
      <>
        <H3>More like this</H3>
        <ErrorResult error={error} className="h-72" />
      </>
    )

  if (!movies.results.length)
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

      <CarouselContent className="-ml-3">
        {movies.results.map((movie, i) => (
          <CarouselItem key={i} className="basis-[41.5%] pl-3 sm:basis-[29%] lg:basis-[22.5%]">
            <MediaCard media={serializeMedia({ ...movie, type: 'movie' })} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
