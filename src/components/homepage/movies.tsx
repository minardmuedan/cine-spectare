import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/tmdb/movies'
import ErrorResult from '../ui/error-result'
import { HomepageMediaCarouselContent, HomepageMediaHeader, HomepageMediaTitle, mediaConverter } from './components'
import { Carousel, CarouselPreviousAndNext } from '../ui/carousel'

export default async function HomepageMovies() {
  const [popular, nowPlaying, upcoming, topRated] = await Promise.all([
    getPopularMovies(1),
    getNowPlayingMovies(1),
    getUpcomingMovies(1),
    getTopRatedMovies(1),
  ])

  const [popularMoviesError, popularMovies] = popular
  const [nowPlayingMoviesError, nowPlayingMovies] = nowPlaying
  const [upcomingMoviesError, upcomingMovies] = upcoming
  const [topRatedMoviesError, topRatedMovies] = topRated

  return (
    <div className="space-y-10">
      <section>
        <Carousel opts={{ slidesToScroll: 'auto' }}>
          <HomepageMediaHeader>
            <HomepageMediaTitle title="Now Playing Movies" /> <CarouselPreviousAndNext />
          </HomepageMediaHeader>
          {!popularMoviesError ? (
            <HomepageMediaCarouselContent medias={popularMovies.results.map(movie => mediaConverter({ ...movie, type: 'movie' }))} />
          ) : (
            <ErrorResult error={popularMoviesError} />
          )}
        </Carousel>
      </section>

      <section>
        <Carousel opts={{ slidesToScroll: 'auto' }}>
          <HomepageMediaHeader>
            <HomepageMediaTitle title="Popular Movies" /> <CarouselPreviousAndNext />
          </HomepageMediaHeader>
          {!nowPlayingMoviesError ? (
            <HomepageMediaCarouselContent medias={nowPlayingMovies.results.map(movie => mediaConverter({ ...movie, type: 'movie' }))} />
          ) : (
            <ErrorResult error={nowPlayingMoviesError} />
          )}
        </Carousel>
      </section>

      <section>
        <Carousel opts={{ slidesToScroll: 'auto' }}>
          <HomepageMediaHeader>
            <HomepageMediaTitle title="Upcoming Movies" /> <CarouselPreviousAndNext />
          </HomepageMediaHeader>
          {!upcomingMoviesError ? (
            <HomepageMediaCarouselContent medias={upcomingMovies.results.map(movie => mediaConverter({ ...movie, type: 'movie' }))} />
          ) : (
            <ErrorResult error={upcomingMoviesError} />
          )}
        </Carousel>
      </section>

      <section>
        <Carousel opts={{ slidesToScroll: 'auto' }}>
          <HomepageMediaHeader>
            <HomepageMediaTitle title="Top Rated Movies" />
            <CarouselPreviousAndNext />
          </HomepageMediaHeader>

          {!topRatedMoviesError ? (
            <HomepageMediaCarouselContent medias={topRatedMovies.results.map(movie => mediaConverter({ ...movie, type: 'movie' }))} />
          ) : (
            <ErrorResult error={topRatedMoviesError} />
          )}
        </Carousel>
      </section>
    </div>
  )
}
