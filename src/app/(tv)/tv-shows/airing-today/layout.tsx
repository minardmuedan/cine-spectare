import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import PaginatedSuspenseWrapper from '@/components/pages/suspense'
import { MediaListLoadingFallback } from '@/features/media/components/list'

export default function AiringTodayTvShowsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Airing Today TV Shows" description="Catch up on TV shows that are broadcasting new episodes today" />

      <PaginatedSuspenseWrapper fallback={<MediaListLoadingFallback />}>{children}</PaginatedSuspenseWrapper>
    </Section>
  )
}
