import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import { MediaLoadingFallback } from '@/features/media/components/loading-fallback'
import { Suspense } from 'react'

export default function TopRatedMoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Top Rated Movies" description="Explore critically acclaimed films with the highest ratings" />

      <Suspense fallback={<MediaLoadingFallback />}>{children}</Suspense>
    </Section>
  )
}
