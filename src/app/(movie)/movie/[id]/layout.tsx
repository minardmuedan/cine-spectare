import Back from '@/components/back-button'
import { MovieDetailsSectionsSideNav, MovieSection } from './_components'

type RRN = React.ReactNode
type LayoutProps = { children: RRN; credits: RRN; reviews: RRN; keywords: RRN }

export default function MovieLayout({ children, credits, reviews, keywords }: LayoutProps) {
  return (
    <div className="relative">
      <Back className="mb-[20dvh] ml-2 mt-2" />

      <div className="flex gap-5 p-2 md:p-5">
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

          <MovieSection section="Media" className="border">
            <h3 className="mb-5 text-xl font-medium text-muted-foreground">Media</h3>
            <ul className="flex flex-col gap-2 md:flex-row">
              <li className="aspect-square w-full border bg-accent-muted"></li>
              <li className="aspect-square w-full border bg-accent-muted"></li>
              <li className="aspect-square w-full border bg-accent-muted"></li>
            </ul>
          </MovieSection>

          <MovieSection section="Similarities" className="h-dvh border">
            <h3 className="mb-5 text-xl font-medium text-muted-foreground">Similar</h3>
          </MovieSection>

          <MovieSection section="Recommendations" className="h-dvh border">
            <h3 className="mb-5 text-xl font-medium text-muted-foreground">Recommendations</h3>
          </MovieSection>
        </div>
      </div>
    </div>
  )
}
