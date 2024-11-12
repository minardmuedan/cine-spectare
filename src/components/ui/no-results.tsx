import { cn } from '@/lib/utils'
import { FileX } from 'lucide-react'

export default function NoResult({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-40 w-full flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed p-5 text-muted-foreground',
        className,
      )}
    >
      <FileX size={32} />
      <p className="font-medium">No Results Found</p>
    </div>
  )
}
