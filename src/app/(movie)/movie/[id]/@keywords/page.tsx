import { Button } from '@/components/ui/button'
import { getMovieKeywords } from '@/lib/tmdb/movies'

export default async function MovieKeywords(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [error, keywords] = await getMovieKeywords(id)

  if (error) return <p>{error.message}</p>

  return (
    <div>
      <h3 className="mb-5 text-xl font-medium text-muted-foreground">
        Keywords <span className="text-sm">{keywords.keywords.length}</span>
      </h3>

      <ul className="flex h-fit flex-wrap gap-1">
        {keywords.keywords.map(keyword => (
          <li key={keyword.id}>
            <Button size="sm" variant="accentMuted" className="">
              {keyword.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
