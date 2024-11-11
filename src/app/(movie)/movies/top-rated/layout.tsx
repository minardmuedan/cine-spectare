import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import { MediaListLoadingFallback } from '@/features/media/components/list'
import { Suspense } from 'react'

export default function TopRatedMoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Top Rated Movies" description="Explore critically acclaimed films with the highest ratings" />

      <Suspense fallback={<MediaListLoadingFallback />}>{children}</Suspense>
    </Section>
  )
}
