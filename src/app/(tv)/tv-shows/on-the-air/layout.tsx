import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import { MediaListLoadingFallback } from '@/features/media/components/list'
import { Suspense } from 'react'

export default function OnTheAirTvShowsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="On the Air TV Shows" description="See what's currently playing across various TV networks" />

      <Suspense fallback={<MediaListLoadingFallback />}>{children}</Suspense>
    </Section>
  )
}
