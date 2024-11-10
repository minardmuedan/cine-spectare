import { Skeleton } from '@/components/ui/skeleton'
import { MediaGenresKeywordsLoadingFallback } from '@/features/media/components/genres-keywords'

export default function MovieDetailsLoading() {
  return (
    <>
      <Skeleton className="mx-auto aspect-[1/1.5] w-full max-w-72 overflow-hidden md:mx-0" />

      <div className="flex-1">
        <Skeleton className="mb-1 h-4 w-28" />
        <Skeleton className="mb-2 h-8 w-60" />

        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className={`mb-1 h-4 max-w-[700px] ${i == 2 ? 'w-1/2' : 'w-full'}`} />
        ))}

        <div className="mt-10 flex flex-col flex-wrap gap-2 md:flex-row">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="mb-1 h-10 w-full md:w-44" />
          ))}
        </div>

        <div className="my-10">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="mb-3 h-5 w-1/2" />
          ))}
        </div>

        <MediaGenresKeywordsLoadingFallback />
      </div>
    </>
  )
}
