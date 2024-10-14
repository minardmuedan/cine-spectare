import { cn } from '@/lib/utils/cn'
import { TriangleAlertIcon } from 'lucide-react'

export default function FormError({ error, className }: { error?: string; className?: string }) {
  return (
    <div
      className={cn(
        `flex max-w-full transform items-center gap-3 overflow-hidden rounded-xl border-destructive bg-destructive/20 px-4 text-destructive transition-[height] ${!!error ? 'mb-6 h-14 border-2' : 'h-0'}`,
        className,
      )}
    >
      <TriangleAlertIcon />
      <p title={error} className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
        {error}
      </p>
    </div>
  )
}
