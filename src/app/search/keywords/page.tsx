import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import Pagination from '@/components/ui/pagination'
import { MediaKeywords } from '@/features/media/components/genres-keywords'
import { getSearchKeywords } from '@/lib/tmdb/search'

export default async function SearchKeywordsPage({ searchParams }: { searchParams: Promise<{ query: string; page: string }> }) {
  const { query, page: currentPage } = await searchParams
  const page = Number(currentPage || 1)

  const [error, keywords] = await getSearchKeywords(query, page)
  if (error) return <ErrorResult error={error} />

  if (!keywords.results?.length) return <NoResult />
  return (
    <>
      <MediaKeywords keywords={keywords.results} type="movies" />
      <Pagination currentPage={page} maxPage={keywords.total_pages} url={`?query=${query}`} />
    </>
  )
}
