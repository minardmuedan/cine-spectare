import { H3 } from '@/components/typography'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import MediaCard from '@/features/media/components/card'
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
              key={tv.id}
              media={{
                id: tv.id,
                title: tv.name,
                posterPath: tv.poster_path,
                backdropPath: tv.backdrop_path,
                voteAverage: tv.vote_average,
                releaseDate: tv.first_air_date,
                type: 'tv',
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
