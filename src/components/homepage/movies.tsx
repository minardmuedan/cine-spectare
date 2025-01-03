import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/tmdb/movies'
import ErrorResult from '../ui/error-result'
import { HomepageMediaCarouselContent, HomepageMediaHeader, HomepageMediaTitle } from './components'
import { Carousel, CarouselPreviousAndNext } from '../ui/carousel'
import { HomepageMediaLoadingFallback } from './components'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { serializeMedia } from '@/features/media/helpers/transform'

const movieTitles = ['Now Playing Movies', 'Popular Movies', 'Upcoming Movies', 'Top Rated Movies']

export default async function HomepageMovies() {
  const homepageMovies = await Promise.all([getNowPlayingMovies(1), getPopularMovies(1), getUpcomingMovies(1), getTopRatedMovies(1)])

  const movieLinks = ['/movies/now-playing', '/movies', 'movies/upcoming', '/movies/top-rated']

  return (
    <>
      {homepageMovies.map(([error, movies], i) => (
        <section key={i}>
          <Carousel opts={{ slidesToScroll: 'auto', dragFree: true }}>
            <HomepageMediaHeader>
              <HomepageMediaTitle title={movieTitles[i]} />

              <div className="flex justify-end md:flex-1">
                <Link href={movieLinks[i]} className={buttonVariants({ variant: 'link', className: 'group' })}>
                  View All <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <CarouselPreviousAndNext className="hidden md:flex" />
            </HomepageMediaHeader>
            {!error ? (
              <HomepageMediaCarouselContent medias={movies.results.map(movie => serializeMedia({ ...movie, type: 'movie' }))} />
            ) : (
              <ErrorResult error={error} />
            )}
          </Carousel>
        </section>
      ))}
    </>
  )
}

export const HomepageMoviesLoadingFallback = () => (
  <>
    {movieTitles.map((title, i) => (
      <section key={i} className="space-y-2">
        <HomepageMediaTitle title={title} />
        <HomepageMediaLoadingFallback />
      </section>
    ))}
  </>
)
