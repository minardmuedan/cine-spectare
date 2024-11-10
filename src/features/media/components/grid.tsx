export default function MediaGrid({ children }: { children: React.ReactNode }) {
  return <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{children}</ul>
}

import { Skeleton } from '@/components/ui/skeleton'

export function MediaGridLoadingFallback({ count = 20 }: { count?: number }) {
  return (
    <MediaGrid>
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="flex flex-col gap-2 rounded border bg-accent-muted p-2">
          <Skeleton className="aspect-[1/1.5] rounded" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3.5 w-1/3" />
        </li>
      ))}
    </MediaGrid>
  )
}
