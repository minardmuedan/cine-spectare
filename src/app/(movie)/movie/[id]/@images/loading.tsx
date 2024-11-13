import { H4 } from '@/components/typography'
import { Skeleton } from '@/components/ui/skeleton'

export default function MovieImagesLoading() {
  return (
    <>
      <li>
        <H4>Posters</H4>
        <ul className="grid aspect-square w-full grid-cols-2 gap-1">
          {[...Array(4)].map((_, i) => (
            <li key={i}>
              <Skeleton className="size-full rounded-sm" />
            </li>
          ))}
        </ul>
      </li>

      <li>
        <H4>Backdrops</H4>
        <ul className="grid aspect-square w-full grid-cols-2 gap-1">
          {[...Array(3)].map((_, i) => (
            <li key={i} className={`relative ${i == 0 && 'col-span-2'}`}>
              <Skeleton className="size-full rounded-sm" />
            </li>
          ))}
        </ul>
      </li>
    </>
  )
}
