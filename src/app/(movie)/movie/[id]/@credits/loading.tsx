import { H3 } from '@/components/typography'
import { Skeleton } from '@/components/ui/skeleton'
import { MediaCreditsLoadingFallback } from '@/features/media/components/credits'

export default function MovieCreditsLoading() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-2">
        <H3>Credits</H3>

        <div className="flex gap-2">
          <Skeleton className="size-10" />
          <Skeleton className="size-10" />
        </div>
      </div>

      <MediaCreditsLoadingFallback />
    </>
  )
}
