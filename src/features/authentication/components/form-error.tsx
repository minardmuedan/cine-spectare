import { cn } from '@/lib/utils'
import { TriangleAlertIcon } from 'lucide-react'

export default function FormError({ error, className }: { error: string | undefined; className?: string }) {
  return (
    <div
      className={cn(
        `flex max-w-full items-center gap-3 overflow-hidden rounded-lg border-destructive bg-destructive/20 px-4 text-destructive transition-all ${error ? 'mb-6 h-14 border-2' : 'h-0'}`,
        className,
      )}
    >
      <TriangleAlertIcon size={20} strokeWidth={2.4} />
      <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-medium" title={`${error}`}>
        {error}
      </p>
    </div>
  )
}
