import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import { MediaLoadingFallback } from '@/features/media/components/loading-fallback'
import { Suspense } from 'react'

export default function PopularMoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Popular Movies" description="Discover the latest trending films loved by audiences worldwide" />

      <Suspense fallback={<MediaLoadingFallback />}>{children}</Suspense>
    </Section>
  )
}
