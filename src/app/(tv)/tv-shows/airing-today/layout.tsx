import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import { MediaListLoadingFallback } from '@/features/media/components/list'
import { Suspense } from 'react'

export default function AiringTodayTvShowsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Airing Today TV Shows" description="Catch up on TV shows that are broadcasting new episodes today" />

      <Suspense fallback={<MediaListLoadingFallback />}>{children}</Suspense>
    </Section>
  )
}
