import Back from '@/components/back-button'
import { Suspense } from 'react'
import { TvSection, TvSectionsSideNav } from './_components'
import { H3, H4 } from '@/components/typography'

type RRN = React.ReactNode
type LayoutProps = {
  children: RRN
  credits: RRN
  seasons: RRN
  reviews: RRN
  keywords: RRN
  images: RRN
  videos: RRN
  similar: RRN
  recommendations: RRN
}

export default function TvLayout({ children, credits, seasons, reviews, keywords, images, videos, similar, recommendations }: LayoutProps) {
  return (
    <div className="relative">
      <Back className="top-16 z-20 ml-2 mt-2 md:sticky" />

      <div className="flex gap-5 p-2 pt-[20dvh] md:px-5 md:pb-5">
        <TvSectionsSideNav />

        <div className="container flex-1 overflow-hidden">
          <Suspense>
            <TvSection section="Details" className="flex flex-col gap-5 md:flex-row">
              {children}
            </TvSection>

            <TvSection section="Credits">{credits}</TvSection>

            <TvSection section="Seasons">{seasons}</TvSection>

            <TvSection section="Reviews & Keywords" className="flex flex-col gap-20 *:flex-1 md:flex-row md:gap-10">
              {reviews}
              {keywords}
            </TvSection>

            <TvSection section="Media">
              <H3 className="mb-4">Media</H3>

              <ul className="grid grid-cols-2 gap-10 *:w-full *:last:col-span-2 md:gap-4 lg:grid-cols-3 *:last:lg:col-span-1">
                {images}

                <li>
                  <H4>Videos</H4>
                  {videos}
                </li>
              </ul>
            </TvSection>

            <TvSection section="Similar">{similar}</TvSection>

            <TvSection section="Recommendations">
              <H3 className="mb-4">Recommend for you</H3>

              {recommendations}
            </TvSection>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
