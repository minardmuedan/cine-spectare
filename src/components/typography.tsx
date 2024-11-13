import { cn } from '@/lib/utils'

export const H3 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={cn('text-xl font-medium text-muted-foreground', className)}>{children}</h3>
)

export const H4 = ({ children }: { children: React.ReactNode }) => <h4 className="mb-2 text-center md:text-start">{children}</h4>
