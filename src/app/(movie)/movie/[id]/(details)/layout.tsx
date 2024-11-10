import React, { Suspense } from 'react'
import { MovieSection } from '../_components'
import MovieDetailsLoading from './loading'

export default function MovieDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <MovieSection section="Details" className="flex flex-col gap-5 pb-20 md:flex-row">
      <Suspense fallback={<MovieDetailsLoading />}>{children}</Suspense>
    </MovieSection>
  )
}
