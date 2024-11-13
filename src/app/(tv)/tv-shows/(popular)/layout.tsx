import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import { MediaListLoadingFallback } from '@/features/media/components/list'
import { Suspense } from 'react'

export default function PopularTvShowsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Popular TV Shows" description="Discover the most-watched and trending TV shows" />

      <Suspense fallback={<MediaListLoadingFallback />}>{children}</Suspense>
    </Section>
  )
}
