import PageHeader from '@/components/pages/header'
import Section from '@/components/pages/section'
import PaginatedSuspenseWrapper from '@/components/pages/suspense'
import { MediaListLoadingFallback } from '@/features/media/components/list'

export const metadata = { title: 'Upcoming', description: "Upcoming Movies - What's Next in Film" }

export default function UpcomingMoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <PageHeader title="Upcoming Movies" description="Get a sneak peek of exciting films set to release soon" />

      <PaginatedSuspenseWrapper fallback={<MediaListLoadingFallback />}>{children}</PaginatedSuspenseWrapper>
    </Section>
  )
}
