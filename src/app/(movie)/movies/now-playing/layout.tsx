import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import PaginatedSuspenseWrapper from '@/components/pages/suspense'
import { MediaListLoadingFallback } from '@/features/media/components/list'

export const metadata = { title: 'Now Playing', description: 'Now Playing Movies - Latest Releases' }

export default function NowPlayingMoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Now Playing Movies" description="Check out the hottest movies currently in theater" />

      <PaginatedSuspenseWrapper fallback={<MediaListLoadingFallback />}>{children}</PaginatedSuspenseWrapper>
    </Section>
  )
}
