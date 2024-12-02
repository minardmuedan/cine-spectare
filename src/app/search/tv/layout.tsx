import PaginatedSuspenseWrapper from '@/components/pages/suspense'
import { MediaListLoadingFallback } from '@/features/media/components/list'

export default function SearchTvLayout({ children }: { children: React.ReactNode }) {
  return <PaginatedSuspenseWrapper fallback={<MediaListLoadingFallback />}>{children}</PaginatedSuspenseWrapper>
}
