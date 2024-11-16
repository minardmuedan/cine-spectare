import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import MediaCard from '@/features/media/components/card'
import { getPersonMovieCredits } from '@/lib/tmdb/person'

export default async function PersonMovieCreditsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [error, movieCredits] = await getPersonMovieCredits(id)
  if (error) return <p>{error.message}</p>

  const movies = movieCredits.cast.sort((a, b) => b.vote_count - a.vote_count)

  return (
    <Carousel opts={{ slidesToScroll: 'auto' }}>
      <header className="mb-2 flex items-center justify-between">
        <h2 className={'text-xl font-medium text-muted-foreground'}>Known For</h2>
        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </header>

      <CarouselContent className="-ml-3">
        {movies.map((movie, i) => (
          <CarouselItem key={i} className="basis-[41.5%] pl-3 sm:basis-[29%] lg:basis-[22.5%]">
            <MediaCard
              key={movie.id}
              media={{
                id: movie.id,
                title: movie.title,
                posterPath: movie.poster_path,
                backdropPath: movie.backdrop_path,
                voteAverage: movie.vote_average,
                releaseDate: movie.release_date,
                type: 'movie',
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
