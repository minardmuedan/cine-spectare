import { H3 } from '@/components/typography'
import { Skeleton } from '@/components/ui/skeleton'

export default function MovieCreditsLoading() {
  return (
    <>
      <header className="mb-4 flex items-center justify-between gap-2">
        <H3>Credits</H3>

        <div className="flex gap-2">
          <Skeleton className="size-10" />
          <Skeleton className="size-10" />
        </div>
      </header>

      <ul className="flex gap-4">
        {[...Array(10)].map((_, i) => (
          <li key={i} className="flex flex-col items-center">
            <Skeleton className="size-24 rounded-full" />
            <Skeleton className="my-1 h-5 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </li>
        ))}
      </ul>
    </>
  )
}
