import { Suspense } from 'react'
import { MovieSection } from '../_components'
import MovieCreditsLoading from './loading'

export default function MovieCreditsLayout({ children }: { children: React.ReactNode }) {
  return (
    <MovieSection section="Credits" className="max-w-full">
      <Suspense fallback={<MovieCreditsLoading />}>{children}</Suspense>
    </MovieSection>
  )
}
