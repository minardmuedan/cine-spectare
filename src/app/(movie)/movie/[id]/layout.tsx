import Back from '@/components/back-button'
import { MovieDetailsSectionsSideNav, MovieSection } from './_components'
import { H3 } from '@/components/typography'
import { Suspense } from 'react'

type RRN = React.ReactNode
type LayoutProps = { children: RRN; credits: RRN; reviews: RRN; keywords: RRN; images: RRN; videos: RRN; similar: RRN; recommendations: RRN }

export default function MovieLayout({ children, credits, reviews, keywords, images, videos, similar, recommendations }: LayoutProps) {
  return (
    <div className="relative">
      <Back className="top-16 z-20 ml-2 mt-2 md:sticky" />

      <div className="flex gap-5 p-2 pt-[20dvh] md:px-5 md:pb-5">
        <MovieDetailsSectionsSideNav />

        <div className="container flex-1 overflow-hidden">
          <Suspense>
            <MovieSection section="Details" className="flex flex-col gap-5 md:flex-row">
              {children}
            </MovieSection>

            <MovieSection section="Credits">{credits}</MovieSection>

            <MovieSection section="Reviews & Keywords" className="flex flex-col gap-20 *:flex-1 md:flex-row md:gap-10">
              {reviews}
              {keywords}
            </MovieSection>

            <MovieSection section="Media">
              <H3 className="mb-4">Media</H3>

              <ul className="grid grid-cols-2 gap-10 *:w-full *:last:col-span-2 md:gap-4 lg:grid-cols-3 *:last:lg:col-span-1">
                {images}
                {videos}
              </ul>
            </MovieSection>

            <MovieSection section="Similar">{similar}</MovieSection>

            <MovieSection section="Recommendations">
              <H3 className="mb-4">Recommendations</H3>

              {recommendations}
            </MovieSection>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
