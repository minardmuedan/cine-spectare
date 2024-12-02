'use client'

import PageHeader from '@/components/pages/header'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Fragment } from 'react'

export function SearchQueryWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const page = searchParams.get('page')

  return <Fragment key={`${query}${page}`}>{!query || query === '' ? <p>no query</p> : children}</Fragment>
}

export function SearchQueryNavbar() {
  const query = useSearchParams().get('query')
  const pathName = usePathname()

  const navlinks = [
    { title: 'Movies', path: '/search/movie' },
    { title: 'Tv Shows', path: '/search/tv' },
    { title: 'People', path: '/search/people' },
    { title: 'Keywords', path: '/search/keywords' },
  ]

  return (
    <nav className="sticky overflow-y-auto md:min-w-52">
      <ul className="flex min-w-fit justify-evenly gap-1 md:flex-col">
        {navlinks.map(({ title, path }, i) => (
          <li key={i}>
            <Link
              prefetch={false}
              href={`${path}?query=${query}`}
              className={cn(buttonVariants({ variant: path === pathName ? 'secondary' : 'ghost' }), 'w-full justify-start')}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function SearchQueryHeader() {
  const query = useSearchParams().get('query')

  return <PageHeader title={`Search Results for '${query}'`} description={`Discover relevant results for ${query}`} />
}
