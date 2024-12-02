'use client'

import TmdbImage from '@/components/tmdb-image'
import { H2 } from '@/components/typography'
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import VoteAverage from '@/features/media/components/vote-average'
import { TPersonCombinedCredit } from '@/lib/tmdb/_type/person'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'

type Credits = { credits: { department: string; media: (TPersonCombinedCredit & { role: string })[] }[] }

export default function PersonCredits({ credits }: Credits) {
  const [activeDepartment, setActiveDepartment] = useState('')

  const allMedia = credits.flatMap(({ media }) => media)
  const activeMedia = activeDepartment && activeDepartment ? credits.find(({ department }) => department === activeDepartment)!.media : allMedia

  return (
    <>
      <aside className="sticky top-16 hidden h-fit md:block">
        <H2 className="mb-4">Department</H2>
        <SideNavDepartment
          credits={[{ department: 'All', media: allMedia }, ...credits]}
          activeDepartment={activeDepartment}
          setActiveDepartment={setActiveDepartment}
        />
      </aside>

      <div className="flex-1">
        <header className="mb-4 flex items-center justify-between">
          <H2>{activeDepartment || 'All Credits'}</H2>

          <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({ variant: 'ghost', className: 'md:hidden' })}>
              Select Department <ChevronDown />
            </DropdownMenuTrigger>

            <DropdownMenuContent hideWhenDetached align="end" className="p-3">
              <SideNavDepartment
                credits={[{ department: 'All', media: allMedia }, ...credits]}
                activeDepartment={activeDepartment}
                setActiveDepartment={setActiveDepartment}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <ul className="flex flex-col gap-2">
          {activeMedia.map((media, i) => (
            <li key={i}>
              <Link prefetch={false} href={`/${media.media_type}/${media.id}`}>
                <div className="flex h-[130px] gap-3 rounded-md border bg-accent-muted px-3 py-2 transition-colors hover:bg-accent">
                  <div className="relative aspect-[1/1.5] h-full overflow-hidden rounded-sm">
                    <TmdbImage src={media.poster_path} alt={`${media.title} poster`} fill sizes="75px" className="object-cover" />
                  </div>

                  <div className="flex-1 *:max-w-[700px]">
                    <p>{media.title}</p>
                    <p className="text-xs text-muted-foreground">as {media.role}</p>
                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{media.overview}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2 text-xs">
                    <VoteAverage voteAverage={media.vote_average} />

                    <p className="text-muted-foreground">{media.media_type}</p>
                    {media.release_date && <p>{new Date(media.release_date).getFullYear()}</p>}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function SideNavDepartment(props: Credits & { activeDepartment: string; setActiveDepartment: Dispatch<SetStateAction<string>> }) {
  return (
    <nav className="w-52">
      <ul className="flex flex-col gap-1">
        {props.credits.map(({ department, media }, i) => (
          <li key={i}>
            <Button
              variant={!props.activeDepartment && i == 0 ? 'secondary' : props.activeDepartment === department ? 'secondary' : 'ghost'}
              className="w-full justify-between"
              onClick={() => props.setActiveDepartment(department === 'All' ? '' : department)}
            >
              <p>{department} </p>
              <p className="text-xs text-muted-foreground">{media.length}</p>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
