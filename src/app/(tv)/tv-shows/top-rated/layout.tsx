import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import { MediaListLoadingFallback } from '@/features/media/components/list'
import { Suspense } from 'react'

export default function TopRatedTvShowsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Top Rated TV Shows" description="Explore highly acclaimed TV shows with the best reviews" />

      <Suspense fallback={<MediaListLoadingFallback />}>{children}</Suspense>
    </Section>
  )
}
