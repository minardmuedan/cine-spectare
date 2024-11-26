import { H3 } from '@/components/typography'
import { Skeleton } from '@/components/ui/skeleton'

export default function TvSeasonDetailsLoading() {
  return (
    <>
      <section className="flex flex-col items-center gap-5 pt-20 text-center">
        <Skeleton className="aspect-[1/1.5] w-full max-w-72" />

        <div className="flex w-full max-w-[700px] flex-col items-center gap-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mb-2 h-8 w-60" />

          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className={`h-5 ${i == 2 ? 'w-1/2' : 'w-full'}`} />
          ))}
        </div>
      </section>

      <section className="pt-20">
        <H3 className="mb-4">Episodes</H3>
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {[...Array(12)].map((_, i) => (
            <li key={i}>
              <Skeleton className="aspect-video w-full" />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
