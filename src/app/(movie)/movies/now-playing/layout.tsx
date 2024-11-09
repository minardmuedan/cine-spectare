import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import { MediaLoadingFallback } from '@/features/media/components/loading-fallback'
import { Suspense } from 'react'

export default function NowPlayingMoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Now Playing Movies" description="Check out the hottest movies currently in theater" />

      <Suspense fallback={<MediaLoadingFallback />}>{children}</Suspense>
    </Section>
  )
}
