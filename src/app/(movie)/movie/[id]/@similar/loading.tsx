import { H3 } from '@/components/typography'
import { Skeleton } from '@/components/ui/skeleton'
import { MediaCardLoadingFallback } from '@/features/media/components/card'
import { Fragment } from 'react'

export default function MovieSimilarLoading() {
  return (
    <>
      <div className="mb-2 flex items-center justify-between gap-2">
        <H3>More like this</H3>

        <div className="flex gap-2">
          <Skeleton className="size-10" />
          <Skeleton className="size-10" />
        </div>
      </div>

      <ul className="flex w-full gap-3">
        {[...Array(5)].map((_, i) => (
          <li key={i} className={`${i == 4 ? 'w-1/2' : 'w-full'} ${i == 0 ? 'hidden lg:block' : i <= 1 && 'hidden sm:block'}`}>
            <MediaCardLoadingFallback className={`${i === 4 && 'rounded-r-none pr-0'}`} />
          </li>
        ))}
      </ul>
    </>
  )
}
