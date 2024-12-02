import PaginatedSuspenseWrapper from '@/components/pages/suspense'
import { Skeleton } from '@/components/ui/skeleton'

export default function SearchPeopleLayout({ children }: { children: React.ReactNode }) {
  return (
    <PaginatedSuspenseWrapper
      fallback={
        <ul className="flex flex-col gap-2">
          {[...Array(20)].map((_, i) => (
            <li key={i}>
              <Skeleton className="flex gap-3 rounded-md border bg-accent-muted p-3">
                <Skeleton className="size-20" />

                <div className="flex-1">
                  <Skeleton className="h-6 w-52" />
                  <Skeleton className="mt-1 h-4 w-20" />

                  <div className="mt-3 flex items-center gap-3">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </Skeleton>
            </li>
          ))}
        </ul>
      }
    >
      {children}
    </PaginatedSuspenseWrapper>
  )
}
