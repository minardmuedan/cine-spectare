import PaginatedSuspenseWrapper from '@/components/pages/suspense'
import { MediaListLoadingFallback } from '@/features/media/components/list'
import { Suspense } from 'react'
import { GenreHeader, GenresKeywordsNavbar } from '../../_components'

export default function GenreTvLayout(props: { params: Promise<{ id: string }>; children: React.ReactNode }) {
  return (
    <Suspense>
      <GenreHeader type="Tv Shows" />
      <GenresKeywordsNavbar active="tv" type="keyword" />
      <PaginatedSuspenseWrapper key="tv" fallback={<MediaListLoadingFallback />}>
        {props.children}
      </PaginatedSuspenseWrapper>
    </Suspense>
  )
}
