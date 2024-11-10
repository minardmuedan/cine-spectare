import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import { MediaGridLoadingFallback } from '@/features/media/components/grid'
import { Suspense } from 'react'

export default function PopularMoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Popular Movies" description="Discover the latest trending films loved by audiences worldwide" />

      <Suspense fallback={<MediaGridLoadingFallback />}>{children}</Suspense>
    </Section>
  )
}
