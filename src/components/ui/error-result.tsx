import { cn } from '@/lib/utils'
import { TriangleAlertIcon } from 'lucide-react'

export default function ErrorResult({ error, className }: { error: Error; className?: string }) {
  return (
    <div
      className={cn(
        'flex h-40 w-full flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-destructive p-5 text-destructive',
        className,
      )}
    >
      <TriangleAlertIcon size={32} />
      <p className="text-center font-medium">{error.message}</p>
    </div>
  )
}
