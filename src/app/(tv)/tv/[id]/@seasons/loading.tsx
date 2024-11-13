import { H3 } from '@/components/typography'
import { Skeleton } from '@/components/ui/skeleton'

export default function SeasonsLoading() {
  return (
    <>
      <H3 className="mb-4">Seasons</H3>

      <ul className="flex flex-col gap-2">
        {[...Array(3)].map((_, i) => (
          <li key={i} className="flex gap-3 rounded-md border bg-accent-muted p-3">
            <Skeleton className="aspect-[1/1.5] w-16" />

            <div className="flex-1">
              <Skeleton className="h-5 w-1/3" />

              <div className="mt-2 max-w-[700px]">
                <Skeleton className="mb-1 mt-2 h-4" />
                <Skeleton className="mb-1 h-4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>

            <Skeleton className="h-4 w-20" />
          </li>
        ))}
      </ul>
    </>
  )
}
