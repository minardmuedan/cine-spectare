import { Skeleton } from '@/components/ui/skeleton'
import { MediaCreditsLoadingFallback } from '@/features/media/components/media-credits'

export default function MovieCreditsLoading() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <Skeleton className="h-7 w-40" />

        <div className="flex gap-2">
          <Skeleton className="size-10" />
          <Skeleton className="size-10" />
        </div>
      </div>

      <MediaCreditsLoadingFallback />
    </div>
  )
}
