import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import Pagination from '@/components/ui/pagination'
import { PersonAvatar } from '@/features/media/components/credits'
import { getSearchPerson } from '@/lib/tmdb/search'
import Link from 'next/link'

export default async function SearchPeoplePage({ searchParams }: { searchParams: Promise<{ query: string; page: string }> }) {
  const { query, page: currentPage } = await searchParams
  const page = Number(currentPage || 1)

  const [error, people] = await getSearchPerson(query, page)
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-340px)]" />

  if (!people.results?.length) return <NoResult className="min-h-[calc(100dvh-340px)]" />
  return (
    <>
      <ul className="flex flex-col gap-2">
        {people.results.map((person, i) => (
          <li key={i}>
            <Link href={`/person/${person.id}`}>
              <div className="group flex gap-3 rounded-md border bg-accent-muted p-3 transition-colors ease-in hover:bg-accent">
                <PersonAvatar {...person} className="size-20 border-2 transition-colors group-hover:border-background" />

                <div className="flex-1">
                  <p>{person.name}</p>

                  <p className="text-xs text-muted-foreground">{person.known_for_department}</p>

                  <p className="mt-3 text-sm text-muted-foreground">
                    {person.known_for.map(media => (media.media_type === 'movie' ? media.title : media.name)).join(', ')}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <Pagination currentPage={page} maxPage={people.total_pages} url={`?query=${query}`} />
    </>
  )
}
