import { cn } from '@/lib/utils/cn'
import { TriangleAlertIcon } from 'lucide-react'

export default function FormError({ message, className }: { message: string; className?: string }) {
  return (
    <div
      className={cn(
        'mb-6 flex h-14 max-w-full items-center gap-3 overflow-hidden rounded-xl border-2 border-destructive bg-destructive/20 px-4 text-destructive',
        className,
      )}
    >
      <TriangleAlertIcon />
      <p title={message} className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
        {message}
      </p>
    </div>
  )
}
