import { Skeleton } from '@/components/ui/skeleton'
import MediaGrid from './grid'

export function MediaLoadingFallback({ count = 20 }: { count?: number }) {
  return (
    <MediaGrid>
      {Array.from({ length: count }).map((_, i) => (
        <MediaCardSkeleton key={i} />
      ))}
    </MediaGrid>
  )
}

export function MediaCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded border bg-accent-muted p-2">
      <Skeleton className="aspect-[1/1.5] rounded" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3.5 w-1/3" />
    </div>
  )
}
