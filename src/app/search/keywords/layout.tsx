import PaginatedSuspenseWrapper from '@/components/pages/suspense'
import { MediaGenresKeywordsLoadingFallback } from '@/features/media/components/genres-keywords'

export default function SearchKeywordsLayout({ children }: { children: React.ReactNode }) {
  return <PaginatedSuspenseWrapper fallback={<MediaGenresKeywordsLoadingFallback />}>{children}</PaginatedSuspenseWrapper>
}
