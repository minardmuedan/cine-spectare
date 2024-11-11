import Back from '@/components/back-button'
import { MovieDetailsSectionsSideNav, MovieSection } from './_components'

type RRN = React.ReactNode
type LayoutProps = { children: RRN; credits: RRN; reviews: RRN; keywords: RRN; images: RRN; videos: RRN; similar: RRN; recommendations: RRN }

export default function MovieLayout({ children, credits, reviews, keywords, images, videos, similar, recommendations }: LayoutProps) {
  return (
    <div className="relative">
      <Back className="ml-2 mt-2 md:hidden" />

      <div className="flex gap-5 p-2 pt-[20dvh] md:px-5 md:pb-5">
        <MovieDetailsSectionsSideNav />

        <div className="flex-1 overflow-hidden">
          <MovieSection section="Details" className="flex flex-col gap-5 md:flex-row">
            {children}
          </MovieSection>

          <MovieSection section="Credits">{credits}</MovieSection>

          <MovieSection section="Reviews & Keywords" className="flex flex-col gap-20 *:flex-1 md:flex-row md:gap-10">
            {reviews}
            {keywords}
          </MovieSection>

          <MovieSection section="Media">
            <h3 className="mb-4 text-xl font-medium text-muted-foreground">Media</h3>

            <ul className="container flex flex-wrap gap-10 *:w-full *:min-w-64 *:flex-1 md:flex-row md:gap-4">
              {images}
              {videos}
            </ul>
          </MovieSection>

          <MovieSection section="Similar">{similar}</MovieSection>

          <MovieSection section="Recommendations">
            <h3 className="mb-4 text-xl font-medium text-muted-foreground">Recommendations</h3>

            {recommendations}
          </MovieSection>
        </div>
      </div>
    </div>
  )
}
