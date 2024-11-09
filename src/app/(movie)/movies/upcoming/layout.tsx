import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import { MediaLoadingFallback } from '@/features/media/components/loading-fallback'
import { Suspense } from 'react'

export default function UpcomingMoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Upcoming Movies" description="Get a sneak peek of exciting films set to release soon" />

      <Suspense fallback={<MediaLoadingFallback />}>{children}</Suspense>
    </Section>
  )
}
