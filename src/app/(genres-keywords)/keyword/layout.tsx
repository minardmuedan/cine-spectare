import PaginatedSuspenseWrapper from '@/components/pages/suspense'
import { Skeleton } from '@/components/ui/skeleton'
import { MediaListLoadingFallback } from '@/features/media/components/list'

export default function KeywordLayout({ children }: { children: React.ReactNode }) {
  return (
    <PaginatedSuspenseWrapper
      fallback={
        <>
          <div className="flex flex-col items-center gap-1 pb-12 pt-10 md:items-start">
            <Skeleton className="h-9 w-96 md:h-10" />
            <Skeleton className="h-5 w-56" />
          </div>

          <MediaListLoadingFallback />
        </>
      }
    >
      {children}
    </PaginatedSuspenseWrapper>
  )
}
