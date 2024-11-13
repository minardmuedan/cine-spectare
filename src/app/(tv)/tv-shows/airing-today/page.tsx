import BackgroundMediaImage from '@/components/pages/background-image'
import ErrorResult from '@/components/ui/error-result'
import Pagination from '@/components/ui/pagination'
import MediaList from '@/features/media/components/list'
import { getAiringTodayTvShows } from '@/lib/tmdb/tv-shows'
import { Fragment } from 'react'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function AiringTodayTvShowsPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page || 1)

  const [error, tvShows] = await getAiringTodayTvShows(page)
  if (error) return <ErrorResult error={error} className="min-h-[calc(100dvh-260px)]" />

  return (
    <Fragment key={page}>
      <BackgroundMediaImage src={tvShows.results[0].backdrop_path} />
      <MediaList
        medias={tvShows.results.map(tv => ({
          id: tv.id,
          title: tv.name,
          posterPath: tv.poster_path,
          backdropPath: tv.backdrop_path,
          voteAverage: tv.vote_average,
          releaseDate: tv.first_air_date,
          type: 'tv',
        }))}
      />
      <Pagination currentPage={page} maxPage={tvShows.total_pages} />
    </Fragment>
  )
}
