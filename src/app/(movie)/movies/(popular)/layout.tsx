import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import PaginatedSuspenseWrapper from '@/components/pages/suspense'
import { MediaListLoadingFallback } from '@/features/media/components/list'

export const metadata = { title: 'Popular', description: 'Popular Movies - Browse Details and Ratings' }

export default function PopularMoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Popular Movies" description="Discover the latest trending films loved by audiences worldwide" />

      <PaginatedSuspenseWrapper fallback={<MediaListLoadingFallback />}>{children}</PaginatedSuspenseWrapper>
    </Section>
  )
}
