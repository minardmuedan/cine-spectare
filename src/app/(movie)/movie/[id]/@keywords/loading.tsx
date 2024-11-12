import { H3 } from '@/components/typography'
import { MediaGenresKeywordsLoadingFallback } from '@/features/media/components/genres-keywords'

export default function MovieKeywordsLoading() {
  return (
    <div>
      <H3 className="mb-4">Keywords</H3>
      <MediaGenresKeywordsLoadingFallback count={12} />
    </div>
  )
}
