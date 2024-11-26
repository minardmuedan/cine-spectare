import PageHeader from '@/components/pages/header'
import PaginatedSuspenseWrapper from '@/components/pages/suspense'
import { MediaListLoadingFallback } from '@/features/media/components/list'
import { use } from 'react'

export default function GenreMoviesLayout(props: { params: Promise<{ id: string }>; children: React.ReactNode }) {
  const { id } = use(props.params)

  const genres = [
    { id: 10759, name: 'Action & Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 10762, name: 'Kids' },
    { id: 9648, name: 'Mystery' },
    { id: 10763, name: 'News' },
    { id: 10764, name: 'Reality' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' },
    { id: 10768, name: 'War & Politics' },
    { id: 37, name: 'Western' },
  ]

  const activeGenre = genres.find(genre => genre.id === Number(id))

  return (
    <>
      <PageHeader
        title={activeGenre ? `${activeGenre.name} Tv Shows` : 'Tv Shows Genre'}
        description={`Browse popular '${activeGenre?.name}' tv shows`}
      />
      <PaginatedSuspenseWrapper fallback={<MediaListLoadingFallback />}>{props.children}</PaginatedSuspenseWrapper>
    </>
  )
}
