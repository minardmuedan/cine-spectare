import PaginatedSuspenseWrapper from '@/components/pages/suspense'
import { MediaListLoadingFallback } from '@/features/media/components/list'
import { GenreHeader, GenresKeywordsNavbar } from '../../_components'
import { Suspense } from 'react'

export default function GenreMoviesLayout(props: { children: React.ReactNode }) {
  return (
    <Suspense>
      <GenreHeader type="Movies" />
      <GenresKeywordsNavbar active="movie" type="genre" />
      <PaginatedSuspenseWrapper key="movie" fallback={<MediaListLoadingFallback />}>
        {props.children}
      </PaginatedSuspenseWrapper>
    </Suspense>
  )
}
