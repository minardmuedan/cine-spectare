import BackgroundMediaImage from '@/components/pages/background-image'
import ErrorResult from '@/components/ui/error-result'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { serializeMedia } from '@/features/media/helpers/transform'
import { tvGenres } from '@/lib/tmdb/genre'
import { getGenreTvShows } from '@/lib/tmdb/genre-keyword'

export async function generateMetadata(props: { searchParams: Promise<{ g: string }> }) {
  const searchParams = await props.searchParams
  const genreId = Number(searchParams.g)

  return { title: tvGenres.find(genre => genre.id === genreId)?.name ?? 'Genre Tv Shows', description: 'TV Show Genres - Browse by Category' }
}

export default async function GenreTvPage(props: { searchParams: Promise<{ g: string; page?: string }> }) {
  const searchParams = await props.searchParams

  const genreId = searchParams.g

  const currentPage = searchParams.page
  const page = Number(currentPage || 1)

  const [error, tvShows] = await getGenreTvShows(genreId, page)
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-260px)]" />

  return (
    <>
      <BackgroundMediaImage src={tvShows.results?.[0]?.backdrop_path} />

      <MediaList medias={tvShows.results.map(movie => serializeMedia({ ...movie, type: 'tv' }))} />
      <Pagination currentPage={page} maxPage={tvShows.total_pages} url={`?g=${genreId}`} />
    </>
  )
}
