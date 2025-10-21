'use client'

import PageHeader from '@/components/pages/header'
import { buttonVariants } from '@/components/ui/button'
import { movieGenres, tvGenres } from '@/lib/tmdb/genre'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function GenreHeader({ type }: { type: 'Movies' | 'Tv Shows' }) {
  const genres = type == 'Tv Shows' ? tvGenres : movieGenres
  const genreId = Number(useSearchParams().get('g'))

  const activeGenre = genres.find(genre => genre.id === genreId)

  return (
    <PageHeader
      title={activeGenre ? `${activeGenre.name} ${type}` : `${type} Genre`}
      description={activeGenre ? `Browse popular '${activeGenre?.name}' ${type}` : ''}
    />
  )
}

export function KeywordHeader({ type }: { type: 'Movies' | 'Tv Shows' }) {
  const keyword = useSearchParams().get('k')
  return <PageHeader title={keyword ? `${keyword} ${type}` : `${type} Keyword`} description={keyword ? `Browse popular '${keyword}' ${type}` : ''} />
}

export function GenresKeywordsNavbar({ active, type }: { active: 'movie' | 'tv'; type: 'genre' | 'keyword' }) {
  const key = type == 'keyword' ? 'k' : 'g'

  const genreId = useSearchParams().get(key)

  const navlinks = [
    { title: 'Movies', href: `/${type}/movies?${key}=${genreId}`, isActive: active === 'movie' },
    { title: 'Tv Shows', href: `/${type}/tv?${key}=${genreId}`, isActive: active === 'tv' },
  ]

  return (
    <nav className="mb-3 border bg-accent/20 p-1 backdrop-blur-sm md:px-3">
      <ul className="flex gap-3">
        {navlinks.map(({ title, href, isActive }, i) => (
          <li key={i} className="flex-1">
            <Link
              href={href}
              className={cn(
                buttonVariants({ variant: isActive ? 'link' : 'ghost' }),
                `w-full ${isActive && 'pointer-events-none bg-accent-muted hover:no-underline'}`,
              )}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
