import HomepageMovies, { HomepageMoviesLoadingFallback } from '@/components/homepage/movies'
import HomepageTvShows, { HomepageTvShowsLoadingFallback } from '@/components/homepage/tv'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense, use } from 'react'

export default function Home({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { view } = use(searchParams)
  const isTvActive = view == 'tv'

  return (
    <>
      <section className="flex min-h-[75dvh] flex-col items-center justify-center gap-2 px-2 py-20 text-center">
        <p className="text-xs text-muted-foreground md:text-sm">finding something to watch? this might be -</p>
        <h1 className="font-bolota text-3xl md:text-5xl">
          YOUR ULTIMATE <br /> ENTERTAINMENT DESTINATION
        </h1>
      </section>

      <div className="space-y-10 px-2 pb-20 md:px-5 lg:px-10">
        <nav className="relative z-30 flex gap-2 rounded-sm border bg-accent-muted p-1 *:flex-1 md:px-4">
          <div
            className={`absolute left-0 top-1/2 w-1/2 -translate-y-1/2 p-1 transition-transform ease-in-out md:px-4 ${isTvActive && 'translate-x-full'}`}
          >
            <div className="h-10 rounded-md bg-background">
              <span className="sr-only">nav backdrop color</span>
            </div>
          </div>

          {['Movies', 'Tv Shows'].map((title, i) => (
            <Button
              key={i}
              variant={isTvActive && i == 1 ? 'link' : i === 0 && !isTvActive ? 'link' : 'ghost'}
              asChild
              className={`z-10 hover:no-underline ${isTvActive && i == 1 ? 'pointer-events-none' : i === 0 && !isTvActive ? 'pointer-events-none' : 'text-muted-foreground'}`}
            >
              <Link href={i === 0 ? '/' : '/?view=tv'} scroll={false}>
                {title}
              </Link>
            </Button>
          ))}
        </nav>

        <Suspense key={view || 'movie'} fallback={view == 'tv' ? <HomepageTvShowsLoadingFallback /> : <HomepageMoviesLoadingFallback />}>
          {view == 'tv' ? <HomepageTvShows /> : <HomepageMovies />}
        </Suspense>
      </div>
    </>
  )
}
