import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import { MediaGridLoadingFallback } from '@/features/media/components/grid'
import { Suspense } from 'react'

export default function TopRatedMoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Top Rated Movies" description="Explore critically acclaimed films with the highest ratings" />

      <Suspense fallback={<MediaGridLoadingFallback />}>{children}</Suspense>
    </Section>
  )
}
