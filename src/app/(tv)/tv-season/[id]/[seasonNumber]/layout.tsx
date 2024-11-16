import Back from '@/components/back-button'
import ErrorResult from '@/components/ui/error-result'
import { getTvDetails } from '@/lib/tmdb/tv-shows'
import React, { Suspense } from 'react'
import TvSeasonsSideNav from './_season-sidenav'
import { H3, H4 } from '@/components/typography'

type RRN = React.ReactNode
type Props = { params: Promise<{ id: string; seasonNumber: string }>; children: RRN; images: RRN; videos: RRN }

export default async function TvSeasonLayout({ params, children, images, videos }: Props) {
  const { id, seasonNumber } = await params
  const [error, tv] = await getTvDetails(id)

  return (
    <div className="flex flex-col gap-3 p-2 md:flex-row md:px-5">
      <div className="top-16 h-fit border-r md:sticky">
        <Back />
        <aside className="hidden h-[calc(100dvh-7rem)] w-80 flex-col items-start md:flex">
          {error ? (
            <ErrorResult error={error} className="min-h-[50%]" />
          ) : (
            <>
              <h2 className="mb-2 text-xl font-medium text-muted-foreground">{tv.name} Seasons</h2>
              <TvSeasonsSideNav seasons={tv.seasons} id={id} seasonNumber={seasonNumber} />
            </>
          )}
        </aside>
      </div>

      <div className="mx-auto w-full max-w-[1160px] md:flex-1">
        <Suspense>
          {children}

          <section className="pt-20">
            <H3 className="mb-4">Media</H3>

            <ul className="grid grid-cols-1 gap-10 *:w-full lg:grid-cols-2 lg:gap-5">
              {[
                { title: 'Posters', ui: images },
                { title: 'Videos', ui: videos },
              ].map(({ title, ui }, i) => (
                <li key={i}>
                  <H4>{title}</H4>
                  {ui}
                </li>
              ))}
            </ul>
          </section>
        </Suspense>
      </div>
    </div>
  )
}
