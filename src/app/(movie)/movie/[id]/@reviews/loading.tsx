import { Skeleton } from '@/components/ui/skeleton'

export default function MovieReviewsLoading() {
  return (
    <div className="max-w-[700px]">
      <h3 className="mb-5 text-xl font-medium text-muted-foreground">Reviews</h3>

      <ul className="flex flex-col gap-2">
        {[...Array(2)].map((_, i) => (
          <li key={i} className="rounded border p-5">
            <div className="mb-5 flex items-center gap-2">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="h-4 w-36" />
            </div>

            {[...Array(5)].map((_, i2) => (
              <Skeleton key={i2} className={`mb-1 h-4 ${i2 == 4 ? 'w-1/2' : 'w-full'}`} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}
