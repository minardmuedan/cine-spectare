import { StarIcon } from 'lucide-react'

export default function VoteAverage({ voteAverage }: { voteAverage: number }) {
  return (
    <div title={`${voteAverage}`} className="flex items-center gap-1 text-xs text-yellow-500">
      <StarIcon size={14} />
      <p>{voteAverage.toFixed(1)}</p>
    </div>
  )
}
