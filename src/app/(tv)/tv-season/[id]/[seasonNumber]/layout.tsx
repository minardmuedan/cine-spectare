import Back from '@/components/back-button'
import ErrorResult from '@/components/ui/error-result'
import { getTvDetails } from '@/lib/tmdb/tv-shows'
import React, { Suspense } from 'react'
import TvSeasonsSideNav from './_season-sidenav'

type Props = { params: Promise<{ id: string; seasonNumber: string }>; children: React.ReactNode; credits: React.ReactNode }

export default async function TvSeasonLayout({ params, children, credits }: Props) {
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

      <div className="mx-auto max-w-[1160px] md:flex-1">
        <Suspense>
          {children}
          {credits}
        </Suspense>
      </div>
    </div>
  )
}