import { cn } from '@/lib/utils'

export const H3 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={cn('mb-4 text-xl font-medium text-muted-foreground', className)}>{children}</h3>
)
