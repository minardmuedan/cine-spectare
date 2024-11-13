import { H3 } from '@/components/typography'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
import { MediaKeywords } from '@/features/media/components/genres-keywords'
import { getMovieKeywords } from '@/lib/tmdb/movies'

export default async function MovieKeywordsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, keywords] = await getMovieKeywords(id)

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
        Keywords <span className="text-sm">{keywords.keywords.length}</span>
      </H3>

      {keywords.keywords.length ? <MediaKeywords keywords={keywords.keywords} /> : <NoResult />}
    </div>
  )
}
