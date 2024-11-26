import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { serializeMedia } from '@/features/media/helpers/transform'
import { getSearchTv } from '@/lib/tmdb/search'

export default async function SearchTvPage({ searchParams }: { searchParams: Promise<{ query: string; page: string }> }) {
  const { query, page: currentPage } = await searchParams
  const page = Number(currentPage || 1)

  const [error, tvShows] = await getSearchTv(query, page)
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-340px)]" />

  if (!tvShows.results?.length) return <NoResult className="min-h-[calc(100dvh-340px)]" />
  return (
    <>
      <MediaList
        medias={tvShows.results.map(tv => serializeMedia({ ...tv, type: 'tv' }))}
        sizes="(min-width: 1040px) calc(20vw - 89px), (min-width: 780px) calc(25vw - 94px), (min-width: 640px) calc(33.33vw - 31px), calc(50vw - 32px)"
      />
      <Pagination currentPage={page} maxPage={tvShows.total_pages} url={`?query=${query}`} />
    </>
  )
}
