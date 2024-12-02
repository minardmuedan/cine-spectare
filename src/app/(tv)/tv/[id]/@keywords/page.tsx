import { H3 } from '@/components/typography'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import { MediaKeywords } from '@/features/media/components/genres-keywords'
import { getTvKeywords } from '@/lib/tmdb/tv-shows'

export default async function TvKeywordsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, keywords] = await getTvKeywords(id)

  if (error)
    return (
      <div>
        <H3 className="mb-4">Keywords</H3>
        <ErrorResult error={error} />
      </div>
    )

  return (
    <div>
      <H3 className="mb-4">
        Keywords <span className="text-sm">{keywords.results.length}</span>
      </H3>

      {keywords.results.length ? <MediaKeywords keywords={keywords.results} type="tv" /> : <NoResult />}
    </div>
  )
}
