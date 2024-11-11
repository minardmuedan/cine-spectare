import { Skeleton } from '@/components/ui/skeleton'

export default function MovieVideosLoading() {
  return (
    <li>
      <h4 className="mb-2 text-center md:text-start">Videos</h4>
      <ul className="grid aspect-square w-full grid-cols-2 gap-1">
        {[...Array(3)].map((_, i) => (
          <li key={i} className={`relative ${i == 0 && 'col-span-2'}`}>
            <Skeleton className="size-full rounded-sm" />
          </li>
        ))}
      </ul>
    </li>
  )
}
