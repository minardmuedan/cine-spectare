import Back from '@/components/back-button'
import { MovieDetailsSectionsSideNav } from './_components'

type LayoutProps = { children: React.ReactNode; credits: React.ReactNode }

export default function MovieDetailsLayout({ children, credits }: LayoutProps) {
  return (
    <div className="relative">
      <Back className="mb-[30dvh] ml-2 mt-2" />

      <div className="flex gap-5 p-2 md:p-5">
        <MovieDetailsSectionsSideNav />

        <div className="flex-1 overflow-hidden">
          {children}
          {credits}
        </div>
      </div>
    </div>
  )
}
