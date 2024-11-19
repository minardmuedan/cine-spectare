import { H2 } from '@/components/typography'
import { Skeleton } from '@/components/ui/skeleton'

export default function PersonCreditsLoading() {
  return (
    <>
      <aside className="sticky top-16 hidden h-fit w-52 md:block">
        <H2 className="mb-2">Department</H2>
        <nav>
          <ul className="flex flex-col gap-1">
            {[...Array(4)].map((_, i) => (
              <li key={i}>
                <Skeleton className={`h-10 w-full justify-between ${i != 0 && 'bg-accent/25'}`} />
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1">
        <H2 className="mb-2">All Credits</H2>

        <ul className="flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
            <li key={i} className="flex gap-3 rounded-md border bg-accent-muted px-3 py-2">
              <Skeleton className="aspect-[1/1.5] h-[130px] rounded-sm" />

              <div className="flex-1 *:max-w-[700px]">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="mb-3 mt-1 h-4 w-20" />

                <ul className="space-y-1">
                  {[...Array(3)].map((_, i2) => (
                    <li key={i2}>
                      <Skeleton className={`h-5 ${i2 == 2 ? 'w-1/2' : 'w-full'}`} />
                    </li>
                  ))}
                </ul>
              </div>

              <Skeleton className="h-5 w-20" />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
