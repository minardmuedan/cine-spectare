import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import MediaCard from '@/features/media/components/card'
import { getMovieSimilar } from '@/lib/tmdb/movies'

export default async function MovieSimilarPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, movies] = await getMovieSimilar(id)

  if (error) return <p>{error.message}</p>
  return (
    <>
      <Carousel opts={{ slidesToScroll: 'auto' }}>
        <div className="mb-4 flex items-center justify-between gap-2">
          <h3 className="text-xl font-medium text-muted-foreground">Similar</h3>

          <div className="flex gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>

        <CarouselContent>
          {movies.results.map((movie, i) => (
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
    </>
  )
}
