import { MediaGenresKeywordsLoadingFallback } from '@/features/media/components/genres-keywords'

export default function MovieKeywordsLoading() {
  return (
    <div>
      <h3 className="mb-4 text-xl font-medium text-muted-foreground">Keywords</h3>
      <MediaGenresKeywordsLoadingFallback count={12} />
    </div>
  )
}
