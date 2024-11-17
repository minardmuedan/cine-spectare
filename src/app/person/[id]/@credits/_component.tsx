'use client'

import TmdbImage from '@/components/tmdb-image'
import { H2 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { TPersonCombinedCredit } from '@/lib/tmdb/_type/person'
import { StarIcon } from 'lucide-react'
import { useState } from 'react'

type Props = { credits: { department: string; media: (TPersonCombinedCredit & { role: string })[] }[] }

export default function PersonCredits({ credits }: Props) {
  const [activeDepartment, setActiveDepartment] = useState('')

  const allMedia = credits.flatMap(({ media }) => media)
  const activeMedia = activeDepartment && activeDepartment ? credits.find(({ department }) => department === activeDepartment)!.media : allMedia

  return (
    <>
      <aside className="sticky top-16 h-fit w-60">
        <H2 className="mb-2">Department</H2>
        <nav>
          <ul className="flex flex-col gap-1">
            {[{ department: 'All', media: allMedia }, ...credits].map(({ department, media }, i) => (
              <li key={i}>
                <Button
                  variant={!activeDepartment && i == 0 ? 'secondary' : activeDepartment === department ? 'secondary' : 'ghost'}
                  className="w-full justify-between"
                  onClick={() => setActiveDepartment(department === 'All' ? '' : department)}
                >
                  <p>{department} </p>
                  <p className="text-xs text-muted-foreground">{media.length}</p>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1">
        <H2 className="mb-2">{activeDepartment || 'Credits'}</H2>

        <ul className="flex flex-col gap-2">
          {activeMedia.map((media, i) => (
            <li key={i} className="flex h-[130px] gap-3 rounded-md border bg-accent-muted px-3 py-2">
              <div className="aspect-[1/1.5] h-full overflow-hidden rounded-sm">
                <TmdbImage src={media.poster_path} alt={`${media.title} poster`} className="size-full object-cover" />
              </div>

              <div className="flex-1 *:max-w-[700px]">
                <p>{media.title}</p>
                <p className="text-xs text-muted-foreground">as {media.role}</p>
                <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{media.overview}</p>
              </div>

              <div className="flex flex-col items-end gap-2 text-xs">
                <div className="flex gap-2 text-yellow-500">
                  <StarIcon size={16} />
                  <p>{media.vote_average}</p>
                </div>

                <p className="text-muted-foreground">{media.media_type}</p>
                {media.release_date && <p>{new Date(media.release_date).getFullYear()}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
