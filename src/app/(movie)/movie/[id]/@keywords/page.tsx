import { H3 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import ErrorResult from '@/components/ui/error-result'
import NoResult from '@/components/ui/no-results'
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

      {keywords.keywords.length ? (
        <ul className="flex h-fit flex-wrap gap-1">
          {keywords.keywords.map(keyword => (
            <li key={keyword.id}>
              <Button size="sm" variant="accentMuted" className="">
                {keyword.name}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <NoResult />
      )}
    </div>
  )
}
