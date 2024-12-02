import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import PaginatedSuspenseWrapper from '@/components/pages/suspense'
import { MediaListLoadingFallback } from '@/features/media/components/list'

export const metadata = { title: 'Popular', description: 'Popular TV Shows - Trending Series' }

export default function PopularTvShowsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Popular TV Shows" description="Discover the most-watched and trending TV shows" />

      <PaginatedSuspenseWrapper fallback={<MediaListLoadingFallback />}>{children}</PaginatedSuspenseWrapper>
    </Section>
  )
}
