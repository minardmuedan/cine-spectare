import { getAiringTodayTvShows, getOnTheAirTvShows, getPopularTvShows, getTopRatedTvShows } from '@/lib/tmdb/tv-shows'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Carousel, CarouselPreviousAndNext } from '../ui/carousel'
import ErrorResult from '../ui/error-result'
import { HomepageMediaCarouselContent, HomepageMediaHeader, HomepageMediaTitle } from './components'
import { HomepageMediaLoadingFallback } from './components'
import { serializeMedia } from '@/features/media/helpers/transform'

const tvShowTitles = ['Airing Today Tv Shows', 'Popular Tv Shows', 'On the Air Tv Shows', 'Top Rated Tv Shows']

export default async function HomepageTvShows() {
  const homepageTvShows = await Promise.all([getAiringTodayTvShows(1), getPopularTvShows(1), getOnTheAirTvShows(1), getTopRatedTvShows(1)])
  const movieLinks = ['/tv-shows/airing-today', '/tv-shows', 'tv-shows/on-the-air', '/tv-shows/top-rated']

  return (
    <>
      {homepageTvShows.map(([error, tvShows], i) => (
        <section key={i}>
          <Carousel opts={{ slidesToScroll: 'auto', dragFree: true }}>
            <HomepageMediaHeader>
              <HomepageMediaTitle title={tvShowTitles[i]} />

              <div className="flex justify-end md:flex-1">
                <Link href={movieLinks[i]} className={buttonVariants({ variant: 'link', className: 'group' })}>
                  View All <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <CarouselPreviousAndNext className="hidden md:flex" />
            </HomepageMediaHeader>
            {!error ? (
              <HomepageMediaCarouselContent medias={tvShows.results.map(tv => serializeMedia({ ...tv, type: 'tv' }))} />
            ) : (
              <ErrorResult error={error} />
            )}
          </Carousel>
        </section>
      ))}
    </>
  )
}

export const HomepageTvShowsLoadingFallback = () => (
  <>
    {tvShowTitles.map((title, i) => (
      <section key={i} className="space-y-2">
        <HomepageMediaTitle title={title} />
        <HomepageMediaLoadingFallback />
      </section>
    ))}
  </>
)
