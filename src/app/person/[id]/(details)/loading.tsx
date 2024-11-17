import { Skeleton } from '@/components/ui/skeleton'

export default function PersonDetailsLoading() {
  return (
    <>
      <Skeleton className="mx-auto aspect-[1/1.5] h-fit w-full max-w-72 rounded-md md:mx-0" />

      <div className="max-w-[700px] flex-1 space-y-5">
        <div>
          <Skeleton className="mb-2 h-8 w-64" />

          <ul className="space-y-1">
            {[...Array(4)].map((_, i) => (
              <li key={i}>
                <Skeleton className={`h-5 ${i == 3 ? 'w-1/2' : 'w-full'}`} />
              </li>
            ))}
          </ul>
        </div>

        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-40" />
      </div>
    </>
  )
}
