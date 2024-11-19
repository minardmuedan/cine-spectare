import { Skeleton } from '@/components/ui/skeleton'

export default function PersonImagesLoading() {
  return (
    <ul className="grid aspect-square w-full grid-cols-2 gap-1">
      {[...Array(4)].map((_, i) => (
        <li key={i}>
          <Skeleton className="size-full rounded-sm" />
        </li>
      ))}
    </ul>
  )
}
