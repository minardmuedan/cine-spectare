import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import { MediaKeywords } from '@/features/media/components/genres-keywords'
import { getSearchKeywords } from '@/lib/tmdb/search'

export default async function SearchKeywordsPage({ searchParams }: { searchParams: Promise<{ query: string; page: string }> }) {
  const { query } = await searchParams

  const [error, keywords] = await getSearchKeywords(query)
  if (error) return <ErrorResult error={error} />

  if (!keywords.results?.length) return <NoResult />
  return <MediaKeywords keywords={keywords.results} />
}
