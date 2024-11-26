import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { serializeMedia } from '@/features/media/helpers/transform'
import { getSearchMovies } from '@/lib/tmdb/search'

export default async function SearchMoviePage({ searchParams }: { searchParams: Promise<{ query: string; page: string }> }) {
  const { query, page: currentPage } = await searchParams
  const page = Number(currentPage || 1)

  const [error, movies] = await getSearchMovies(query, page)
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-340px)]" />

  if (!movies.results?.length) return <NoResult className="min-h-[calc(100dvh-340px)]" />

  return (
    <>
      <MediaList
        medias={movies.results.map(movie => serializeMedia({ ...movie, type: 'movie' }))}
        sizes="(min-width: 1040px) calc(20vw - 89px), (min-width: 780px) calc(25vw - 94px), (min-width: 640px) calc(33.33vw - 31px), calc(50vw - 32px)"
      />
      <Pagination currentPage={page} maxPage={movies.total_pages} url={`?query=${query}`} />
    </>
  )
}
